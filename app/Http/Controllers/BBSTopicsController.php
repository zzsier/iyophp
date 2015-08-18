<?php

namespace App\Http\Controllers;
use App\Phphub\Core\CreatorListener;
use App\Phphub\Forms\TopicCreationForm;
use App\Model\Topic;
use App\Model\Node;
use App\Model\Reply;
use App\Model\Activity;
use View;
use Input;
use Auth;
use Log;
use Config;
use Flash;
use Redirect;
use URL;
use Request;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Illuminate\Log\Writer;
use DB;


class BBSTopicsController extends BaseController implements CreatorListener
{
	protected $topic;

	public function __construct(Topic $topic)
	{
		parent::__construct();

		$this->beforeFilter('auth', ['except' => ['index', 'show']]);
		$this->topic = $topic;
	}

	public function index($id)
	{
		//$filter = $this->topic->present()->getTopicFilter();
		if( Auth::check() ) {
			Log::info("Auth check if passes");
		} else {
			Log::info("Auth check failed");
		}

		$node_id = $id;
		$node = Node::find($node_id);
		$filter = 'default';
		$topics = $this->topic->getTopicsWithFilter($filter);
		$nodes  = Node::allLevelUp();
		//$links  = Link::remember(1440)->get();

		return View::make('topics.index', 
				compact('node' ,'topics', 'nodes', 'links'));
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
		$node = Node::find(Input::get('node_id'));
		$nodes = Node::allLevelUp();
		if ( !array_key_exists($node->id, $nodes['second']) ) {
			$subnodes = [];
		} else {
			$subnodes = $nodes['second'][$node->id];
		}

		return View::make('topics.create_edit', compact('subnodes', 'node', 'nodes'));
	}

	public function store()
    {
        $result = array('info' => 'ok', 'desc' => __LINE__,
            'tips' => '文章创建成功', 'url' => URL::to("/nodes/") . '/' . Input::get('boardid'));

        $topic = new Topic();
        $topic->user_id = Auth::id();
        //$replies = $topic->getRepliesWithLimit(Config::get('phphub.replies_perpage'));

        $topic->body = Input::get('content');
        $topic->title = Input::get('title');

        if (Input::get('image') != "") {
            $topic['image'] = Input::get('image');
        }
		//$topic['body'] = $markdown->convertMarkdownToHtml(Input::get('body'));
		//$topic['excerpt'] = Topic::makeExcerpt(Input::get('body'));

		//$this->form->validate($topic);
		$topic->node_id = Input::get('boardid');
		$topic->cate_id = Input::get('subid');
        $topic->is_top = Input::get('is_top');
        $topic->is_excellent = Input::get('is_excellent');

		//Robot::notify($data['body_original'], 'Topic', $topic, Auth::user());
		$topic->save();

		return $result;
	}

	public function saveActivity()
	{
		$result = array('info' => 'ok','desc' => __LINE__,
			'tips' => '报名成功', 'url' => URL::to("/nodes").'/'.Input::get('boardid'));

		$activity = new Activity();
		$activity->user_id = Auth::id();
		//$replies = $topic->getRepliesWithLimit(Config::get('phphub.replies_perpage'));

		$activity->topic_id = Input::get("activeId");

		$personInfo["signName"] = Input::get("signName");
		$personInfo["signTele"] = Input::get("signTele");
		$personInfo["signQQ"] = Input::get("signQQ");
		$personInfo["sex"] = Input::get("sex");
		$personInfo["signAge"] = Input::get("signAge");
		$personInfo["signCarrer"] = Input::get("signCarrer");
		$personInfo["address"] = Input::get("address");

		$activity->content = json_encode($personInfo);
		$activity->save();

		return $result;
	}

	public function agreeActivity()
	{
		$result = array('info' => 'ok','desc' => __LINE__,
			'tips' => '报名成功', 'url' => URL::to("/nodes").'/'.Input::get('boardid'));

		$activity = Activity::find(Input::get("activity_id"));
		$activity->flag = 1;
		$activity->save();

		return Redirect::route('topics.show', $activity->topic_id);
	}

	public function denyActivity()
	{
		$result = array('info' => 'ok','desc' => __LINE__,
			'tips' => '报名成功', 'url' => URL::to("/nodes").'/'.Input::get('boardid'));

		$activity = Activity::find(Input::get("activity_id"));
		$activity->flag = 2;
		$activity->save();

		return Redirect::route('topics.show', $activity->topic_id);
	}

	public function show($id)
	{
		$nodes = Node::allLevelUp();
		$topic = Topic::findOrFail($id);
		$replies = $topic->getRepliesWithLimit(Config::get('phphub.replies_perpage'));
		$node = $topic->node;

		$showjointag = false;
		$alreadyjoin = false;
		$activities = [];
		if( Auth::check() && $node->name == "活动" ) {
			$showjointag = true;
			Log::info("topic id is ". $id);
			$activities = $topic->getActivities();
			//$activities = Activity::where("topic_id","=",$id)->get();
			Log::info("Activity length is ". count($activities));
			//$activity_string = implode('|', $activities);
			//Log::info("Activity is ". $activity_string);

			DB::listen(function($sql, $bindings, $time) {
					Log::info($sql);
			});

			foreach( $activities as $myactivity ) {
				Log::info("activity id is ". $myactivity->id);
				if( $myactivity->user_id == Auth::id() ) {
					Log::info("Activity already join");
					$alreadyjoin = true;
					break;
				}
			}
		}

		$nodeTopics = $topic->getSameNodeTopics();

		$topic->increment('view_count', 1);
		return View::make('topics.show', compact('activities', 'showjointag', 'alreadyjoin',
					'nodes', 'topic', 'replies', 'nodeTopics', 'node'));
	}

	public function edit($id)
	{
		$topic = Topic::findOrFail($id);
		//$this->authorOrAdminPermissioinRequire($topic->user_id);
		$nodes = Node::allLevelUp();
		$node = $topic->node;
        $category = Node::find($topic->cate_id);
		if ( !array_key_exists($node->id, $nodes['second']) ) {
			$subnodes = [];
		} else {
			$subnodes = $nodes['second'][$node->id];
		}

		return View::make('topics.create_edit', compact('subnodes','topic', 'nodes', 'node','category'));
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

		$nodes  = Node::allLevelUp();
		foreach( $nodes['top'] as $node ) {
			Log::info( "BBS node is ".$node->id );
			$topicslv1 = $this->topic->getTopicsByLevel($node->id, 1);
			foreach( $topicslv1 as $topic ) {
				$bbstopics[] = $topic;
				break;
			}
		}

		$result["result"] = $bbstopics;
		return $result;
	}

	public function update($id)
	{
        $result = array('info' => 'ok','desc' => __LINE__,
			'tips' => '文章修改成功', 'url' => URL::to("/nodes/").'/'.Input::get('boardid'));

		$topic = Topic::find($id);
		$topic->user_id = Auth::id();
		//$replies = $topic->getRepliesWithLimit(Config::get('phphub.replies_perpage'));

		$topic->body = Input::get('content');
		$topic->title = Input::get('title');

        if( Input::get('image') != "" ) {
		    $topic['image'] = Input::get('image');
        }

		//$topic['body'] = $markdown->convertMarkdownToHtml(Input::get('body'));
		//$topic['excerpt'] = Topic::makeExcerpt(Input::get('body'));

		//$this->form->validate($topic);
		$topic->node_id = Input::get('boardid');
		$topic->cate_id = Input::get('subid');
        $topic->is_top = Input::get('is_top');
        $topic->is_excellent = Input::get('is_excellent');

		//Robot::notify($data['body_original'], 'Topic', $topic, Auth::user());
		$topic->save();
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
