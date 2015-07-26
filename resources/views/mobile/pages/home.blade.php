@extends('layouts.default')

@section('content')
<link rel="stylesheet" href={{{URL::asset('mobile/swiper.min.css')}}}>
<link rel="stylesheet" type="text/css" href={{{URL::asset('mobile/ywap15.css')}}}>
<link href="http://www.yesky.com/TLimages2009/yesky/wap/waplogo.png" rel="apple-touch-icon-precomposed">
<script type="text/javascript" async="" src={{{URL::asset('mobile/dc.js')}}}></script>
<script src={{{URL::asset('mobile/hm.js')}}}></script>
<script type="text/javascript" src={{{URL::asset('mobile/jquery-1.7.2.min.js')}}}></script>
<script type="text/javascript" src={{{URL::asset('mobile/swiper.jquery.min.js')}}}></script>
<script type="text/javascript" src={{{URL::asset('mobile/ywap15.js')}}}></script>
<link rel="stylesheet" type="text/css" href={{{URL::asset('mobile/swiper.min.css')}}}>


<section class="cont">
	<section class="search">
		<form class="sform" name="product" action="http://pinterface.tianjimedia.com/front/wap/searchresult.jsp">
			<input onclick="this.value=&#39;&#39;;" class="input" value="" name="keyword">
			<input class="submit" type="submit" value="" name="submit">
		</form>
	</section>
</section>

<section class="cont">
	<section class="focus" style="width: 320px; height: 160px;">
	<div class="topic-info swiper-container-horizontal" id="slide_01" style="padding-top:20px; width: 320px; height: 160px;">
		<div class="swiper-wrapper" style="transition: 0ms; -webkit-transition: 0ms; -webkit-transform: translate3d(-1750px, 0px, 0px);">
		@foreach ($topics as $tindex => $subtopics)
			@foreach ($subtopics as $sindex => $topic)
			@if( $sindex == 0 )
			<div class="swiper-slide" data-swiper-slide-index={{ $tindex }} style="width: 320px; margin-right: 30px;">
				<span>
				<a href={{{ URL::to("topics/$topic->id") }}}>
				<img alt={{{ $topic->title }}} src={{{ $topic->image }}} width="100%" style="width: 320px; height: 160px;">
				</a>
				</span>
				<p><a href={{{ URL::to("topics/$topic->id") }}}>{{{ $topic->title }}}</a></p>
		    </div>
			@endif
			@endforeach
		@endforeach
	</section>

	@foreach ($topics as $tindex => $subtopics)
    <section class="product orangebd box">
        <h1>{{{ $nodes["top"][$tindex]->name }}}</h1>
        <section>
			<ul>
			@foreach ($subtopics as $sindex => $topic)
			@if( $sindex == 0 )
				<li class="first"><a href={{{ URL::to("topics/$topic->id") }}}>{{{ $topic->title }}}</a></li>
			@else
				<li><a href={{{ URL::to("topics/$topic->id") }}}>{{{ $topic->title }}}</a><time>{{{ date("Y-m", strtotime($topic->created_at)) }}}</time></li>
			@endif
			</ul>
			@endforeach
            <div class="mbtn"><a href="http://123.59.53.158/nodes/{{{ $nodes['top'][$tindex]->id }}}">更多手机资讯 &gt;</a></div>
        </section>
    </section>
	@endforeach

</section>

<footer>
<div>
	<a href="http://www.yesky.com/">电脑版</a>
	<a href="http://cps-bridge.yesky.com/os_adaptor?android=http://gs.mydown.yesky.com/tianjishuma_wapb.apk&ios=http://itunes.apple.com/cn/app/tian-ji-shu-ma/id478210740&default=http://wap.yesky.com/">客户端</a>
	<a href="http://www.tianjimedia.com/ywjs/391/39211391.shtml">关于我们</a>
	<a href="http://123.59.53.158/#top">返回顶部</a>
</div>
<p>&#169;2015&nbsp;IYO游戏论坛</p>
</footer>

<script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-11613621-1']);
    _gaq.push(['_setDomainName', 'yesky.com']);
    _gaq.push(['_setAllowLinker', true]);
    _gaq.push(['_addOrganic', 'baidu', 'word']);
    _gaq.push(['_addOrganic', 'google', 'q']);
    _gaq.push(['_addOrganic', 'soso', 'w']);
    _gaq.push(['_addOrganic', '3721', 'name']);
    _gaq.push(['_addOrganic', 'youdao', 'q']);
    _gaq.push(['_addOrganic', 'vnet', 'kw']);
    _gaq.push(['_addOrganic', 'sogou', 'query']);
    _gaq.push(['_trackPageview']);
    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
</script>

@stop
