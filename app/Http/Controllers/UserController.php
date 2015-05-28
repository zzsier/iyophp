<?php 
namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Model\IyoUser;
use App\Model\IyoRelation;
use App\Model\IyoTopic;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Mail;
use Redirect;
use Illuminate\Support\Facades\Redis;
use Input;
use View;
use Cache;

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
		$user->description = $request["description"];
		if( $request["recommend"] == true ) {
			$user->recommend = 1;
		} else {
			$user->recommend = 0;
		}

		//$user->imageUrl= $request["image"];

		$user->save();
		IyoUser::cleanCache($request["id"]);

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
		IyoUser::cleanCache($request["id"]);
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
		IyoUser::cleanCache($request["id"]);
		$user->delete();
		return Redirect::to('backend/user/list');
	}

	public function login(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.LoginSuccess'));

		$phone = $request->json("phone","");
		$password = $request->json("password","");
		$smscode = $request->json("smscode","");
		$person = IyoUser::where('phone', $phone)->first();

		unset($person["token"]); 
		unset($person["activate"]); 
		unset($person["created_at"]); 
		unset($person["updated_at"]); 

		if( $smscode == "" ) {
			if($person == null) {
				$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserNotExist'));
			//} elseif($person->password != md5(md5($password).$person->salt)) {
			} elseif($person->password != $password) {
				$result = array('code' => trans('code.PasswordError'),'desc' => __LINE__, 'message' => trans('errormsg.PasswordError'));
			} else {
				Cache::put("session_id_$person->id", $person->id, 3600);
				$person["session"] = "session_id_$person->id";
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
				Cache::put("session_id_$person->id", $person->id, 3600);
				$person["session"] = "session_id_$person->id";
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
			IyoUser::cleanCache($person->id);
		}

		$person->delete();

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
			
		$user["token"] = md5($user->phone.$user->password.$user->email);
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

		$user["session"] = "session_id_$user->id";
		Cache::put("session_id_$user->id", $user->id, 3600);

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

		$user["password"] = $request->json("password","");
		$user->save();

		return $result;
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

	public function queryById(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => trans('successmsg.FollowSuccess'));
		
		$union = $this->queryId($request["id"]);
		$result["result"] = $union;
		
		return $result;
	}
	
	public function queryUser(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => "获取成功");

		$user = IyoUser::queryById($request->json("fid",0));
		if( IyoRelation::checkIfFollow($request["id"], $request->json("fid",0)) ) {
			$user["follow"] = true;
		} else {
			$user["follow"] = false;
		}

		$result["result"] = $user;
		
		return $result;
	}

	public function queryUnion(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__,
			'message' => "获取成功");

		$user = IyoUser::queryById($request->json("fid",0));

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
}
