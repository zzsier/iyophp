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

		<form method="post" action="{{ URL::to('backend/document/save') }}">

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
			<div class="col-sm-10"><input type="hidden" name="id" class="form-control" value="{{ $document->id }}" /></div>
		  </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="api">API名称</label>
			<div class="col-sm-10"><input type="text" class="form-control" name="title" value="{{ $document->title }}" /></div>
          </div>
		  
          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="url">URL</label>
			<div class="col-sm-10"><input type="text" name="url" class="form-control" value="{{ $document->url }}" /></div>
          </div>


          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="type">所属章节</label>
			<div class="col-sm-10">
			<select class="form-control" name="type">
				@foreach($nodes as $node)
		            @if ($node->id == $document->nid)
						<option value="{{ $node->id }}" selected="true">{{ $node->title }}</option>
					@else
						<option value="{{ $node->id }}">{{ $node->title }}</option>
		            @endif
				@endforeach
            </select>
			</div>
          </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="type">API描述</label>
			<div class="col-sm-10">
		    <textarea row="5" name="description" class="form-control">{{ $document->description }}</textarea>
			</div>
          </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="type">Request</label>
			<div class="col-sm-10">
		    <textarea row="5" name="request" class="form-control">{{ $document->request }}</textarea>
			</div>
          </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="type">Response</label>
			<div class="col-sm-10">
		    <textarea row="5" name="response" class="form-control">{{ $document->response }}</textarea>
			</div>
          </div>

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
  </script>

  <script type="text/javascript">
    tinymce.init({
        selector: "textarea"
    });
  </script>


</div>

@stop
