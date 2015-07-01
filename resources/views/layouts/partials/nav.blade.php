<div role="navigation" class="navbar navbar-default navbar-static-top topnav">
  <div class="container">
    <div class="navbar-header">

      <a href="/" class="navbar-brand">PHPHub</a>
    </div>
    <div id="top-navbar-collapse" class="navbar-collapse">
      <ul class="nav navbar-nav">
        <li class="{{ (Request::is('topics*') ? ' active' : '') }}"><a href="{{ route('topics.index') }}">{{ trans('message.Topics') }}</a></li>
        <li class="{{ (Request::is('nodes/40') ? ' active' : '') }}"><a href="{{ route('nodes.show', 40) }}">{{ trans('message.Jobs') }}</a></li>
        <li class="{{ (Request::is('wiki*') ? ' active' : '') }}"><a href="{{ route('wiki') }}">{{ trans('message.Wiki') }}</a></li>
        <li class="{{ (Request::is('about*') ? ' active' : '') }}"><a href="{{ route('about') }}">{{ trans('message.About') }}</a></li>
        <li><a href="http://laravel-china.org/" target="_blank">{{ trans('message.Document') }}</a></li>
      </ul>

      <div class="navbar-right">
        {!! Form::open(['route'=>'search', 'method'=>'get', 'class'=>'navbar-form navbar-left']) !!}
          <div class="form-group">
          {!! Form::text('q', null, ['class' => 'form-control search-input mac-style', 'placeholder' => trans('message.Search')]) !!}
          </div>
        {!! Form::close() !!}
        <ul class="nav navbar-nav github-login" >
          @if (Auth::check())
              <li>
                  <a href="{{ route('notifications.index') }}" class="text-warning">
                      <span class="badge badge-{{ Auth::user()->notification_count > 0 ? 'important' : 'fade' }}" id="notification-count">
                          {{ Auth::user()->phone }}
                      </span>
                  </a>
              </li>
              <li>
                  <a href="{{ route('users.show', Auth::user()->id) }}">
                      <i class="fa fa-user"></i> {{{ Auth::user()->username }}}
                  </a>
              </li>
              <li>
                  <a class="button" href="{{ URL::route('logout') }}" onclick=" return confirm('{{ trans('message.Are you sure want to logout?') }}')">
                      <i class="fa fa-sign-out"></i> {{ trans('message.Logout') }}
                  </a>
              </li>
          @else
              <a href="{{ URL::route('login') }}" class="btn btn-info" id="login-btn">
                <i class="fa fa-github-alt"></i>
                {{ trans('message.Login') }}
              </a>
          @endif
        </ul>
      </div>
    </div>

  </div>
</div>
