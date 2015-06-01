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
use App\Model\IyoNode;
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
		$nodes = IyoNode::all();

		return View::make('backend.documents.create_edit', compact("document", "nodes"));
	}

	public function createNode()
	{
		$node = new IyoNode();
		return View::make('backend.documents.create_node', compact("node"));
	}

	public function saveNode(Request $request)
	{
		$node = new IyoNode();
		$node->title = $request["title"];
		$node->save();
		return Redirect::to('backend/documents/list');
	}

	public function showdetail(Request $request)
	{
		$document = IyoDocument::findOrFail($request["id"]);
		return View::make('backend.documents.show', compact('document'));
	}

	public function edit(Request $request)
	{
		$document = IyoDocument::find($request["id"]);
		$nodes = IyoNode::all();
		return View::make('backend.documents.create_edit', compact("document", "nodes"));
	}

	public function saveOrUpdate(Request $request) {

		$id = $request["id"];

		if( $id == 0 ) {
			$document = new IyoDocument();
		} else {
			$document = IyoDocument::find($id);
		}

		$document->title = $request["title"];
		$document->url = $request["url"];
		$document->nid = $request["type"];
		$document->body = $request["description"];
		$document->request = $request["request"];
		$document->response = $request["response"];

		$document->save();

		return Redirect::to('backend/document/list');
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
