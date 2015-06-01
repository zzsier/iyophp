@extends('backend.layouts.default')

@section('title')
{{ '创建新章节' }}_@parent
@stop

@section('content')

<div class="topic_create">

  <div class="col-sm-8 main-col">
  <form method="post" action="{{ URL::to('backend/node/save') }}">

    <div class="form-group" style="padding-top:15px;padding-bottom:15px;">
      <label class="col-sm-2 control-label" for="phone">章节名</label>
      <div class="col-sm-10"><input type="text" class="form-control" name="title" /></div>
    </div>

    <div class="form-group status-post-submit col-sm-4 col-sm-offset-8" style="padding-top:15px;padding-bottom:15px;">
      <button type="submit" class="btn btn-primary" /> 提 交 </button>
      <button type="button" id="cancel" class="btn btn-default" /> 取 消 </button>
    </div>


  </form>
  </div>
@stop
