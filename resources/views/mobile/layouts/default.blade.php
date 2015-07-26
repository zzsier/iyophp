<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=GBK">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
	<title>IYO 游戏论坛</title>
	<base href=".">
</head>

<body>
	@include('layouts.partials.nav')

	<div class="whole_page">
		@yield('content')
	</div>

    @yield('scripts')
</body>


</html>
