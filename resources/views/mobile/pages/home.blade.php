@extends('layouts.default')

@section('content')
<link rel="stylesheet" href={{{URL::asset('mobile/swiper.min.css')}}}>
<link rel="stylesheet" type="text/css" href={{{URL::asset('mobile/ywap15.css')}}}>
<script type="text/javascript" async="" src={{{URL::asset('mobile/dc.js')}}}></script>
<script src={{{URL::asset('mobile/hm.js')}}}></script>
<script type="text/javascript" src={{{URL::asset('mobile/jquery-1.7.2.min.js')}}}></script>
<script type="text/javascript" src={{{URL::asset('mobile/swiper.jquery.js')}}}></script>
<script type="text/javascript" src={{{URL::asset('mobile/ywap15.js')}}}></script>
<link rel="stylesheet" type="text/css" href={{{URL::asset('mobile/swiper.min.css')}}}>


<!--
<section class="cont">
	<section class="search">
		<form class="sform" name="product" action="http://pinterface.tianjimedia.com/front/wap/searchresult.jsp">
			<input onclick="this.value=&#39;&#39;;" class="input" value="" name="keyword">
			<input class="submit" type="submit" value="" name="submit">
		</form>
	</section>
</section>
-->

<style type="text/css">

.bx-wrapper {
	position: relative;
	margin: 0 auto 60px;
	padding: 0;
	*zoom: 1;
}

.bx-wrapper img {
	display: block;
}

.bx-wrapper .bx-pager,.bx-wrapper .bx-controls-auto {
	position: absolute;
	bottom: -30px;
}

.bx-wrapper .bx-loading {
	min-height: 50px;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2000;
}

.bx-wrapper .bx-pager {
	text-align: center;
	font-size: .85em;
	font-family: Arial;
	font-weight: bold;
	color: #666;
	padding-top: 20px;
}

.bx-wrapper .bx-pager .bx-pager-item,.bx-wrapper .bx-controls-auto .bx-controls-auto-item {
	display: inline-block;
	*zoom: 1;
	*display: inline;
}

.bx-wrapper .bx-pager.bx-default-pager a {
	background: #666;
	display: block;
	width: 17px;
	height: 17px;
	margin: 0 1px;
	outline: 0;
	overflow: hidden;
}

.bx-wrapper .bx-pager.bx-default-pager a:hover,.bx-wrapper .bx-pager.bx-default-pager a.active {
	background-position: -312px 2px;
}

.bx-wrapper .bx-prev {
	left: 0;
	-moz-border-top-left-radius: 5px;
	-webkit-border-top-left-radius: 5px;
	border-top-left-radius: 5px;

	-moz-border-bottom-left-radius: 5px;
	-webkit-border-bottom-left-radius: 5px;
	border-bottom-left-radius: 5px;
}

.bx-prev-color-0 {
	background-color: #c8ff01;
}

.bx-prev-color-1 {
	background-color: #4b00df;
}

.bx-prev-color-2 {
	background-color: #ff9600;
}

.bx-prev-color-3 {
	background-color: #c8ff01;
}

.bx-prev-color-4 {
	background-color: #4b00df;
}

.bx-prev-color-5 {
	background-color: #ff9600;
}

.bx-wrapper .bx-next {
	right: 0;
}

.bx-wrapper .bx-prev:hover {
	background-position: -119px 0;

}

.bx-wrapper .bx-next:hover {
	background-position: -173px 0;
}

.bx-wrapper .bx-controls-direction a {
	position: absolute;
	top: 50%;
	margin-top: -94px;
	outline: 0;
	width: 40px;
	height: 190px;
	z-index: 9;
}

.bx-wrapper .bx-prev div{
	width:10%;
	margin-left:10px;
	margin-top:40px;
	height:190px;
	font-size: 20px;
	line-height:24px;
	text-align:center;
	word-wrap:break-word;
	word-break:normal;
}

/*
.bx-wrapper .bx-prev ul{
	width:45px;
	height:190px;
	margin-top:25px;
	overflow:hidden;
	list-style:none;
}

.bx-wrapper .bx-prev ul li{
	text-align:center;
	color: black;
	float:right;
	display:inline;
	margin-left:20px;
	width:45px;
	height:190px;
	font-size:20px;
	word-wrap:break-word;
	word-break:normal;
	z-index: 10;
}
*/

.bx-wrapper .bx-controls-direction a.disabled {
	display: none;
}

.bx-wrapper .bx-controls-auto {
	text-align: center;
}

.bx-wrapper .bx-controls-auto .bx-start {
	display: block;
	width: 10px;
	height: 11px;
	outline: 0;
	margin: 0 3px;
}

.bx-wrapper .bx-controls-auto .bx-start:hover,.bx-wrapper .bx-controls-auto .bx-start.active {
	background-position: -86px 0;
}

.bx-wrapper .bx-controls-auto .bx-stop {
	display: block;
	width: 9px;
	height: 11px;
	outline: 0;
	margin: 0 3px;
}

.bx-wrapper .bx-controls-auto .bx-stop:hover,.bx-wrapper .bx-controls-auto .bx-stop.active {
	background-position: -86px -33px;
}

.bx-wrapper .bx-controls.bx-has-controls-auto.bx-has-pager .bx-pager {
	text-align: left;
	width: 80%;
}

.bx-wrapper .bx-controls.bx-has-controls-auto.bx-has-pager .bx-controls-auto {
	right: 0;
	width: 35px;
}

.bx-wrapper .bx-caption {
	position: absolute;
	bottom: 0;
	left: 0;
	background: #666\9;
	background: rgba(80,80,80,0.75);
}

.bx-wrapper .bx-caption span {
	color: #fff;
	font-family: Arial;
	display: block;
	font-size: .85em;
	padding: 10px;
}

li {
	list-style-type:none;
	width:100%;
	height: 190px;
	margin-top: 20px;
	margin-bottom:20px;
}

</style>


<section class="cont">
	<ul>

	@foreach ($topics as $index => $subtopics)
	<li>

	<section class="focus">
	<div class="bx-wrapper" style="max-width: 100%; width:90%; padding-left: 20px;">
			<div class="topic-info swiper-container-horizontal" id="slide_0{{{ $index }}}" 
					style="padding-top:3px; width:90%; height:190px; margin-left:20px">
				<div class="swiper-wrapper">
				@foreach ($subtopics as $tindex => $topic)
					<div class="swiper-slide" data-swiper-slide-index={{ $tindex }} style="width:80%;">
						<span>
						<a href={{{ URL::to("topics/$topic->id") }}}>
						<img alt={{{ $topic->title }}} src={{{ $topic->image }}} width="100%" height="190">
						</a>
						</span>
						<p><a href={{{ URL::to("topics/$topic->id") }}}>{{{ $topic->title }}}</a></p>
					</div>
				@endforeach
				</div>
			</div>

			<div class="bx-controls bx-has-pager bx-has-controls-direction">
				<div class="bx-controls-direction">
					<a class="bx-prev bx-prev-color-{{{ $index }}}" href="http://123.59.53.158/nodes/{{{ $nodes['top'][$index]->id }}}"><div>{{{ $nodes['top'][$index]->name }}}</div></a>
				</div>
			</div>

    	</div>
	</div>
	</section>

	</li>
	@endforeach
	</ul>

	<!--
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
            <div class="mbtn"><a href="http://123.59.53.158/nodes/{{{ $nodes['top'][$tindex]->id }}}">更多资讯 &gt;</a></div>
        </section>
    </section>
	@endforeach
	-->

</section>

<!--
<footer>
<p>&#169;2015&nbsp;IYO游戏论坛</p>
</footer>
-->

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
