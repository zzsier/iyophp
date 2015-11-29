<!DOCTYPE html>
<html lang="zh-cn">
	<head>

		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
 
		<title>后台管理系统</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="/css/jquery.fileupload.css">
		<link href="/css/bootstrap.css" rel="stylesheet" type="text/css"/>
		<link href="/css/docs.min.css" rel="stylesheet" type="text/css"/>
		<link href="/css/iyo.css" rel="stylesheet" type="text/css"/>
		<link href="/cropper/main.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" href="/cropper/cropper.css">

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

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

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
