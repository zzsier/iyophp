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

class IyoQuestion extends Model {

	use SoftDeletes;
	protected $dates = ['deleted_at'];

	public static $attrnames = array(
		array("cache"=>"id", "db"=> "id", "return"=>"qid"),
		array("cache"=>"content", "db"=> "content", "return"=>"content"),
		array("cache"=>"qstatus", "db"=> "qstatus", "return"=>"qstatus"),
		array("cache"=>"created_at", "db"=> "created_at", "return"=>"created_at"),
	);

	const QUESTION="question:%s";
	const LATEST="question:latest";

	public static function saveOrUpdate($content, $qid=0)
	{
		if( $qid == 0 ) {
			$question = new IyoQuestion();
		} else {
			$question = IyoQuestion::find($qid);
		}

		$question->content = $content;
		$question->save();

		$redis = MyRedis::connection("default");
		$id = $question->id;
		IyoQuestion::reloadCache($id);
		$question = IyoQuestion::queryById($id);

		return $question;
	}

	public static function changestatus($status, $qid)
	{
		Log::info( "status is ".$status." qid: ".$qid );
		$question = IyoQuestion::find($qid);
		if( $status == 'true' ) {
			$question->qstatus = 0;
		} else {
			$question->qstatus = 1;
		}
		Log::info( "qstatus is ".$question->qstatus );
		$question->save();

		$redis = MyRedis::connection("default");
		IyoQuestion::cleanCache($qid);

		return $question;
	}


	public static function destroy($id, $uid=0)
	{
		$redis = MyRedis::connection("default");
		$question = IyoQuestion::find($id);
		if( !is_null($question) ) {
			$question->delete();
		}
		IyoQuestion::cleanCache($id);
	}

	public static function reloadCache($id) {
		IyoQuestion::cleanCache($id);
		IyoQuestion::loadDataInToCache($id);
	}

	public static function loadDataInToCache($id) {
		$redis = MyRedis::connection("default");
		$dbquestion = IyoQuestion::find($id);
		if( is_null($dbquestion) ) return;
		$key = sprintf(IyoQuestion::QUESTION, $id);
		foreach( self::$attrnames as $attrname ) {
			$redis->hmset($key, $attrname["cache"], $dbquestion[$attrname["db"]]);
		}
	}

	public static function cleanCache($id) {
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoQuestion::QUESTION, $id);
		$redis->del($key);
		$redis->del(IyoQuestion::LATEST);
	}

	public static function queryById($id)
	{
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoQuestion::QUESTION, $id);

		if( !$redis->exists($key) ) {
			IyoQuestion::reloadCache($id);
		}

		if( !$redis->exists($key) ) {
			return null;
		}

		$topic = [];
		foreach( self::$attrnames as $attrname ) {
			$topic[$attrname["return"]] = $redis->hget($key, $attrname["cache"]);
		}
		return $topic;
	}

	public static function getLatestQuestionId()
	{
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoQuestion::LATEST);

		if( $redis->exists($key) ) {
			$qid = $redis->get($key);
			$question = IyoQuestion::queryById($qid);
			if( $question["qstatus"] == 0 ) {
				return $qid;
			}
			$redis->del($key);
		}

		$question = IyoQuestion::where('qstatus', '0')->orderBy('created_at', 'desc')
			->first();

		$redis->set($key, $question->id);
		return $question->id;
	}

}
