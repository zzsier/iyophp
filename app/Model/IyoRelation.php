<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;

class IyoRelation extends Model {

	const FOLLOWLIST="following:%s";

	public static function queryFollowingList($id, $num=0, $current=0) {

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoRelation::FOLLOWLIST, $id);

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

	public static function checkIfFollow($id, $fid) {

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoRelation::FOLLOWLIST, $id);

		if(!$redis->exists($key)) {
			$list = IyoRelation::where('id', $id)->orderBy('created_at', 'asc')
				->get(["fid", "created_at"]);
			foreach( $list as $following ) {
				$redis->zadd($key,strtotime($following["created_at"]),$following['fid']);
			}
		}

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
		$key = sprintf(IyoRelation::FOLLOWLIST, $id);
		if($redis->exists($key)) {
			$redis->zadd($key,strtotime($relation->created_at),$following['fid']);
		}
	}

	public static function del($id, $fid) {
		IyoRelation::whereIdAndFid($id,$fid)->delete();
		$redis = MyRedis::connection();
		$key = sprintf(IyoRelation::FOLLOWLIST, $id);
		if($redis->exists($key)) {
			$redis->zrem($key, $fid);
		}
	}
}
