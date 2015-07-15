<?php 
namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;
use DB;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Illuminate\Log\Writer;
use Illuminate\Database\Eloquent\SoftDeletes;

class IyoAnswer extends Model {

	public static function saveOrUpdate($content, $qid, $uid)
	{
		$answer = new IyoAnswer();

		$answer->content = $content;
		$answer->qid = $qid;
		$answer->uid = $uid;
		$answer->save();

		return $answer;
	}
}
