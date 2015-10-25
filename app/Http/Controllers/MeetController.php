<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Model\IyoRelation;
use App\Model\IyoUser;
use App\Model\IyoTopic;
use App\Model\IyoBlack;
use App\Model\MeetRelation;
use MyRedis;

use Illuminate\Http\Request;

class MeetController extends Controller {

	public function meet(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '遇见成功');
		
		$id = $request["id"];
		$fid = $request->json("fid",0);

		MeetRelation::meet($id, $fid);

		if( MeetRelation::checkIfMeet($fid, $id) ) {
			IyoRelation::add($id, $fid);
			IyoRelation::add($fid, $id);
		}

		return $result;
	}

	public function drop(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '取消遇见成功');
	
		$id = $request["id"];
		$fid = $request->json("fid",0);
		MeetRelation::drop($id, $fid);

		return $result;
	}

	public function queryRandMeetList(Request $request)
	{
		$response = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取成功');

		$id = $request["id"];
		$num = $request->json("num",0);
		$type = $request->json("type",2);
		$current = $request->json("current",0);

		$meetlist = MeetRelation::queryMeetList($id);
		$droplist = MeetRelation::queryDropList($id);

		if( $type == "2" ) {
			$alllist = IyoUser::queryAllUserIDs();
		} else if ( $type == "1" ) {
			$alllist = IyoUser::queryMaleIDs();
		} else {
			$alllist = IyoUser::queryFemaleIDs();
		}

		$randlist = array_diff($alllist, $meetlist, $droplist);
		$userlist = array_rand($randlist, 10);

		$users = [];

		foreach( $userlist as $id ) {
			$user = IyoUser::queryById($fid);

			if( IyoRelation::checkIfFollow($request["id"], $fid) ) {
				$user["follow"] = true;
			} else {
				$user["follow"] = false;
			}

			if( MeetRelation::checkIfMeet($fid, $request["id"]) ) {
				$user["meet"] = true;
			} else {
				$user["meet"] = false;
			}

			$users[] = $user;
		}

		$response["result"] = $users;
		return $response;
	}
}
