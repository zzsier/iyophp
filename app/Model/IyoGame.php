<?php 
namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;
use DB;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Illuminate\Log\Writer;
use Illuminate\Database\Eloquent\SoftDeletes;

class IyoGame extends Model {

	public static $games = array(
		array("id"=>"1", "name"=>"英雄联盟"),
		array("id"=>"2", "name"=>"魔兽世界"),
		array("id"=>"3", "name"=>"风暴英雄"),
		array("id"=>"4", "name"=>"炉石传说"),
	);

	public $timestamps = false;
	protected $dates = ['deleted_at'];

	const PREFIX="game";

	public static $attrnames = array(
		array("cache"=>"gid", "db"=> "id", "return"=>"gid"),
		array("cache"=>"name", "db"=> "name", "return"=>"name"),
	);

	const GAME="game:%s";

	public static function reloadCache($id) {
		IyoGame::cleanCache($id);
		IyoGame::loadDataInToCache($id);
	}

	public static function loadDataInToCache($id) {
		Log::info("IyoTopic loadDataInToCache enter");
		$redis = MyRedis::connection("default");
		$dbgame = IyoGame::find($id);
		if( is_null($dbgame) ) return;
		$key = sprintf(IyoGame::GAME, $id);
		foreach( self::$attrnames as $attrname ) {
			$redis->hmset($key, $attrname["cache"], $dbgame[$attrname["db"]]);
		}
	}

	public static function cleanCache($id) {
		Log::info("IyoTopic cleanCache enter");
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoGame::GAME, $id);
		$redis->del($key);
	}

	public static function queryById($id)
	{
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoGame::Game, $id);

		if( !$redis->exists($key) ) {
			IyoGame::reloadCache($id);
		}

		if( !$redis->exists($key) ) {
			return null;
		}

		$game = [];
		foreach( self::$attrnames as $attrname ) {
			$game[$attrname["return"]] = $redis->hget($key, $attrname["cache"]);
		}
		return $game;
	}
}
