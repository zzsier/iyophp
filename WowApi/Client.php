<?php
namespace WowApi;

use WowApi\Cache\CacheInterface;
use WowApi\Exception\Exception;
use WowApi\Request\Curl;
use WowApi\Request\RequestInterface;
use WowApi\Api\ApiInterface;
use WowApi\Api\Achievements;
use WowApi\Api\Arena;
use WowApi\Api\Auction;
use WowApi\Api\Challenge;
use WowApi\Api\Character;
use WowApi\Api\Classes;
use WowApi\Api\Items;
use WowApi\Api\ItemClasses;
use WowApi\Api\Guild;
use WowApi\Api\GuildPerks;
use WowApi\Api\GuildRewards;
use WowApi\Api\Quests;
use WowApi\Api\Races;
use WowApi\Api\Realm;
use WowApi\Api\Recipes;

if (!function_exists('json_decode')) {
    throw new Exception('This API client needs the JSON PHP extension.');
}

class Client
{
    /**
     * @var null|\WowApi\Request\RequestInterface Request class
     */
    protected $request = null;

    /**
     * @var null|\WowApi\Cache\CacheInterface Cache engine
     */
    protected $cache = null;

    /**
     * @var null|\WowApi\ParameterBag API Options
     */
    public $options = null;

    /**
     * @var array Array containing the instances of the API classes
     */
    public $apis = null;

    public function __construct($options = array())
    {
        $this->apis = new ApiBag();
        $this->setCache(new Cache\Null());
        $this->options = new ParameterBag(
            array_merge(
                array(
                    'protocol' => 'http',
                    'region' => 'us',
                    'locale' => 'en_US',
                    'url' => ':protocol://:region.battle.net:fullPath',
                    'fullPath' => '/api/wow/:path',
                    'publicKey' => null,
                    'privateKey' => null,
                    'ttl' => 3600,
                ),
                $options
            )
        );
    }

    /**
     * Return supported regions
     * @return array
     */
    protected function getSupportedRegions()
    {
        return array('us', 'eu', 'kr', 'tw', 'cn');
    }

    protected function getSupportedLocales($region)
    {
        $locales = array(
            'us' => array('en_US', 'es_MX', 'pt_BR'),
            'eu' => array('en_GB', 'es_ES', 'fr_FR', 'ru_RU', 'de_DE', 'pt_PT'),
            'kr' => array('ko_KR'),
            'tw' => array('zh_TW'),
            'cn' => array('zh_CN'),
        );

        if (array_key_exists($region, $locales)) {
            return $locales[$region];
        }

        return false;
    }

    /**
     * Make an API call
     * @param $path
     * @param array $parameters
     * @param string $method
     * @param array $options
     * @return array
     */
    public function api($path, array $parameters = array(), $method = 'GET')
    {
        return $this->getRequest()->api($path, $method, $parameters);
    }

    /**
     * Authenticate the application. If secure is true use SSL
     * @param $publicKey
     * @param $privateKey
     * @param bool $secure
     * @return void
     */
    public function authenticate($publicKey, $privateKey, $secure = true)
    {
        $this->options->set('publicKey', $publicKey);
        $this->options->set('privateKey', $privateKey);

        if ($secure) {
            $this->options->set('protocol', 'https');
        }
    }

    /**
     * Set the region
     *
     * @param string      $region Region
     * @param null|string $locale Locale
     *
     * @return void
     */
    public function setRegion($region, $locale = null)
    {
        $region = strtolower($region);
        $locales = $this->getSupportedLocales($region);

        if (in_array($region, $this->getSupportedRegions()) && $locales !== false) {
            $this->options->set('region', $region);
        } else {
            throw new \InvalidArgumentException(sprintf('The region `%s` is not supported.', $region));
        }

        if ($locale === null) {
            $this->options->set('locale', $locales[0]);
        } else {
            if ($locales !== false && in_array($locale, $locales)) {
                $this->options->set('locale', $locale);
            } else {
                throw new \InvalidArgumentException(sprintf('The locale `%s` for region `%s` is not supported.', $locale, $region));
            }
        }
    }

    /**
     * Get the request object
     *
     * @internal param $ Exception\Exception
     * @return \WowApi\Request\RequestInterface
     */
    public function getRequest()
    {
        if ($this->request === null) {
            throw new Exception("A request class must be specified.");
        }

        return $this->request;
    }

    /**
     * Set the request object
     * @param \WowApi\Request\RequestInterface $request
     * @return void
     */
    public function setRequest(\WowApi\Request\RequestInterface $request)
    {
        $request->setClient($this);
        $this->request = $request;
    }

    /**
     * Sets the cache engine
     * @param Cache\CacheInterface $cache
     * @return void
     */
    public function setCache(CacheInterface $cache)
    {
        $this->cache = $cache;
    }

    /**
     * Gets the cache engine
     * @return Cache\CacheInterface
     */
    public function getCache()
    {
        return $this->cache;
    }

    /** API's **/

    /**
     * Returns the achievements API
     * @return \WowApi\Api\Achievements
     */
    public function getAchievementsApi()
    {
        if (!$this->apis->has('achievements')) {
            $this->apis->set('achievements', new Achievements($this));
            ;
        }

        return $this->apis->get('achievements');
    }

    /**
     * Returns the arena API
     * @return \WowApi\Api\Arena
     */
    public function getArenaApi()
    {
        if (!$this->apis->get('arena')) {
            $this->apis->set('arena', new Arena($this));
        }

        return $this->apis->get('arena');
    }

    /**
     * Returns the auction API
     * @return \WowApi\Api\Auction
     */
    public function getAuctionApi()
    {
        if (!$this->apis->has('auction')) {
            $this->apis->set('auction', new Auction($this));
        }

        return $this->apis->get('auction');
    }
    
    /**
     * Returns the challenge API
     * @return \WowApi\Api\Challenge
     */
    public function getChallengeApi()
    {
        if (!$this->apis->has('challenge')) {
            $this->apis->set('challenge', new Challenge($this));
        }

        return $this->apis->get('challenge');
    }

    /**
     * Returns the character API
     * @return \WowApi\Api\Character
     */
    public function getCharacterApi()
    {
        if (!$this->apis->has('character')) {
            $this->apis->set('character', new Character($this));
        }

        return $this->apis->get('character');
    }

    /**
     * Returns the classes API
     * @return \WowApi\Api\Classes
     */
    public function getClassesApi()
    {
        if (!$this->apis->has('classes')) {
            $this->apis->set('classes', new Classes($this));
        }

        return $this->apis->get('classes');
    }

    /**
     * Returns the guild API
     * @return \WowApi\Api\Guild
     */
    public function getGuildApi()
    {
        if (!$this->apis->has('guild')) {
            $this->apis->set('guild', new Guild($this));
        }

        return $this->apis->get('guild');
    }

    /**
     * Returns the guildPerks API
     * @return \WowApi\Api\GuildPerks
     */
    public function getGuildPerksApi()
    {
        if (!$this->apis->has('guildPerks')) {
            $this->apis->set('guildPerks', new GuildPerks($this));
        }

        return $this->apis->get('guildPerks');
    }

    /**
     * Returns the guildRewards API
     * @return \WowApi\Api\GuildRewards
     */
    public function getGuildRewardsApi()
    {
        if (!$this->apis->has('guildRewards')) {
            $this->apis->set('guildRewards', new GuildRewards($this));
        }

        return $this->apis->get('guildRewards');
    }

    /**
     * Returns the races API
     * @return \WowApi\Api\Races
     */
    public function getRacesApi()
    {
        if (!$this->apis->has('races')) {
            $this->apis->set('races', new Races($this));
        }

        return $this->apis->get('races');
    }

    /**
     * Returns the realm API
     * @return \WowApi\Api\Realm
     */
    public function getRealmApi()
    {
        if (!$this->apis->has('realm')) {
            $this->apis->set('realm', new Realm($this));
        }

        return $this->apis->get('realm');
    }

    /**
     * Returns the item API
     * @return \WowApi\Api\Items
     */
    public function getItemsApi()
    {
        if (!$this->apis->has('items')) {
            $this->apis->set('items', new Items($this));
        }

        return $this->apis->get('items');
    }

    /**
     * Returns the item API
     * @return \WowApi\Api\ItemClasses
     */
    public function getItemClassesApi()
    {
        if (!$this->apis->has('itemClasses')) {
            $this->apis->set('itemClasses', new ItemClasses($this));
        }

        return $this->apis->get('itemClasses');
    }

    /**
     * Returns the quest API
     * @return \WowApi\Api\Quests
     */
    public function getQuestsApi()
    {
        if (!$this->apis->has('quests')) {
            $this->apis->set('quests', new Quests($this));
        }

        return $this->apis->get('quests');
    }

    /**
     * Returns the quest API
     * @return \WowApi\Api\Recipes
     */
    public function getRecipeApi()
    {
        if (!$this->apis->has('recipes')) {
            $this->apis->set('recipes', new Recipes($this));
            ;
        }

        return $this->apis->get('recipes');
    }
}
