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

class IyoPlayer extends Model {

	use SoftDeletes;
	protected $dates = ['deleted_at'];

	public static $attrnames = array(
		array("cache"=>"pid", "db"=> "id", "return"=>"pid"),
		array("cache"=>"name", "db"=> "name", "return"=>"name"),
		array("cache"=>"gid", "db"=> "gid", "return"=>"gid"),
		array("cache"=>"sid", "db"=> "sid", "return"=>"sid"),
		array("cache"=>"uid", "db"=> "uid", "return"=>"uid"),
	);

	const PLAYER="player:%s";
	const USERPLAYER= "user:%s:player";

	public static function converDateTime($value)
	{
		return date("Y年m月d日", strtotime($value));
	}

	public static function saveOrUpdate($name, $gid, $sid, $uid, $pid=0)
	{
		if( $pid == 0 ) {
			$player = new IyoPlayer();
		} else {
			$player = IyoPlayer::find($pid);
		}

		$player->name = $name;
		$player->gid = $gid;
		$player->sid = $sid;
		$player->uid = $uid;

		$player->save();

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoPlayer::PLAYER, $pid);
		if( $redis->exists($key) ) {
			$redis->zadd($key,strtotime($player["created_at"]),$player['id']);
		}

		$pid = $player->id;
		IyoPlayer::reloadCache($pid);
		$player = IyoPlayer::queryById($pid);

		return $player;
	}

	public static function destroy($id)
	{
		$redis = MyRedis::connection("default");
		$player = IyoPlayer::find($id);
		if( !is_null($player) ) {
			$key = sprintf(IyoPlayer::PLAYER, $player->id);
			if( $redis->exists($key) ) {
				$redis->zrem($key, $id);
			}
			$player->delete();
		}

		IyoPlayer::cleanCache($id);
	}

	public static function reloadCache($id) {
		IyoPlayer::cleanCache($id);
		IyoPlayer::loadDataInToCache($id);
	}

	public static function loadDataInToCache($id) {
		$redis = MyRedis::connection("default");
		$player = IyoPlayer::find($id);
		if( is_null($player) ) return;
		$key = sprintf(IyoPlayer::PLAYER, $id);
		foreach( self::$attrnames as $attrname ) {
			$redis->hmset($key, $attrname["cache"], $player[$attrname["db"]]);
		}
	}

	public static function cleanCache($id) {
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoPlayer::PLAYER, $id);
		$redis->del($key);
	}

	public static function queryById($id)
	{
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoPlayer::PLAYER, $id);

		if( !$redis->exists($key) ) {
			IyoPlayer::reloadCache($id);
		}

		if( !$redis->exists($key) ) {
			return null;
		}

		$topic = [];
		foreach( self::$attrnames as $attrname ) {
			$topic[$attrname["return"]] = $redis->hget($key, $attrname["cache"]);
			if( $attrname["cache"] == "created_at" ) {
				$topic["created_at"] = date("Y年m月d日", strtotime($topic["created_at"]));
			}
			Log::info( "attribute is ".$attrname["return"]." ".$attrname["cache"]." ".$topic[$attrname["return"]]);
		}
		return $topic;
	}

	public static function queryPlayerIdsByUser($uid, $num=0, $current=0)
	{
		$redis = MyRedis::connection("default");

		$key = sprintf(IyoPlayer::PLAYER, $uid);
		if(!$redis->exists($key)) {
			$list = IyoPlayer::where('uid', $uid)->orderBy('created_at', 'asc')
				->get(["id", "created_at"]);
			foreach( $list as $tid ) {
				$redis->zadd($key,strtotime($tid["created_at"]),$tid['id']);
			}
		}

		$tlist = [];
		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}
}
