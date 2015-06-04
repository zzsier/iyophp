<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use DB;
use Carbon\Carbon;
use Log;

class IyoUser extends Model {

	const PREFIX="user";

	public static $attrnames = array(
		array("cache"=>"id", "db"=> "id", "return"=>"id"),
		array("cache"=>"username", "db"=> "username", "return"=>"username"),
		array("cache"=>"type", "db"=> "type", "return"=>"type"),
		array("cache"=>"phone", "db"=> "phone", "return"=>"phone"),
		array("cache"=>"email", "db"=> "email", "return"=>"email"),
		array("cache"=>"image", "db"=> "imageUrl", "return"=>"image"),
		array("cache"=>"numOfFollow", "db"=> "follow_count", "return"=>"numOfFollow"),
		array("cache"=>"description", "db"=> "description", "return"=>"description"),
		array("cache"=>"bind", "db"=> "bind", "return"=>"bind"),
		array("cache"=>"recommend", "db"=> "recommend", "return"=>"recommend"),
		array("cache"=>"created_at", "db"=> "created_at", "return"=>"created_at"),
		array("cache"=>"sex", "db"=> "sex", "return"=>"sex"),
	);

	const USER="user:%s";
	const TYPELIST="user:%s:list";
	const TYPELEXPIRED=6000000000;

	public function asDateTime($value)
	{
		return date("Y年m月d日", strtotime($value));
	}

	public static function getOrderName($id) {
		return "";
	}

	public static function reloadCache($id) {
		IyoUser::cleanCache($id);
		IyoUser::loadDataInToCache($id);
	}

	public static function loadDataInToCache($id) {
		Log::info("IyoUser loadDataInToCache enter");
		$redis = MyRedis::connection("default");
		$dbuser = IyoUser::find($id);
		if( is_null($dbuser) ) return;
		$key = sprintf(IyoUser::USER, $id);
		foreach( self::$attrnames as $attrname ) {
			Log::info( "attribute is ".$attrname["cache"]." ".$attrname["db"]." ".$dbuser[$attrname["db"]] );
			$redis->hmset($key, $attrname["cache"], $dbuser[$attrname["db"]]);
		}
	}

	public static function cleanCache($id) {
		Log::info("IyoTopic cleanCache enter");
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoUser::USER, $id);
		$redis->del($key);
	}

	public static function queryById($id)
	{
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoUser::USER, $id);

		if( !$redis->exists($key) ) {
			IyoUser::reloadCache($id);
		}

		if( !$redis->exists($key) ) {
			return null;
		}

		$user = [];
		foreach( self::$attrnames as $attrname ) {
			$user[$attrname["return"]] = $redis->hget($key, $attrname["cache"]);
			Log::info( "attribute is ".$attrname["return"]." ".$attrname["cache"]." ".$user[$attrname["return"]]);
		}
		return $user;
	}

	public static function increaseNumOfFollow($id)
	{
		DB::table('iyo_users')->where('id', $id)->increment('follow_count');

		$redis = MyRedis::connection("default");
		if( $redis->exists(IyoUser::PREFIX.":$id") )
		{
			$redis->hincrby(IyoUser::PREFIX.":$id:", "numOfFollow", 1);
		}
	}

	public static function decreaseNumOfFollow($id)
	{
		DB::table('iyo_users')->where('id', $id)->decrement('follow_count');

		$redis = MyRedis::connection("default");
		if( $redis->exists(IyoUser::PREFIX.":$id") )
		{
			$redis->hincrby(IyoUser::PREFIX.":$id:", "numOfFollow", -1);
		}
	}

	public static function queryListByType($type, $num=0, $current=0)
	{
		$redis = MyRedis::connection("default");

		$key = sprintf(IyoUser::TYPELIST, $type);


		if(!$redis->exists($key)) {
			$list = [];
			$list = IyoUser::where('type', $type)->orderBy('follow_count','desc')->get(["follow_count","id"]);
			foreach( $list as $uid ) {
				$redis->zadd($key,$uid["follow_count"],$uid['id']);
			}
			$redis->pexpire($key, 24*60*60*60);
		}

		$union_ids = [];
		if( $redis->exists($key) ) {
			$union_ids = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $union_ids;
	}

	public static function searchByUsername($username, $type, $num=0, $current=0) {
		$list = [];
		$ids = [];
		if( $num == 0 ) {
			$list = IyoUser::where("type", $type)->where('username', 'like', '%'.$username.'%')->orderby('follow_count')->get(["id"]);
		} else {
			$list = IyoUser::where("type", $type)->where('username', 'like', '%'.$username.'%')->orderby('follow_count')
				->skip($current)->take($num)->get(["id"]);
		}

		foreach( $list as $tid ) {
			$ids[] = $tid["id"];
		}

		return $ids;
	}

}
