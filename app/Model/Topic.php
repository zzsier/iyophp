<?php

namespace App\Model;

//use Laracasts\Presenter\PresentableTrait;
use Naux\AutoCorrect;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use Request;
use Input;
use URL;
use Log;
use Illuminate\Pagination\Paginator;

class Topic extends Model
{
	// manually maintian
	// public $timestamps = false;

 //   use PresentableTrait;
 //   protected $presenter = 'App\Phphub\Presenters\TopicPresenter';

	use SoftDeletes;
	protected $dates = ['deleted_at'];

	// Don't forget to fill this array
	protected $fillable = [
		'title',
		'body',
		'excerpt',
		'body_original',
		'user_id',
		'node_id',
		'created_at',
		'updated_at'
	];

	public function topicFilter($filter)
	{
		$node_id = Request::segment(2);
		$node_append = '';
		if ($node_id) {
			$link = URL::to('nodes', $node_id) . '?filter=' . $filter;
		} else {
			$query_append = '';
			$query = Input::except('filter', '_pjax');
			if ($query) {
				$query_append = '&'.http_build_query($query);
			}
			$link = URL::to('topics') . '?filter=' . $filter . $query_append . $node_append;
		}
		$selected = Input::get('filter') ? (Input::get('filter') == $filter ? ' class="selected"':'') : '';

		return 'href="' . $link . '"' . $selected;
	}

	public function haveDefaultNode($node, $snode)
	{
		if (count($node) && ($snode && $node->id == $snode->id)) {
			return true;
		}

		if (Input::old('node_id') && ($snode && Input::old('node_id') == $snode->id)) {
			return true;
		}

		return false;
	}

	public function getTopicsByLevel($node, $level)
	{
		return $this->where('is_top', '=', $level)->where('node_id', '=', $node)->orderBy('created_at', 'desc')->get();
	}

	public static function boot()
	{
		parent::boot();

		static::created(function ($topic) {
			SiteStatus::newTopic();
		});
	}

	public function votes()
	{
		return $this->morphMany('App\Model\Vote', 'votable');
	}

	public function favoritedBy()
	{
		return $this->belongsToMany('App\Model\User', 'favorites');
	}

	public function attentedBy()
	{
		return $this->belongsToMany('App\Model\User', 'attentions');
	}

	public function node()
	{
		return $this->belongsTo('App\Model\Node');
	}

	public function user()
	{
		return $this->belongsTo('App\Model\IyoUser');
	}

	public function lastReplyUser()
	{
		return $this->belongsTo('App\Model\IyoUser', 'last_reply_user_id');
	}

	public function replies()
	{
		return $this->hasMany('App\Model\Reply');
	}

	public function activities()
	{
		return $this->hasMany('App\Model\Activity');
	}


	public function appends()
	{
		return $this->hasMany('App\Model\Append');
	}

	public function getWikiList()
	{
		return $this->where('is_wiki', '=', true)->orderBy('created_at', 'desc')->get();
	}

	public function generateLastReplyUserInfo()
	{
		$lastReply = $this->replies()->recent()->first();

		$this->last_reply_user_id = $lastReply ? $lastReply->user_id : 0;
		$this->save();
	}

	public function getRepliesWithLimit($limit = 20)
	{
		return $this->replies()
					->orderBy('created_at', 'asc')
					->with('user')
					->paginate($limit);
	}

	public function getActivities()
	{
		Log::info("enter getActivities");
		return $this->activities()
					->orderBy('created_at', 'asc')
					->with('user')
					->get();
	}


	public function getTopicsWithFilter($filter, $limit = 20)
	{
		return $this->applyFilter($filter)
					->orderBy("created_at", "asc")
					->with('user', 'node', 'lastReplyUser')
					->paginate($limit);
	}

	public function getNodeTopicsWithFilter($filter, $node_id, $limit = 20)
	{
		return $this->applyFilter($filter == 'default' ? 'node' : $filter)
					->where('node_id', '=', $node_id)
					->with('user', 'node', 'lastReplyUser')
					->paginate($limit);
	}

	public function applyFilter($filter)
	{
		switch ($filter) {
			case 'noreply':
				return $this->orderBy('reply_count', 'asc')->recent();
				break;
			case 'vote':
				return $this->orderBy('vote_count', 'desc')->recent();
				break;
			case 'excellent':
				return $this->excellent()->recent();
				break;
			case 'recent':
				return $this->recent();
				break;
			case 'node':
				return $this->recentReply();
				break;
			default:
				return $this->pinAndRecentReply();
				break;
		}
	}

	/**
	 * 边栏同一节点下的话题列表
	 */
	public function getSameNodeTopics($limit = 8)
	{
		return Topic::where('node_id', '=', $this->node_id)
						->recent()
						->take($limit)
						->get();
	}

	public function scopeWhose($query, $user_id)
	{
		return $query->where('user_id', '=', $user_id)->with('node');
	}

	public function scopeRecent($query)
	{
		return $query->orderBy('created_at', 'desc');
	}

	public function scopePinAndRecentReply($query)
	{
		return $query->whereRaw("(`created_at` > '".Carbon::today()->subMonth()->toDateString()."' or (`order` > 0) )") 
					 ->orderBy('order', 'desc')
					 ->orderBy('updated_at', 'desc');
	}

	public function scopeRecentReply($query)
	{
		return $query->orderBy('order', 'desc')
					 ->orderBy('updated_at', 'desc');
	}

	public function scopeExcellent($query)
	{
		return $query->where('is_excellent', '=', true);
	}

	public static function makeExcerpt($body)
	{
		$html = $body;
		$excerpt = trim(preg_replace('/\s\s+/', ' ', strip_tags($html)));
		return str_limit($excerpt, 200);
	}
}
