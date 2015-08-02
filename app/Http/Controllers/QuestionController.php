<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Model\IyoTopic;
use View;
use Illuminate\Http\Request;
use App\Model\IyoRelation;
use App\Model\IyoAnswer;
use App\Model\IyoUser;
use App\Model\IyoQuestion;
use Redirect;
use Auth;
use Cache;
use Log;
use URL;

class QuestionController extends Controller {

	public function showlist()
	{
		$questions = IyoQuestion::all();
		$result["rows"] = $questions;
		return $result;
	}

	public function createquestion()
	{
		return View::make('createquestion');
	}

	public function listquestion()
	{
		return View::make('listquestion');
	}

	public function showquestion(Request $request)
	{
		$qid = $request["id"];
		$question = IyoQuestion::queryById($qid);
		$error = "";

		if( !Auth::check() ) {
			$error = "您好，请先登录";
		}

		$uid = Auth::user()->id;
		$dailyjob_at = Auth::user()->dailyjob_at;
		if( strtotime($dailyjob_at) > strtotime($question["created_at"]) ) {
			$error = "您好，您已经做完这个每日任务";
		}
		$user = IyoUser::queryById($uid);
		$union = IyoUser::queryById($user["bind"]);

		return View::make('showquestion', compact('union', 'error'));
	}

	public function latestquestion(Request $request) {
		$qid = IyoQuestion::getLatestQuestionId();
		return Redirect::to('question/show?id='.$qid);
		//return Redirect::route('question.show');
	}

	public function store()
	{
		return App::make('Phphub\Creators\TopicCreator')->create($this, Input::except('_token'));
	}

	public function showdetail(Request $request)
	{
		$topic = IyoTopic::findOrFail($request["id"]);
		$topic['user'] = $topic->uid;
		$user = IyoUser::findOrFail($topic->uid);
		$topic['username'] = $user["username"];
		$body = json_decode($topic['body']);
		$topic['body'] = $body;
		return View::make('backend.topics.show', compact('topic'));
	}

	public function saveOrUpdate(Request $request) 
	{
		$id = $request["id"];
		$content = $request["content"];
		$question = IyoQuestion::saveOrUpdate($content, $id);

		return $question;
	}

	public function deleteQuestion(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '删除朋友圈成功');

		$id = $request->json("id", 0);

		$topic = IyoQuestion::destroy($id);
		return $result;
	}

	public function query(Request $request)
	{
		$id = $request["id"];
		$question = IyoQuestion::queryById($id);

		if( is_null($question) ) {
			return null;
		}

		$callback = isset( $request[ 'callback' ] ) ? $request[ 'callback' ] : 'callback';
		$result = $callback . '(' . json_encode( $question ) . ')';
		
		return $result;
	}

	public function qedit(Request $request)
	{
		$id = $request["id"];
		$question = IyoQuestion::queryById($id);

		if( is_null($question) ) {
			return null;
		}

		return $question;
	}

	public function changestatus(Request $request)
	{
		$id = $request["id"];
		$status = $request["status"];
		$question = IyoQuestion::changestatus($status,$id);
		$data["status"] = 1;

		return $data;
	}

	public function answer(Request $request)
	{
		$qid = $request["id"];
		$answer = $request["answer"];

		$question = IyoQuestion::queryById($qid);

		if( !Auth::check() ) {
			return "您好，请先登录";
		}

		$uid = Auth::user()->id;
		$dailyjob_at = Auth::user()->dailyjob_at;
		if( strtotime($dailyjob_at) > strtotime($question["created_at"]) ) {
			return "您好，您已经做完这个每日任务";
		}

		IyoAnswer::saveOrUpdate($answer, $qid, $uid);
		IyoUser::increaseDialyQuestion($uid);

		$data["code"] = 0;
		return $data;
	}


	public function destroy(Request $request) {
		IyoTopic::destroy($request["id"]);
		return Redirect::to('backend/topic/list');
	}
}
