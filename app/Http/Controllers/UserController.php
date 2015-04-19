<?php 
namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Model\IyoUser;
use App\Model\IyoRelation;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Mail;
use Illuminate\Support\Facades\Redis;

use Cache;

class UserController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
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

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
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

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
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
			$phoneKey = "PHONE_".$phone;
			$randNum = Cache::pull($phoneKey);
			if( $randNum != $request->json("smscode","")) {
				$response = array('code' => trans('code.ValidationCodeError'),'desc' => __LINE__, 'message' => trans('errormsg.ValidationCodeError'));
		        } else {
				$result["result"] = $person;
			}
		}
		return $result;
	}

	public function deluser(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.LoginSuccess'));

		$phone = $request->json("phone","");
		$person = IyoUser::where('phone', $phone)->first();

		if($person == null) {
			$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserNotExist'));
		} else {
			Cache::forget("session_id_$person->id");
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

/*
		$id = Cache::get($request->json("session",""));

		if( $id == "" ) {
			$result = array('code' => trans('code.SessionAlreadyExpired'),'desc' => __LINE__, 'message' => trans('errormsg.SessionAlreadyExpired'));
			return $result;
		}
*/

		$user = IyoUser::find($request->json("id",""));
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

        $union = $this->queryId($request->json("id", 0));
        $result["result"] = $union;

        return $result;
    }


}
