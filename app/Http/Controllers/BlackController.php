<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Model\IyoRelation;
use App\Model\IyoUser;
use App\Model\IyoTopic;
use App\Model\IyoBlack;
use App\Model\IyoReport;
use MyRedis;
use Auth;
use View;

use Illuminate\Http\Request;

class BlackController extends Controller {

	public function reportlist()
	{
		if (Auth::check() && Auth::user()->can("manage_topics") ) {
			$reports = IyoReport::orderBy("created_at", "desc")->paginate(10);
		} else {
			$reports = [];
		}

		return View::make('backend.reports.index', compact('reports'));
	}


	public function add(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' =>'拉黑成功');
		
		$id = $request["id"];
		$fid = $request->json("fid",0);

		if( IyoBlack::checkIfBlack($id, $fid) || IyoBlack::checkIfBlock($id, $fid) ) {
			$result = array('code' => trans('code.RelationAlreadyExistsError'),'desc' => __LINE__,
				'message' => '用户已拉黑');
			return $result;
		}

		$user = IyoUser::queryById($fid);

		IyoBlack::add($id, $fid);
		if( IyoRelation::checkIfFollow($id, $fid) ) {
			IyoRelation::del($id, $fid);
		}
		if( IyoRelation::checkIfFollow($fid, $id) ) {
			IyoRelation::del($fid, $id);
		}
		IyoTopic::cleanTimeline($id);
		IyoTopic::cleanTimeline($fid);

		return $result;
	}

	public function createReport(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '提交成功');

		$report = new IyoReport();
		$report->body = $request->json("content","");
		$report->topic_id = $request->json("tid",0);
		$report->user_id = $request["id"];
		$report->save();

		return $result;
	}


	public function del(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '取消拉黑成功');
	
		$id = $request["id"];
		$fid = $request->json("fid",0);

		if( !IyoBlack::checkIfBlack($id, $fid) ) {
			$result = array('code' => trans('code.RelationNotExistsError'),'desc' => __LINE__,
				'message' => '用户未拉黑');
			return $result;
		}

		$user = IyoUser::queryById($fid);
		IyoBlack::del($id, $fid);

		return $result;
	}

	public function queryBlackList(Request $request)
	{
		$response = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取成功');

		$id = $request["id"];
		$num = $request->json("num",0);
		$current = $request->json("current",0);

		$ids = IyoBlack::queryBlackList($request["id"],$num,$current);
		$users = [];

		foreach( $ids as $fid ) {
			$user = IyoUser::queryById($fid);

			if( IyoRelation::checkIfFollow($request["id"], $fid) ) {
				$user["follow"] = true;
			} else {
				$user["follow"] = false;
			}

			$users[] = $user;
		}

		$response["result"] = $users;
		return $response;
	}

	public function queryFollowList(Request $request)
	{
		$response = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取成功');

		$id = $request["id"];
		$num = $request->json("num",0);
		$current = $request->json("current",0);

		$ids = IyoRelation::queryFollowingListByType($request["id"],"SF",$num,$current);
		$users = [];

		foreach( $ids as $fid ) {
			$users[] = IyoUser::queryById($fid);
		}

		$response["result"] = $users;
		return $response;
	}

}
