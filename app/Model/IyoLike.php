<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;

class IyoLike extends Model {
	public $timestamps = false;

	const USERLIKELIST="user:%s:like";
	const TOPICLIKELIST = "topic:%s:like";
	const TYPEUSERLIKELIST="userlike";
	const TYPETOPICLIKELIST = "topiclike";
	const TYPELEXPIRED=60000;

	public static function checkIfLike($uid, $tid) {

		$userlikekey = sprintf(IyoLike::USERLIKELIST, $uid);
		$topiclikekey = sprintf(IyoLike::TOPICLIKELIST, $tid);

		$userlike = IyoLike::getArrayValue(0, IyoLike::TYPEUSERLIKELIST, $uid, $userlikekey);
		$topiclike = IyoLike::getArrayValue(0, IyoLike::TYPETOPICLIKELIST, $tid, $topiclikekey);

		Log::info('IyoLike::checkIfLike, topiclike is : '.implode(",", $topiclike).' uid: '.$uid);

		if( in_array($uid, $topiclike) ) {
			return true;
		}
		
		return false;
	}

	public static function getArrayValue($id, $attrname, $attrvalue, $name, $num=0, $current=0) {
		$redis = MyRedis::connection("default");
		if(!$redis->exists("$name")) {
			$list = [];
			if( $attrname == IyoLike::TYPEUSERLIKELIST ) {
				$list = IyoLike::where('uid', $attrvalue)->get(["tid"]);
			}
			if( $attrname == IyoLike::TYPETOPICLIKELIST ) {
				$list = IyoLike::where('tid', $attrvalue)->get(["uid"]);
			}
			foreach( $list as $uid ) {
				if( $attrname == IyoLike::TYPEUSERLIKELIST ) {
					$redis->lpush("$name", $uid["tid"]);
				}
				if( $attrname == IyoLike::TYPETOPICLIKELIST ) {
					$redis->lpush("$name", $uid["uid"]);
				}
			}
//			$redis->pexpire($name, IyoUser::TYPELEXPIRED);
		}

		$length = $redis->llen("$name");

		if( $num == 0 ) {
			$stop = $current + $length - 1;
		} else {
			$stop = $current + $num;
		}

		if( $stop > $length - 1 ) {
			$stop = $length - 1;
		}

		$list = $redis->lrange("$name", $current, $stop);

		return $list;
	}

	public static function like($uid, $tid) {

		$like = new IyoLike();
		$like->uid = $uid;
		$like->tid = $tid;
		$like->save();
		
		IyoLike::addUserCacheLike($uid, $tid);
		IyoLike::addTopicCacheLike($uid, $tid);
	}

	public static function unlike($uid, $tid) {

		IyoLike::where('uid', '=', $uid)
			->where('tid', '=', $tid)->delete();
		IyoLike::rmvUserCacheLike($uid, $tid);
		IyoLike::rmvTopicCacheLike($uid, $tid);
	}

	public static function addUserCacheLike($uid, $tid)
	{
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoLike::USERLIKELIST, $uid);
		if( $redis->exists($key) ) {
			$redis->lpush($key, 0, $tid);
		}
	}

	public static function rmvUserCacheLike($uid, $tid)
	{
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoLike::USERLIKELIST, $uid);
		if( $redis->exists($key) ) {
			$redis->lrem($key, 0, $tid);
		}
	}

	public static function rmvTopicCacheLike($uid, $tid) {
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoLike::TOPICLIKELIST, $tid);
		if( $redis->exists($key) ) {
			$redis->lrem($key, 0, $uid);
		}
	}

	public static function addTopicCacheLike($uid, $tid) {
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoLike::TOPICLIKELIST, $tid);
		if( $redis->exists($key) ) {
			$redis->lpush($key, 0, $uid);
		}
	}
}
