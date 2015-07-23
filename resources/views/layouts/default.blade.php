<!DOCTYPE html>
<html lang="zh">
	<head>
		<meta charset="UTF-8">
		<title>IYO 游戏论坛</title>
		<link href={{{URL::asset('demo/Bbs_index.css')}}} rel="stylesheet">
		<script async="" src={{{URL::asset('demo/gw.js')}}}></script>
		<script src={{{URL::asset('demo/iparea.htm')}}}></script>
		<script src={{{URL::asset('demo/Bbs_index.js')}}} charset="gbk"></script>
		<link href={{{URL::asset('demo/rotate-plate.css')}}} rel="stylesheet">
		<script type="text/javascript" src={{{URL::asset('demo/md5.js')}}}></script>
		<link href={{{URL::asset('demo/suggest20150320.css')}}} rel="stylesheet">
		<script src={{{URL::asset('demo/53013749.js')}}} type="text/javascript"></script>

        <script>
            Config = {
                'cdnDomain': '{{ getCdnDomain() }}',
                'user_id': {{ isset($currentUser) ? $currentUser->id : 0 }},
                'routes': {
                    'notificationsCount' : '{{ route('notifications.count') }}',
                    'upload_image' : '{{ route('upload_image') }}'
                },
                'token': '{{ csrf_token() }}',
            };
        </script>

	    @yield('styles')

	</head>
	<body>
			@include('layouts.partials.nav')

			<div class="container">

				@include('flash::message')

				@yield('content')

			</div>

	  <div id="footer" class="footer">
	    <div class="container small">
	      <p class="pull-left">
	      	<i class="fa fa-heart-o"></i> Made With Love By The EST Group. <br>
			&nbsp;<i class="fa fa-lightbulb-o"></i> Inspired by v2ex & ruby-china.
	      </p>

	      <p class="pull-right">
	      	<i class="fa fa-cloud"></i> Powered by <a href="https://www.linode.com/?r=3cfb2c09c29cf2b6e6c87cc1f71ffdc2f9ea5722" target="_blank">Linode <i class="fa fa-external-link"></i></a>.
	      </p>
	    </div>
	  </div>

	    @yield('scripts')

        @if (App::environment() == 'production')
		<script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-53903425-1', 'auto');
          ga('send', 'pageview');

        </script>
        @endif

	</body>
</html>
