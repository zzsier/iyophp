@extends('layouts.default')

@section('content')

<script>
	var node_id = {{{ $node->id }}};
</script>

<link rel="stylesheet" type="text/css" href={{{URL::asset('mobile/ywap15_list.css')}}}>
<script type="text/javascript" src={{{URL::asset('mobile/jquery-1.7.2.min.js')}}}></script>
<script type="text/javascript" src={{{URL::asset('mobile/ywap15_list.js')}}}></script>

<section class="wrap">
<div class="title" style="padding-left: 12px;height: 46px;line-height: 46px;padding-top: 4px;border-bottom: 1px solid #c8ff01;font-size: 22px;">
	<span style="color: #FFFFFF;font-size: 22px;padding-right: 8px;">{{{ $node->name }}}</span>
</div>
</section>

<style type="text/css">

.newslist .is_top {
	float: left;
	height: 20px;
	width: 30px;
	padding: 0 8px;
	margin: 0 10px 0 0;
	background-color: #ff9600;
	text-align: center;
	font-size: 14px;
	line-height: 20px;
	color: #000;
	font-weight: 800;
}

.newslist .is_excellent {
	float: left;
	height: 20px;
	min-width: 30px;
	padding: 0 8px;
	margin: 0 10px 0 0;
	background-color: #fe0000;
	text-align: center;
	font-size: 14px;
	line-height: 20px;
	color: #000;
	font-weight: 800;
}

.newslist .is_subtitle {
	float: left;
	height: 20px;
	min-width: 30px;
	padding: 0 8px;
	margin: 0 10px 0 0;
	background-color: #c8ff01;
	text-align: center;
	font-size: 14px;
	line-height: 20px;
	color: #000;
	font-weight: 800;
}

.newslist .author{
	float: right;
	height: 20px;
	min-width: 30px;
	padding: 0 8px;
	margin: 0 10px 0 0;
	text-align: right;
	font-size: 14px;
	line-height: 20px;
	color: #000;
	font-weight: 800;
	margin-right: 0px;
}


</style>

<section class="wrap">
    <section id="newslist" class="newslist">
        <section>
		@foreach ($ntopics as $index => $topic)
            <a href={{ URL::to("topics/$topic->id") }}>
                <dl>
                    <dt><img alt="" width="70" height="70" src={{{ $topic->image }}}></dt>
                    <dd>
                        <h2>
						<div><h2 style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;width:180px;">{{{ $topic->title }}}</h2></div>
						@if( $topic->cate_id != 0 )
						<div class="is_subtitle">
							@foreach( $nodes['second'][$node->id] as $index => $subnode )
								@if( $subnode->id == $topic->cate_id )
								<span>{{{ $subnode->name }}}</span>
								@endif
							@endforeach
						</div>
						@endif

						@if( $topic->is_top != 0 )
						<div class="is_top"><span>置顶</span></div>
						@endif

						@if( $topic->is_excellent != 0 )
						<div class="is_excellent"><span>精华</span></div>
						@endif

						@if ( $topic->user != NULL)
							<div class="author"><h2>[{{{ $topic->user->username }}}]</h2></div>
						@endif

						<!--<time>{{{ date("Y-m", strtotime($topic->created_at)) }}}</time>-->
						</h2>
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
