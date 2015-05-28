<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;

class IyoRelation extends Model {

	public $timestamps = false;

	const FOLLOWLIST="relation:%s:follow";
	const STARLIST="relation:%s:star";
	const UNIONLIST="relation:%s:union";
	const FOLLOWLEXPIRED=60000;

	public static function getArrayValue($id, $name, $order="", $num=0, $current=0) {

		$redis = MyRedis::connection("default");

		$unionkey = sprintf(IyoRelation::UNIONLIST, $id);
		$starkey = sprintf(IyoRelation::STARLIST, $id);
		$followkey = sprintf(IyoRelation::FOLLOWLIST, $id);

		if(!$redis->exists($unionkey)
				|| !$redis->exists($starkey)
				|| !$redis->exists($followkey) ) {

			$redis->del("$unionkey");
			$redis->del("$starkey");
			$redis->del("$followkey");

			$relations = IyoRelation::where('id', '=', $id)->get();
			foreach ($relations as $relation)
			{
				$user = IyoUser::queryById($relation["fid"]);
				if( $user["type"] == "2" ) { 
					$redis->lpush("$unionkey", $relation["fid"]);
				} else if ( $user["type"] == "1" ) { 
					$redis->lpush("$starkey", $relation["fid"]);
				} else {
					$redis->lpush("$followkey", $relation["fid"]);
				}
			}
		}

		if( $order == "" ) {
			$length = $redis->llen("$name");

			if( $num == 0 ) {
				$stop = $current + $length - 1;
			} else {
				$stop = $current + $num - 1;
			}

			if( $stop > $length - 1 ) {
				$stop = $length - 1;
			}
			$list = $redis->lrange("$name", $current, $stop);
		} else {
			$sort = array('BY'=>"$order", 'SORT'=>'DESC');
			$list = $redis->sort($name, $sort);
			$newlist = [];
			Log::info('IyoRelation::getArrayValue, list array is : '.implode(",", $list).' num: '.$num." current:".$current);
			if($num != 0) {
				for( $i = $current; $i < $current+$num; $i++ ) {
					if($i >= count($list)) {
						break;
					}
					$newlist[] = $list[$i];
				}
				$list = $newlist;
			}
		}
		return $list;
	}

	public static function queryUnionAndStarByFans($id, $num=0, $current=0) {

		$unionkey = sprintf(IyoRelation::UNIONLIST, $id);
		$starkey = sprintf(IyoRelation::STARLIST, $id);

		$slist = IyoRelation::getArrayValue($id, $starkey, "", $num, $current);
		$ulist = IyoRelation::getArrayValue($id, $unionkey, "", $num, $current);

		$loguid = "";
		foreach( $slist as $uid ) {
			$loguid = $uid." ";
		}
		Log::info('queryUnionAndStarByFans, star array is :'.$loguid);

		$loguid = "";
		foreach( $ulist as $uid ) {
			$loguid = $uid." ";
		}
		Log::info('queryUnionAndStarByFans, union array is :'.$loguid);

		$uslist = array_merge($slist, $ulist);
		return $uslist;
	}

	public static function queryStarAndFollowByFans($id, $num=0, $current=0) {

		$starkey = sprintf(IyoRelation::STARLIST, $id);
		$followkey = sprintf(IyoRelation::FOLLOWLIST, $id);

		$slist = IyoRelation::getArrayValue($id, $starkey, "", $num, $current);
		$flist = IyoRelation::getArrayValue($id, $followkey, "", $num, $current);

		$sflist = array_merge($slist, $flist);
		return $sflist;
	}


	public static function queryFollowUnion($id, $num, $current) {
		$unionkey = sprintf(IyoRelation::UNIONLIST, $id);
		$order = IyoUser::getOrderName($id);
		//$ulist = IyoRelation::getArrayValue($id, $unionkey, $order, $num, $current);
		$ulist = IyoRelation::getArrayValue($id, $unionkey, "", $num, $current);
		return $ulist;
	}

	public static function checkIfFollow($id, $fid) {

		$unionkey = sprintf(IyoRelation::UNIONLIST, $id);
		$starkey = sprintf(IyoRelation::STARLIST, $id);
		$followkey = sprintf(IyoRelation::FOLLOWLIST, $id);

		$slist = IyoRelation::getArrayValue($id, $starkey);
		$ulist = IyoRelation::getArrayValue($id, $unionkey);
		$flist = IyoRelation::getArrayValue($id, $followkey);

		if( in_array($fid, $ulist) ) {
			return true;
		}
		
		if( in_array($fid, $slist) ) {
			return true;
		}

		if( in_array($fid, $flist) ) {
			return true;
		}

		return false;
	}

	public static function uadd($id, $fid) {
		$relation = new IyoRelation();
		$relation->id = $id;
		$relation->fid = $fid;
		$redis = MyRedis::connection();
		$key = sprintf(IyoRelation::UNIONLIST, $id);
		$redis->lpush($key, $fid);
		$relation->save();
	}

	public static function sadd($id, $fid) {
		$relation = new IyoRelation();
		$relation->id = $id;
		$relation->fid = $fid;
		$redis = MyRedis::connection();
		$key = sprintf(IyoRelation::STARLIST, $id);
		$redis->lpush($key, $fid);
		$relation->save();
	}

	public static function fadd($id, $fid) {
		$relation = new IyoRelation();
		$relation->id = $id;
		$relation->fid = $fid;
		$redis = MyRedis::connection();
		$key = sprintf(IyoRelation::FOLLOWLIST, $id);
		$redis->lpush($key, $fid);
		$relation->save();
	}

	public static function fdel($id, $fid) {
		IyoRelation::whereIdAndFid($id,$fid)->delete();
		$redis = MyRedis::connection();
		$key = sprintf(IyoRelation::FOLLOWLIST, $id);
		$redis->lrem($key, 0, $fid);
	}

	public static function udel($id, $fid) {
		IyoRelation::whereIdAndFid($id,$fid)->delete();
		$redis = MyRedis::connection();
		$key = sprintf(IyoRelation::UNIONLIST, $id);
		$redis->lrem($key, 0, $fid);
	}

	public static function sdel($id, $fid) {
		IyoRelation::whereIdAndFid($id,$fid)->delete();
		$redis = MyRedis::connection();
		$key = sprintf(IyoRelation::STARLIST, $id);
		$redis->lrem($key, 0, $fid);
	}

}
