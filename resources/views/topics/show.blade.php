@extends('layouts.default')

@section('title')
{{{ $topic->title }}}_@parent
@stop

@section('description')
{{{ $topic->excerpt }}}
@stop

@section('content')

<div class="col-md-9 topics-show main-col">

  <!-- Topic Detial -->
  <div class="topic panel panel-default">
    <div class="infos panel-heading">

      <div class="pull-right avatar_large">
        <a href="{{ route('users.show', $topic->user->id) }}">
          <img src="{{ $topic->user->imageUrl }}" style="width:65px; height:65px;" class="img-thumbnail avatar" />
        </a>
      </div>

      <h1 class="panel-title topic-title">{{{ $topic->title }}}</h1>

      <div class="votes">

        <a data-method="post" href="javascript:void(0);" data-url="{{ route('topics.upvote', $topic->id) }}" title="{{ trans('message.Up Vote') }}" id="up-vote" class="vote {{ Auth::user() && $topic->votes()->ByWhom(Auth::id())->WithType('upvote')->count() ? 'active' :'' }}">
            <li class="fa fa-chevron-up"></li> {{ $topic->vote_count }}
        </a>
         &nbsp;
        <a data-method="post" href="javascript:void(0);" data-url="{{ route('topics.downvote', $topic->id) }}" title="{{ trans('message.Down Vote') }}" id="down-vote" class="vote {{ Auth::user() && $topic->votes()->ByWhom(Auth::id())->WithType('downvote')->count() ? 'active' :'' }}">
            <li class="fa fa-chevron-down"></li>
        </a>
      </div>

      @include('topics.partials.meta')
    </div>

    <div class="content-body entry-content panel-body">

      @include('topics.partials.body', array('body' => $topic->body))

      @include('topics.partials.ribbon')
    </div>

    @foreach ($topic->appends as $index => $append)

        <div class="appends">
            <span class="meta">{{ trans('message.Append') }} {{ $index }} &nbsp;·&nbsp; <abbr title="{{ $append->created_at }}" class="timeago">{{ $append->created_at }}</abbr></span>
            <div class="sep5"></div>
            <div class="markdown-reply append-content">
                {{ $append->content }}
            </div>
        </div>

    @endforeach

    @include('topics.partials.topic_operate')
  </div>

  @if ( isset($replies) )
  <!-- Reply List -->
  <div class="replies panel panel-default list-panel replies-index">
    <div class="panel-heading">
      <div class="total">{{ trans('message.Total Reply Count') }}: <b>{{ count($replies) }}</b> </div>
    </div>

    <div class="panel-body">

      @if (count($replies))
        @include('topics.partials.replies')
      @else
         <div class="empty-block">{{ trans('message.No comments') }}~~</div>
      @endif

      <!-- Pager -->
      <div class="pull-right" style="padding-right:20px">
        {{ $replies->appends(Request::except('page')) }}
      </div>
    </div>
  </div>
  @endif

  <!-- Reply Box -->
  <div class="reply-box form box-block">

    @include('layouts.partials.errors')

    {!! Form::open(['route' => 'replies.store', 'id' => 'reply-form', 'method' => 'post']) !!}
      <input type="hidden" name="topic_id" value="{{ $topic->id }}" />

        @include('topics.partials.composing_help_block')

        <div class="form-group">
            @if (Auth::check())
              {!! Form::textarea('body', null, ['class' => 'form-control',
                                                'rows' => 5,
                                                'placeholder' => trans('message.Please using markdown.'),
                                                'style' => "overflow:hidden",
                                                'id' => 'reply_content']) !!}
            @else
              {!! Form::textarea('body', null, ['class' => 'form-control', 'disabled' => 'disabled', 'rows' => 5, 'placeholder' => trans('message.User Login Required for commenting.')]) !!}
            @endif
        </div>

        <div class="form-group status-post-submit">

            @if (Auth::check())
              {!! Form::submit(trans('message.Reply'), ['class' => 'btn btn-primary', 'id' => 'reply-create-submit']) !!}
            @else
              {!! Form::submit(trans('message.Reply'), ['class' => 'btn btn-primary disabled', 'id' => 'reply-create-submit']) !!}
            @endif

            <span class="help-inline" title="Or Command + Enter">Ctrl+Enter</span>
        </div>

        <div class="box preview markdown-reply" id="preview-box" style="display:none;"></div>

    {!! Form::close() !!}
  </div>

</div>

@include('layouts.partials.sidebar')

@stop
