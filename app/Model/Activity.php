<?php
namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Input;
use URL;

class Activity extends Model
{
	public function topic()
	{
		return $this->belongsTo('App\Model\Topic');
	}

	public function user()
	{
		return $this->belongsTo('App\Model\IyoUser');
	}

	public function scopeWhose($query, $user_id)
	{
		return $query->where('user_id', '=', $user_id)->with('node');
	}

	public function scopeRecent($query)
	{
		return $query->orderBy('created_at', 'desc');
	}
}
