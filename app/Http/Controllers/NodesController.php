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

class NodesController extends BaseController
{

    protected $topic;

    public function __construct(Topic $topic)
    {
        parent::__construct();
        
        $this->beforeFilter('auth', ['only' => 'create', 'store']);
        $this->topic = $topic;
    }

	public function index()
	{
		$nodes = Node::all();
		return View::make('backend.nodes.index', compact('nodes'));
	}

    public function create()
    {
		$node = new Node();
		$pnodes = Node::where("parent_node", "0")->get();
        return View::make('backend.nodes.create_node', compact("node", "pnodes"));
    }

    public function store()
    {
        $validator = Validator::make($data = Input::all(), Node::$rules);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        Node::create($data);

        return Redirect::route('backend.nodes.index');
    }

    public function show($id)
    {
        $node = Node::findOrFail($id);
        $filter = $this->topic->present()->getTopicFilter();
        $topics = $this->topic->getNodeTopicsWithFilter($filter, $id);

        return View::make('backend.topics.index', compact('topics', 'node'));
    }

    public function update($id)
    {
        $node = Node::findOrFail($id);

        $validator = Validator::make($data = Input::all(), Node::$rules);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        $node->update($data);

        return Redirect::route('backend.nodes.index');
    }

    public function destroy($id)
    {
        Node::destroy($id);

        return Redirect::route('backend.nodes.index');
    }
}
