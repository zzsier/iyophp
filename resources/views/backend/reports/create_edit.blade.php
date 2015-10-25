@extends('backend.layouts.default')

@section('title')
{{ '创建新文章' }}_@parent
@stop

@section('content')

<div class="topic_create">

  <div class="col-md-8 main-col">

	<form accept-charset="utf-8" class="form-horizontal" method="POST">

  <div class="form-group" id="generateHTML">

{{--
	  <div class="alert alert-warning">
		  {{ 'be_nice' }}
	  </div>

	  @include('backend.layouts.partials.errors')
--}}
		<!--
		<div class="form-group">
		  <label for="title" class="control-label col-lg-1 col-sm-8" style="text-align:left;padding-left:0px;padding-right:0px;">文章名</label>
		  <input class="form-control col-lg-8 col-sm-8" style="width:550px;text-align:left" id="title" type="text" name="title">
		</div>
		<label for="title" class="control-label" style="text-align:left;padding-left:0px;padding-right:0px;">摘要</label>
		<div class="form-group" style="padding-top:10px;">
		  <textarea row="5" id="abstract" class="col-lg-10 col-sm-8" style="height:100px;"></textarea>
		</div>

		<div class="form-group" id="wrappercontent">

		</div>


		<div class="box preview markdown-body" id="preview-box" style="display:none;"></div>
		-->

  </div>

  </form>
  </div>

  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
	  <div class="modal-content">

		<div class="modal-header">
		  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		  <h4 class="modal-title" id="myModalLabel">文章编辑<a class="anchorjs-link" href="#myModalLabel"><span class="anchorjs-icon"></span></a></h4>
		</div>
		<div class="modal-body" id="textcontent">
		  <textarea row="5" id="showcontent" class="form-control" style="height:100px;"></textarea>
		</div>

		<div class="modal-body" id="usercontent">
			<select class="form-control selectpicker" id="userid" name="userid">
			  @foreach ($unions as $user)
				<option value="{{$user['id']}}">{{$user['username']}}</option>
			  @endforeach
			</select>
		</div>


		<div class="modal-body" id="imagecontent">
            <input id="fileupload" class="btn btn-default" value="Input" type="file" name="uploadedfile" multiple/>
		</div>

		<div class="modal-body" id="showimage">
		</div>

		<div class="modal-footer">
		  <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		  <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="savecontent();">保存</button>
		</div>

	  </div>
	</div>
  </div>

  <script>

	@if( isset($topic) )
		var topic = <?php echo html_entity_decode(json_encode($topic, JSON_UNESCAPED_UNICODE)) ?>;
	@else
		var topic = new Object();

		@if (Auth::check() && !Auth::user()->can("manage_topics") )
			topic['uid'] = {{{ Auth::id() }}};
			topic['username'] = "{{{ Auth::user()->username }}}";
		@endif

	@endif

	if (!topic.hasOwnProperty('body')) {
		topic["body"] = [];
	}
	topic["headimage"] = topic["image"];
	var unions = <?php echo html_entity_decode(json_encode($unions, JSON_UNESCAPED_UNICODE)) ?>;


	render(topic, true);

	uploadfilename = "";

	$(function () {
		'use strict';

		$('#fileupload').fileupload({
			url: "/backend/upload",
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
			$("#showimage").show();
			//$("#image").val(uploadfilename);
		}).on('fileuploadfail', function (e, data) {
			alert("上传文件失败");
		}).prop('disabled', !$.support.fileInput);
	});

	var updatetype = "";


	function addcontent(type) {

		updatetype = type;

		$("#textcontent").hide();
		$("#usercontent").hide();
		$("#imagecontent").hide();
		$("#showimage").hide();

		if ( type == "image" ) {
			$("#imagecontent").show();
		}
		else if ( type == "headimage" ) {
			$("#imagecontent").show();
			if( topic.hasOwnProperty('headimage') &&  topic["headimage"] != undefined && topic["headimage"] != "" ) {
				$("#showimage").html('<img src="http://'+window.location.host+'/'+topic["headimage"]+'" class="img-responsive"/>');
				$("#showimage").show();
			}
		}
		else if ( type == "uid" ) {
			$("#userid").val(topic[type]);
			$("#usercontent").show();
		}
		else if ( type == "content" ) {
			$("#textcontent").show();
			$("#showcontent").val("");
		}
		else {
			$("#textcontent").show();
			$("#showcontent").val(topic[type]);
		}

	}

	function savecontent() {
		if( updatetype == "uid" ) {
			topic[updatetype] = $("#userid").val();
			for(var i = 0 ; i < unions.length; i ++ ) {
				union = unions[i];
				if( topic["uid"] == union["id"] ){
					topic["username"] = union["username"];
				}
			}
		} else if( updatetype == "content" ) {
			value = $("#showcontent").val();
			topic["body"].push({"type":"text","value":value});
		} else if( updatetype == "image" ) {
			topic["body"].push({"type":"image","value":uploadfilename});
		} else if( updatetype == "headimage" ) {
			topic[updatetype] = uploadfilename;
		} else {
			topic[updatetype] = $("#showcontent").val();
		}
		render(topic, true);
		$('html, body').animate({scrollTop: $('html, body').height()}, 800);
	}

	function save() {
		topic["type"] = "1";
		postvalue = JSON.stringify(topic);
        $.ajax({
                type: "POST",
                url: "http://"+window.location.host+'/topic/saveOrUpdate',
                data: postvalue,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function(XMLHttpRequest){
                },
                success: function(data, json){
					alert("文章编辑成功");
					cancel();
                },
                complete: function(XMLHttpRequest, json){
                },
                error: function(){
                }
        });



	}

	function deletecontent(id) {
		topic["body"].splice(id,1);
		render(topic, true);
	}

	function upcontent(id) {
		if( id == 0 ) {
			render(topic, true);
			return;
		}
		var i = Number(id);
		var tempvalue1 = topic["body"][i-1];
		var tempvalue2 = topic["body"][i];
		topic["body"][i-1] = tempvalue2;
		topic["body"][i] = tempvalue1;

		render(topic, true);
	}

	function downcontent(id) {
		if( id == topic["body"].length-1 ) {
			render(topic, true);
			return;
		}
		var i = Number(id);
		var j = i + 1;
		var tempvalue1 = topic["body"][j];
		var tempvalue2 = topic["body"][i];
		topic["body"][j] = tempvalue2;
		topic["body"][i] = tempvalue1;
		render(topic, true);
	}

	function cancel() {
    	window.location.href = "http://"+window.location.host+'/backend/topic/list';
    };

  </script>

  <div class="col-md-3 side-bar" style="position: fixed; width:20%; right: 50%; margin-right: -500px;">
	<div class="panel panel-default corner-radius help-box">
	  <div class="panel-heading text-center">
		<h3 class="panel-title">工具栏</h3>
	  </div>
	  <div class="panel-body">
		  <input type="button" onclick="addcontent('title')" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="添加标题"/>
		  <input type="button" onclick="addcontent('abstract');" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="添加简介"/>
		  <input type="button" onclick="addcontent('from');" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="添加来源"/>
		  <input type="button" onclick="addcontent('headimage');" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="添加头图"/>
	  	@if (Auth::check() && Auth::user()->can("manage_topics") )
		  <input type="button" onclick="addcontent('uid');" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="修改用户"/>
		@endif
		  <input type="button" onclick="addcontent('image');" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="添加图片"/>
		  <input type="button" onclick="addcontent('content');" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="添加内容"/>
		  <input type="button" onclick="save();" class="btn btn-danger btn-block" value="保存设置"/>
		  <input type="button" onclick="cancel();" class="btn btn-block btn-default" value="取消返回"/>
	  </div>
	</div>
  </div>
</div>

@stop
