<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Model\IyoGame;
use Illuminate\Http\Request;
use App\Model\IyoServer;
use App\Model\IyoPlayer;
use Redirect;
use App\WowApi\Client;
use App\WowApi\Request\Curl;
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

		$request = new Curl();
		$api = new Client();
		$api->setRequest($request);

		Log::info("server name is ".IyoServer::$servers[$gid-1][$sid-1]["name"]." player name is ".$playername);

		try {
			$character = $api->getCharacterApi()->getCharacter(IyoServer::$servers[$gid-1][$sid-1]["name"], $playername,
			array('guild', 'stats', 'items', 'titles', 'professions', 'talents'));
			Log::info( $character['name'] );
			$player = IyoPlayer::saveOrUpdate($playername, $gid, $sid, $uid);
		} catch (NotFoundException $e) {
			$result = array('code' => 701,'desc' => __LINE__,
				'message' => '游戏角色不存在' );
			Log::info( 'That character does not exist!' );
		} catch(\Exception $e) {
			$result = array('code' => 701,'desc' => __LINE__,
				'message' => '游戏角色不存在' );
			Log::info( 'There was an error fetching the character from the armory' );
		}

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
}
