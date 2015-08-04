@extends('backend.layouts.default')

@section('title')
{{ '创建新文章' }}_@parent
@stop

@section('content')


<div class="users-show">

  <div class="main-col left-col">
    <div class="panel panel-default">
      <div class="panel-body ">
        <div class="alert alert-warning">
        </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="api">API名称</label>
			<div class="col-sm-10">{{ $document->title }}</div>
          </div>
		  
          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="url">URL</label>
			<div class="col-sm-10">{{ $document->url }}</div>
          </div>


          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="type">API描述</label>
			<div class="col-sm-10"> {!! $document->body !!} </div>
          </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="type">Request</label>
			<div class="col-sm-10"> {!! $document->request !!} </div>
          </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="type">Response</label>
			<div class="col-sm-10"> {!! $document->response !!} </div>
          </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
			<div class="col-sm-12" id="showimage">
			</div>
		  </div>

      </div>
    </div>
  </div>
</div>

@stop
