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

		<div class="modal-footer">
		  <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		  <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="savecontent();">保存</button>
		</div>

	  </div>
	</div>
  </div>

  <script>

	render(topic, true);

  </script>



  <div class="col-md-3 side-bar">
	<div class="panel panel-default corner-radius help-box">
	  <div class="panel-heading text-center">
		<h3 class="panel-title">工具栏</h3>
	  </div>
	  <div class="panel-body">
		  <input type="button" onclick="addcontent('title')" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="添加标题"/>
		  <input type="button" onclick="addcontent('abstract');" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="添加简介"/>
		  <input type="button" onclick="addcontent('from');" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="添加来源"/>
		  <input type="button" onclick="addcontent('headimage');" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="添加头图"/>
		  <input type="button" onclick="addcontent('uid');" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="修改用户"/>
		  <input type="button" onclick="addcontent('image');" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="添加图片"/>
		  <input type="button" onclick="addcontent('content');" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-block" value="添加内容"/>
		  <input type="button" onclick="save();" class="btn btn-danger btn-block" value="保存设置"/>
		  <input type="button" onclick="cancel();" class="btn btn-block btn-default" value="取消返回"/>
	  </div>
	</div>
  </div>
</div>

@stop
