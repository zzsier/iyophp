<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Model\IyoGame;
use Illuminate\Http\Request;
use App\Model\IyoServer;
use App\Model\IyoPlayer;
use Redirect;
use Log;

class GameController extends Controller {

	public function saveOrUpdate(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => trans('successmsg.FollowSuccess'));

		$tid = $request->json("id", 0);
		$title = $request->json("title", "");
		$abstract = $request->json("abstract", "");
		$from = $request->json("from", "");
		$image = $request->json("headimage", "");
		$uid = $request->json("uid", 0);
		$body = json_encode($request->json("body", ""));
		$redis = MyRedis::connection("default");

		$topic = IyoTopic::saveOrUpdate($title, $abstract, $from, $image, $uid, $body, $tid);
		$this->route($uid, $topic["tid"]);

		return $result;
	}

	public function route($uid, $tid)
	{
		$ids = [];
		$ids = IyoRelation::queryFollowerList($uid);
		$ids[] = $uid;

		$user = IyoUser::queryById($uid);
		if( $user["type"] == "2" ) {
			IyoTopic::routeUSList($ids,$tid);
		} else if( $user["type"] == "0" ) {
			IyoTopic::routeSFList($ids,$tid);
		} else {
			IyoTopic::routeUSList($ids,$tid);
			IyoTopic::routeSFList($ids,$tid);
		}
	}

	public function createMoment(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '创建朋友圈成功');

		$title = $request->json("title", "");
		$allowedComment = $request->json("allowedComment", 1);
		$deletedTimer = $request->json("deletedTimer");
		$content = json_encode($request->json("content"));

		$uid = $request["id"];

		$topic = IyoTopic::saveOrUpdate($title, "", "", "", $uid, $content, 0, 0, $allowedComment, $deletedTimer);
		$this->route($uid, $topic["tid"]);

		$result["result"] = $topic;

		return $result;
	}

	public function deleteTopic(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '删除朋友圈成功');

		$tid = $request->json("tid", 0);
		$uid = $request["id"];

		$topic = IyoTopic::destroy($tid);
		return $result;
	}

	public function cleanCache(Request $request) {
		$tid = $request["tid"];
		IyoUser::cleanCache($tid);
	}

	public function forward(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '转发成功');

		$tid = $request->json("tid", 0);
		$title = $request->json("title", "");
		$uid = $request["id"];
		$allowedComment = $request->json("allowedComment", 1);
		$deletedTimer = $request->json("deletedTimer");

		$topic = IyoTopic::saveOrUpdate($title, "", "", "", $uid, "", 0, $tid, $allowedComment, $deletedTimer);
		IyoTopic::incrNumOfForward($tid);
		$this->route($uid, $topic["tid"]);

		return $result;
	}

	public function like(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '点赞成功');
		
		$uid = $request["id"];
		$tid = $request->json("tid",0);

		if( IyoLike::checkIfLike($uid, $tid) ) {
			$result = array('code' => trans('code.LikeAlreadyExistsError'),'desc' => __LINE__,
				'message' => '用户已点赞');
			return $result;
		}

		IyoLike::like($uid, $tid);
		IyoTopic::incrNumOfLike($tid);

		return $result;
	}

	public function queryLikeList(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取点赞列表成功');
		$uid = $request["id"];
		$tid = $request->json("tid",0);
		$num = $request->json("num", 0);
		$current = $request->json("current", 0);

		$fids = IyoLike::queryLikeList($uid, $tid, $num, $current);
		$userlist = [];

		foreach( $fids as $fid ) {
			$userlist[] = IyoUser::queryById($fid);
		}

		$result["result"] = $userlist;
		return $result;
	}

	public function incrForward(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '增加转发成功');
		
		$uid = $request["id"];
		$tid = $request->json("tid",0);

		if( $tid == 0 ) {
			$result = array('code' => trans('code.InvalidParameter'),'desc' => __LINE__,
				'message' => '参数不完整');
			return $result;
		}

		IyoTopic::incrNumOfForward($tid);

		return $result;
	}

	public function unlike(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '取消点赞成功');

		$uid = $request["id"];
		$tid = $request->json("tid",0);

		if( ! IyoLike::checkIfLike($uid, $tid) ) {
			$result = array('code' => trans('code.LikeNotExistsError'),'desc' => __LINE__,
				'message' => '用户尚未点赞');
			return $result;
		}

		IyoLike::unlike($uid, $tid);
		IyoTopic::decrNumOfLike($tid);

		return $result;
	}

	public function query(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取成功');

		$tid = $request->json("tid",0);
		$id = $request["id"];
		IyoTopic::incrNumOfView($tid);

		$topic = $this->queryTopic($id, $tid);

		if( is_null($topic) ) {
			$topic = [];
			$topic["pid"] = 0;
		}

		$pid = $topic["pid"];
	
		$parent = null;
		if( $pid != 0 ) {
			$parent = $this->queryTopic($id, $pid);
		}

		if( !is_null($parent) ) {
			$topic["parent"] = $parent;
		}

		$result["result"] = $topic;
		return $result;
	}

	public function queryTopic($id, $tid)
	{
		$topic = IyoTopic::queryById($tid);

		if( is_null($topic) ) {
			return null;
		}

		if( $topic["deletedTimer"] != "" && strtotime($topic["deletedTimer"]) < time() ) {
			IyoTopic::destroy($tid, $id);
			return null;
		}

		$user = IyoUser::queryById($topic["uid"]);

		if( IyoLike::checkIfLike($id, $tid) ) {
			$topic["like"] = true;
		} else {
			$topic["like"] = false;
		}

		$topic["user"] = $user;
		return $topic;
	}

	public function queryTopicsByIds($ids, $uid) {
		$topics = [];
		foreach( $ids as $tid ) {
			$topic = $this->queryTopic($uid, $tid);
			if( is_null($topic) ) {
				continue;
			}

			$pid = $topic["pid"];
	
			$parent = null;
			if( $pid != 0 ) {
				$parent = $this->queryTopic($uid, $pid);
			}

			if( !is_null($parent) ) {
				$topic["parent"] = $parent;
			}

			$topics[] = $topic;
		}
		return $topics;
	}

	public function queryUSTopicsByTime(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取最新文章成功');

		$num = $request->json("num", 0);
		$current = $request->json("current", 0);
		$id = $request["id"];

		$us_ids = [];
		if( IyoTopic::isNullTimeline($request["id"], "USTIMELINE") ) {
			$us_ids = IyoRelation::queryFollowingListByType($request["id"],"US");
			$topic_ids = IyoTopic::queryTopicIdsByTime($request["id"], $us_ids, "USTIMELINE", $num, $current);
		} else {
			$topic_ids = IyoTopic::queryTopicIdsByTime($request["id"], $us_ids, "USTIMELINE", $num, $current);
		}

		$result["result"] = $this->queryTopicsByIds($topic_ids, $id);
		return $result;
	}

	public function querySFTopicsByTime(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取最新文章成功');

		$num = $request->json("num", 0);
		$current = $request->json("current", 0);
		$id = $request["id"];

		$sf_ids = [];
		if( IyoTopic::isNullTimeline($request["id"], "SFTIMELINE") ) {
			$sf_ids = IyoRelation::queryFollowingListByType($request["id"],"SF");
			$topic_ids = IyoTopic::queryTopicIdsByTime($request["id"], $sf_ids, "SFTIMELINE", $num, $current);
		} else {
			$topic_ids = IyoTopic::queryTopicIdsByTime($request["id"], $sf_ids, "SFTIMELINE", $num, $current);
		}

		$result["result"] = $this->queryTopicsByIds($topic_ids, $id);
		return $result;
	}

	public function queryHistoryTopics(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取用户文章成功');

		$num = $request->json("num", 0);
		$current = $request->json("current", 0);
		$id = $request["id"];

		$topic_ids = IyoTopic::queryTopicIdsByUser($id, $num, $current);
		$result["result"] = $this->queryTopicsByIds($topic_ids, $id);
		return $result;
	}

	public function queryTopicsByUser(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取用户文章成功');

		$num = $request->json("num", 0);
		$current = $request->json("current", 0);
		$id = $request["id"];

		$topic_ids = IyoTopic::queryTopicIdsByUser($request->json("fid",0), $num, $current);
		$result["result"] = $this->queryTopicsByIds($topic_ids, $id);
		return $result;
	}

	public function queryHotTopics(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取热门文章成功');

		$id = $request["id"];
		$num = $request->json("num", 0);
		$current = $request->json("current", 0);

		$union_ids = IyoUser::queryListByType("2");
		$topic_ids = IyoTopic::queryHotTopicIds($union_ids, $num, $current);
		$result["result"] = $this->queryTopicsByIds($topic_ids, $id);
		return $result;
	}
}
