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

class Favorite extends Model
{
    protected $fillable = [];

    public function post()
    {
        return $this->belongsTo('Post');
    }

    public function user()
    {
        return $this->belongsTo('User');
    }

    public static function isUserFavoritedTopic(User $user, Topic $topic)
    {
        return Favorite::where('user_id', $user->id)
                        ->where('topic_id', $topic->id)
                        ->first();
    }
}
