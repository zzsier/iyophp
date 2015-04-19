<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Model\IyoRelation;
use App\Model\IyoUser;

use Illuminate\Http\Request;

class RelationController extends Controller {

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
	public function create(Request $request)
	{
        $result = array('code' => trans('code.success'),'desc' => __LINE__,
            'message' => trans('successmsg.FollowSuccess'));

        $relation = new IyoRelation();

        $relation->id = $request->json("id",0);
        $relation->fid = $request->json("fid",0);

        $relation->save();

        return $result;
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
	public function destroy(Request $request)
	{
        $result = array('code' => trans('code.success'),'desc' => __LINE__,
            'message' => trans('successmsg.FollowSuccess'));


        $relation = IyoRelation::where('id', '=', $request->json("id",0))
             ->where('fid', '=', $request->json("fid",0))->firstOrFail();

        $relation->delete();

        return $result;
	}

    public function queryFollowList(Request $request)
    {
        $response = array('code' => trans('code.success'),'desc' => __LINE__,
            'message' => trans('successmsg.FollowSuccess'));

        $union_ids = IyoRelation::queryFollowUnionList($request->json("id",0));
        $star_ids = IyoRelation::queryFollowStarList($request->json("id",0));

        $num = $request->json("num",0);
        $current = $request->json("current",0);

        $unions = IyoUser::queryListByIds($union_ids,$num, $current);
        $stars = IyoUser::queryListByIds($star_ids,$num, $current);

        $result["union"] = $unions;
        $result["stars"] = $stars;

        $response["result"] = $result;
        return $response;
    }

}
