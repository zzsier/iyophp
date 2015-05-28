<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;

class IyoComment extends Model {

	const PREFIX="comment";
	const ATTR_CONTENT="content";
	const ATTR_CREATEDAT="created_at";
	const ATTR_USER="user";
	const ATTR_UID="uid";
	const ATTR_TID="tid";
	const TYPELEXPIRED=60000;

	public function asDateTime($value)
	{
		return date("Y年m月d日", strtotime($value));
	}

	public static function getValue($id, $attr) {
		$redis = MyRedis::connection("default");
		if(!$redis->exists(IyoComment::PREFIX.":$id:$attr")) {
			IyoComment::loadDataInToCache($id);
		}
		if($redis->exists(IyoComment::PREFIX.":$id:$attr")) {
			return $redis->get(IyoComment::PREFIX.":$id:$attr");
		} else {
			return "";
		}
	}

	public static function loadDataInToCache($id) {
		$redis = MyRedis::connection("default");
		$comment = IyoComment::findOrFail($id);
		$redis->set(IyoComment::PREFIX.":$id:".IyoComment::ATTR_CONTENT, $comment["body"]);
		$redis->set(IyoComment::PREFIX.":$id:".IyoComment::ATTR_UID, $comment["uid"]);
		$redis->set(IyoComment::PREFIX.":$id:".IyoComment::ATTR_TID, $comment["tid"]);
		$redis->set(IyoComment::PREFIX.":$id:".IyoComment::ATTR_CREATEDAT, $comment["created_at"]);
	}

	public static function cleanCache($id) {
		$redis = MyRedis::connection("default");
		$redis->del(IyoComment::PREFIX.":$id:".IyoComment::ATTR_CONTENT);
		$redis->del(IyoComment::PREFIX.":$id:".IyoComment::ATTR_UID);
		$redis->del(IyoComment::PREFIX.":$id:".IyoComment::ATTR_TID);
		$redis->del(IyoComment::PREFIX.":$id:".IyoComment::ATTR_CREATEDAT);
	}


	public static function queryCommentById($cid)
	{
		$comment["cid"] = $cid;
		$comment[IyoComment::ATTR_CONTENT] = IyoComment::getValue($cid, IyoComment::ATTR_CONTENT);
		$comment[IyoComment::ATTR_UID] = IyoComment::getValue($cid, IyoComment::ATTR_UID);
		$comment[IyoComment::ATTR_TID] = IyoComment::getValue($cid, IyoComment::ATTR_TID);
		$comment[IyoComment::ATTR_CREATEDAT] = IyoComment::getValue($cid, IyoComment::ATTR_CREATEDAT);
		return $comment;
	}

	public static function findTidByCid($cid) {
		$tid = IyoComment::getValue($cid, IyoComment::ATTR_TID);
		return $tid;
	}

	public static function delComment($cid)
	{
		$comment = IyoComment::find($cid);
		$tid = $comment->tid;
		$cid = $comment->id;
		$comment->delete();
		IyoComment::cleanCache($cid);
	}

	public static function addComment($uid, $tid, $body)
	{
		$comment = new IyoComment();
		$comment->uid = $uid;
		$comment->tid = $tid;
		$comment->body = $body;
		$comment->save();
	}


}
