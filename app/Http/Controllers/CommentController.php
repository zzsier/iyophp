<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Model\IyoComment;
use App\Model\IyoTopic;
use App\Model\IyoUser;
use Illuminate\Http\Request;

class CommentController extends Controller
{
	public function store()
	{
		return App::make('Phphub\Creators\ReplyCreator')->create($this, Input::except('_token'));
	}

	public function destroy($id)
	{
		$reply = Reply::findOrFail($id);
		$this->authorOrAdminPermissioinRequire($reply->user_id);
		$reply->delete();
		$reply->topic->decrement('reply_count', 1);
		Flash::success(lang('Operation succeeded.'));
		$reply->topic->generateLastReplyUserInfo();
		return Redirect::route('topics.show', $reply->topic_id);
	}

	public function addComment(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '评论创建成功');

		$uid = $request["id"];
		$tid = $request->json("tid", 0);
		$body = $request->json("comment","");

		if( $tid == 0 ) {
			$result = array('code' => trans('code.InvalidParameter'),'desc' => __LINE__,
				'message' => '参数不完整');
			return $result;
		}

		IyoComment::addComment($uid, $tid, $body);
		IyoTopic::incrNumOfReply($tid);

		$topic = IyoTopic::queryById($tid);
		$userid = $topic["uid"];

		$mosquitto = new \Mosquitto\Client();
		$mosquitto->connect("localhost", 1883, 5);
		$mosquitto->publish("iyo_id_".$userid, '{"fan":"0","friend":"0","moment":"0","topic":"2"}', 1, 0);
		$mosquitto->disconnect();


		return $result;

	}

	public function delComment(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '评论删除成功');

		$cid = $request->json("cid", 0);

		$comment = IyoComment::queryById($cid);
		$tid = $comment["tid"];

		IyoComment::delComment($cid);
		IyoTopic::decrNumOfReply($tid);

		return $result;
	}

	public function queryComments(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '评论获取成功');

		$tid = $request->json("tid",0);
		$num = $request->json("num",0);
		$current = $request->json("current",0);

		if( $tid == 0 ) {
			$result = array('code' => trans('code.InvalidParameter'),'desc' => __LINE__,
				'message' => '参数不完整');
			return $result;
		}

		$comments = [];
		$commentIds = IyoComment::queryCommentIds($tid, $num, $current);

		foreach( $commentIds as $cid ) {
			$comment = IyoComment::queryById($cid);
			$user = IyoUser::queryById($comment["uid"]);
			$comment["user"] = $user;
			$comments[] = $comment;
		}
		$result["result"] = $comments;

		return $result;
	}
}
