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

class IyoServer extends Model {

	public static $servers = array(
		array(
			array("id"=>"1", "name"=>"艾欧尼亚 电信"),
			array("id"=>"2", "name"=>"比尔吉沃特 网通"),
		),
		array(
			array("id"=>"1", "name"=>"魔兽世界 电信"),
			array("id"=>"2", "name"=>"魔兽世界 网通"),
		),
		array(
			array("id"=>"1", "name"=>"风暴英雄 电信"),
			array("id"=>"2", "name"=>"风暴英雄 网通"),
		),
		array(
			array("id"=>"1", "name"=>"炉石传说 电信"),
			array("id"=>"2", "name"=>"炉石传说 网通"),
		),

	);



	use SoftDeletes;
	protected $dates = ['deleted_at'];

	public static $attrnames = array(
		array("cache"=>"sid", "db"=> "id", "return"=>"sid"),
		array("cache"=>"name", "db"=> "name", "return"=>"name"),
		array("cache"=>"gid", "db"=> "gid", "return"=>"gid"),
	);

	const SERVER="server:%s";
	const GAMESERVER= "game:%s:server";

	public static function converDateTime($value)
	{
		return date("Y年m月d日", strtotime($value));
	}

	public static function reloadCache($id) {
		IyoServer::cleanCache($id);
		IyoServer::loadDataInToCache($id);
	}

	public static function loadDataInToCache($id) {
		Log::info("IyoServer loadDataInToCache enter");
		$redis = MyRedis::connection("default");
		$dbserver = IyoServer::find($id);
		if( is_null($dbserver) ) return;
		$key = sprintf(IyoServer::SERVER, $id);
		foreach( self::$attrnames as $attrname ) {
			$redis->hmset($key, $attrname["cache"], $dbserver[$attrname["db"]]);
		}
	}

	public static function cleanCache($id) {
		Log::info("IyoServer cleanCache enter");
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoServer::SERVER, $id);
		$redis->del($key);
	}

	public static function queryById($id)
	{
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoServer::SERVER, $id);

		if( !$redis->exists($key) ) {
			IyoServer::reloadCache($id);
		}

		if( !$redis->exists($key) ) {
			return null;
		}

		$server = [];
		foreach( self::$attrnames as $attrname ) {
			$server[$attrname["return"]] = $redis->hget($key, $attrname["cache"]);
		}
		return $topic;
	}

	public static function queryServerIdsByGame($gid)
	{
		$redis = MyRedis::connection("default");

		$key = sprintf(IyoServer::GAMESERVER, $gid);
		if(!$redis->exists($key)) {
			$list = IyoServer::where('gid', $gid)->orderBy('created_at', 'asc')
				->get(["id", "created_at"]);
			foreach( $list as $sid ) {
				$redis->zadd($key,strtotime($sid["created_at"]),$sid['id']);
			}
		}

		$tlist = [];
		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key);
		}

		return $tlist;
	}
}
