<?php
namespace App\Http\Controllers;
use App\Model\Node;
use View;
use Log;
use Auth;
use Illuminate\Http\Request;
use App\Model\IyoTopic;
use App\Model\IyoRelation;
use App\Model\Topic;


class PagesController extends BaseController
{

    protected $topic;

    public function __construct(Topic $topic)
    {
        parent::__construct();
        $this->topic = $topic;
    }

    /**
     * The home page
     */
    public function home()
    {
        $nodes  = Node::allLevelUp();
		$topics = [];

		//Log::info(" nodes is ".implode(',', $nodes) );

		foreach( $nodes["top"] as $pnode ) {
			$subtopics = Topic::where("is_excellent", true)->where("node_id", $pnode->id)
				->orderBy("created_at", "desc")->paginate(5);
			$topics[] = $subtopics;
		}

        return View::make('pages.home', compact('topics', 'nodes'));
    }

    public function video(Request $request)
    {
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => trans('successmsg.FollowSuccess'));

		$result["result"] = "http://123.59.53.158/uploads/F_ONE_2015_Kiteboarding.mp4";

		return $result;
    }


	public function firstpage(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '获取最新文章成功');

		$id = $request["id"];

		$result["video"] = $this->video($request);

		$bbstopic = new Topic();
		$controller_bbs = new BBSTopicsController($bbstopic);
		$bbs_result = $controller_bbs->queryForApp($request);
		$result["bbs"] = $bbs_result["result"];

		$request["num"] = 15;
		$request["current"] = 0;

		$controller_topic = new TopicsController();
		$topics_result = $controller_topic->queryUSTopicsByTime($request);
		$result["topics"] = $topics_result["result"];

		$request["num"] = 1;
		$request["current"] = 0;

		$moments_result = $controller_topic->querySFTopicsByTime($request);
		$result["moment"] = $moments_result["result"];

		return $result;
	}


    /**
     * About us page
     */
    public function about()
    {
        return View::make('pages.about');
    }

    /**
     * Community WIKI
     */
    public function wiki()
    {
        $topics = $this->topic->getWikiList();
        return View::make('pages.wiki', compact('topics'));
    }

    /**
     * Search page, using google's.
     */
    public function search()
    {
        $query = Purifier::clean(Input::get('q'));
        return Redirect::away('https://www.google.com/search?q=site:phphub.org ' . $query, 301);
    }

    /**
     * Feed function
     */
    public function feed()
    {
        $topics = Topic::excellent()->recent()->limit(20)->get();

        $channel =[
            'title' => 'PHPhub - PHP & Laravel的中文社区',
            'description' => 'PHPhub是 PHP 和 Laravel 的中文社区，在这里我们讨论技术, 分享技术。',
            'link' => URL::route('feed')
        ];

        $feed = Rss::feed('2.0', 'UTF-8');

        $feed->channel($channel);

        foreach ($topics as $topic) {
            $feed->item([
                'title' => $topic->title,
                'description|cdata' => str_limit($topic->body, 200),
                'link' => URL::route('topics.show', $topic->id),
                'pubDate' => date('Y-m-d', strtotime($topic->created_at)),
                ]);
        }

        return Response::make($feed, 200, array('Content-Type' => 'text/xml'));
    }

    /**
     * Sitemap function
     */
    public function sitemap()
    {
        return App::make('Phphub\Sitemap\Builder')->render();
    }
}
