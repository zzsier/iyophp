<!--
______                            _              _                                     _
| ___ \                          | |            | |                                   | |
| |_/ /___ __      __ ___  _ __  | |__   _   _  | |      __ _  _ __  __ _ __   __ ___ | |
|  __// _ \\ \ /\ / // _ \| '__| | '_ \ | | | | | |     / _` || '__|/ _` |\ \ / // _ \| |
| |  | (_) |\ V  V /|  __/| |    | |_) || |_| | | |____| (_| || |  | (_| | \ V /|  __/| |
\_|   \___/  \_/\_/  \___||_|    |_.__/  \__, | \_____/ \__,_||_|   \__,_|  \_/  \___||_|
                                          __/ |
                                         |___/
  ========================================================
                                           phphub.org

  --------------------------------------------------------
  Laravel: v4.2.8
-->

<!DOCTYPE html>
<html lang="zh">
	<head>

		<meta charset="UTF-8">

		<title>
			@section('title')
PHPHub  - PHP & Laravel的中文社区
			@show
		</title>

		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<meta name="keywords" content="PHP,Laravel,PHP论坛,Laravel论坛,PHP社区,Laravel社区" />
		<meta name="author" content="The PHP China Community." />
		<meta name="description" content="@section('description') PHP China 是 PHP 和 Laravel 的中文社区，致力于推动 Laravel, php-fig 等国外 PHP 新技术, 新理念在中国的发展。 @show" />
		<link href="/css/bootstrap.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" href="/css/jquery.fileupload.css">
		<link href="/css/bootstrap.css" rel="stylesheet" type="text/css"/>
		<link href="/css/docs.min.css" rel="stylesheet" type="text/css"/>
		<link href="/css/iyo.css" rel="stylesheet" type="text/css"/>
		<script src="/js/jquery.js"></script>
		<script src="/js/bootstrap.js"></script>
		<script src="/js/vendor/jquery.ui.widget.js"></script>
		<script src="/js/load-image.all.min.js"></script>
		<script src="/js/canvas-to-blob.min.js"></script>
		<script src="/js/jquery.iframe-transport.js"></script>
		<script src="/js/jquery.fileupload.js"></script>
		<script src="/js/jquery.fileupload-process.js"></script>
		<script src="/js/jquery.fileupload-image.js"></script>
		<script src="/js/jquery.fileupload-audio.js"></script>
		<script src="/js/jquery.fileupload-video.js"></script>
		<script src="/js/jquery.fileupload-validate.js"></script>
		<script src="/js/tinymce/tinymce.min.js"></script>
		<script src="/js/iyo.js"></script>
		<link href="/css/main.css" rel="stylesheet" type="text/css"/>

		<link href="demo/Bbs_index.css" rel="stylesheet">
		<script async="" src="demo/gw.js"></script>
		<script src="demo/iparea.htm"></script>
		<script src="demo/Bbs_index.js" charset="gbk"></script>
		<link href="demo/rotate-plate.css" rel="stylesheet">
		<script type="text/javascript" src="demo/md5.js"></script>
		<link href="demo/suggest20150320.css" rel="stylesheet"></head>
		<script src="demo/53013749.js" type="text/javascript"></script>

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
	<body id="body">

		<div id="wrap">

			@include('layouts.partials.nav')

			<div class="container">

				@include('flash::message')

				@yield('content')

			</div>

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
