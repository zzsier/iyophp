<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;

class MeetRelation extends Model {

	const MEETLIST="meet:%s";
	const DROPLIST="drop:%s";
	const ALLLIST="all:person";

	public static function queryMeetList($id, $num=0, $current=0) {

		$redis = MyRedis::connection("default");
		$key = sprintf(MeetRelation::MEETLIST, $id);

		if(!$redis->exists($key)) {
			$list = MeetRelation::where('id', $id)->where('type', 1)->orderBy('created_at', 'asc')
				->get(["fid", "created_at"]);
			foreach( $list as $following ) {
				$redis->zadd($key,strtotime($following["created_at"]),$following['fid']);
			}
		}

		$tlist = [];
		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}

	public static function queryDropList($id, $num=0, $current=0) {

		$redis = MyRedis::connection("default");
		$key = sprintf(MeetRelation::DROPLIST, $id);

		if(!$redis->exists($key)) {
			$list = MeetRelation::where('id', $id)->where('type', 0)->orderBy('created_at', 'asc')
				->get(["fid", "created_at"]);
			foreach( $list as $following ) {
				$redis->zadd($key,strtotime($following["created_at"]),$following['fid']);
			}
		}

		$tlist = [];
		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}


	public static function checkIfMeet($id, $fid) {

		$redis = MyRedis::connection("default");
		$key = sprintf(MeetRelation::MEETLIST, $id);

		if(!$redis->exists($key)) {
			$list = MeetRelation::where('id', $id)->where('type', 1)->orderBy('created_at', 'asc')
				->get(["fid", "created_at"]);
			foreach( $list as $following ) {
				$redis->zadd($key,strtotime($following["created_at"]),$following['fid']);
			}
		}

		Log::info("check if meet ".$key." ".$fid);

		$result = $redis->zscore($key, $fid);

		if( !is_null($result) )
			return true;

		return false;
	}

	public static function meet($id, $fid) {
		$meet = new MeetRelation();
		$meet->id = $id;
		$meet->fid = $fid;
		$meet->type = 1;
		$meet->save();

		$redis = MyRedis::connection();
		$key = sprintf(MeetRelation::MEETLIST, $id);
		if($redis->exists($key)) {
			$redis->zadd($key,strtotime($relation->created_at),$fid);
		}
	}

	public static function drop($id, $fid) {
		$meet = new MeetRelation();
		$meet->id = $id;
		$meet->fid = $fid;
		$meet->type = 0;
		$meet->save();

		$redis = MyRedis::connection();
		$key = sprintf(MeetRelation::DROPLIST, $id);
		if($redis->exists($key)) {
			$redis->zadd($key,strtotime($relation->created_at),$fid);
		}
	}


}
