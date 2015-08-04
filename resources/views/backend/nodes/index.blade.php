@extends('backend.layouts.default')

@section('title')
{{ trans('message.Topic List') }} @parent
@stop

@section('content')

<div class="col-md-9 topics-index main-col">
    <div class="panel panel-default">

        <div class="panel-heading">
          <div class="clearfix"></div>
        </div>

        @if ( ! $nodes->isEmpty())

            <div class="panel-body remove-padding-horizontal">
				<ul class="list-group row topic-list center-block">
				    @foreach ($nodes as $node)
				     <li class="list-group-item media" style="margin-top: 0px;">
				
				        <a class="pull-right" href="{{ URL::to('backend/node').'?id='.$document->id }}" >
				            <span class="badge badge-reply-count"> 删除 </span>
				        </a>
				        <a class="pull-right" href="{{ URL::to('backend/node/edit').'?id='.$document->id }}" >
				            <span class="badge badge-reply-count"> 编辑 </span>
				        </a>
				
				
				        <div class="infos">
				
				          <div class="media-heading row">
				            <a href="{{ URL::to('backend/node/$node->id }}" class="mkellipsis col-sm-8" title="{{{ $node->name }}}">
				                {{{ $node->name }}}
				            </a>
				          </div>
				          <div class="meta row">
				            <span class="timeago col-sm-3 text-right"> {{{ $node->created_at }}} </span>
				          </div>
				        </div>
				
				    </li>
				    @endforeach
				</ul>
            </div>
        @else
            <div class="panel-body">
                <div class="empty-block">当前没有记录</div>
            </div>
        @endif

    </div>

</div>
<div class="col-md-3 side-bar">

  <div class="panel panel-default corner-radius">

    <div class="panel-body text-center">
      <div class="btn-group">
        <a href={{{ URL::to("backend/nodes") }}} class="btn btn-success btn-lg">
          <i class="glyphicon glyphicon-pencil"> </i> 新建NODE
        </a>
      </div>
    </div>
  </div>
</div>
<div class="clearfix"></div>

@stop
