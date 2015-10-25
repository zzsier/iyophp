<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;

class IyoBlack extends Model {

	const BLACKLIST="black:%s";
	const BLOCKLIST="block:%s";

	public static function queryBlackList($id, $num=0, $current=0) {

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoBlack::BLACKLIST, $id);

		if(!$redis->exists($key)) {
			$list = IyoBlack::where('id', $id)->orderBy('created_at', 'asc')
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

	public static function queryBlockList($id, $num=0, $current=0) {

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoBlack::BLOCKLIST, $id);

		if(!$redis->exists($key)) {
			$list = IyoBlack::where('fid', $id)->orderBy('created_at', 'asc')
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

	public static function checkIfBlack($id, $fid) {

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoBlack::BLACKLIST, $id);

		if(!$redis->exists($key)) {
			$list = IyoBlack::where('id', $id)->orderBy('created_at', 'asc')
				->get(["fid", "created_at"]);
			foreach( $list as $following ) {
				$redis->zadd($key,strtotime($following["created_at"]),$following['fid']);
			}
		}

		Log::info("check if black ".$key." ".$fid);

		$result = $redis->zscore($key, $fid);

		if( !is_null($result) )
			return true;

		return false;
	}

	public static function checkIfBlock($id, $fid) {

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoBlack::BLOCKLIST, $fid);

		if(!$redis->exists($key)) {
			$list = IyoBlack::where('fid', $fid)->orderBy('created_at', 'asc')
				->get(["id", "created_at"]);
			foreach( $list as $following ) {
				$redis->zadd($key,strtotime($following["created_at"]),$following['id']);
			}
		}

		Log::info("check if block ".$key." ".$id);

		$result = $redis->zscore($key, $id);

		if( !is_null($result) )
			return true;

		return false;
	}


	public static function add($id, $fid) {
		$black = new IyoBlack();
		$black->id = $id;
		$black->fid = $fid;
		$black->save();

		$redis = MyRedis::connection();
		$key = sprintf(IyoBlack::BLACKLIST, $id);
		if($redis->exists($key)) {
			$redis->del($key);
		}
		$key = sprintf(IyoBlack::BLOCKLIST, $fid);
		if($redis->exists($key)) {
			$redis->del($key);
		}

	}

	public static function del($id, $fid) {
		IyoBlack::whereIdAndFid($id,$fid)->delete();
		$redis = MyRedis::connection();
		$key = sprintf(IyoBlack::BLACKLIST, $id);
		if($redis->exists($key)) {
			$redis->del($key);
		}
		$key = sprintf(IyoBlack::BLOCKLIST, $fid);
		if($redis->exists($key)) {
			$redis->del($key);
		}
	}
}
