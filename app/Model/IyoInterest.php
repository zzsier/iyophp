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
use App\WowApi\Client;
use App\WowApi\Request\Curl;

class IyoInterest extends Model {
	
	public static $interests = array(
		array("iid"=>"1", "name"=>"游戏", "photo"=>"", "leaf"=>false, "pid"=>0),
		array("iid"=>"2", "name"=>"运动", "photo"=>"", "leaf"=>false, "pid"=>0),  
		array("iid"=>"3", "name"=>"英雄联盟", "photo"=>"icon/lol.png", "leaf"=>true, "pid"=>1),
		array("iid"=>"4", "name"=>"风筝冲浪", "photo"=>"icon/fengzhengchonglang.png", "leaf"=>true, "pid"=>2),
		//array("iid"=>"4", "name"=>"魔兽世界", "photo"=>"icon/moshou.png", "leaf"=>true, "pid"=>1),
		//array("iid"=>"5", "name"=>"风暴英雄", "photo"=>"icon/fengbao.png", "leaf"=>true, "pid"=>1),
		//array("iid"=>"6", "name"=>"炉石传说", "photo"=>"icon/lushi.png", "leaf"=>true, "pid"=>1),
	);

	public static $attrnames = array(
		array("cache"=>"iid", "db"=> "iid", "return"=>"iid"),
		array("cache"=>"uid", "db"=> "uid", "return"=>"uid"),
	);

	const INTEREST="interest:%s";
	const USERINTEREST = "user:%s:interest";

	public static function converDateTime($value)
	{
		return date("Y年m月d日", strtotime($value));
	}

	public static function saveOrUpdate($iid, $uid)
	{
		$interest = new IyoInterest();

		$interest->iid = $iid;
		$interest->uid = $uid;
		$interest->save();

		$redis = MyRedis::connection("default");
		$key = sprintf(IyoInterest::USERINTEREST, $uid);
		if( $redis->exists($key) ) {
			$redis->zadd($key,strtotime($interest["created_at"]),$iid);
		}

		return $interest;
	}

	public static function deleteInterest($uid, $iid)
	{
		$redis = MyRedis::connection("default");
		$interest = IyoInterest::where("uid", $uid)->where("iid", $iid);
		if( !is_null($interest) ) {
			$key = sprintf(IyoInterest::USERINTEREST, $uid);
			if( $redis->exists($key) ) {
				$redis->zrem($key, $iid);
			}
			$interest->delete();
		}
	}

	public static function cleanAllInterests($uid)
	{
		$redis = MyRedis::connection("default");
		DB::table('iyo_interests')->where('uid', $uid)->delete();
		$key = sprintf(IyoInterest::USERINTEREST, $uid);
		if( $redis->exists($key) ) {
			$redis->del($key);
		}
	}


	public static function queryInterestIdsByUser($uid, $num=0, $current=0)
	{
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoInterest::USERINTEREST, $uid);
		if(!$redis->exists($key)) {
			$list = IyoInterest::where('uid', $uid)->orderBy('created_at', 'asc')
				->get(["iid", "created_at"]);
			foreach( $list as $tid ) {
				$redis->zadd($key,strtotime($tid["created_at"]),$tid['iid']);
			}
		}

		$tlist = [];
		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}
}
