<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;

class IyoComment extends Model {

	const COMMENT="comment:%s";
	const COMMENTLIST="topic:%s:comment";

	public static $attrnames = array(
		array("cache"=>"content", "db"=> "body", "return"=>"content"),
		array("cache"=>"created_at", "db"=> "created_at", "return"=>"created_at"),
		array("cache"=>"cid", "db"=> "id", "return"=>"cid"),
		array("cache"=>"uid", "db"=> "uid", "return"=>"uid"),
		array("cache"=>"tid", "db"=> "tid", "return"=>"tid"),
	);

	public static function reloadCache($id) {
		IyoComment::cleanCache($id);
		IyoComment::loadDataInToCache($id);
	}

	public static function loadDataInToCache($id) {
		//Log::info("IyoComment loadDataInToCache enter");
		$redis = MyRedis::connection("default");
		$dbcomment = IyoComment::find($id);
		if( is_null($dbcomment) ) return;
		$key = sprintf(IyoComment::COMMENT, $id);
		foreach( self::$attrnames as $attrname ) {
			//Log::info( "attribute is ".$attrname["cache"]." ".$attrname["db"]." ".$dbcomment[$attrname["db"]] );
			$redis->hmset($key, $attrname["cache"], $dbcomment[$attrname["db"]]);
		}
	}

	public static function cleanCache($id) {
		//Log::info("IyoComment cleanCache enter");
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoComment::COMMENT, $id);
		$redis->del($key);
	}

	public static function queryById($id)
	{
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoComment::COMMENT, $id);

		if( !$redis->exists($key) ) {
			IyoComment::reloadCache($id);
		}

		if( !$redis->exists($key) ) {
			return null;
		}

		$comment = [];
		foreach( self::$attrnames as $attrname ) {
			$comment[$attrname["return"]] = $redis->hget($key, $attrname["cache"]);
			if( $attrname["cache"] == "created_at" ) {
				$comment["created_at"] = date("Y年m月d日", strtotime($comment["created_at"]));
			}
			//Log::info( "attribute is ".$attrname["return"]." ".$attrname["cache"]." ".$comment[$attrname["return"]]);
		}
		return $comment;
	}

	public static function delComment($cid)
	{
		$redis = MyRedis::connection("default");

		$comment = IyoComment::find($cid);
		$tid = $comment->tid;
		$cid = $comment->id;
		$comment->delete();
		IyoComment::cleanCache($cid);

		$key = sprintf(IyoComment::COMMENTLIST, $tid);
		if($redis->exists($key)) {
			$redis->zrem($key, $cid);
		}
	}

	public static function addComment($uid, $tid, $body)
	{
		$redis = MyRedis::connection("default");
		$comment = new IyoComment();
		$comment->uid = $uid;
		$comment->tid = $tid;
		$comment->body = $body;
		$comment->save();
		IyoComment::reloadCache($comment->id);

		$key = sprintf(IyoComment::COMMENTLIST, $tid);
		if(!$redis->exists($key)) {
			IyoComment::queryCommentIds($tid);
		}
		$redis->zadd($key,strtotime($comment["created_at"]),$comment['id']);
	}

	public static function queryCommentIds($tid, $num=0, $current=0) {
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoComment::COMMENTLIST, $tid);

		if(!$redis->exists($key)) {
			$list = IyoComment::where('tid', $tid)->orderby('created_at','asc')->get(["id", "created_at"]);
			foreach( $list as $cid ) {
				$redis->zadd($key,strtotime($cid["created_at"]),$cid['id']);
			}
		}

		$tlist = [];
		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key, $current, $current+$num-1);
		}

		return $tlist;
	}
}
