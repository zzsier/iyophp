@extends('layouts.default')

@section('content')

<script>
	var node_id = {{{ $node->id }}};
</script>

<link rel="stylesheet" type="text/css" href={{{URL::asset('mobile/ywap15_list.css')}}}>
<script type="text/javascript" src={{{URL::asset('mobile/jquery-1.7.2.min.js')}}}></script>
<script type="text/javascript" src={{{URL::asset('mobile/ywap15_list.js')}}}></script>

<section class="wrap">
<div class="title" style="padding-left: 12px;height: 46px;line-height: 46px;padding-top: 4px;border-bottom: 1px solid #d2d2da;font-size: 22px;">
	<span style="color: #30303a;font-size: 22px;padding-right: 8px;">{{{ $node->name }}}</span>
</div>
</section>

<section class="wrap">
    <section id="newslist" class="newslist">
        <section>
		@foreach ($ntopics as $index => $topic)
            <a href={{ URL::to("topics/$topic->id") }}>
                <dl>
                    <dt><img alt="" width="70" height="70" src={{{ $topic->image }}}></dt>
                    <dd>
                        <h2>{{{ $topic->title }}} <time>{{{ date("Y-m", strtotime($topic->created_at)) }}}</time></h2>
                        <div></div>
                    </dd>
                </dl>
            </a>
		@endforeach
        </section>
		@if( count($ntopics) >= 10 )
        <div class="mbtn clickbtn" id="clickbtn"><span>点击再加载10条</span></div>
		@endif
    </section>
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
