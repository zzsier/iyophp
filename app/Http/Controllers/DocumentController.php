<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Model\IyoTopic;
use View;
use Illuminate\Http\Request;
use App\Model\IyoRelation;
use App\Model\IyoUser;
use App\Model\IyoLike;
use App\Model\IyoDocument;
use Redirect;

class DocumentController extends Controller {

	public function showlist()
	{
		$documents = IyoDocument::all();
		return View::make('backend.documents.index', compact('documents'));
	}

	public function create()
	{
		$document = new IyoDocument();

		return View::make('backend.documents.create_edit', compact("document"));
	}

	public function showdetail(Request $request)
	{
		$topic = IyoTopic::findOrFail($request["id"]);
		$topic['user'] = $topic->uid;
		$user = IyoUser::findOrFail($topic->uid);
		$topic['username'] = $user["username"];
		$body = json_decode($topic['body']);
		$topic['body'] = $body;
		return View::make('backend.documents.show', compact('topic'));
	}

	public function edit(Request $request)
	{
		$document = IyoDocument::find($request["id"]);
		return View::make('backend.documents.create_edit', compact("document"));
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

		return Redirect::route('documents.show', array($topic->id));
	}
}
