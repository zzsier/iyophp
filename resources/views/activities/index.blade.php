@extends('backend.layouts.default')

@section('content')

<div class="col-md-9 topics-index main-col">
    <div class="panel panel-default">

        <div class="panel-heading">
          <div class="clearfix"></div>
        </div>

        @if ( count($activities) != 0  )

            <div class="panel-body remove-padding-horizontal">
                @include('activities.partials.activities', ['column' => false])
            </div>

            <div class="panel-footer text-right remove-padding-horizontal pager-footer">
				<?php //echo $activities->render(); ?>
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
        <a href="
          {{ URL::to('activities/create') }}
          " class="btn btn-success btn-lg">
          <i class="glyphicon glyphicon-pencil"> </i> {{ '新建活动' }}
        </a>
      </div>
    </div>
  </div>
</div>
<div class="clearfix"></div>

@stop
