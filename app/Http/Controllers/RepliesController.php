<?php

namespace App\Http\Controllers;
use Phphub\Core\CreatorListener;
use App\Model\Reply;
use Input;
use Auth;

class RepliesController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->beforeFilter('auth');
    }

	public function store()
	{
		$result = array('info' => 'ok','desc' => __LINE__,
			'tips' => '文章评论成功', 'url' => URL::to("/nodes").Input::get('boardid'));

		$reply = new Reply();
		$reply->user_id = Auth::id();
		$reply->topic_id = Input::get("toid");
		$reply->body = Input::get("content");

		$reply->save();

		return $result;
	}

    public function vote($id)
    {
        $reply = Reply::find($id);
        App::make('Phphub\Vote\Voter')->replyUpVote($reply);
        return Redirect::route('topics.show', [$reply->topic_id, '#reply'.$reply->id]);
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

    /**
     * ----------------------------------------
     * CreatorListener Delegate
     * ----------------------------------------
     */

    public function creatorFailed($errors)
    {
        Flash::error(lang('Operation failed.'));
        return Redirect::back();
    }

    public function creatorSucceed($reply)
    {
        Flash::success(lang('Operation succeeded.'));
        return Redirect::route('topics.show', array(Input::get('topic_id'), '#reply'.$reply->id));
    }
}
