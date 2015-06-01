<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Model\IyoTopic;
use View;
use Illuminate\Http\Request;
use App\Model\IyoRelation;
use App\Model\IyoUser;
use App\Model\IyoLike;
use Redirect;

class TopicsController extends Controller {

	//public function __construct()
	//{
	//	parent::__construct();

	//	//$this->beforeFilter('auth', ['except' => ['index', 'show']]);
	//	//$this->topic = $topic;
	//}

	public function showlist()
	{
		$topics = IyoTopic::all();
		
		foreach ($topics as $topic) {
			$user = IyoUser::queryById($topic->uid);
			$topic->username = $user["username"];
		}
		//$filter = $this->topic->present()->getTopicFilter();
		//$topics = $this->topic->getTopicsWithFilter($filter);
		//$nodes  = Node::allLevelUp();
		//$links  = Link::remember(1440)->get();

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
//		$replies = $topic->getRepliesWithLimit(80);
//		$node = $topic->node;
//		$nodeTopics = $topic->getSameNodeTopics();
//
//		$topic->increment('view_count', 1);

//		return View::make('topics.show', compact('topic', 'replies', 'nodeTopics', 'node'));
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
		$body = json_encode($request->json("body", ""));

		IyoTopic::saveOrUpdate($title, $abstract, $from, $image, $uid, $body, $tid);

		return $result;
	}

	public function createMoment(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '创建朋友圈成功');

		$tid = $request->json("id", 0);
		$title = $request->json("title", "");
		$allowedComment = $request->json("allowedComment", 1);
		$deletedTimer = $request->json("deletedTimer");
		$uid = $request["id"];

		$topic = IyoTopic::saveOrUpdate($title, "", "", "", $uid, "", $tid, 0, $allowedComment, $deletedTimer);

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


	public function forward(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '转发成功');

		$tid = $request->json("tid", 0);
		$title = $request->json("title", "");
		$uid = $request["id"];
		$allowedComment = $request->json("allowedComment", 1);
		$deletedTimer = $request->json("deletedTimer");

		IyoTopic::saveOrUpdate($title, "", "", "", $uid, "", 0, $tid, $allowedComment, $deletedTimer);
		IyoTopic::incrNumOfForward($tid);

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

		$topic = $this->queryTopic($id, $tid);

		if( is_null($topic) ) {
			$topic = [];
			$topic["pid"] = 0;
		}

		$pid = $topic["pid"];

		if( $pid != 0 ) {
			$topic["parent"] = $this->queryTopic($id, $pid);
		} else {
			$topic["parent"] = [];
		}

		$result["result"] = $topic;
		return $result;
	}

	public function queryTopic($id, $tid)
	{
		IyoTopic::incrNumOfView($tid);
		$topic = IyoTopic::queryFullById($tid);

		if( is_null($topic) ) {
			return null;
		}

		if( strtotime($topic["deletedTimer"]) > strtotime(time()) ) {
			IyoTopic::destroy($tid);
			$topic = [];
			return $topic;
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
			$topic = IyoTopic::queryById($tid);
			if( is_null($topic) ) {
				continue;
			}

			if( strtotime($topic["deletedTimer"]) > strtotime(time()) ) {
				IyoTopic::destroy($tid);
				continue;
			}
			$user = IyoUser::queryById($topic["uid"]);
			if( IyoLike::checkIfLike($uid, $tid) ) {
				$topic["like"] = true;
			} else {
				$topic["like"] = false;
			}
			$topic["user"] = $user;
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

		$us_ids = IyoRelation::queryUnionAndStarByFans($request["id"]);
		$topic_ids = IyoTopic::queryTopicIdsByTime($request["id"], $us_ids, $num, $current);

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

		$sf_ids = IyoRelation::queryStarAndFollowByFans($request["id"]);
		$topic_ids = IyoTopic::queryTopicIdsByTime($request["id"], $sf_ids, $num, $current);

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

		$topic_ids = IyoTopic::queryHotTopicIds($num, $current);
		$result["result"] = $this->queryTopicsByIds($topic_ids, $id);
		return $result;
	}

	public function destroy(Request $request) {
		IyoTopic::destroy($request["id"]);
		return Redirect::to('backend/topic/list');
	}
	/**
	 * ----------------------------------------
	 * CreatorListener Delegate
	 * ----------------------------------------
	 */

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
