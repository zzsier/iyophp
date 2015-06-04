<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;

class IyoLike extends Model {

	const TOPICLIKELIST = "topic:%s:like";

	public static function checkIfLike($uid, $tid) {
		$redis = MyRedis::connection("default");

		$key = sprintf(IyoLike::TOPICLIKELIST, $tid);
		if(!$redis->exists($key)) {
			$list = IyoLike::where('tid', $tid)->orderBy('created_at', 'asc')
				->get(["uid", "created_at"]);
			foreach( $list as $tid ) {
				$redis->zadd($key,strtotime($tid["created_at"]),$tid['uid']);
			}
		}

		$result = $redis->zscore($key, $uid);

		if( !is_null($result) )
			return true;

		return false;
	}

	public static function queryLikeList($uid, $tid, $num=0, $current=0) {
		$redis = MyRedis::connection("default");

		$key = sprintf(IyoLike::TOPICLIKELIST, $tid);
		if(!$redis->exists($key)) {
			$list = IyoLike::where('tid', $tid)->orderBy('created_at', 'asc')
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

	public static function like($uid, $tid) {

		$like = new IyoLike();
		$like->uid = $uid;
		$like->tid = $tid;
		$like->save();
		
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoLike::TOPICLIKELIST, $like->tid);
		if( $redis->exists($key) ) {
			$redis->zadd($key,strtotime($like->created_at),$like->uid);
		}
	}

	public static function unlike($uid, $tid) {
		IyoLike::where('uid', '=', $uid)
			->where('tid', '=', $tid)->delete();

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoLike::TOPICLIKELIST, $tid);
		if( $redis->exists($key) ) {
			$redis->zrem($key,$uid);
		}
	}
}
