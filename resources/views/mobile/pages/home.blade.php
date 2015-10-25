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
<link rel="stylesheet" type="text/css" href={{{URL::asset('mobile/iyo.css')}}}>


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

<section class="cont">
	<ul>

	@foreach ($topics as $index => $subtopics)
	<li class="homepageli">

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
