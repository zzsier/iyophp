@extends('backend.layouts.default')

@section('title')
编辑个人资料_@parent
@stop

@section('content')

<div class="users-show">

  <div class="main-col left-col">
    <div class="panel panel-default">
      <div class="panel-body ">
        <div class="alert alert-warning">
        </div>

		<form method="post" action="{{ URL::to('backend/user/saveOrUpdate') }}">

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
			<div class="col-sm-10"><input type="hidden" name="id" class="form-control" value="{{ $user->id }}" /></div>
		  </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="username">用户名</label>
			<div class="col-sm-10"><input type="text" name="username" class="form-control" value="{{ $user->username }}" /></div>
          </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="phone">电话</label>
			<div class="col-sm-10"><input type="text" class="form-control" name="phone" value="{{ $user->phone }}" /></div>
          </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="type">用户类型</label>
			<div class="col-sm-10">
			<select class="form-control" name="type">
              @if( $user->type == 0 )
                <option value="0" selected="true">普通用户</option>
              @else
                <option value="0">普通用户</option>
              @endif
              @if( $user->type == 1 )
                <option value="1" selected="true">明星用户</option>
              @else
                <option value="1">明星用户</option>
              @endif
              @if( $user->type == 2 )
                <option value="2" selected="true">战队</option>
              @else
                <option value="2">战队</option>
              @endif
            </select>
			</div>
          </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="type">用户描述</label>
			<div class="col-sm-10">
		    <textarea row="5" name="description" class="form-control" style="height:100px;">{{ $user["description"] }}</textarea>
			</div>
          </div>

		@if ($user->type == 2)
          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="type">推荐</label>
			<div class="col-sm-10">
			@if ($user->recommend == 1)
			    <input type="checkbox" name="recommend" checked="true">
			@else
			    <input type="checkbox" name="recommend">
			@endif
		    <textarea row="5" name="description" class="form-control" style="height:100px;">{{ $user["description"] }}</textarea>
			</div>
          </div>
		@endif

		@if ($user->id != 0)
          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="type">用户头像</label>
			<div class="col-sm-10">
          	<input id="fileupload" class="btn btn-default" value="Input" type="file" name="uploadedfile" multiple/>
			</div>
		  </div>
		@endif

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
			<div class="col-sm-12" id="showimage">
			</div>
		  </div>

          <div class="form-group status-post-submit col-sm-2 col-sm-offset-10" style="padding-top:15px;padding-bottom:15px;">
			<button type="submit" class="btn btn-primary" /> 提 交 </button>
			<button type="button" id="cancel" class="btn btn-default" /> 取 消 </button>
          </div>

        </form>
		

      </div>

    </div>
  </div>

  <script>

	$('#cancel').click(function (e) {
    	window.location.href = "http://"+window.location.host+'/backend/user/list';
    });

    if( "{{ $user->imageUrl }}" != "" ) {
		$("#showimage").html('<img src="http://'+window.location.host+'/'+"{{ $user->imageUrl }}"+'" class="img-responsive"/>');
	}

	uploadfilename = "";

	$(function () {
		'use strict';

		$('#fileupload').fileupload({
			url: "/backend/uploadUserPhoto",
			dataType: 'json',
			autoUpload: true,
			acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			maxFileSize: 5000000, // 5 MB
			disableImageResize: /Android(?!.*Chrome)|Opera/
				.test(window.navigator.userAgent),
			previewMaxWidth: 100,
			previewMaxHeight: 100,
			previewCrop: true
		}).on('fileuploadadd', function (e, data) {
		}).on('fileuploadprocessalways', function (e, data) {
		}).on('fileuploaddone', function (e, data) {
			uploadfilename = data.result.filename;
			$("#showimage").html('<img src="http://'+window.location.host+'/'+uploadfilename+'" class="img-responsive"/>');
			$("#image").val(uploadfilename);
		}).on('fileuploadfail', function (e, data) {
			alert("上传文件失败");
		}).prop('disabled', !$.support.fileInput);
	});


  </script>


</div>




@stop
