@extends('layouts.default')

@section('title')
{{ trans('message.Operation Deny') }}
@stop

@section('content')
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">{{ trans('message.Notice') }}</h3>
        </div>
        <div class="panel-body">

          {{ Form::open(['route'=>'login', 'method'=>'get']) }}

            <fieldset>
              <div class="alert alert-warning">
                {{ trans('message.Sorry, You account is banned.') }}
              </div>
            </fieldset>

          {{ Form::close() }}

        </div>
      </div>
    </div>
  </div>

@stop
