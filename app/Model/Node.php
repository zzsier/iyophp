<?php
namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;
use DB;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Illuminate\Log\Writer;
use Cache;

class Node extends Model {

    const CACHE_KEY     = 'site_nodes';
    const CACHE_MINUTES = 60;

    protected $fillable = [];

    public function topics($filter)
    {
        return $this->hasMany('Topic')->getTopicsWithFilter($filter);
    }

	public static function clearCache()
	{
		return Cache::forget(self::CACHE_KEY);
	}

    public static function allLevelUp()
    {
        Log::info("enter allLevelUp");
        return Cache::remember(self::CACHE_KEY, self::CACHE_MINUTES, function () {
            $nodes = Node::all();
            Log::info("enter allLevelUp cache remember");
            $result = array();
            foreach ($nodes as $key => $node) {
                if ($node->parent_node == null || $node->parent_node == 0) {
                    $result['top'][] = $node;
                    foreach ($nodes as $skey => $snode) {
                        if ($snode->parent_node == $node->id) {
                            $result['second'][$node->id][] = $snode;
                        }
                    }
                }
            }
            return $result;
        });
    }
}
