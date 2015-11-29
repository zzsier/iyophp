<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Model\IyoGame;
use Illuminate\Http\Request;
use App\Model\IyoServer;
use App\Model\IyoPlayer;
use App\Model\IyoInterest;
use Redirect;
use App\WowApi\Client;
use App\WowApi\Request\Curl;
use Log;

class InterestController extends Controller {

	public function saveInterest(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '存储兴趣成功' );

		$iid = $request->json("iid", 0);
		$uid = $request["id"];

		$iids = IyoInterest::queryInterestIdsByUser($uid);
		if( in_array($iid, $iids) ) {
			$result = array('code' => 301,'desc' => __LINE__,
				'message' => '兴趣已存在' );
			return $result;
		}

		$interest = IyoInterest::saveOrUpdate($iid, $uid);
		return $result;
	}

	public function saveInterests(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '存储兴趣成功' );

		$iids = $request->json("iids", []);
		$uid = $request["id"];

		foreach( $iids as $iid ) {
			$exist_iids = IyoInterest::queryInterestIdsByUser($uid);
			if( in_array($iid, $exist_iids) ) {
				//$result = array('code' => 301,'desc' => __LINE__,
				//	'message' => '兴趣已存在' );
				//return $result;
				continue;
			}

			$interest = IyoInterest::saveOrUpdate($iid, $uid);
		}

		return $result;
	}

	public function changeInterests(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '存储兴趣成功' );

		$iids = $request->json("iids", []);
		$uid = $request["id"];

		$unique_iids = array_unique($iids);

		IyoInterest::cleanAllInterests($uid);
		foreach( $unique_iids as $iid ) {
			$interest = IyoInterest::saveOrUpdate($iid, $uid);
		}

		return $result;
	}



	public function getFullInterest() {
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取所有兴趣成功' );

		$response = [];
		foreach( IyoInterest::$interests as $interest ) {
			if( $interest["pid"] == "0" ) {
				$response[] = $interest;
				continue;
			}
			for( $i=0; $i<count($response); $i++) {
				if( $interest["pid"] == $response[$i]["iid"] ) {
					$response[$i]["sub"][] = $interest;
				}
			}
		}

		$result["result"] = $response;
		return $result;
	}

	public function deleteInterest(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '删除兴趣成功');

		$iid = $request->json("iid", 0);
		$uid = $request["id"];

		$iids = IyoInterest::queryInterestIdsByUser($uid);
		if( !in_array($iid, $iids) ) {
			$result = array('code' => 301,'desc' => __LINE__,
				'message' => '兴趣不存在' );
			return $result;
		}

		$player = IyoInterest::deleteInterest($uid, $iid);
		return $result;
	}

	public function deleteInterests(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '删除兴趣成功');

		$iids = $request->json("iids", []);
		$uid = $request["id"];

		foreach( $iids as $iid ) {
			$exist_iids = IyoInterest::queryInterestIdsByUser($uid);
			if( !in_array($iid, $exist_iids) ) {
				//$result = array('code' => 301,'desc' => __LINE__,
				//	'message' => '兴趣已存在' );
				//return $result;
				continue;
			}

			IyoInterest::deleteInterest($uid, $iid);
		}

		return $result;
	}


	public function cleanCache(Request $request) {
		$tid = $request["tid"];
		IyoUser::cleanCache($tid);
	}

	public function queryInterestByIds($ids) {
		$interests = [];
		foreach( $ids as $iid ) {
			if( $iid == 0 ) {
				continue;
			}

			$interest = IyoInterest::$interests[$iid-1];
			$interests[] = $interest;
		}
		return $interests;
	}

	public function queryInterestsByUser(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取游戏角色成功');

		$num = $request->json("num", 0);
		$current = $request->json("current", 0);
		$id = $request->json("fid", 0);

		$pids = IyoInterest::queryInterestIdsByUser($id, $num, $current);
		$result["result"] = $this->queryInterestByIds($pids);

		return $result;
	}
}
