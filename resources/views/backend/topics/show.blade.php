<html lang="zh-cn">
	<head>

		<meta charset="utf-8">
		<title>IYO游戏帖子</title>
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




<div class="topic_show media">
  <div class="col-md-offset-3 col-md-6 col-xs-12 col-sm-12">
  <div class="form-group" id="generateHTML">
  </div>
</div>

<script>
var topic= <?php echo html_entity_decode(json_encode($topic, JSON_UNESCAPED_UNICODE)) ?>;
render(topic);
</script>

	</body>
</html>
