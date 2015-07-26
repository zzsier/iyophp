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

	public function savePlayer(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '游戏角色添加成功' );

		$gid = $request->json("gid", 0);
		$sid = $request->json("sid", 0);
		$uid = $request["id"];
		$playername = $request->json("name", "");

		$player = IyoPlayer::saveOrUpdate($playername, $gid, $sid, $uid);

		return $result;
	}

	public function queryGameList(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取游戏列表成功');

		$result["result"] = IyoGame::$games;
		return $result;
	}

	public function queryServerList(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取游戏服务器列表成功');

		$gid = $request->json("gid", 0);

		if( $gid != 0 ) {
			$result["result"] = IyoServer::$servers[$gid-1];
		}

		return $result;
	}


	public function deletePlayer(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '删除游戏用户成功');

		$pid = $request->json("pid", 0);
		$uid = $request["id"];

		$player = IyoPlayer::destoryPlayer($uid, $pid);
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

	public function queryPlayersByIds($ids) {
		$players = [];
		foreach( $ids as $id ) {
			$player = IyoPlayer::queryById($id);
			if( is_null($player) ) {
				continue;
			}

			$gid = $player["gid"];
			$sid = $player["sid"];

			if( $gid == 0 ) {
				continue;
			}

			if( $sid == 0 ) {
				continue;
			}

			$player["game"] = IyoGame::$games[$gid-1];
			$player["server"] = IyoServer::$servers[$gid-1][$sid-1];
	
			$players[] = $player;
		}
		return $players;
	}

	public function queryPlayersByUser(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取游戏角色成功');

		$num = $request->json("num", 0);
		$current = $request->json("current", 0);
		$id = $request->json("fid", 0);

		$pids = IyoPlayer::queryPlayerIdsByUser($id, $num, $current);
		$result["result"] = $this->queryPlayersByIds($pids);

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
