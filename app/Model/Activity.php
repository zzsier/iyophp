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
use Illuminate\Pagination\Paginator;

class Activity extends Model
{
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
		return $this->where('is_stick', '=', $level)->where('node_id', '=', $node)->orderBy('created_at', 'desc')->get();
	}

	public function votes()
	{
		return $this->morphMany('App\Model\Vote', 'votable');
	}

	public function topic()
	{
		return $this->belongsTo('App\Model\Topic');
	}

	public function user()
	{
		return $this->belongsTo('App\Model\IyoUser');
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

	public function getTopicsWithFilter($filter, $limit = 20)
	{
		return $this->applyFilter($filter)
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
