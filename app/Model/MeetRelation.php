<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;

class MeetRelation extends Model {

	const MEETINGLIST="meeting:%s";
	const MEETERLIST="meeter:%s";

	public static function queryFollowingList($id, $num=0, $current=0) {

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoRelation::FOLLOWINGLIST, $id);

		if(!$redis->exists($key)) {
			$list = IyoRelation::where('id', $id)->orderBy('created_at', 'asc')
				->get(["fid", "created_at"]);
			foreach( $list as $fid ) {
				$redis->zadd($key,strtotime($fid["created_at"]),$fid['fid']);
			}
		}

		$tlist = [];
		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}

	public static function queryFollowerList($id, $num=0, $current=0) {

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoRelation::FOLLOWERLIST, $id);

		if(!$redis->exists($key)) {
			$list = IyoRelation::where('fid', $id)->orderBy('created_at', 'asc')
				->get(["id", "created_at"]);
			foreach( $list as $result ) {
				$redis->zadd($key,strtotime($result["created_at"]),$result['id']);
			}
		}

		$tlist = [];
		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}

	public static function queryFriendList($id, $num=0, $current=0) {

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoRelation::FRIENDLIST, $id);

		if( !$redis->exists($key) ) {
			$followingkey = sprintf(IyoRelation::FOLLOWINGLIST, $id);
			if( !$redis->exists($followingkey) ) {
				IyoRelation::queryFollowingList($id);
			}
			$followerkey = sprintf(IyoRelation::FOLLOWERLIST, $id);
			if( !$redis->exists($followerkey) ) {
				IyoRelation::queryFollowerList($id);
			}
			$redis->ZINTERSTORE($key, 2, $followingkey, $followerkey, "AGGREGATE", "MIN");
		}

		$tlist = [];
		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}



	public static function queryFollowingListByType($id, $type, $num=0, $current=0)
	{
		$redis = MyRedis::connection("default");

		if( $type == "US" ) {
			$key = sprintf(IyoRelation::USFOLLOWLIST, $id);
		} else {
			$key = sprintf(IyoRelation::SFFOLLOWLIST, $id);
		}

		if( $current == 0 ) {
			if( $redis->exists($key) ) {
				$redis->del($key);
			}
		}

		$tlist = [];

		if( !$redis->exists($key) ) {
			$ids = IyoRelation::queryFollowingList($id);
			foreach( $ids as $fid ) {
				$user = IyoUser::queryById($fid);
				if( $type == "US" ) {
					//if( $user["type"] == "2" || $user["type"] == "1" ) { 
					if( $user["type"] == "2" ) { 
						$redis->zadd($key,strtotime($user["created_at"]),$user['id']);
					}
				} else {
					if( $user["type"] == "0" || $user["type"] == "1" ) { 
						$redis->zadd($key,strtotime($user["created_at"]),$user['id']);
					}
				}
			}
		}

		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}

	public static function checkIfFollow($id, $fid) {

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoRelation::FOLLOWINGLIST, $id);

		if(!$redis->exists($key)) {
			$list = IyoRelation::where('id', $id)->orderBy('created_at', 'asc')
				->get(["fid", "created_at"]);
			foreach( $list as $following ) {
				$redis->zadd($key,strtotime($following["created_at"]),$following['fid']);
			}
		}

		Log::info("check if follow ".$key." ".$fid);

		$result = $redis->zscore($key, $fid);

		if( !is_null($result) )
			return true;

		return false;
	}

	public static function add($id, $fid) {
		$relation = new IyoRelation();
		$relation->id = $id;
		$relation->fid = $fid;
		$relation->save();

		$redis = MyRedis::connection();
		$key = sprintf(IyoRelation::FOLLOWINGLIST, $id);
		if($redis->exists($key)) {
			$redis->zadd($key,strtotime($relation->created_at),$fid);
		}
		$key = sprintf(IyoRelation::FOLLOWERLIST, $fid);
		if($redis->exists($key)) {
			$redis->zadd($key,strtotime($relation->created_at),$id);
		}

		Log::info("relation fid:".$fid." id: ".$id);

		if( IyoRelation::checkIfFollow( $fid, $id ) ) {
			$key = sprintf(IyoRelation::FRIENDLIST, $id);
			if($redis->exists($key)) {
				$redis->del($key);
			}
			$key = sprintf(IyoRelation::FRIENDLIST, $fid);
			if($redis->exists($key)) {
				$redis->del($key);
			}
			Log::info("become friends fid:".$fid." id: ".$id);

			$mosquitto = new \Mosquitto\Client();
			$mosquitto->connect("localhost", 1883, 5);
			$mosquitto->publish("iyo_id_".$id, '{"fan":"0","friend":"1","moment":"0", "topic":"0"}', 1, 0);
			$mosquitto->disconnect();

			$mosquitto = new \Mosquitto\Client();
			$mosquitto->connect("localhost", 1883, 5);
			$mosquitto->publish("iyo_id_".$fid, '{"fan":"1","friend":"1","moment":"0", "topic":"0"}', 1, 0);
			$mosquitto->disconnect();

		} else {
			Log::info("become fans fid:".$fid." id: ".$id);
			$mosquitto = new \Mosquitto\Client();
			$mosquitto->connect("localhost", 1883, 5);
			$mosquitto->publish("iyo_id_".$fid, '{"fan":"1","friend":"0","moment":"0", "topic":"0"}', 1, 0);
			$mosquitto->disconnect();
		}

	}

	public static function del($id, $fid) {
		IyoRelation::whereIdAndFid($id,$fid)->delete();
		$redis = MyRedis::connection();
		$key = sprintf(IyoRelation::FOLLOWINGLIST, $id);
		if($redis->exists($key)) {
			$redis->zrem($key, $fid);
		}
		$key = sprintf(IyoRelation::FOLLOWERLIST, $fid);
		if($redis->exists($key)) {
			$redis->zrem($key, $id);
		}
		$key = sprintf(IyoRelation::FRIENDLIST, $id);
		if($redis->exists($key)) {
			$redis->del($key);
		}
		$key = sprintf(IyoRelation::FRIENDLIST, $fid);
		if($redis->exists($key)) {
			$redis->del($key);
		}
	}
}
