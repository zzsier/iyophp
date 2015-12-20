<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;

class IyoDrop extends Model {

	const USERDROPLIST = "usertopic:%s:drop";

	public static function checkIfDrop($uid, $tid) {
		$redis = MyRedis::connection("default");

		$key = sprintf(IyoDrop::USERDROPLIST, $uid);
		if(!$redis->exists($key)) {
			$list = IyoDrop::where('uid', $uid)->orderBy('created_at', 'asc')
				->get(["tid", "created_at"]);
			foreach( $list as $tid ) {
				$redis->zadd($key,strtotime($tid["created_at"]),$tid['uid']);
			}
		}

		$result = $redis->zscore($key, $tid);

		if( !is_null($result) )
			return true;

		return false;
	}

	public static function queryUserDropList($uid, $num=0, $current=0) {
		$redis = MyRedis::connection("default");

		$key = sprintf(IyoDrop::USERDROPLIST, $uid);
		if(!$redis->exists($key)) {
			$list = IyoLike::where('uid', $uid)->orderBy('created_at', 'asc')
				->get(["uid", "created_at"]);
			foreach( $list as $tid ) {
				$redis->zadd($key,strtotime($tid["created_at"]),$tid['uid']);
			}
		}

		$tlist = [];
		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}

	public static function drop($uid, $tid) {

		$drop = new IyoDrop();
		$drop->uid = $uid;
		$drop->tid = $tid;
		$drop->save();
		
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoDrop::USERDROPLIST, $drop->uid);
		if( $redis->exists($key) ) {
			$redis->zadd($key,strtotime($drop->created_at),$drop->tid);
		}
	}

}
