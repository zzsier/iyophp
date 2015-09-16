<!DOCTYPE html>
<html lang="zh">
	<head>
		<meta charset="utf-8">
		<title>IYO 游戏论坛</title>
		<link href={{{URL::asset('demo/Bbs_index.css')}}} rel="stylesheet">
		<!--<script src={{{URL::asset('js/jquery-1.4.2.min.js')}}} type="text/javascript"></script>-->
		<script src="/js/jquery.js"></script>
		<script src="/js/bootstrap_bbs.js"></script>
		<script src={{{URL::asset('Bbs/jquery.easing.min.js')}}} type="text/javascript"></script>
		<script src={{{URL::asset('Bbs/jQueryRotate.2.2.js')}}} type="text/javascript"></script>
		<script async="" src={{{URL::asset('demo/gw.js')}}}></script>
		<!--<script src={{{URL::asset('demo/iparea.htm')}}}></script>-->
		<script src={{{URL::asset('Bbs/Bbs_index.js')}}} charset="gbk"></script>
		<link href={{{URL::asset('css/rotate-plate.css')}}} rel="stylesheet">
        <script src={{{URL::asset('js/jquery.easing.1.3.js')}}} type="text/javascript"></script>
		<script type="text/javascript" src={{{URL::asset('demo/md5.js')}}}></script>
		<link href={{{URL::asset('demo/suggest20150320.css')}}} rel="stylesheet">
		<!--<script src={{{URL::asset('demo/53013749.js')}}} type="text/javascript"></script>
        <script src={{{URL::asset('demo/index.js')}}} ></script>-->

        <script>
            //Config = {
            //    'cdnDomain': '{{ getCdnDomain() }}',
            //    'user_id': {{ isset($currentUser) ? $currentUser->id : 0 }},
            //    'routes': {
            //        'notificationsCount' : '{{ route('notifications.count') }}',
            //        'upload_image' : '{{ route('upload_image') }}'
            //    },
            //    'token': '{{ csrf_token() }}',
            //};
        </script>

	    @yield('styles')

	</head>
	<body>
			@include('layouts.partials.nav')

			<div class="whole_page">
				@include('flash::message')
				@yield('content')
			</div>

	    @yield('scripts')
	</body>
</html>
