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

		<form method="post" action="{{ URL::to('backend/nodes/save') }}">

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
			<div class="col-sm-10"><input type="hidden" name="id" class="form-control" value="{{ $node->id }}" /></div>
		  </div>

          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="name">NODE名称</label>
			<div class="col-sm-10"><input type="text" class="form-control" name="name" value="{{ $node->name }}" /></div>
          </div>
		  
          <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
    		<label class="col-sm-2 control-label" for="parent_node">所属父Node</label>
			<div class="col-sm-10">
			<select class="form-control" name="parent_node">
				<option value="0">顶层NODE</option>
				@foreach($pnodes as $pnode)
		            @if ($pnode->id == $node->parent_node)
						<option value="{{ $pnode->id }}" selected="true">{{ $pnode->name }}</option>
					@else
						<option value="{{ $pnode->id }}">{{ $pnode->name }}</option>
		            @endif
				@endforeach
            </select>
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
    	window.location.href = "http://"+window.location.host+'/backend/nodes/list';
    });
  </script>

  <script type="text/javascript">
    tinymce.init({
        selector: "textarea"
    });
  </script>


</div>

@stop
