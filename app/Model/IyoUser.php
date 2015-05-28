<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use DB;
use Carbon\Carbon;

class IyoUser extends Model {

	const PREFIX="user";
	const ATTR_USERNAME="username";
	const ATTR_TYPE="type";
	const ATTR_PHONE="phone";
	const ATTR_EMAIL="email";
	const ATTR_IMAGE="image";
	const ATTR_FOLLOW="numOfFollow";
	const ATTR_DESCRIPTION="description";
	const ATTR_BIND="bind";
	const ATTR_RECOMMEND="recommend";
	const ATTR_CREATEDAT="created_at";
	const ATTR_SEX="sex";
	const TYPELIST="user:%s:list";
	const TYPELEXPIRED=60000;

	public function asDateTime($value)
	{
		return date("Y年m月d日", strtotime($value));
	}

	public static function getOrderName($id) {
		return IyoUser::PREFIX.":*:".IyoUser::ATTR_USERNAME;
	}

	public static function getValue($id, $attr) {
		$redis = MyRedis::connection("default");
		if(!$redis->exists(IyoUser::PREFIX.":$id:$attr")) {
			IyoUser::loadDataInToCache($id);
		}
		if($redis->exists(IyoUser::PREFIX.":$id:$attr")) {
			return $redis->get(IyoUser::PREFIX.":$id:$attr");
		} else {
			return "";
		}
	}

	public static function getArrayValue($id, $attrname, $attrvalue, $name, $num=0, $current=0) {
		$redis = MyRedis::connection("default");
		if(!$redis->exists("$name")) {
			$list = [];
			if( $attrname == 'type' ) {
				$list = IyoUser::where('type', $attrvalue)->orderBy('follow_count','desc')->get(["id"]);
			}
			foreach( $list as $uid ) {
				$redis->lpush("$name", $uid["id"]);
			}
			if( $attrname == 'type' ) {
				$redis->pexpire($name, IyoUser::TYPELEXPIRED);
			}
		}

		$length = $redis->llen("$name");

		if( $num == 0 ) {
			$stop = $current + $length - 1;
		} else {
			$stop = $current + $num - 1;
		}

		if( $stop > $length - 1 ) {
			$stop = $length - 1;
		}

		$list = $redis->lrange("$name", $current, $stop);

		return $list;
	}

	public static function loadDataInToCache($id) {
		$redis = MyRedis::connection("default");
		$user = IyoUser::find($id);
		$redis->set(IyoUser::PREFIX.":$id:".IyoUser::ATTR_USERNAME, $user["username"]);
		$redis->set(IyoUser::PREFIX.":$id:".IyoUser::ATTR_TYPE, $user["type"]);
		$redis->set(IyoUser::PREFIX.":$id:".IyoUser::ATTR_PHONE, $user["phone"]);
		$redis->set(IyoUser::PREFIX.":$id:".IyoUser::ATTR_EMAIL, $user["email"]);
		$redis->set(IyoUser::PREFIX.":$id:".IyoUser::ATTR_IMAGE, $user["imageUrl"]);
		$redis->set(IyoUser::PREFIX.":$id:".IyoUser::ATTR_FOLLOW, $user["follow_count"]);
		$redis->set(IyoUser::PREFIX.":$id:".IyoUser::ATTR_DESCRIPTION, $user["description"]);
		$redis->set(IyoUser::PREFIX.":$id:".IyoUser::ATTR_BIND, $user["bind"]);
		$redis->set(IyoUser::PREFIX.":$id:".IyoUser::ATTR_SEX, $user["sex"]);
		$redis->set(IyoUser::PREFIX.":$id:".IyoUser::ATTR_CREATEDAT, $user["created_at"]);
		$redis->set(IyoUser::PREFIX.":$id:".IyoUser::ATTR_RECOMMEND, $user["recommend"]);
	}

	public static function cleanCache($id) {
		$redis = MyRedis::connection("default");
		$redis->del(IyoUser::PREFIX.":$id:".IyoUser::ATTR_USERNAME);
		$redis->del(IyoUser::PREFIX.":$id:".IyoUser::ATTR_TYPE);
		$redis->del(IyoUser::PREFIX.":$id:".IyoUser::ATTR_PHONE);
		$redis->del(IyoUser::PREFIX.":$id:".IyoUser::ATTR_EMAIL);
		$redis->del(IyoUser::PREFIX.":$id:".IyoUser::ATTR_IMAGE);
		$redis->del(IyoUser::PREFIX.":$id:".IyoUser::ATTR_FOLLOW);
		$redis->del(IyoUser::PREFIX.":$id:".IyoUser::ATTR_DESCRIPTION);
		$redis->del(IyoUser::PREFIX.":$id:".IyoUser::ATTR_BIND);
		$redis->del(IyoUser::PREFIX.":$id:".IyoUser::ATTR_RECOMMEND);
		$redis->del(IyoUser::PREFIX.":$id:".IyoUser::ATTR_SEX);
		$redis->del(IyoUser::PREFIX.":$id:".IyoUser::ATTR_CREATEDAT);
	}

	public static function reloadCache($id) {
		IyoUser::cleanCache($id);
		IyoUser::loadDataInToCache($id);
	}


	public static function queryById($id)
	{
		$result = [];
		$result["id"] = $id;
		$result[IyoUser::ATTR_USERNAME] = IyoUser::getValue($id, IyoUser::ATTR_USERNAME);
		$result[IyoUser::ATTR_TYPE] = IyoUser::getValue($id, IyoUser::ATTR_TYPE);
		$result[IyoUser::ATTR_PHONE] = IyoUser::getValue($id, IyoUser::ATTR_PHONE);
		$result[IyoUser::ATTR_EMAIL] = IyoUser::getValue($id, IyoUser::ATTR_EMAIL);
		$result[IyoUser::ATTR_IMAGE] = IyoUser::getValue($id, IyoUser::ATTR_IMAGE);
		$result[IyoUser::ATTR_FOLLOW] = IyoUser::getValue($id, IyoUser::ATTR_FOLLOW);
		$result[IyoUser::ATTR_BIND] = IyoUser::getValue($id, IyoUser::ATTR_BIND);
		$result[IyoUser::ATTR_DESCRIPTION] = IyoUser::getValue($id, IyoUser::ATTR_DESCRIPTION);
		$result[IyoUser::ATTR_RECOMMEND] = IyoUser::getValue($id, IyoUser::ATTR_RECOMMEND);
		$result[IyoUser::ATTR_SEX] = IyoUser::getValue($id, IyoUser::ATTR_SEX);
		$result[IyoUser::ATTR_CREATEDAT] = IyoUser::getValue($id, IyoUser::ATTR_CREATEDAT);

		return $result;
	}

	public static function increaseNumOfFollow($id)
	{
		DB::table('iyo_users')->where('id', $id)->increment('follow_count');

		$redis = MyRedis::connection("default");
		if( $redis->exists(IyoUser::PREFIX.":$id:".IyoUser::ATTR_FOLLOW) )
		{
			$redis->incr(IyoUser::PREFIX.":$id:".IyoUser::ATTR_FOLLOW);
		}
	}

	public static function decreaseNumOfFollow($id)
	{
		DB::table('iyo_users')->where('id', $id)->decrement('follow_count');

		$redis = MyRedis::connection("default");
		if( $redis->exists(IyoUser::PREFIX.":$id:".IyoUser::ATTR_FOLLOW) )
		{
			$redis->decr(IyoUser::PREFIX.":$id:".IyoUser::ATTR_FOLLOW);
		}
	}

	public static function queryListByType($type, $num=0, $current=0)
	{
		$key = sprintf(IyoUser::TYPELIST, $type);
		$ids = IyoUser::getArrayValue(0, 'type', $type, $key, $num, $current);
		return $ids;
	}

	public static function searchByUsername($username, $type, $num=0, $current=0) {
		$list = [];
		$ids = [];
		if( $num == 0 ) {
			$list = IyoUser::where("type", $type)->where('username', 'like', '%'.$username.'%')->orderby('follow_count')->get(["id"]);
		} else {
			$list = IyoUser::where("type", $type)->where('username', 'like', '%'.$username.'%')->orderby('follow_count')
				->skip($current)->take($num)->get(["id"]);
		}

		foreach( $list as $tid ) {
			$ids[] = $tid["id"];
		}

		return $ids;
	}

}
