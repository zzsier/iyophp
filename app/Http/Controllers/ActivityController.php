<?php

namespace App\Http\Controllers;
use App\Phphub\Core\CreatorListener;
use App\Phphub\Forms\TopicCreationForm;
use App\Model\Topic;
use App\Model\Node;
use App\Model\Reply;
use App\Model\Activity;
use App\Model\IyoUser;
use App\Model\IyoReport;
use App\Model\Enrollment;
use View;
use Input;
use Auth;
use Log;
use Config;
use Flash;
use Redirect;
use URL;
use Illuminate\Http\Request;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Illuminate\Log\Writer;
use DB;


class ActivityController extends BaseController implements CreatorListener
{
	public function index()
	{
		Log::info("check activities list");

		$activities = [];
		if( ! Auth::check() ) {
			Log::info("Auth check if passes");
			return View::make('activities.index', compact('activities'));
		}

		Log::info("check activities list auth id is ".Auth::id());

		if( Input::get('userid') != null ) {
			$activities = Activity::where("user_id", Input::get('userid'))->get();
			return View::make('activities.index',  compact('activities'));
		}

		if( Auth::user()->can("manage_topics") ) {
			$activities = Activity::all();
		} else {
			$activities = Activity::where("user_id", Auth::id())->get();
		}

		return View::make('activities.index',  compact('activities'));
	}

	public function showtopics($id)
	{
		//$filter = $this->topic->present()->getTopicFilter();
		$filter = 'default';
		$node = Node::find($id);
		$extopics = $this->topic->getTopicsWithFilter($filter);

		$nodes  = Node::allLevelUp();
		if ( !array_key_exists($id, $nodes['second']) ) {
			$subnodes = [];
		} else {
			$subnodes = $nodes['second'][$id];
		}
		$topicslv1 = $this->topic->getTopicsByLevel($id, 1);
		$topicslv2 = $this->topic->getTopicsByLevel($id, 2);

		$topictype = 1;
		$subnode = Input::get('subnode');
		if( $subnode != null ) {
			$ntopics = Topic::where('cate_id', $subnode)->orderBy('created_at', 'asc')->paginate(10);
			$topictype = $subnode;
		} else if (Input::get('filter') != null) {
			$ntopics = Topic::where('node_id', $id)->where("is_excellent", true)->orderBy('created_at', 'desc')->paginate(10);
			$topictype = 2;
		} else {
			Log::info("node id is ".$id);
			$ntopics = Topic::where('node_id', $id)->orderBy('created_at', 'desc')->paginate(10);
			Log::info("node number is ".count($ntopics));
			$topictype = 1;
		}

		if( Input::get("type") == "mobile" ) {
			Log::info("mobile topic number is ".count($ntopics));
			foreach( $ntopics as $topic ) {
				Log::info("topic id is ".$topic->id);
				$topic["shortTime"] = date("Y-m", strtotime($topic->created_at));
			}
			//$result = array('info' => 'ok', 'desc' => __LINE__,
			//	'tips' => '文章获取成功', 'articlelists' => $ntopics);
			//Log::info("result topic number is ".count($result["articlelists"]));
			return $ntopics;
			//return $result;
		}

		return View::make('topics.index', 
				compact('topictype', 'node', 'ntopics', 'nodes', 'links','subnodes', 'topicslv1', 'topicslv2'));
	}

	public function create()
	{
		return View::make('activities.create_edit');
	}

	public function store()
    {
        $result = array('info' => 'ok', 'desc' => __LINE__,
            'tips' => '文章创建成功', 'url' => URL::to("/activities") );

        $activity = new Activity();
        $activity->user_id = Auth::id();

		$user = IyoUser::queryById($activity->user_id);
        //$replies = $topic->getRepliesWithLimit(Config::get('phphub.replies_perpage'));

        $activity->body = Input::get('content');
        $activity->title = Input::get('title');

        if (Input::get('image') != "") {
            $activity['image'] = Input::get('image');
        } else if( $user["image"] != "" ) {
            $activity['image'] = "http://www.iyobbs.com/".$user["image"];
		}

		//$topic['body'] = $markdown->convertMarkdownToHtml(Input::get('body'));
		//$topic['excerpt'] = Topic::makeExcerpt(Input::get('body'));

		//$this->form->validate($topic);
		$activity->node_id = Input::get('boardid');
		$activity->cate_id = Input::get('subid');
        $activity->is_top = Input::get('is_top');
        $activity->is_excellent = Input::get('is_excellent');
        $activity->is_stick = Input::get('is_stick');

        $activity->address = Input::get('address');
        $activity->departure_time = Input::get('dateInput');

		//Robot::notify($data['body_original'], 'Topic', $topic, Auth::user());
		$activity->save();

		return $result;
	}

	public function createReport(Request $request) 
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '提交成功');

		$report = new IyoReport();
		$report->body = Input::get("content");
		$report->topic_id = Input::get("topic_id");
		$report->user_id = Auth::id();
		$report->save();

		return $result;
	}


	public function joinActivity()
	{
		$result = array('info' => 'ok','desc' => __LINE__,
			'tips' => '报名成功', 'url' => URL::to("/activities").'/'.Input::get('activityID'));

		$enrollment = new Enrollment();
		$enrollment->user_id = Auth::id();

		$enrollment->activity_id = Input::get("activityID");
		$enrollment->num = Input::get("num");

		$enrollment->username = Input::get("name");
		$enrollment->phone = Input::get("phone");
		$enrollment->identity = Input::get("identityID");
		$enrollment->content = Input::get("note");

		$enrollment->save();

		return Redirect::route('activities.show', $enrollment->activity_id);
	}

	public function agree()
	{
		$result = array('info' => 'ok','desc' => __LINE__, 'tips' => '报名成功');

		$enrollment = Enrollment::find(Input::get("enrollment_id"));
		$enrollment->flag = 1;
		$enrollment->save();

		return Redirect::route('activities.show', $enrollment->activity_id);
	}

	public function deny()
	{
		$result = array('info' => 'ok','desc' => __LINE__,
			'tips' => '取消报名成功');

		$enrollment = Enrollment::find(Input::get("enrollment_id"));
		$enrollment->flag = 1;
		$enrollment->save();

		return Redirect::route('activities.show', $enrollment->activity_id);
	}

	public function show($id)
	{
		$activity = Activity::findOrFail($id);

		$alreadyjoin = false;
		$enrollments = [];
		if( Auth::check() ) {
			$enrollments = $activity->getEnrollments();

			foreach( $enrollments as $enrollment ) {
				if( $enrollment->user_id == Auth::id() ) {
					$alreadyjoin = true;
					break;
				}
			}
		}

		return View::make('activities.show', compact('activity', 'enrollments', 'alreadyjoin'));
	}

	public function orders()
	{
		Log::info("orders is for id ".Auth::id());
		$enrollments = Enrollment::where("user_id", Auth::id())->with('activity')->get();
		Log::info("enrollments count is ".count($enrollments));
		return View::make('activities.order', compact('enrollments'));
	}

	public function removeorder()
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取成功');

		$order = Enrollment::find(Input::get("orderId"));
		if( !is_null($order) ) {
			$order->delete();
		}
		$enrollments = Enrollment::where("user_id", Auth::id())->with('activity')->get();
		Log::info("enrollments count is ".count($enrollments));
		//return View::make('activities.order', compact('enrollments'));
		return $result;
	}

	public function edit($id)
	{
		$activity = Activity::findOrFail($id);
		$activity->body = str_replace(array("\r\n", "\r", "\n"), "", $activity->body);

		return View::make('activities.create_edit', compact('activity'));
	}

	public function append($id)
	{
		$topic = Topic::findOrFail($id);
		$this->authorOrAdminPermissioinRequire($topic->user_id);

		$markdown = new Markdown;
		$content = $markdown->convertMarkdownToHtml(Input::get('content'));

		$append = Append::create(['topic_id' => $topic->id, 'content' => $content]);

		App::make('Phphub\Notification\Notifier')->newAppendNotify(Auth::user(), $topic, $append);

		Flash::success(lang('Operation succeeded.'));
		return Redirect::route('topics.show', $topic->id);
	}

	public function queryForApp(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取BBS文章成功');

		$bbstopics = [];
		$topics = Topic::where('is_stick', '=', '1')->orderBy('created_at', 'desc')->take(10)->get();

		foreach( $topics as $topic ) {
			$bbstopics[] = $topic;
		}

		/*
		$nodes  = Node::allLevelUp();
		foreach( $nodes['top'] as $node ) {
			Log::info( "BBS node is ".$node->id );
			$topicslv1 = $this->topic->getTopicsByLevel($node->id, 1);
			foreach( $topicslv1 as $topic ) {
				$bbstopics[] = $topic;
				break;
			}
		}
		*/

		$result["result"] = $bbstopics;
		return $result;
	}

	public function update($id)
	{
        $result = array('info' => 'ok', 'desc' => __LINE__,
            'tips' => '文章更新成功', 'url' => URL::to("/activities") );

        $activity = Activity::find($id);
		$activity->user_id = Auth::id();

		$user = IyoUser::queryById($activity->user_id);
        //$replies = $topic->getRepliesWithLimit(Config::get('phphub.replies_perpage'));

        $activity->body = Input::get('content');
        $activity->title = Input::get('title');

        if (Input::get('image') != "") {
            $activity['image'] = Input::get('image');
        }

		//$topic['body'] = $markdown->convertMarkdownToHtml(Input::get('body'));
		//$topic['excerpt'] = Topic::makeExcerpt(Input::get('body'));

		//$this->form->validate($topic);
		$activity->node_id = Input::get('boardid');
		$activity->cate_id = Input::get('subid');
        $activity->is_top = Input::get('is_top');
        $activity->is_excellent = Input::get('is_excellent');
        $activity->is_stick = Input::get('is_stick');

        $activity->address = Input::get('address');
        $activity->departure_time = Input::get('dateInput');

		Log::info("date is ".Input::get('dateInput'));

		//Robot::notify($data['body_original'], 'Topic', $topic, Auth::user());
		$activity->save();

		return $result;
	}

	/**
	 * ----------------------------------------
	 * User Topic Vote function
	 * ----------------------------------------
	 */

	public function upvote($id)
	{
		$topic = Topic::find($id);
		App::make('Phphub\Vote\Voter')->topicUpVote($topic);
		return Redirect::route('topics.show', $topic->id);
	}

	public function downvote($id)
	{
		$topic = Topic::find($id);
		App::make('Phphub\Vote\Voter')->topicDownVote($topic);
		return Redirect::route('topics.show', $topic->id);
	}

	/**
	 * ----------------------------------------
	 * Admin Topic Management
	 * ----------------------------------------
	 */

	public function recomend($id)
	{
		$topic = Topic::findOrFail($id);
		$topic->is_excellent = (!$topic->is_excellent);
		$topic->save();
		Flash::success(lang('Operation succeeded.'));
		Notification::notify('topic_mark_excellent', Auth::user(), $topic->user, $topic);
		return Redirect::route('topics.show', $topic->id);
	}

	public function wiki($id)
	{
		$topic = Topic::findOrFail($id);
		$topic->is_wiki = (!$topic->is_wiki);
		$topic->save();
		Flash::success(lang('Operation succeeded.'));
		Notification::notify('topic_mark_wiki', Auth::user(), $topic->user, $topic);
		return Redirect::route('topics.show', $topic->id);
	}

	public function pin($id)
	{
		$topic = Topic::findOrFail($id);
		($topic->order > 0) ? $topic->decrement('order', 1) : $topic->increment('order', 1);
		return Redirect::route('topics.show', $topic->id);
	}

	public function sink($id)
	{
		$topic = Topic::findOrFail($id);
		($topic->order >= 0) ? $topic->decrement('order', 1) : $topic->increment('order', 1);
		return Redirect::route('topics.show', $topic->id);
	}

	public function destroy($id)
	{
        $result = array('info' => 'ok','desc' => __LINE__,
            'tips' => '文章删除成功', 'url' => URL::to("/nodes/").'/'.Input::get('boardid'));

		$topic = Topic::findOrFail($id);
		$topic->delete();

		return $result;
	}

	public function uploadImage()
	{
		if ($file = Input::file('file')) {
			$allowed_extensions = ["png", "jpg", "gif"];
			if ($file->getClientOriginalExtension() && !in_array($file->getClientOriginalExtension(), $allowed_extensions)) {
				return ['error' => 'You may only upload png, jpg or gif.'];
			}

			$fileName		= $file->getClientOriginalName();
			$extension	   = $file->getClientOriginalExtension() ?: 'png';
			$folderName	  = 'uploads/images/' . date("Ym", time()) .'/'.date("d", time()) .'/'. Auth::user()->id;
			$destinationPath = public_path() . '/' . $folderName;
			$safeName		= str_random(10).'.'.$extension;
			$file->move($destinationPath, $safeName);

			// If is not gif file, we will try to reduse the file size
			if ($file->getClientOriginalExtension() != 'gif') {
				// open an image file
				$img = Image::make($destinationPath . '/' . $safeName);
				// prevent possible upsizing
				$img->resize(1440, null, function ($constraint) {
					$constraint->aspectRatio();
					$constraint->upsize();
				});
				// finally we save the image as a new file
				$img->save();
			}

			$data['filename'] = getUserStaticDomain() . $folderName .'/'. $safeName;

			SiteStatus::newImage();
		} else {
			$data['error'] = 'Error while uploading file';
		}
		return $data;
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
		Flash::success(trans('message.Operation succeeded.'));

		return Redirect::route('topics.show', array($topic->id));
	}
}
