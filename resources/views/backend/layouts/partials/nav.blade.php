<div role="navigation" class="navbar navbar-default navbar-static-top topnav">
  <div class="container">
    <div id="top-navbar-collapse" class="navbar-collapse">
      <ul class="nav navbar-nav">
	  	@if (Auth::check() && Auth::user()->can("manage_topics") )
			<li class="{{ (Request::is('users*') ? ' active' : '') }}"><a href="{{ URL::to('/') }}">IYO首页</a></li>
			<li class="{{ (Request::is('topics*') ? ' active' : '') }}"><a href="{{ URL::to('backend/topic/list') }}">{{ trans('webpage.Topics') }}</a></li>
			<li class="{{ (Request::is('users*') ? ' active' : '') }}"><a href="{{ URL::to('backend/user/list') }}">{{ trans('webpage.Users') }}</a></li>
			<li class="{{ (Request::is('users*') ? ' active' : '') }}"><a href="{{ URL::to('backend/document/list') }}">文档管理</a></li>
			<li class="{{ (Request::is('users*') ? ' active' : '') }}"><a href="{{ URL::to('backend/nodes/list') }}">NODE管理</a></li>
			<li class="{{ (Request::is('users*') ? ' active' : '') }}"><a href="{{ URL::to('question/listquestion') }}">每日任务管理</a></li>
			<li class="{{ (Request::is('users*') ? ' active' : '') }}"><a href="{{ URL::to('report/list') }}">举报管理</a></li>
			<li class="{{ (Request::is('users*') ? ' active' : '') }}"><a href={{ URL::to("activities") }}>活动管理</a></li>
		@elseif (Auth::check())
			<li class="{{ (Request::is('topics*') ? ' active' : '') }}"><a href="{{ URL::to('backend/topic/list') }}">{{ trans('webpage.Topics') }}</a></li>
			<li class="{{ (Request::is('users*') ? ' active' : '') }}"><a href={{ URL::to("activities") }}>活动管理</a></li>
		@endif
			<li class="{{ (Request::is('topics*') ? ' active' : '') }}"><a href="{{ URL::to('/backendlogout') }}">退出</a></li>

      </ul>

		{{--
      <div class="navbar-right">
        <ul class="nav navbar-nav github-login" >
          @if (Auth::check())
              <li>
                  <a href="{{ route('notifications.index') }}" class="text-warning">
                      <span class="badge badge-{{ $currentUser->notification_count > 0 ? 'important' : 'fade'}}" id="notification-count">
                          {{ $currentUser->notification_count }}
                      </span>
                  </a>
              </li>
              <li>
                  <a href="{{ route('users.show', $currentUser->id) }}">
                      <i class="fa fa-user"></i> {{{ $currentUser->name }}}
                  </a>
              </li>
              <li>
                  <a class="button" href="{{ URL::route('logout') }}" onclick=" return confirm('{{ lang('Are you sure want to logout?') }}')">
                      <i class="fa fa-sign-out"></i> {{ lang('Logout') }}
                  </a>
              </li>
          @else
              <a href="{{ URL::route('login') }}" class="btn btn-info" id="login-btn">
                <i class="fa fa-github-alt"></i>
                {{ trans('webpage.Login') }}
              </a>
          @endif
        </ul>
      </div>
	--}}

    </div>

  </div>
</div>
