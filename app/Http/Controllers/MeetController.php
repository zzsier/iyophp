<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Model\IyoRelation;
use App\Model\IyoUser;
use App\Model\IyoTopic;
use App\Model\IyoBlack;
use App\Model\MeetRelation;
use App\Getui\IGeTui;
use MyRedis;
use Log;

use Illuminate\Http\Request;

class MeetController extends Controller {

	public function meet(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '遇见成功');

		//$igt = new IGeTui();
		//$template = IGtNotyPopLoadTemplateDemo();
		//$message = new IGtSingleMessage();
		//
		//$message->set_isOffline(true);
		//$message->set_offlineExpireTime(3600*12*1000);
		//$message->set_data($template);
		//
		//$target = new IGtTarget();
		//$target->set_appId('5QbZPVebzr8HjdZP3mVuv9');
		//$target->set_clientId('b166bdc9f71123865a486e81ed59214f');
		//
		//$rep = $igt->pushMessageToSingle($message,$target);
	
		
		$id = $request["id"];
		$fid = $request->json("fid",0);


		if( MeetRelation::checkIfMeet($id, $fid) || MeetRelation::checkIfDrop($id, $fid) ) {
			$result = array('code' => trans('code.RelationAlreadyExistsError'),'desc' => __LINE__,
				'message' => '用户操作已存在');
			return $result;
		}

		MeetRelation::meet($id, $fid);

		if( MeetRelation::checkIfMeet($fid, $id) ) {
	
			if( !IyoRelation::checkIfFollow($id, $fid) ) {
				IyoRelation::add($id, $fid);
			}
			if( !IyoRelation::checkIfFollow($fid, $id) ) {
				IyoRelation::add($fid, $id);
			}

			//$mosquitto = new \Mosquitto\Client();
			//$mosquitto->connect("localhost", 1883, 5);
			//$mosquitto->publish("iyo_id_".$id, '{"fan":"0","friend":"2","moment":"0","topic":"0"}', 1, 0);
			//$mosquitto->disconnect();

			$mosquitto = new \Mosquitto\Client();
			$mosquitto->connect("localhost", 1883, 5);
			$mosquitto->publish("iyo_id_".$fid, '{"fan":"0","friend":"2","moment":"0","topic":"0"}', 1, 0);
			$mosquitto->disconnect();

			$result = array('code' => trans('code.RelationAlreadyExistsError'),'desc' => __LINE__,
				'message' => '用户操作已存在', 'friend' => true );
		}

		IyoUser::increaseNumOfLove($fid);
		return $result;
	}

	public function drop(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '取消遇见成功');
	
		$id = $request["id"];
		$fid = $request->json("fid",0);

		if( MeetRelation::checkIfMeet($id, $fid) || MeetRelation::checkIfDrop($id, $fid) ) {
			$result = array('code' => trans('code.RelationAlreadyExistsError'),'desc' => __LINE__,
				'message' => '用户操作已存在');
			return $result;
		}

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

		$user = IyoUser::queryById($id);
		/*

		if ( $user["lovefilter"] == "1" ) {
			$alllist = IyoUser::queryMaleIDs();
		} else if ( $user["lovefilter"] == "0" ) {
			$alllist = IyoUser::queryFemaleIDs();
		} else {
			$alllist = IyoUser::queryAllUserIDs();
		}
		*/

		if ( $type == "1" ) {
			$alllist = IyoUser::queryMaleIDs();
		} else if ( $type == "0" ) {
			$alllist = IyoUser::queryFemaleIDs();
		} else {
			$alllist = IyoUser::queryAllUserIDs();
		}

		unset($alllist[array_search($id,$alllist)]);

		Log::info("all list is ".implode(',',$alllist));

		$randlist = array_diff($alllist, $meetlist, $droplist);

		Log::info("rand list is ".implode(',',$randlist));
		if( count($randlist) >= 10 ) {
			$userlist = array_rand($randlist, 10);
			$userarray = [];
			foreach( $userlist as $array_id ) {
				$userarray[] = $randlist[$array_id];
			}
			$userlist = $userarray;
		} else {
			$userlist = $randlist;
		}

		Log::info("user list is ".implode(',',$userlist));
		$users = [];

		foreach( $userlist as $fid ) {
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
