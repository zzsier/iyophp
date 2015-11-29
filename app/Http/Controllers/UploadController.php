<?php 
namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Model\IyoUser;
use App\Model\IyoTopic;
use App\CropAvatar;
use Input;
use Cache;
use Log;
use Image;
use Redirect;

use Illuminate\Http\Request;

class UploadController extends Controller {

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

	public function uploadBEPhoto(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.UploadSuccess'));

		if ($file = Input::file('uploadedfile')) {
			$extension = "png";
			if( $file->getClientOriginalExtension() && $file->getClientOriginalExtension() != "" ) {
				$extension = $file->getClientOriginalExtension();
			}

			Log::info('extension:'.$extension." filename:".$file->getClientOriginalName());
			$allowed_extensions = ["png", "jpg", "gif", "JPG", "PNG", "GIF", "jpeg", "JPEG"];

			if ( !in_array($extension, $allowed_extensions) ) {
				$result = array('code' => trans('code.UploadExtError'),'desc' => __LINE__, 'message' => trans('errormsg.UploadExtError'));
				return $result;
			}
			$img_info = getimagesize($file);
			
			$destinationPath = 'uploads/'.date("Ymd");
			$original = $file->getClientOriginalName();
			$filename_noext = sha1('topic'.$original.time()).'_'.$img_info[0].'_'.$img_info[1];
			$filename = $filename_noext.'.'.$extension;
			$file->move($destinationPath, $filename);

			Log::info('finalfilename:'.$filename);

			if ($file->getClientOriginalExtension() != 'gif') {
				$img = Image::make($destinationPath . '/' . $filename);
				$img->resize(100, null, function ($constraint) {
					$constraint->aspectRatio();
					$constraint->upsize();
				});
				$img->save($destinationPath."/".$filename_noext."_small.".$extension, 30);
			}

			$result["filename"] = $destinationPath.'/'.$filename;
		} else {
			$result = array('code' => trans('code.UploadFileFailed'),'desc' => __LINE__, 'message' => trans('errormsg.UploadFileFailed'));
			return $result;
		}
		return $result;
	}

	public function uploadUserPhoto(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.UploadSuccess'));

		//$file = Input::file('avatar_file');
		$file = $_FILES['avatar_file'];
		$id = $request["id"];

		if ( $id == null) {
			$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserNotExist'));
			return $result;
		}

		$extension = "png";
		$destinationPath = 'uploads/photos';
		$newfilename = 'user_'.$id;
		$safeName =  'user_'.$id.'.'.$extension;
		//$file->move($destinationPath, $safeName);

		Log::info("avatar_src is ".Input::get('avatar_src')." avatar data is ".
				Input::get('avatar_data')." username is ".$request['username']);

		$crop = new CropAvatar(
		  isset($request['avatar_src']) ? $request['avatar_src'] : null,
		  isset($request['avatar_data']) ? $request['avatar_data'] : null,
		  $file,
		  $destinationPath,
		  $newfilename
		);
		
		$response = array(
		  'state'  => 200,
		  'message' => $crop -> getMsg(),
		  'result' => $crop -> getResult()
		);
	
		$user = IyoUser::find($id);
		$user->imageUrl =  $destinationPath.'/'. $safeName;
		$user->save();

		IyoUser::cleanCache($user->id);

		$url = "backend/user/edit?id=".$id;
		return Redirect::to($url);
	}

	public function uploadMemoryImage(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.UploadSuccess'));

		if ($file = Input::file('uploadedfile')) {
			//$tid = $file->getClientOriginalName();

			//if ( $tid == null) {
			//	$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => '文章不存在');
			//	return $result;
			//}


			$extension = "png";
			if( $file->getClientOriginalExtension() && $file->getClientOriginalExtension() != "" ) {
				$extension = $file->getClientOriginalExtension();
			}

			Log::info('extension:'.$extension." filename:".$file->getClientOriginalName());
			$allowed_extensions = ["png", "jpg", "gif", "JPG", "PNG", "GIF", "jpeg", "JPEG"];

			if ( !in_array($extension, $allowed_extensions) ) {
				$result = array('code' => trans('code.UploadExtError'),'desc' => __LINE__, 'message' => trans('errormsg.UploadExtError'));
				return $result;
			}
			
			$destinationPath = 'uploads/'.date("Ymd");
			$original = $file->getClientOriginalName();
			$filename_noext = sha1('topic'.$original.time());
			$filename = $filename_noext.'.'.$extension;
			$file->move($destinationPath, $filename);

			Log::info('finalfilename:'.$filename);
			//$filename_small = $filename_noext.'_small.'.$extension;
			//$file->move($destinationPath, $filename_small);

			if ($file->getClientOriginalExtension() != 'gif') {
				$img = Image::make($destinationPath . '/' . $filename);
				$img->resize(100, null, function ($constraint) {
					$constraint->aspectRatio();
					$constraint->upsize();
				});
				$img->save($destinationPath."/".$filename_noext."_small.".$extension, 30);
			}

			//$imageobj = [];
			//$newimage = $destinationPath.'/'.$filename;
			//$imageobj["image"] = $newimage;

			//$topic = IyoTopic::find($tid);
			//$body = json_decode($topic->body);
			//$body[] = $imageobj;
			//$topic->body = json_encode($body);

			//$topic->save();

			//IyoTopic::reloadCache($tid);
			$result["result"] = $destinationPath.'/'.$filename;

		} else {
			$result = array('code' => trans('code.UploadFileFailed'),'desc' => __LINE__, 'message' => trans('errormsg.UploadFileFailed'));
			return $result;
		}
		return $result;
	}

	public function uploadPhoto(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.UploadSuccess'));

		if ($file = Input::file('uploadedfile')) {
			$session = $file->getClientOriginalName();
			$id = Cache::get($session);
			Log::info("session is ".$session." id is ".$id);

			if ( $id == null) {
				$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserNotExist'));
				return $result;
			}

			$extension = "png";
			if( $file->getClientOriginalExtension() && $file->getClientOriginalExtension() != "" ) {
				$extension = $file->getClientOriginalExtension();
			}

			$allowed_extensions = ["png", "jpg", "gif", "JPG", "PNG", "GIF", "jpeg", "JPEG"];
			if ( !in_array($extension, $allowed_extensions) ) {
				$result = array('code' => trans('code.UploadExtError'),'desc' => __LINE__, 'message' => trans('errormsg.UploadExtError'));
				return $result;
			}
	
			$fileName = $file->getClientOriginalName();
			$destinationPath = 'uploads/photos';
			$safeName =  'user_'.$id.'.'.$extension;
			$file->move($destinationPath, $safeName);

			// If is not gif file, we will try to reduse the file size
			if ($file->getClientOriginalExtension() != 'gif') {
				// open an image file
				//$img = Image::make($destinationPath . '/' . $safeName);
				//// prevent possible upsizing 
				//$img->resize(1440, null, function ($constraint) {
				//	$constraint->aspectRatio();
				//	$constraint->upsize();
				//});
				//$img->save();
			}

			if ($file->getClientOriginalExtension() != 'gif') {
				$img = Image::make($destinationPath . '/' . $safeName);
				$img->resize(100, null, function ($constraint) {
					$constraint->aspectRatio();
					$constraint->upsize();
				});
				$img->save($destinationPath."/".'user_'.$id."_small.".$extension, 30);
			}

			$user = IyoUser::find($id);
			$user->imageUrl =  $destinationPath.'/'. $safeName;
			$user->save();

			IyoUser::cleanCache($user->id);
			$ruser = IyoUser::queryById($user->id);
			$ruser["imageUrl"] =  $destinationPath.'/'. $safeName;

			$result["result"] = $ruser;
		} else {
			$result = array('code' => trans('code.UploadFileFailed'),'desc' => __LINE__, 'message' => trans('errormsg.UploadFileFailed'));
			return $result;
		}
		return $result;
	}

	public function uploadExample()
	{
		if ($file = Input::file('file')) {
			$allowed_extensions = ["png", "jpg", "gif", "JPG", "PNG", "GIF", "jpeg", "JPEG"];
			if ($file->getClientOriginalExtension() && !in_array($file->getClientOriginalExtension(), $allowed_extensions)) {
				return ['error' => 'You may only upload png, jpg or gif.'];
			}

			$fileName		= $file->getClientOriginalName();
			$extension	   = $file->getClientOriginalExtension() ?: 'png';
			$folderName	  = 'uploads/images/' . date("Ym", time()) .'/'.date("d", time()) .'/'. Auth::user()->id;
			$destinationPath = public_path() . '/' . $folderName;
			$safeName		= str_random(10).'.'.$extension;
			$file->move($destinationPath, $safeName);

			// If is not gif file, we will try to reduse the file size
			if ($file->getClientOriginalExtension() != 'gif') {
				// open an image file
				$img = Image::make($destinationPath . '/' . $safeName);
				// prevent possible upsizing
				$img->resize(1440, null, function ($constraint) {
					$constraint->aspectRatio();
					$constraint->upsize();
				});
				// finally we save the image as a new file
				$img->save();
			}

			$data['filename'] = getUserStaticDomain() . $folderName .'/'. $safeName;

			SiteStatus::newImage();
		} else {
			$data['error'] = 'Error while uploading file';
		}
		return $data;
	}


}
