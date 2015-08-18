@extends('backend.layouts.default')

@section('content')

<div class="col-md-9 topics-index main-col">
    <div class="panel panel-default">

        <div class="panel-heading">
          <div class="clearfix"></div>
        </div>

        @if ( ! $nodes->isEmpty())

            <div class="panel-body remove-padding-horizontal">
                @include('backend.nodes.partials.nodes', ['column' => false])
            </div>

            <div class="panel-footer text-right remove-padding-horizontal pager-footer">
                页
            </div>

        @else
            <div class="panel-body">
                <div class="empty-block">当前没有记录</div>
            </div>
        @endif

    </div>

</div>

@include('backend.nodes.partials.sidebar')


@stop
