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

class Append extends Model
{
    protected $fillable = ['topic_id', 'content'];

    public function topic()
    {
        return $this->belongsTo('Topic');
    }
}
