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

/**
 * 1. User can vote a topic;
 * 2. User can vote a reply;
 */
class Vote extends Model
{

    protected $fillable = ['user_id', 'votable_id', 'votable_type', 'is'];

    public function votable()
    {
        return $this->morphTo();
    }

    public function scopeByWhom($query, $user_id)
    {
        return $query->where('user_id', '=', $user_id);
    }

    public function scopeWithType($query, $type)
    {
        return $query->where('is', '=', $type);
    }
}
