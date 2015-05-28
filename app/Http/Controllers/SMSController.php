<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Cache;

class SMSController extends Controller {

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

	public function validateSMS(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.SMSValidSuccess'));
		$phoneKey = "PHONE_".$request->json("phone","");
		$randNum = Cache::get($phoneKey);
		if( $randNum != $request->json("smscode","")) {
			$result = array('code' => trans('code.ValidationCodeError'),'desc' => __LINE__, 'message' => trans('errormsg.ValidationCodeError'));
		}
		return $result;
	}	

	//http://apis.haoservice.com/sms/send?key=e4fd3474474643b2b50971052feb268a
	//	&mobile=13641271607&tpl_id=2&tpl_value=$tpl_value

	public function sendSMS(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.SMSSendSuccess'));

		$phone = $request->json("phone","");

		if( $phone == "" ) {
			$result = array('code' => trans('code.PhoneNumFailed'),'desc' => __LINE__, 'message' => trans('errormsg.PhoneNumFailed'));
			return $result;
		}

		$randNum = rand(100000,999999);

		//$randNum = "111111";

		$AccountSid = "aaf98f894c9d994b014ca71423a4071c";
		$AccountToken = "18f54e4c5d1d468caaabbe3a9a87c9f8";
		$AppId = "8a48b5514c9d9c05014ca715778e06f8";
		$ServerIP = "sandboxapp.cloopen.com";
		$ServerPort = '8883';
		$SoftVersion = '2013-12-26';
		$Batch = date("YmdHis");

		$body= "{'to':'$phone','templateId':'1','appId':'8a48b5514c9d9c05014ca715778e06f8','datas':['$randNum','5']}";
		$sig =  strtoupper(md5($AccountSid . $AccountToken . $Batch));
		//$url="https://sandboxapp.cloopen.com:8883/2013-12-26/Accounts/aaf98f894c9d994b014ca71423a4071c/SMS/TemplateSMS?sig=$sig";
		$public_key = "ucloudzz_stephen@163.com1426574643000586424250";
		$private_key = "8c73c19c55c4e537bffc029eafd0c390d1ec10ef";

		$content = "您的验证码是$randNum,请于30分钟内正确输入";
		$content_sig = urlencode("您的验证码是$randNum,请于30分钟内正确输入");

		$public_key_sig = urlencode("ucloudzz_stephen@163.com1426574643000586424250");
		$private_key_sig = "ucloudzz_stephen@163.com1426574643000586424250";

		$key  = "ActionSendSmsContent".$content."Phone.0".$phone."PublicKey".$public_key.$private_key;
		$key_sig  = sha1($key);

		$url="https://api.ucloud.cn/?Action=SendSms&PublicKey=$public_key_sig&Content=$content&Signature=$key_sig&Phone.0=$phone";

		//$authen = base64_encode($AccountSid . ":" . $Batch);
		//$header = array("Accept:application/json","Content-Type:application/json;charset=utf-8","Authorization:$authen");
		
		
		$ch = curl_init(); 
		$res= curl_setopt ($ch, CURLOPT_URL,$url);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt ($ch, CURLOPT_HEADER, 0);
		//curl_setopt($ch, CURLOPT_POST, 1);
		//curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
		//curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
		$response = curl_exec ($ch);
		curl_close($ch);

		if($response == FALSE){
			$result = array('code' => trans('code.NetworkError'),'desc' => __LINE__, 'message' => trans('errormsg.NetworkError'));
			return $result;
		}

/*
		$url = 'http://apis.haoservice.com/sms/send';
		$tpl_value=urlencode("#code#=$randNum&#company#=IYO");
		$data = 'key=e4fd3474474643b2b50971052feb268a'
				 .'&mobile='.$request->json("phone","")
				 .'&tpl_id=2'
				 .'&tpl_value='.$tpl_value;
		
		$ch = curl_init( $url );
		curl_setopt( $ch, CURLOPT_POST, 1);
		curl_setopt( $ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt( $ch, CURLOPT_HEADER, 0);
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
		
		$response = curl_exec( $ch );

*/
		$parameter = json_decode($response, true);

/*
		if( !isset($parameter["error_code"]) ) {
			if( !isset($parameter["reason"]) ) {
				$result["message"] = "短信发送失败";
			} else {
				$result["message"] = $parameter["reason"];
			}
		}

*/
		//if( $parameter["error_code"] == '0' )
		if( $parameter["RetCode"] == '0' )
		{
			$phoneKey = "PHONE_".$request->json("phone","");
			Cache::put($phoneKey, $randNum, 30);
			$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.SMSSendSuccess'));
		}
		else
		{
			$result = array('code' => trans('code.SMSSendFailed'),'desc' => __LINE__, 'message' => trans('errormsg.SMSSendFailed'));
			if( isset($parameter["Message"]) ) {
				$result["message"] = $parameter["Message"];
			}
		}

		return $result;
	}
}
