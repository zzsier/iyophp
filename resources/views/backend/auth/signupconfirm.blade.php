@extends('layouts.default')

@section('title')
{{ trans('message.Create New Account') }}_@parent
@stop

@section('content')
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">{{ trans('message.Create New Account') }}</h3>
        </div>
        <div class="panel-body">

            {{ Form::open() }}

                <div class="form-group">
                    <label class="control-label" for="name">{{ trans('message.Avatar') }}</label>
                    <div class="form-group">
                        <img src="{{ $githubUser['image_url'] }}" width="100%" />
                    </div>
                </div>

                <div class="form-group {{{ $errors->has('name') ? 'has-error' : '' }}}">
                    <label class="control-label" for="name">{{ trans('message.Username') }}</label>
                    {{ Form::text('name', ($githubUser['name'] ?: ''), ['class' => 'form-control']) }}
                    {{ $errors->first('name', '<span class="help-block">:message</span>') }}
                </div>

                <div class="form-group {{{ $errors->has('github_name') ? 'has-error' : '' }}}">
                    <label class="control-label" for="github_name">Github Name</label>
                    {{ Form::text('github_name', (isset($githubUser['github_name']) ? $githubUser['github_name'] : $githubUser['name']), ['class' => 'form-control', 'readonly'=>'readonly']) }}
                    {{ $errors->first('github_name', '<span class="help-block">:message</span>') }}
                </div>

                <div class="form-group {{{ $errors->has('email') ? 'has-error' : '' }}}">
                    <label class="control-label" for="email">{{ trans('message.Email') }}</label>
                    {{ Form::select('email', $githubUser['emails'], $githubUser['email'], ['class' => 'form-control']) }}
                    {{ $errors->first('email', '<span class="help-block">:message</span>') }}
                </div>

                {{ Form::submit(trans('message.Confirm'), ['class' => 'btn btn-lg btn-success btn-block']) }}

            {{ Form::close() }}

        </div>
      </div>
    </div>
  </div>

@stop
