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

class IyoTopic extends Model {

	use SoftDeletes;
	protected $dates = ['deleted_at'];

	const PREFIX="topic";

	public static $attrnames = array(
		array("cache"=>"tid", "db"=> "id", "return"=>"tid"),
		array("cache"=>"title", "db"=> "title", "return"=>"title"),
		array("cache"=>"from", "db"=> "from", "return"=>"from"),
		array("cache"=>"image", "db"=> "image", "return"=>"image"),
		array("cache"=>"content", "db"=> "body", "return"=>"content"),
		array("cache"=>"uid", "db"=> "uid", "return"=>"uid"),
		array("cache"=>"numOfReplay", "db"=> "reply_count", "return"=>"numOfReplay"),
		array("cache"=>"numOfView", "db"=> "view_count", "return"=>"numOfView"),
		array("cache"=>"numOfLike", "db"=> "like_count", "return"=>"numOfLike"),
		array("cache"=>"abstract", "db"=> "abstract", "return"=>"abstract"),
		array("cache"=>"created_at", "db"=> "created_at", "return"=>"created_at"),
		array("cache"=>"numOfForward", "db"=> "forward_count", "return"=>"numOfForward"),
		array("cache"=>"allowedComment", "db"=> "allowed_comment", "return"=>"allowedComment"),
		array("cache"=>"deletedTimer", "db"=> "deleted_timer", "return"=>"deletedTimer"),
		array("cache"=>"pid", "db"=> "pid", "return"=>"pid"),
	);

	const TOPIC="topic:%s";
	const USTEMPTIMELINE = "user:%s:tempustimeline";
	const SFTEMPTIMELINE = "user:%s:tempsftimeline";
	const USTIMELINE = "user:%s:ustimeline";
	const SFTIMELINE = "user:%s:sftimeline";
	const USERTIMELINE = "user:%s:timeline";
	const USERTOPIC = "user:%s:topic";
	const HOTTOPIC = "hot:topic";
	const HOTALLTOPIC = "hot:all:topic";

	public static function converDateTime($value)
	{
		return date("Y年m月d日", strtotime($value));
	}

	public static function saveOrUpdate($title, $abstract, $from, $image, $uid, $body, $type=0, $tid=0, $pid=0, $allowedComment=1, 
			$deletedTimer=NULL)
	{
		//Log::info("tid: ".$tid." pid: ".$pid." title: ".$title);

		if( $tid == 0 ) {
			$topic = new IyoTopic();
		} else {
			$topic = IyoTopic::find($tid);
		}

		$topic->title = $title;
		$topic->abstract = $abstract;
		$topic->from = $from;
		$topic->t_type = $type;
		$topic->image = $image;
		$topic->uid = $uid;
		$topic->body = $body;
		$topic->pid = $pid;
		$topic->allowed_comment = $allowedComment;
		$topic->deleted_timer = $deletedTimer;

		$topic->save();

		if( $tid == 0 ) {
			$redis = MyRedis::connection("default");
			$key = sprintf(IyoTopic::USERTOPIC, $uid);
			if( $redis->exists($key) ) {
				$redis->zadd($key,strtotime($topic["created_at"]),$topic['id']);
			}
		}

		$tid = $topic->id;
		IyoTopic::reloadCache($tid);
		$topic = IyoTopic::queryById($tid);

		return $topic;
	}

	public static function routeSFList($ids, $tid, $selfid) {
		$redis = MyRedis::connection("default");

		foreach( $ids as $uid ) {
			$key = sprintf(IyoTopic::SFTIMELINE, $uid);
			if( $redis->exists($key) ) {
				$redis->lpush($key, $tid);
				$redis->ltrim($key,0,1000);
			}
			if( $uid != $selfid ) {
				Log::info("send SF request id is ".$uid);
				$mosquitto = new \Mosquitto\Client();
				$mosquitto->connect("localhost", 1883, 5);
				$mosquitto->publish("iyo_id_".$uid, '{"fan":"0","friend":"0","moment":"1","topic":"0"}', 1, 0);
				$mosquitto->disconnect();
			}
		}
	}

	public static function routeUSList($ids, $tid, $selfid) {
		$redis = MyRedis::connection("default");

		foreach( $ids as $uid ) {
			$key = sprintf(IyoTopic::USTIMELINE, $uid);
			if( $redis->exists($key) ) {
				$redis->lpush($key, $tid);
				$redis->ltrim($key,0,1000);
			}
			if( $uid != $selfid ) {
				Log::info("send US request id is ".$uid);
				$mosquitto = new \Mosquitto\Client();
				$mosquitto->connect("localhost", 1883, 5);
				$mosquitto->publish("iyo_id_".$uid, '{"fan":"0","friend":"0","moment":"0","topic":"1"}', 1, 0);
				$mosquitto->disconnect();
			}
		}
	}

	public static function destroy($id, $uid=0)
	{
		$redis = MyRedis::connection("default");
		$topic = IyoTopic::find($id);
		if( !is_null($topic) ) {
			$key = sprintf(IyoTopic::USERTOPIC, $topic->uid);
			if( $redis->exists($key) ) {
				$redis->zrem($key, $id);
			}
			$topic->delete();
		}

		IyoTopic::cleanCache($id);
		$key = sprintf(IyoTopic::USTIMELINE, $uid);
		if( $redis->exists($key) ) {
			$redis->lrem($key, 0, $id);
		}
		$key = sprintf(IyoTopic::SFTIMELINE, $uid);
		if( $redis->exists($key) ) {
			$redis->lrem($key, 0, $id);
		}
	}

	public static function reloadCache($id) {
		IyoTopic::cleanCache($id);
		IyoTopic::loadDataInToCache($id);
	}

	public static function loadDataInToCache($id) {
		//Log::info("IyoTopic loadDataInToCache enter");
		$redis = MyRedis::connection("default");
		$dbtopic = IyoTopic::find($id);
		if( is_null($dbtopic) ) return;
		$key = sprintf(IyoTopic::TOPIC, $id);
		foreach( self::$attrnames as $attrname ) {
			//Log::info( "attribute is ".$attrname["cache"]." ".$attrname["db"]." ".$dbtopic[$attrname["db"]] );
			$redis->hmset($key, $attrname["cache"], $dbtopic[$attrname["db"]]);
		}
	}

	public static function cleanTimeline($uid) {
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoTopic::USTIMELINE, $uid);
		$redis->del($key);
		$key = sprintf(IyoTopic::SFTIMELINE, $uid);
		$redis->del($key);
	}

	public static function cleanCache($id) {
		//Log::info("IyoTopic cleanCache enter");
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoTopic::TOPIC, $id);
		$redis->del($key);
	}

	public static function queryById($id)
	{
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoTopic::TOPIC, $id);

		if( !$redis->exists($key) ) {
			IyoTopic::reloadCache($id);
		}

		if( !$redis->exists($key) ) {
			return null;
		}

		$topic = [];
		foreach( self::$attrnames as $attrname ) {
			$topic[$attrname["return"]] = $redis->hget($key, $attrname["cache"]);
			if( $attrname["cache"] == "created_at" ) {
				$topic["created_at"] = date("Y年m月d日", strtotime($topic["created_at"]));
			}
			//Log::info( "attribute is ".$attrname["return"]." ".$attrname["cache"]." ".$topic[$attrname["return"]]);
		}
		return $topic;
	}

	public static function queryTempTopicIdsByTime($uid, $uslist, $type, $num=0, $current=0)
	{
		$redis = MyRedis::connection("default");

		if( $type == "USTIMELINE" ) {
			$key = sprintf(IyoTopic::USTEMPTIMELINE, $uid);
		} else {
			$key = sprintf(IyoTopic::SFTEMPTIMELINE, $uid);
		}

		if( $current == 0 ) {
			if( $redis->exists($key) ) {
				$redis->del($key);
			}
		}

		if( $type != "USTIMELINE" ) {
			$uslist[] = $uid;
		}

		$redisunion = [];
		$tlist = [];

		if( !$redis->exists($key) ) {
			foreach( $uslist as $fid ) {
				$userlist = sprintf(IyoTopic::USERTOPIC, $fid);
				if( !$redis->exists($userlist) ) {
					IyoTopic::queryTopicIdsByUser($fid);
				}
				if( $redis->exists($userlist) ) {
					$redisunion[] = $userlist;
				}
			}

			if( count($redisunion) > 0 ) {
				$redis->zunionstore($key, 1, $redisunion[0]);
				for( $i = 1; $i<count($redisunion); $i++ ) {
					$redis->zunionstore($key, 2, $key, $redisunion[$i], "AGGREGATE", "MIN");
				}
			}
		}

		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}

	public static function isNullTimeline($uid, $type) {
		$redis = MyRedis::connection("default");
		if( $type == "USTIMELINE" ) {
			$key = sprintf(IyoTopic::USTIMELINE, $uid);
		} else {
			$key = sprintf(IyoTopic::SFTIMELINE, $uid);
		}
		if( $redis->exists($key) ) {
			return false;
		}
		return true;
	}

	public static function queryTopicIdsByTime($uid, $uslist, $type, $num=0, $current=0)
	{
		$redis = MyRedis::connection("default");

		if( $type == "USTIMELINE" ) {
			$key = sprintf(IyoTopic::USTIMELINE, $uid);
		} else {
			$key = sprintf(IyoTopic::SFTIMELINE, $uid);
		}

		if( $type != "USTIMELINE" ) {
			$uslist[] = $uid;
		}
		$tlist = [];

		if( !$redis->exists($key) ) {
			$templist = [];
			$templist = IyoTopic::queryTempTopicIdsByTime($uid, $uslist, $type);

			if( count($templist) != 0 ) {
				$redis->rpush($key, $templist);
			}
		}

		if( $redis->exists($key) ) {
			$tlist = $redis->lrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}

	public static function queryTopicIdsByUser($uid, $num=0, $current=0)
	{
		$redis = MyRedis::connection("default");

		$key = sprintf(IyoTopic::USERTOPIC, $uid);
		if(!$redis->exists($key)) {
			$list = IyoTopic::where('uid', $uid)->orderBy('created_at', 'asc')
				->get(["id", "created_at"]);
			foreach( $list as $tid ) {
				$redis->zadd($key,strtotime($tid["created_at"]),$tid['id']);
			}
		}

		$tlist = [];
		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}

	public static function queryHotTopicIds($union_ids, $num=0, $current=0)
	{
		$redis = MyRedis::connection("default");

		if(!$redis->exists(IyoTopic::HOTTOPIC)) {
			$list = [];
			$phpbefore = time()-24*60*60;
			$before = date('Y-m-d H:i:s',$phpbefore);
			$list = IyoTopic::where('created_at', '>', $before)
				->whereIn("uid", $union_ids)->orderBy('view_count')->take(200)->get(["id", "view_count"]);

			//Log::info("queryHotTopicIds before is ".$before);
			//DB::listen(function($sql, $bindings, $time) {
			//		Log::info($sql);
			//});

			foreach( $list as $tid ) {
				$redis->zadd(IyoTopic::HOTTOPIC,$tid["view_count"],$tid['id']);
			}
			$redis->pexpire(IyoTopic::HOTTOPIC, 24*60*60);
		}

		$tlist = [];
		if( $redis->exists(IyoTopic::HOTTOPIC) ) {
			$tlist = $redis->zrevrange(IyoTopic::HOTTOPIC, $current, $current+$num-1);
		}
		return $tlist;
	}

	public static function queryHotALLTopicIds($num=0, $current=0)
	{
		$redis = MyRedis::connection("default");

		if(!$redis->exists(IyoTopic::HOTALLTOPIC)) {
			$list = [];
			$phpbefore = time()-24*60*60*60*60;
			$before = date('Y-m-d H:i:s',$phpbefore);
			$list = IyoTopic::where('created_at', '>', $before)->where('t_type', '0')
				->orderBy('like_count','desc')->get(["id", "like_count", "created_at"]);

			foreach( $list as $tid ) {
				$redis->zadd(IyoTopic::HOTALLTOPIC,$tid["like_count"],$tid['id']);
			}
			$redis->pexpire(IyoTopic::HOTALLTOPIC, 1000*60*60);
		}

		$tlist = [];
		if( $redis->exists(IyoTopic::HOTALLTOPIC) ) {
			$tlist = $redis->zrevrange(IyoTopic::HOTALLTOPIC, $current, $current+$num-1);
		}
		return $tlist;
	}


	public static function incrValue($key, $id, $field, $cfield) {
		DB::table('iyo_topics')->where('id', $id)->increment($field);
		$redis = MyRedis::connection("default");
		if( $redis->exists($key) ) {
			$redis->hincrby($key, $cfield, 1);
		}
	}

	public static function decrValue($key, $id, $field, $cfield) {
		DB::table('iyo_topics')->where('id', $id)->decrement($field);
		$redis = MyRedis::connection("default");
		if( $redis->exists($key) ) {
			$redis->hincrby($key, $cfield, -1);
		}
	}

	public static function incrNumOfView($id) {
		IyoTopic::incrValue(IyoTopic::PREFIX.":$id", $id, "view_count", "numOfView");
	}

	public static function incrNumOfForward($id) {
		IyoTopic::incrValue(IyoTopic::PREFIX.":$id", $id, "forward_count", "numOfForward");
	}

	public static function decrNumOfForward($id) {
		IyoTopic::decrValue(IyoTopic::PREFIX.":$id", $id, "forward_count", "numOfForward");
	}

	public static function incrNumOfLike($id) {
		IyoTopic::incrValue(IyoTopic::PREFIX.":$id", $id, "like_count", "numOfLike");
	}

	public static function decrNumOfLike($id) {
		IyoTopic::decrValue(IyoTopic::PREFIX.":$id", $id, "like_count", "numOfLike");
	}

	public static function incrNumOfReply($id) {
		IyoTopic::incrValue(IyoTopic::PREFIX.":$id", $id, "reply_count", "numOfReplay");
	}

	public static function decrNumOfReply($id) {
		IyoTopic::decrValue(IyoTopic::PREFIX.":$id", $id, "reply_count", "numOfReplay");
	}
}
