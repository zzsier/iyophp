<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Model\IyoUser;
use Input;
use Cache;

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

	public function uploadPhoto(Request $request)
	{
		$result = array('code' => trans('code.success'),'desc' => __LINE__, 'message' => trans('successmsg.UploadSuccess'));
/*
		if (! $id = Input::get('id')) {
			$result["code"] = 1;
			$result["desc"] = __LINE__;
			$result["message"] = "id不存在";
			return $result;
		}
*/

		if ($file = Input::file('uploadedfile')) {
			$session = $file->getClientOriginalName();
			$id = Cache::get($session);

			if ( $id == null) {
				$result = array('code' => trans('code.UserNotExist'),'desc' => __LINE__, 'message' => trans('errormsg.UserNotExist'));
				return $result;
			}

			$allowed_extensions = ["png", "jpg", "gif"];
			if ($file->getClientOriginalExtension() && !in_array($file->getClientOriginalExtension(), $allowed_extensions)) {
				$result = array('code' => trans('code.UploadExtError'),'desc' => __LINE__, 'message' => trans('errormsg.UploadExtError'));
				return $result;
			}
			$fileName = $file->getClientOriginalName();
			$extension = $file->getClientOriginalExtension() ?: 'png';
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

			$user = IyoUser::find($id);
			$user->imageUrl =  $destinationPath.'/'. $safeName;
			$user->save();
		} else {
			$result = array('code' => trans('code.UploadFileFailed'),'desc' => __LINE__, 'message' => trans('errormsg.UploadFileFailed'));
			return $result;
		}
		return $result;
	}
}
