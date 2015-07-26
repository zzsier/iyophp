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
		if( Auth::check() ) {
			Log::info("Auth check if passes");
		} else {
			Log::info("Auth check failed");
		}

		//$filter = $this->topic->present()->getTopicFilter();
		$filter = 'default';
		$node = Node::find($id);
		$extopics = $this->topic->getTopicsWithFilter($filter);

		$nodes  = Node::allLevelUp();
		$subnodes = $nodes['second'][$id];
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
			$ntopics = Topic::where('node_id', $id)->orderBy('created_at', 'desc')->paginate(10);
			$topictype = 1;
		}

        $sqls = DB::getQueryLog();
        $logger = new Writer(new Logger("info"));
        $logger->useFiles(storage_path().'/logs/sql.log');
        $logger->info($sqls);

		foreach( $ntopics as $topic ) {
			Log::info($topic->name);
		}
		//$links  = Link::remember(1440)->get();

		return View::make('topics.index', 
				compact('topictype', 'node', 'ntopics', 'nodes', 'links','subnodes', 'topicslv1', 'topicslv2'));
	}

	public function create()
	{
		$node = Node::find(Input::get('node_id'));
		$nodes = Node::allLevelUp();
		$subnodes = $nodes['second'][$node->id];

		return View::make('topics.create_edit', compact('subnodes', 'node', 'nodes'));
	}

	public function store()
	{
		$result = array('info' => 'ok','desc' => __LINE__,
			'tips' => '文章创建成功', 'url' => 'http://123.59.53.158/nodes/'.Input::get('boardid'));

		$topic = new Topic();
		$topic->user_id = Auth::id();
		//$replies = $topic->getRepliesWithLimit(Config::get('phphub.replies_perpage'));

		$topic['body'] = Input::get('content');
		$topic['title'] = Input::get('title');
		$topic['image'] = Input::get('image');
		//$topic['body'] = $markdown->convertMarkdownToHtml(Input::get('body'));
		//$topic['excerpt'] = Topic::makeExcerpt(Input::get('body'));

		//$this->form->validate($topic);
		$topic->node_id = Input::get('boardid');
		$topic->cate_id = Input::get('subid');

		//Robot::notify($data['body_original'], 'Topic', $topic, Auth::user());
		$topic->save();

		return $result;
	}

	public function saveActivity()
	{
		$result = array('info' => 'ok','desc' => __LINE__,
			'tips' => '报名成功', 'url' => 'http://123.59.53.158/nodes/'.Input::get('boardid'));

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


	public function show($id)
	{
		$nodes = Node::allLevelUp();
		$topic = Topic::findOrFail($id);
		$replies = $topic->getRepliesWithLimit(Config::get('phphub.replies_perpage'));
		$node = $topic->node;

		$showjointag = false;
		if( $node->name == "活动" ) {
			$showjointag = true;
			$activities = Activity::where("topic_id", $topic->id);
		}

		$nodeTopics = $topic->getSameNodeTopics();

		$topic->increment('view_count', 1);
		return View::make('topics.show', compact('activities', 'showjointag', 'nodes', 'topic', 'replies', 'nodeTopics', 'node'));
	}

	public function edit($id)
	{
		$topic = Topic::findOrFail($id);
		$this->authorOrAdminPermissioinRequire($topic->user_id);
		$nodes = Node::allLevelUp();
		$node = $topic->node;

		return View::make('topics.create_edit', compact('topic', 'nodes', 'node'));
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

	public function update($id)
	{
		$topic = Topic::findOrFail($id);
		$data = Input::only('title', 'body', 'node_id');

		$this->authorOrAdminPermissioinRequire($topic->user_id);

		$markdown = new Markdown;
		$data['body_original'] = $data['body'];
		$data['body'] = $markdown->convertMarkdownToHtml($data['body']);
		$data['excerpt'] = Topic::makeExcerpt($data['body']);

		// Validation
		App::make('Phphub\Forms\TopicCreationForm')->validate($data);

		$topic->update($data);

		Flash::success(lang('Operation succeeded.'));
		return Redirect::route('topics.show', $topic->id);
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
		$topic = Topic::findOrFail($id);
		$topic->delete();
		Flash::success(lang('Operation succeeded.'));

		return Redirect::route('topics.index');
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
