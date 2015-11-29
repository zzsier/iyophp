<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Model\IyoTopic;
use App\Model\Suggestion;
use View;
use Illuminate\Http\Request;
use App\Model\IyoRelation;
use App\Model\IyoComment;
use App\Model\IyoUser;
use App\Model\IyoLike;
use Redirect;
use Log;
use Auth;

class TopicsController extends Controller {

	public function showlist()
	{
		if (Auth::check() && Auth::user()->can("manage_topics") ) {
			$topics = IyoTopic::orderBy("created_at", "desc")->paginate(10);
		} else if ( Auth::check() ) {
			$topics = IyoTopic::where("uid", Auth::id())->orderBy("created_at", "desc")->paginate(10);
		} else {
			$topics = [];
		}

		foreach ($topics as $topic) {
			$user = IyoUser::queryById($topic->uid);
			$topic->username = $user["username"];
		}
		return View::make('backend.topics.index', compact('topics'));
	}

	public function create()
	{
		$union_ids = IyoUser::queryListByType(2);
		$unions = [];
		foreach ($union_ids as $uid) {
			$unions[] = IyoUser::queryById($uid);
		}
		return View::make('backend.topics.create_edit', compact("unions"));
	}

	public function store()
	{
		return App::make('Phphub\Creators\TopicCreator')->create($this, Input::except('_token'));
	}

	public function showdetail(Request $request)
	{
		$topic = IyoTopic::findOrFail($request["id"]);
		$topic['user'] = $topic->uid;
		$user = IyoUser::findOrFail($topic->uid);
		$topic['username'] = $user["username"];
		$body = json_decode($topic['body']);
		$topic['body'] = $body;
		return View::make('backend.topics.show', compact('topic'));
	}

	public function edit(Request $request)
	{
		$topic = IyoTopic::find($request["id"]);
		$body = json_decode($topic['body']);
		$topic['body'] = $body;

		$user = IyoUser::find($topic->uid);
		$topic['username'] = $user["username"];

		$union_ids = IyoUser::queryListByType(2);

		$unions = [];
		foreach ($union_ids as $uid) {
			$unions[] = IyoUser::queryById($uid);
		}

		return View::make('backend.topics.create_edit', compact("topic","unions"));
	}

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
		$type = $request->json("type", 0);
		$body = json_encode($request->json("body", ""));

		$topic = IyoTopic::saveOrUpdate($title, $abstract, $from, $image, $uid, $body, $type, $tid);

		if( $tid == 0 ) {
			$this->route($uid, $topic["tid"]);
		}

		return $result;
	}

	public function route($uid, $tid)
	{
		$ids = [];
		$ids = IyoRelation::queryFollowerList($uid);
		$ids[] = $uid;

		$user = IyoUser::queryById($uid);
		if( $user["type"] == "2" ) {
			IyoTopic::routeUSList($ids,$tid, $uid);
		//} else if( $user["type"] == "0" ) {
		//	IyoTopic::routeSFList($ids,$tid);
		} else {
			//IyoTopic::routeUSList($ids,$tid);
			IyoTopic::routeSFList($ids,$tid, $uid);
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

		$topic = IyoTopic::saveOrUpdate($title, "", "", "", $uid, $content, 0, 0, 0, $allowedComment, $deletedTimer);
		$this->route($uid, $topic["tid"]);

		//Add 50 exp
		$cacheuser = IyoUser::queryById($uid);
		$lastloginday = date('Y-m-d', strtotime($cacheuser["lastlogintime"]));
		Log::info("lastlogintime is ".$cacheuser["lastlogintime"]." current time is ".time()." loginday is ".$lastloginday);
		Log::info("string lastlogintime is ".strtotime($lastloginday)." current time is ".time());

		if( strtotime(time()) - strtotime($lastloginday) > 24*60*60 ) {
			$user = IyoUser::find($uid);
			$user->lastlogintime = date('Y-m-d H:i:s');
			$user->exp += 50;
			$user->save();
			IyoUser::cleanCache($uid);
		}
		//Add 50 exp finished

		$result["result"] = $topic;

		return $result;
	}

	public function createSuggestion(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '提交成功');

		$suggestion = new Suggestion();
		$suggestion->body = $request->json("content","");
		$suggestion->user_id = $request["id"];
		$suggestion->save();

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

		$topic = IyoTopic::saveOrUpdate($title, "", "", "", $uid, "", 0, 0, $tid, $allowedComment, $deletedTimer);
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

		$topic = IyoTopic::queryById($tid);
		$userid = $topic["uid"];

		$mosquitto = new \Mosquitto\Client();
		$mosquitto->connect("localhost", 1883, 5);
		$mosquitto->publish("iyo_id_".$userid, '{"fan":"0","friend":"0","moment":"0","topic":"3"}', 1, 0);
		$mosquitto->disconnect();

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
			$result["result"] = $topic;
			return $result;
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

		$comments = [];
		$commentIds = IyoComment::queryCommentIds($tid, 10, 0);
		foreach( $commentIds as $cid ) {
			$comment = IyoComment::queryById($cid);
			$user = IyoUser::queryById($comment["uid"]);
			$comment["user"] = $user;
			$comments[] = $comment;
		}
		$topic["comments"] = $comments;

		$fids = IyoLike::queryLikeList($id, $tid, 10, 0);
		$likelist = [];
		foreach( $fids as $fid ) {
			$likelist[] = IyoUser::queryById($fid);
		}
		$topic["likelist"] = $likelist;

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

	public function queryLatestComments(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取最新文章成功');

		$uid = $request["id"];
		$tids = IyoComment::queryCommentByTopicUser($uid);

		$result["result"] = $this->queryTopicsByIds($tids, $uid);
		return $result;
	}


	public function queryUSTopicsByTime(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取最新文章成功');

		if( $request["num"] != "" && $request["num"] != 0 ) {
			$num = $request["num"];
		} else {
			$num = $request->json("num", 0);
		}

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

		if( $request["num"] != "" && $request["num"] != 0 ) {
			$num = $request["num"];
		} else {
			$num = $request->json("num", 0);
		}

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

	public function destroy(Request $request) {
		IyoTopic::destroy($request["id"]);
		return Redirect::to('backend/topic/list');
	}

	public function creatorFailed($errors)
	{
		return Redirect::to('/');
	}

	public function creatorSucceed($topic)
	{
		Flash::success(lang('Operation succeeded.'));

		return Redirect::route('topics.show', array($topic->id));
	}
}
