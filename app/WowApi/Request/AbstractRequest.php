<?php
namespace App\WowApi\Request;

use App\WowApi\Client;
use App\WowApi\Exception\ApiException;
use App\WowApi\Exception\RequestException;
use App\WowApi\Exception\NotFoundException;
use App\WowApi\Cache\CacheInterface;
use App\WowApi\ParameterBag;
use App\WowApi\Utilities;

abstract class AbstractRequest implements RequestInterface {
    /**
     * @var null|\WowApi\Request\HeaderBag
     */
    public $headers = null;

    /**
     * @var null|\WowApi\Client
     */
    protected $client = null;

    public function __construct() {
        $this->headers = new HeaderBag(array(
            'Expect'            => '',
            'Accept-Charset'    => 'UTF-8',
            'Accept-Encoding'   => 'compress, gzip',
            'Accept'            => 'application/json',
            'Content-Type'      => 'application/json',
            'User-Agent'        => 'PHP WowApi (http://github.com/dancannon/PHP-WowApi)',
        ));
    }

    public function setClient(Client $client)
    {
        $this->client = $client;
    }

    public function get($path, array $parameters = array()) {
        return $this->api($path, 'GET', $parameters);
    }

    public function post($path, array $parameters = array()) {
        return $this->api($path, 'POST', $parameters);
    }

    public function put($path, array $parameters = array()) {
        return $this->api($path, 'PUT', $parameters);
    }

    public function delete($path, array $parameters = array()) {
        return $this->api($path, 'DELETE', $parameters);
    }

    public function api($path, $method = 'GET', array $parameters = array()) {
        //Set the path to the full path before checking the cache
        $path = $this->getFullPath($path);

        //Make request
        if($method === 'GET') {
            $url = $this->getUrl($path, $parameters);
        } else {
            $url = $this->getUrl($path);
        }

        $this->signRequest($path, $method);

        return $this->send($url, $method, $parameters);
    }

    public function send($url, $method='GET', array $parameters=array())
    {
        // Check the cache
        if($cache = $this->isCached($url, $parameters)) {
            if ($cache && isset($cache['cachedAt']) && (time() - $cache['cachedAt']) < $this->client->options->get('ttl')) {
                $response['modified'] = false;
                return $cache;
            }
            if (isset($cache) && isset($cache['lastModified'])) {
                $this->headers->set('If-Modified-Since', date(DATE_RFC1123, $cache['lastModified']));
            }
        }

        $response = $this->makeRequest($url, $method, $parameters);
        $httpCode = $response['headers']['http_code'];


        if (isset($cache) && $httpCode === 304) {
            $cache['modified'] = false;
            return $cache;
        } else {
            $response = json_decode($response['response'], true);

            // Check for errors
            if($httpCode === 404) {
                if ($response !== false && isset($response['reason'])) {
                    throw new NotFoundException($response['reason']);
                } else {
                    throw new NotFoundException("Page not found.");
                }
            } elseif ($httpCode !== 200 || !$response) {
                if ($response !== false && isset($response['reason'])) {
                    throw new ApiException($response['reason'], $httpCode);
                } else {
                    throw new ApiException("Unknown error.", $httpCode);
                }
            }
        }

        $this->cache($url, $parameters, $response);

        $response['modified'] = true;
        return $response;
    }

    protected function isCached($path, $parameters)
    {
        $cache = $this->client->getCache()->getCachedResponse($path, $parameters);

        if (($cache !== false)) {
            $cache = json_decode($cache, true);

            if($cache) {
                return $cache;
            }
        }

        return false;
    }

    protected function cache($path, $parameters, $response)
    {
        if(isset($response['lastModified'])) {
            $response['lastModified'] = round($response['lastModified']/1000);
        }

        $response['cachedAt'] = time();
        $cache = json_encode($response);

        $this->client->getCache()->setCachedResponse($path, $parameters, $cache);
    }

    protected function signRequest($path, $method)
    {
        // Attempt to authenticate application
        $publicKey = $this->client->options->get('publicKey');
        $privateKey = $this->client->options->get('privateKey');

        if ($publicKey !== null && $privateKey !== null) {
            $date = gmdate(DATE_RFC1123);

            //Signed requests don't like certain some characters, but urldecode changes too many
            $badCharacters = array('%21', '%26', '%27', '%28', '%29', '%3A', '%40');
            $goodCharacters = array('!', '&', '\'', '(', ')', ':', '@');
            
            $path = str_replace($badCharacters, $goodCharacters, $path); 

            $stringToSign = "$method\n" . $date . "\n".$path."\n";
            $signature = base64_encode(hash_hmac('sha1',$stringToSign, $privateKey, true));

            $this->headers->set("Authorization", "BNET" . " " . $publicKey . ":" . $signature);
            $this->headers->set("Date",  $date);
        }
    }

    protected function getFullPath($path)
    {
        $replacements[':path'] = trim($path, '/');

        return strtr($this->client->options->get('fullPath'), $replacements);
    }

    protected function getUrl($path, $queryParams=array())
    {
        $replacements = array();
        $replacements[':protocol'] = $this->client->options->get('protocol');
        $replacements[':region']   = $this->client->options->get('region');
        $replacements[':fullPath'] = $path;

        $url = strtr($this->client->options->get('url'), $replacements);

        //Add locale to query parameters
        $queryParams['locale'] = $this->client->options->get('locale');
        if(!empty($queryParams)) {
            $url .= Utilities::build_http_query($queryParams);
        }

        return $url;
    }
}
