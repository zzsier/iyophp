<?php namespace App\Model;

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

	public static $attibutes = array(
		"id" => "id",
		"title" => "title",
		"from" => "from",
		"image" => "image",
		"content" => "body",
		"uid" => "uid",
		"numOfReplay" => "reply_count",
		"numOfView" => "view_count",
		"numOfLike" => "like_count",
		"abstract" => "abstract",
		"created_at" => "created_at",
		"numOfForward" => "forward_count",
		"allowedComment" => "allowed_comment",
		"deletedTimer" => "deleted_timer",
		"pid" => "pid",
	);

	const ATTR_ID="id";
	const ATTR_TITLE="title";
	const ATTR_IMAGE="image";
	const ATTR_CONTENT="content";
	const ATTR_FROM="from";
	const ATTR_UID="uid";
	const ATTR_NUMOFREPLY="numOfReplay";
	const ATTR_NUMOFVIEW="numOfView";
	const ATTR_NUMOFLIKE="numOfLike";
	const ATTR_ABSTRACT="abstract";
	const ATTR_CREATEDAT="created_at";
	const ATTR_NUMOFFORWARD="numOfForward";
	const ATTR_ALLOWEDCOMMENT ="allowedComment";
	const ATTR_DELETEDTIMER ="deletedTimer";
	const ATTR_PID ="pid";

	const TYPECOMMENTLIST="topiccomment";
	const COMMENTLIST="topic:%s:comment";
	const USERTIMELINE = "user:%s:ustimeline";
	const USERTOPIC = "user:%s:topic";
	const HOTTOPIC = "hot:1:topic";
	const TYPEUSERTIMELINE = "ustimeline";
	const TYPEUSERTOPIC = "usertopic";
	const TYPEHOTTOPIC = "hottopic";
	const TYPEEXPIRED=6;

	public static function converDateTime($value)
	{
		return date("Y年m月d日", strtotime($value));
	}

	public static function saveOrUpdate($title, $abstract, $from, $image, $uid, $body, $tid=0, $pid=0, $allowedComment=1, $deletedTimer=NULL)
	{
		if( $tid == 0 ) {
			$topic = new IyoTopic();
		} else {
			$topic = IyoTopic::find($tid);
		}

		$topic->title = $title;
		$topic->abstract = $abstract;
		$topic->from = $from;
		$topic->image = $image;
		$topic->uid = $uid;
		$topic->body = $body;
		$topic->pid = $pid;
		$topic->allowed_comment = $allowedComment;
		$topic->deleted_timer = $deletedTimer;

		$topic->save();

		IyoTopic::reloadCache($tid);

		return $topic;
	}

	public static function destroy($id)
	{
		$topic = IyoTopic::find($id);
		$topic->delete();
		IyoTopic::cleanCache($id);
	}

	public static function getValue($id, $attr) {
		$redis = MyRedis::connection("default");
		if(!$redis->exists(IyoTopic::PREFIX.":$id:$attr")) {
			IyoTopic::loadDataInToCache($id);
		}
		if($redis->exists(IyoTopic::PREFIX.":$id:$attr")) {
			return $redis->get(IyoTopic::PREFIX.":$id:$attr");
		} else {
			return "";
		}
	}

	public static function addArrayValue($name, $value) {
		$redis = MyRedis::connection("default");
		if( $redis->exists($name) ) {
			$redis->lpush($name, 0, $value);
		}
	}

	public static function rmvArrayValue($name, $value) {
		$redis = MyRedis::connection("default");
		if( $redis->exists($name) ) {
			$redis->lrem($name, 0, $value);
		}
	}

	public static function getArrayValue($id, $attrname, $attrvalue, $name, $num=0, $current=0) {
		$redis = MyRedis::connection("default");
		Log::info('get Array Value, attrname:'.$attrname." name:".$name." num:".$num." current:".$current);
		if(!$redis->exists($name)) {
			$list = [];

			Log::info('getArrayValue cache does not exist');

			if( $attrname == IyoTopic::TYPEUSERTOPIC ) {
				$list = IyoTopic::where('uid', $attrvalue)->orderBy('created_at', 'asc')
					->take(1100)->get(["id", "created_at"]);
			} else if ( $attrname == IyoTopic::TYPEUSERTIMELINE) {
				$list = IyoTopic::whereIn('uid', $attrvalue)->orderBy('created_at', 'asc')
					->take(1100)->get(["id", "created_at"]);
			} else if ( $attrname == IyoTopic::TYPEHOTTOPIC ) {
				$list = IyoTopic::where('created_at', '>', time()-1000*24*60*60)
					->orderBy('view_count')->take(200)->get(["id", "created_at"]);
			} else if ( $attrname == IyoTopic::TYPECOMMENTLIST ) {
				$list = IyoComment::where('tid', $attrvalue)->orderby('created_at','asc')->get(["id", "created_at"]);
			}

			$logid = "";
			foreach( $list as $log ) {
				$logid = $log["id"]." ";
			}
			Log::info('getArrayValue, logid is :'.$logid);


			$sqls = DB::getQueryLog();
            $logger = new Writer(new Logger("info"));
			$logger->useFiles(storage_path().'/logs/sql.log');
			$logger->info($sqls);

			foreach( $list as $tid ) {
				$logger->info($tid);
				$redis->zadd($name,strtotime($tid["created_at"]),$tid['id']);
			}

			//$redis->pexpire($name, IyoTopic::TYPEEXPIRED);
		}

		$length = $redis->zcard($name);
		$tlist = [];
		if( $num == 0 ) {
			$stop = -1;
			$tlist = $redis->zrange($name, $current, $stop);
		} else if( $current > 1000 ) {
			$stop = $current + $num - 1;

			if( $attrname == IyoTopic::TYPEUSERTOPIC ) {
				$tlist = IyoTopic::where('uid', $attrvalue)->orderBy(('created_at'))
					->skip($current)->take($num)->get(["id"]);
			} else if ( $attrname == IyoTopic::TYPEUSERTIMELINE) {
				$tlist = [];
				//$tlist = IyoTopic::whereIn('uid', $uslist)->orderBy(('created_at'))
			//		->skip($current)->take($num)->get(["id"]);
			} else if ( $attrname == IyoTopic::TYPEHOTTOPIC ) {
				$tlist = [];
			} else if ( $attrname == IyoTopic::TYPECOMMENTLIST ) {
				$stop = $current + $num - 1;
				if( $stop > $length - 1 ) {
					$stop = $length - 1;
				}
				$tlist = $redis->zrange($name, $current, $stop);
			}
		} else {
			$stop = $current + $num - 1;
			if( $stop > $length - 1 ) {
				$stop = $length - 1;
			}
			$tlist = $redis->zrange($name, $current, $stop);
		}

		return $tlist;
	}

	public static function reloadCache($id) {
		IyoTopic::cleanCache($id);
		IyoTopic::loadDataInToCache($id);
	}

	public static function loadDataInToCache($id) {
		$redis = MyRedis::connection("default");
		$dbtopic = IyoTopic::find($id);
		if( is_null($dbtopic) ) return;
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_ID, $dbtopic["id"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_TITLE, $dbtopic["title"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_FROM, $dbtopic["from"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_IMAGE, $dbtopic["image"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_CONTENT, $dbtopic["body"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_UID, $dbtopic["uid"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFREPLY, $dbtopic["reply_count"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFVIEW, $dbtopic["view_count"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFLIKE, $dbtopic["like_count"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_ABSTRACT, $dbtopic["abstract"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_CREATEDAT, $dbtopic["created_at"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFFORWARD, $dbtopic["forward_count"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_ALLOWEDCOMMENT, $dbtopic["allowed_comment"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_DELETEDTIMER, $dbtopic["deleted_timer"]);
		$redis->set(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_PID, $dbtopic["pid"]);
	}

	public static function cleanCache($id) {
		$redis = MyRedis::connection("default");
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_ID);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_TITLE);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_FROM);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_IMAGE);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_CONTENT);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_UID);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFREPLY);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFVIEW);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFLIKE);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_ABSTRACT);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_CREATEDAT);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFFORWARD);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_ALLOWEDCOMMENT);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_DELETEDTIMER);
		$redis->del(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_PID);
	}

	public static function checkIfExists($tid) 
	{
		if( IyoTopic::getValue($tid, IyoTopic::ATTR_ID) == "" )
			return false;
		return true;
	}

	public static function queryById($id)
	{
		$result = [];
		$result["tid"] = $id;

		if( !IyoTopic::checkIfExists($result["tid"]) ) {
			return null;
		}

		$result[IyoTopic::ATTR_TITLE] = IyoTopic::getValue($id, IyoTopic::ATTR_TITLE);
		$result[IyoTopic::ATTR_FROM] = IyoTopic::getValue($id, IyoTopic::ATTR_FROM);
		$result[IyoTopic::ATTR_IMAGE] = IyoTopic::getValue($id, IyoTopic::ATTR_IMAGE);
		//$result[IyoTopic::ATTR_CONTENT] = IyoTopic::getValue($id, IyoTopic::ATTR_CONTENT);
		$result[IyoTopic::ATTR_UID] = IyoTopic::getValue($id, IyoTopic::ATTR_UID);
		$result[IyoTopic::ATTR_NUMOFREPLY] = IyoTopic::getValue($id, IyoTopic::ATTR_NUMOFREPLY);
		$result[IyoTopic::ATTR_NUMOFVIEW] = IyoTopic::getValue($id, IyoTopic::ATTR_NUMOFVIEW);
		$result[IyoTopic::ATTR_ABSTRACT] = IyoTopic::getValue($id, IyoTopic::ATTR_ABSTRACT);
		$result[IyoTopic::ATTR_CREATEDAT] = IyoTopic::converDateTime(IyoTopic::getValue($id, IyoTopic::ATTR_CREATEDAT));
		$result[IyoTopic::ATTR_NUMOFLIKE] = IyoTopic::getValue($id, IyoTopic::ATTR_NUMOFLIKE);
		$result[IyoTopic::ATTR_NUMOFFORWARD] = IyoTopic::getValue($id, IyoTopic::ATTR_NUMOFFORWARD);
		$result[IyoTopic::ATTR_ALLOWEDCOMMENT] = IyoTopic::getValue($id, IyoTopic::ATTR_ALLOWEDCOMMENT);
		$result[IyoTopic::ATTR_DELETEDTIMER] = IyoTopic::getValue($id, IyoTopic::ATTR_DELETEDTIMER);
		$result[IyoTopic::ATTR_PID] = IyoTopic::getValue($id, IyoTopic::ATTR_PID);

		return $result;
	}

	public static function queryFullById($id)
	{
		$result = [];
		$result["tid"] = $id;

		if( !IyoTopic::checkIfExists($id) ) {
			return null;
		}

		$result[IyoTopic::ATTR_TITLE] = IyoTopic::getValue($id, IyoTopic::ATTR_TITLE);
		$result[IyoTopic::ATTR_FROM] = IyoTopic::getValue($id, IyoTopic::ATTR_FROM);
		$result[IyoTopic::ATTR_IMAGE] = IyoTopic::getValue($id, IyoTopic::ATTR_IMAGE);
		$result[IyoTopic::ATTR_CONTENT] = IyoTopic::getValue($id, IyoTopic::ATTR_CONTENT);
		$result[IyoTopic::ATTR_UID] = IyoTopic::getValue($id, IyoTopic::ATTR_UID);
		$result[IyoTopic::ATTR_NUMOFREPLY] = IyoTopic::getValue($id, IyoTopic::ATTR_NUMOFREPLY);
		$result[IyoTopic::ATTR_NUMOFVIEW] = IyoTopic::getValue($id, IyoTopic::ATTR_NUMOFVIEW);
		$result[IyoTopic::ATTR_ABSTRACT] = IyoTopic::getValue($id, IyoTopic::ATTR_ABSTRACT);
		$result[IyoTopic::ATTR_CREATEDAT] = IyoTopic::converDateTime(IyoTopic::getValue($id, IyoTopic::ATTR_CREATEDAT));
		$result[IyoTopic::ATTR_NUMOFLIKE] = IyoTopic::getValue($id, IyoTopic::ATTR_NUMOFLIKE);
		$result[IyoTopic::ATTR_NUMOFFORWARD] = IyoTopic::getValue($id, IyoTopic::ATTR_NUMOFFORWARD);
		$result[IyoTopic::ATTR_ALLOWEDCOMMENT] = IyoTopic::getValue($id, IyoTopic::ATTR_ALLOWEDCOMMENT);
		$result[IyoTopic::ATTR_DELETEDTIMER] = IyoTopic::getValue($id, IyoTopic::ATTR_DELETEDTIMER);
		$result[IyoTopic::ATTR_PID] = IyoTopic::getValue($id, IyoTopic::ATTR_PID);

		return $result;
	}


	public static function queryCommentIds($tid, $num=0, $current=0)
	{
		$key = sprintf(IyoTopic::COMMENTLIST, $tid);
		$tlist = IyoTopic::getArrayValue(0, IyoTopic::TYPECOMMENTLIST, $tid, $key, $num, $current);
		return $tlist;
	}

	public static function delCommentFromCacheList($tid, $cid) {
		$key = sprintf(IyoTopic::COMMENTLIST, $tid);
		IyoTopic::rmvArrayValue($key, $cid);
	}

	public static function addCommentFromCacheList($tid, $cid) {
		$key = sprintf(IyoTopic::COMMENTLIST, $tid);
		IyoTopic::addArrayValue($key, $cid);
	}

	public static function cleanCommentCache($tid) {
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoTopic::COMMENTLIST, $tid);
		if( $redis->exists($key) ) {
			$redis->del($key);
		}
	}

	public static function queryTopicIdsByTime($uid, $uslist, $num=0, $current=0)
	{
		$key = sprintf(IyoTopic::USERTIMELINE, $uid);
		$tlist = [];

		foreach( $uslist as $uid ) {
			$tlist[] = IyoTopic::queryTopicIdsByUser($uid);
		}

		$tlist = IyoTopic::getArrayValue($uid, IyoTopic::TYPEUSERTIMELINE, $uslist, $key, $num, $current);
		return $tlist;
	}

	public static function queryTopicIdsByUser($uid, $num=0, $current=0)
	{
		$key = sprintf(IyoTopic::USERTOPIC, $uid);
		$tlist = IyoTopic::getArrayValue($uid, IyoTopic::TYPEUSERTOPIC, $uid, $key, $num, $current);
		return $tlist;
	}

	public static function queryHotTopicIds($num=0, $current=0)
	{
		$tids = IyoTopic::getArrayValue(0, IyoTopic::TYPEHOTTOPIC, 0, IyoTopic::HOTTOPIC, $num, $current);
		return $tids;
	}

	public static function incrValue($key, $id, $field) {
		DB::table('iyo_topics')->where('id', $id)->increment($field);
		$redis = MyRedis::connection("default");
		if( $redis->exists($key) ) {
			$redis->incr($key);
		}
	}

	public static function decrValue($key, $id, $field) {
		DB::table('iyo_topics')->where('id', $id)->decrement($field);
		$redis = MyRedis::connection("default");
		if( $redis->exists($key) ) {
			$redis->decr($key);
		}
	}

	public static function incrNumOfView($id) {
		IyoTopic::incrValue(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFVIEW, $id, "view_count");
	}

	public static function incrNumOfForward($id) {
		IyoTopic::incrValue(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFFORWARD, $id, "forward_count");
	}

	public static function decrNumOfForward($id) {
		IyoTopic::decrValue(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFFORWARD, $id, "forward_count");
	}

	public static function incrNumOfLike($id) {
		IyoTopic::incrValue(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFLIKE, $id, "like_count");
	}

	public static function decrNumOfLike($id) {
		IyoTopic::decrValue(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFLIKE, $id, "like_count");
	}

	public static function incrNumOfReply($id) {
		IyoTopic::incrValue(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFREPLY, $id, "reply_count");
	}

	public static function decrNumOfReply($id) {
		IyoTopic::decrValue(IyoTopic::PREFIX.":$id:".IyoTopic::ATTR_NUMOFREPLY, $id, "reply_count");
	}
}
