<!DOCTYPE html>
<html lang="zh-cn">
	<head>

		<meta charset="utf-8">
		<title>后台管理系统</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
		<script src="/js/iyo.js"></script>

	    @yield('styles')

	</head>
	<body id="body">

		<div id="wrap">

			@include('backend.layouts.partials.nav')

			<div class="container">

				@include('flash::message')

				@yield('content')

			</div>

		</div>

	  <div id="footer" class="footer">
	    <div class="container small">
	      <p class="pull-left">
	      </p>

	      <p class="pull-right">
	      	<i class="fa fa-cloud"></i></a>.
	      </p>
	    </div>
	  </div>

	    @yield('scripts')

	</body>
</html>
