@extends('layouts.default')

@section('content')

<div class="box text-center">
PHPhub 是积极向上的 PHP & Laravel 开发者社区, 更多介绍 
<a href="about">见这里</a>, 源代码 <i class="fa fa-github" style="font-size:15px"></i> 
<a href="https://github.com/summerblue/phphub" target="_blank">在此</a>.
</div>


<div class="panel panel-default list-panel">
  <div class="panel-heading">
    <h3 class="panel-title text-center">
      {{ trans('message.Excellent Topics') }} &nbsp;
      <a href="{{ route('feed') }}" style="color: #E5974E; font-size: 14px;" target="_blank">
         <i class="fa fa-rss"></i>
      </a>
    </h3>

  </div>

  <div class="panel-body">
	@include('topics.partials.topics', ['column' => true])
  </div>

  <div class="panel-footer text-right">

  	<a href="topics?filter=excellent">
  		{{ trans('message.More Excellent Topics') }}...
  	</a>
  </div>
</div>

<!-- Nodes Listing -->
@include('nodes.partials.list')

@stop
