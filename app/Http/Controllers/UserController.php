<?php 
namespace App\Http\Controllers;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Illuminate\Log\Writer;
use DB;
use MyRedis;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Model\IyoUser;
use App\Model\IyoPlayer;
use App\Model\IyoRelation;
use App\Model\IyoTopic;
use App\Model\IyoBlack;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Mail;
use Redirect;
use Illuminate\Support\Facades\Redis;
use Input;
use View;
use Cache;
use Log;
use Auth;

class UserController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$users = IyoUser::all();

		foreach( $users as $user ) {
			if( $user["type"] == 2 ) {
				$user["type"] = "战队号";
				//$union = IyoUnion::find($id);
				//$redis->set("user:$id:union_description", $union["description"]);
				//$redis->set("user:$id:union_recommend", $union["recommend"]);
			} else if( $user["type"] == 1 ) {
				$user["type"] = "明星号";
			} else {
				$user["type"] = "普通用户";
			}
		}

		return View::make('backend.users.index', compact('users'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		$user = new IyoUser();
		$user['description'] = "";
		$user->id = 0;
		return View::make('backend.users.edit', compact("user"));
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	public function saveOrUpdate(Request $request) {

		$id = $request["id"];

		if( $id == 0 ) {
			$user = new IyoUser();
		} else {
			$user = IyoUser::find($id);
		}

		$user->username = $request["username"];
		$user->phone = $request["phone"];
		$user->type = $request["type"];
		$user->rusername = $request["username"];
		$user->description = $request["description"];
		$user->password = $request["password"];

		if( $request["recommend"] == true ) {
			$user->recommend = 1;
		} else {
			$user->recommend = 0;
		}

		//$user->imageUrl= $request["image"];

		$user->save();
		IyoUser::cleanAll($request["id"]);

		return Redirect::to('backend/user/list');
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit(Request $request)
	{
		$user = IyoUser::find($request["id"]);
		IyoUser::cleanAll($request["id"]);
		return View::make('backend.users.edit', compact('user'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	public function destroy(Request $request)
	{
		$user = IyoUser::findOrFail($request["id"]);
		IyoUser::cleanAll($request["id"]);
		$user->delete();
		return Redirect::to('backend/user/list');
	}

	public function login(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.LoginSuccess'));

		$phone = $request->json("phone","");
		$password = $request->json("password","");
		$smscode = $request->json("smscode","");
		if( $phone == "" || $password == "" ) {
			$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => "用户名或者密码为空");
			return $result;
		}
		$person = IyoUser::where('phone', $phone)->first();

        //$sqls = DB::getQueryLog();
        //$logger = new Writer(new Logger("info"));
        //$logger->useFiles(storage_path().'/logs/sql.log');
        //$logger->info($sqls);

		if( $smscode == "" ) {
			if($person == null) {
				$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserNotExist'));
			//} elseif($person->password != md5(md5($password).$person->salt)) {
			} elseif($person->password != $password) {
				$result = array('code' => trans('code.PasswordError'),'desc' => __LINE__, 'message' => trans('errormsg.PasswordError'));
			} else {
				if( $person->hxuser == "" ) {
					$this->registerHXUser($person["id"]);
					$person = IyoUser::queryById($person["id"]);
				}
				Auth::login($person, true);
				$uid = $person["id"];
				Cache::put("session_id_$uid", $uid, 3600);
				$person["session"] = "session_id_$uid";
				$result["result"] = $person;
			}
		} else {
			if($person == null) {
				$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserNotExist'));
				return $result;
			}
			$phoneKey = "PHONE_".$phone;
			$randNum = Cache::get($phoneKey);
			if( $randNum != $request->json("smscode","")) {
				$result = array('code' => trans('code.ValidationCodeError'),'desc' => __LINE__, 'message' => trans('errormsg.ValidationCodeError'));
			} else {
				if( $person->hxuser == "" ) {
					$this->registerHXUser($person->id);
					$person = IyoUser::queryById($person->id);
				}
				Cache::put("session_id_$uid", $uid, 3600);
				$person["session"] = "session_id_$uid";
				$result["result"] = $person;
			}
		}
		return $result;
	}

	public function deluser(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.LoginSuccess'));

		$phone = $request->json("phone","");

		if( $phone == "" ) {
			$phone = Input::get('phone');
		}

		$person = IyoUser::where('phone', $phone)->first();

		if($person == null) {
			$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserNotExist'));
			return $result;
		} else {
			Cache::forget("session_id_$person->id");
			IyoUser::cleanAll($person->id);
		}

		$person->delete();

		return $result;
	}

	//curl -X POST -i "https://a1.easemob.com/iyo/iyo/users" -d '{"username":"jliu","password":"123456"}' 
	/*
HTTP/1.1 200 OK
Server: Tengine/2.0.3
Date: Tue, 16 Jun 2015 14:48:01 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Set-Cookie: rememberMe=deleteMe; Path=/; Max-Age=0; Expires=Mon, 15-Jun-2015 14:48:01 GMT
Access-Control-Allow-Origin: *

{
  "action" : "post",
  "application" : "87a4f7b0-d87b-11e4-bc70-2d7e51356303",
  "path" : "/users",
  "uri" : "https://a1.easemob.com/iyo/iyo/users",
  "entities" : [ {
    "uuid" : "aff9525a-1436-11e5-96c5-ef938e1f8c2b",
    "type" : "user",
    "created" : 1434466081781,
    "modified" : 1434466081781,
    "username" : "jliu",
    "activated" : true
  } ],
  "timestamp" : 1434466081780,
  "duration" : 36,
  "organization" : "iyo",
  "applicationName" : "iyo"
*/

	public function registerHXUser($id) 
	{
		$user = IyoUser::find($id);
		$token = md5($user->phone.$user->password.$user->email.$user->username.$user->rusername.time());

		$user["hxuser"] = $token;
		$user["hxpassword"] = md5($token);
		$username = $user["hxuser"];
		$password = $user["hxpassword"];

		$url="https://a1.easemob.com/iyo/iyo/users";
		$body= "{\"username\":\"$username\",\"password\":\"$password\"}";
		$header = array("Content-Type:application/json;charset=utf-8");

		$ch = curl_init(); 
		$res= curl_setopt ($ch, CURLOPT_URL,$url);  
		curl_setopt ($ch, CURLOPT_HEADER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
		$response = curl_exec ($ch);
		curl_close($ch);

		if( strpos($response, "error") != FALSE ) {
			Log::info($response);
			return FALSE;
		}

		$user->save();
		IyoUser::cleanCache($id);
		return TRUE;
	}

	public function sendValidationEmail(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => '邮件发送成功');

		$id = $request["id"];
		$user = IyoUser::find($id);

		if($user == null) {
			$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserNotExist'));
			return $result;
		}

		$user->email = $request->json("email", "");
		if( $user->email == "" ) {
			$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => "用户邮箱为空");
			return $result;
		}

		$token = md5($user->phone.$user->password.$user->email);
		$user["token"] = $token;
		$user["activate"] = 0;
		$user->save();
		IyoUser::cleanCache($id);

		if( $user->email != "" ) {
			$data = ['email'=>$user->email, 'name'=>$user->phone, 'uid'=>$user->id, 'activationcode'=>$user["token"]];
			Mail::send('activemail', $data, function($message) use($data)
			{
				$message->to($data['email'], $data['name'])->subject('欢迎注册IYO应用，请激活您的账号！');
			});
		}

		return $result;
	}

	public function sendCodeEmail(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => '邮件发送成功');

		$id = $request["id"];
		$user = IyoUser::find($id);

		if($user == null) {
			$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserNotExist'));
			return $result;
		}

		if( $user->email == "" ) {
			$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => "用户邮箱为空");
			return $result;
		}

		if( $user->phone == "" ) {
			$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => "用户手机号码为空");
			return $result;
		}

		$randNum = rand(100000,999999);
		$phoneKey = "PHONE_".$user->phone;
		Cache::put($phoneKey, $randNum, 30);

		if( $user->email != "" ) {
			$data = ['email'=>$user->email, 'name'=>$user->phone, 'uid'=>$user->id, 'smscode'=>$randNum];
			Mail::send('smsemail', $data, function($message) use($data)
			{
				$message->to($data['email'], $data['name'])->subject('欢迎注册IYO应用，请激活您的账号！');
			});
		}

		return $result;
	}


	public function register(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.RegisterSuccess'));

		$user = new IyoUser();

		$user->phone = $request->json("phone","");
		$user->password = $request->json("password","");
		$user->email = $request->json("email","");

		$person = IyoUser::where('phone', $user->phone)->first();
		if($person != null) {
			$result = array('code' => trans('code.UserAleadyExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserAleadyExist'));
			return $result;
		}

		$rusername = $request->json("rusername","");
		if( $rusername == "" ) {
			$result = array('code' => trans('code.UserAleadyExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserAleadyExist'));
			return $result;
		}

		$person = IyoUser::where('rusername', $rusername)->first();
		if($person != null) {
			$result = array('code' => trans('code.UserAleadyExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserAleadyExist'));
			return $result;
		}
		$user->rusername = $rusername;
		$user->username = $rusername;

			
		$token = md5($user->phone.$user->password.$user->email);
		$user["token"] = $token;
		$user["activate"] = 0;
		$user->save();

		if( $user->email != "" ) {

			$data = ['email'=>$user->email, 'name'=>$user->phone, 'uid'=>$user->id, 'activationcode'=>$user["token"]];
			Mail::send('activemail', $data, function($message) use($data)
			{
				$message->to($data['email'], $data['name'])->subject('欢迎注册IYO应用，请激活您的账号！');
			});
		}
		$user->save();

		if( $this->registerHXUser($user->id) == FALSE ) {
			$result = array('code' => trans('code.UserAleadyExist'),'desc' => __LINE__, 'message' => "环信用户注册失败");
			return $result;
		}

		$user = IyoUser::queryById($user->id);
		$uid = $user["id"];
		IyoRelation::add($uid, 127);
		$user["session"] = "session_id_$uid";
		Cache::put("session_id_$uid", $uid, 3600);

		unset($user["token"]); 
		unset($user["activate"]); 
		unset($user["created_at"]); 
		unset($user["updated_at"]); 

		$result["result"] = $user;

		return $result;
	}

	public function resetPassword(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.ResetPasswordSuccess'));

		$user = IyoUser::find($request["id"]);
		if( $user == null ) {
			$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserNotExist'));
			return $result;
		}

		$oldpassword = $request->json("oldpassword","");
		$smscode = $request->json("smscode","");

		if( $smscode != "" ) {
			$phoneKey = "PHONE_".$user->phone;
			$randNum = Cache::get($phoneKey);
			if( $randNum != $smscode ) {
				$result = array('code' => trans('code.ValidationCodeError'),'desc' => __LINE__, 'message' => trans('errormsg.ValidationCodeError'));
			}
		} else {
			if( $user->password != $oldpassword ) {
				$result = array('code' => trans('code.PasswordError'),'desc' => __LINE__, 'message' => trans('errormsg.PasswordError'));
				return $result;
			}
		}

		$user["password"] = $request->json("password","");
		$user->save();

		return $result;
	}

	public function location(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => '记录位置成功');

		$lat = $request->json("lat", "");
		$lng = $request->json("lng", "");

		$user = IyoUser::find($request["id"]);
		$user->lat = $lat;
		$user->lng = $lng;
		//http://api.map.baidu.com/geocoder?location=40.0,116.5&output=json

		$url="http://api.map.baidu.com/geocoder?location=$lat,$lng&output=json";

		$ch = curl_init(); 
		$res= curl_setopt ($ch, CURLOPT_URL,$url);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt ($ch, CURLOPT_HEADER, 0);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
		$response = curl_exec ($ch);
		curl_close($ch);

		if($response == FALSE){
			$result = array('code' => trans('code.NetworkError'),'desc' => __LINE__, 'message' => trans('errormsg.NetworkError'));
			return $result;
		}

		$parameter = json_decode($response, true);

		//if( $parameter["error_code"] == '0' )
		if( $parameter["status"] == 'OK' )
		{
			$user->currentcity = $parameter["result"]["addressComponent"]["province"]. $parameter["result"]["addressComponent"]["city"];
			$redis = MyRedis::connection("default");
			$key = "location:".$user->currentcity;
			if( $redis->exists($key) ) {
				$redis->sadd($key, $user->id);
			}
		}

		$user->save();
		return $result;
	}

	public function nearby(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => '获取附近的人成功');

		$lat = $request->json("lat", "");
		$lng = $request->json("lng", "");

		Log::info("lat is $lat and lng is $lng");

		$user = IyoUser::find($request["id"]);
		$user->lat = $lat;
		$user->lng = $lng;
		//http://api.map.baidu.com/geocoder?location=40.0,116.5&output=json

		$url="http://api.map.baidu.com/geocoder?location=$lat,$lng&output=json";

		$ch = curl_init(); 
		$res= curl_setopt ($ch, CURLOPT_URL,$url);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt ($ch, CURLOPT_HEADER, 0);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
		$response = curl_exec ($ch);
		curl_close($ch);

		if($response == FALSE){
			$result = array('code' => trans('code.NetworkError'),'desc' => __LINE__, 'message' => trans('errormsg.NetworkError'));
			return $result;
		}

		$parameter = json_decode($response, true);

		//if( $parameter["error_code"] == '0' )
		if( $parameter["status"] == 'OK' )
		{
			$user->currentcity = $parameter["result"]["addressComponent"]["province"]. $parameter["result"]["addressComponent"]["city"];
			$redis = MyRedis::connection("default");
			$key = "location:".$user->currentcity;
			if( $redis->exists($key) ) {
				$redis->sadd($key, $user->id);
			}
		}
		$user->save();

		$redis = MyRedis::connection("default");
		$key = "location:".$user->currentcity;
		if( !$redis->exists($key) ) {
			$list = [];
			$list = IyoUser::where('currentcity', $user->currentcity)->get(["id"]);
			foreach( $list as $uid ) {
				$redis->sadd($key,$uid['id']);
			}
			$redis->pexpire($key, 24*60*60*60);
		}

		$uids = $redis->srandmember($key, 20);	
		$users = [];
		foreach( $uids as $uid ) {
			//remove self id for nearby user
			if( $uid == $user->id ) continue;

			$nuser = $this->queryUserById($user->id, $uid);
			if( is_null($nuser) ) {
				continue;
			}
			$users[] = $nuser;
		}

		$result["result"] = $users;
		return $result;
	}

	//get the player in the same server
	public function serverby(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => '获取同服游戏人员成功');
		$user = IyoUser::find($request["id"]);
		$users = [];

		$players = IyoPlayer::where('uid', $user->id)->get(["id", "gid", "sid"]);


		$redis = MyRedis::connection("default");
		$full_uids = [];

		foreach( $players as $player ) {
			$key = "player:".$player["gid"].":".$player["sid"];
			if( !$redis->exists($key) ) {
				$list = IyoPlayer::where('sid', $player["sid"])->where('gid', $player["gid"])->get(["uid"]);
				foreach( $list as $ulist ) {
					$redis->sadd($key,$ulist['uid']);
				}
				$redis->pexpire($key, 60*1000);
			}

			$part_uids = $redis->srandmember($key, 20);
			foreach( $part_uids as $uid ) {
				//remove self id for nearby user
				if( $uid == $user->id ) continue;
				$full_uids[] = $uid;
			}
		}

		if( count($full_uids) == 0 ) {
			$result["result"] = $users;
			return $result;
		}

		$full_uids_unique = array_unique($full_uids);

		$randnum = 20;
		if( $randnum >= count($full_uids_unique) ) $randnum =  count($full_uids_unique);
		Log::info("randnum is $randnum");

		$full_uids_20 = array_rand($full_uids_unique, $randnum);

		foreach( $full_uids_20 as $uid_index ) {
			$uid = $full_uids_unique[$uid_index];
			Log::info("uid 20 is $uid");
			//remove self id for nearby user
			if( $uid == $user->id ) continue;

			$nuser = $this->queryUserById($user->id, $uid);
			if( is_null($nuser) ) {
				continue;
			}
			$users[] = $nuser;
		}

		$result["result"] = $users;
		return $result;
	}



	public function search(Request $request) {

		$response = array('code' => trans('code.success'),'desc' => __LINE__,'messsage' => "搜索成功");

		$username = $request->json("search","");
		$num = $request->json("num",0);
		$current = $request->json("current",0);
		$id = $request["id"];

		if( $username == "" ) {
			$result = array('code' => trans('code.InvalidParameter'),'desc' => __LINE__,
				'message' => '参数不完整');
			return $result;
		}

		$user_ids = IyoUser::search($username, $num, $current);

		$stars = [];
		foreach ($user_ids as $uid) {
			$user = $this->queryUserById($id, $uid);
			$stars[] = $user;
		}

		$response["result"] = $stars;
		return $response;
	}

	public function searchByHXName(Request $request) {

		$response = array('code' => trans('code.success'),'desc' => __LINE__,'messsage' => "搜索成功");

		$username = $request->json("search","");

		if( $username == "" ) {
			$result = array('code' => trans('code.InvalidParameter'),'desc' => __LINE__,
				'message' => '参数不完整');
			return $result;
		}

		$uid = IyoUser::searchByHXName($username);
		$user = IyoUser::queryById($uid);

		$response["result"] = $user;
		return $response;
	}

	public function validateEmail(Request $request)
	{
		$id = $request->input('id', '');
		$token = $request->input('activationcode', '');

		$user = IyoUser::find($id);
		if($user == null) {
			return view('validatemail')->with('message', '邮箱验证失败，用户不存在');
		}
			
		if( $token != $user['token'] ) {
			return view('validatemail')->with('message', '邮箱验证失败，token错误');
		}

		$user["activate"]=1;
		$user->save();

		return view('validatemail')->with('message', '邮箱验证通过');
	}

	public function queryUserById($id, $fid)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => "获取成功");

		$user = IyoUser::queryById($fid);

		if( $user["id"] == "" ) {
			$result = array('code' => 1,'desc' => __LINE__,
				'message' => "用户不存在");
			return $result;
		}

		if( $user["hxuser"] == "" ) {
			$this->registerHXUser($user["id"]);
			$user = IyoUser::queryById($user["id"]);
		}

		if( IyoRelation::checkIfFollow($id, $fid) ) {
			$user["follow"] = true;
		} else {
			$user["follow"] = false;
		}

		if( IyoBlack::checkIfBlack($id, $fid)
				|| IyoBlack::checkIfBlock($id, $fid) ) {
			$user["black"] = true;
		} else {
			$user["black"] = false;
		}

		return $user;
	}


	public function queryUser(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => "获取成功");

		$fid = $request->json("fid",0);

		$result["result"] = $this->queryUserById($request["id"], $fid);
		return $result;
	}

	public function queryUnion(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => "获取成功");

		$user = IyoUser::queryById($request->json("fid",0));

		if( $user == null ) {
			$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserNotExist'));
			return $result;
		}

		if( IyoRelation::checkIfFollow($request["id"], $request->json("fid",0)) ) {
			$user["follow"] = true;
		} else {
			$user["follow"] = false;
		}

		$topic_ids = IyoTopic::queryTopicIdsByUser($user["id"], 10, 0);

		$topics = [];
		foreach( $topic_ids as $tid ) {
			$topic = IyoTopic::queryById($tid);
			$iuser = IyoUser::queryById($topic["uid"]);
			$topic["user"] = $iuser;
			$topics[] = $topic;
		}

		$user["topic"] = $topics;


		$result["result"] = $user;
		
		return $result;
	}

	public function bind(Request $request) {
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '绑定成功');
		
		$user = IyoUser::find($request["id"]);
		$uid = $request->json("fid",0);

		$user->bind = $uid;

		$user->save();

		IyoUser::cleanCache($request["id"]);
		return $result;
	}

	public function updateUser(Request $request) {
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => '更新成功');
		
		$user = IyoUser::find($request["id"]);
		$username = $request->json("username", "");
		$age = $request->json("age","");
		$sex = $request->json("sex","");
		$loc = $request->json("loc","");
		$phone = $request->json("phone","");
		$rusername = $request->json("rusername","");

		if( $username != "" ) {
			$user->username = $username;
		}
		if( $rusername != "" ) {
			$person = IyoUser::where('rusername', $rusername)->first();
			if($person != null) {
				$result = array('code' => trans('code.UserAleadyExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserAleadyExist'));
				return $result;
			}
			$user->rusername = $rusername;
		}
		if( $age != "" ) {
			$user->age = $age;
		}
		if( $sex != "" ) {
			$user->sex = $sex;
		}
		if( $loc != "" ) {
			$user->loc = $loc;
		}
		if( $phone != "" ) {
			$person = IyoUser::where('phone', $phone)->first();
			if($person != null) {
				$result = array('code' => trans('code.UserAleadyExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserAleadyExist'));
				return $result;
			}

			$smscode = $request->json("smscode","");
			if( $smscode != "" ) {
				$phoneKey = "PHONE_".$phone;
				$randNum = Cache::get($phoneKey);
				if( $randNum != $smscode ) {
					$result = array('code' => trans('code.ValidationCodeError'),'desc' => __LINE__, 'message' => trans('errormsg.ValidationCodeError'));
					return $result;
				}
			} else {
				$result = array('code' => trans('code.ValidationCodeError'),'desc' => __LINE__, 'message' => trans('errormsg.ValidationCodeError'));
				return $result;
			}

			$user->phone = $phone;
		}
		$user->save();

		IyoUser::cleanCache($request["id"]);
		return $result;
	}
}
