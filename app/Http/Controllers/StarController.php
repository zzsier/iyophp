<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Model\IyoUser;

use Illuminate\Http\Request;

class StarController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

	public function queryAllStar(Request $request) {

		$response = array('code' => trans('code.success'),'desc' => __LINE__,'messsage' => "获取成功");
		$num = $request->json("num",0);
		$current = $request->json("current",0);
		$union_ids = IyoUser::queryListByType(1, $num, $current);

		$unions = [];
		foreach ($union_ids as $uid) {
			$unions[] = IyoUser::queryById($uid);
		}

		$result = $unions;
		$response["result"] = $result;
		return $response;
	}

	public function searchStar(Request $request) {

		$response = array('code' => trans('code.success'),'desc' => __LINE__,'messsage' => "搜索成功");

		$username = $request->json("username","");
		$num = $request->json("num",0);
		$current = $request->json("current",0);

		if( $username == "" ) {
			$result = array('code' => trans('code.InvalidParameter'),'desc' => __LINE__,
				'message' => '参数不完整');
			return $result;
		}

		$user_ids = IyoUser::searchByUsername($username, 1, $num, $current);

		$stars = [];
		foreach ($user_ids as $uid) {
			$stars[] = IyoUser::queryById($uid);
		}

		$response["result"] = $stars;
		return $response;
	}


}
