@extends('backend.layouts.default')

@section('content')

<div class="col-md-9 topics-index main-col">
    <div class="panel panel-default">

        <div class="panel-heading">
          <div class="clearfix"></div>
        </div>

        @if ( ! $topics->isEmpty())

            <div class="panel-body remove-padding-horizontal">
                @include('backend.topics.partials.topics', ['column' => false])
            </div>

            <div class="panel-footer text-right remove-padding-horizontal pager-footer">
				<?php echo $topics->render(); ?>
            </div>

        @else
            <div class="panel-body">
                <div class="empty-block">当前没有记录</div>
            </div>
        @endif

    </div>

</div>

@include('backend.layouts.partials.sidebar')


@stop
