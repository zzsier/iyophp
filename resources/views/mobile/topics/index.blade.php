@extends('layouts.default')

@section('content')

<script>
	var node_id = {{{ $node->id }}};
</script>

<link rel="stylesheet" type="text/css" href={{{URL::asset('mobile/ywap15_list.css')}}}>
<script type="text/javascript" src={{{URL::asset('mobile/jquery-1.7.2.min.js')}}}></script>
<script type="text/javascript" src={{{URL::asset('mobile/ywap15_list.js')}}}></script>
<script type="text/javascript" src={{{URL::asset('mobile/popup_layer.js')}}}></script>
<link rel="stylesheet" type="text/css" href={{{URL::asset('mobile/iyo.css')}}}>

<section class="wrap">
<div class="title">
	<a href={{ URL::to("/") }} ><span class="returnbutton">< 返回</span></a>
	<span class="titletext">{{{ $node->name }}}</span>
	<span id="ele9" class="filterbutton">+</span></a>
</div>
</section>


<div class="popupLayer" class="popupfilter">
	<div id="blk9" class="blk" style="opacity: 1;">
		<div class="head">
			<div class="head-right"></div>
		</div>
		<div class="main">
			<h2>分类选择</h2>
			<a href="javascript:void(0)" id="close9" class="closeBtn">X</a>
			<ul>
				<li><a class={{ $topictype == 1 ? 'current' : ';' }} href={{ URL::to("nodes/$node->id") }}><span class="all">全部</span></a></li>
				<li><a class={{ $topictype == 2 ? 'current' : ';' }} href={{ URL::to("nodes/$node->id?filter=excellent") }}><span class="good">精华</span></a></li>
				@foreach ($subnodes as $index => $subnode)
					<li><a class={{ $topictype == $subnode->id ? 'current' : ';' }} href={{ URL::to("nodes/$node->id?subnode=$subnode->id") }}><span class="topic">{{{ $subnode->name }}}</span></a></li>
				@endforeach
			</ul>
		</div>
		<div class="foot">
			<div class="foot-right"></div>
		</div>
	</div>
	<iframe border="0" frameborder="0" style="position: absolute; z-index: -1; left: 0px; top: 0px; opacity: 0; width: 100%; height: 202px;"></iframe>
</div>


<script>
	var t9 = new PopupLayer({trigger:"#ele9",popupBlk:"#blk9",closeBtn:"#close9",
	useOverlay:true,useFx:true,offsets:{x:0-$(".filterbutton").offset().left+20,y:-41}});

	t9.doEffects = function(way){
		if(way == "open"){
			this.popupLayer.css({opacity:0.3}).show(400,function(){
			this.popupLayer.animate({
				//left:($(document).width() - this.popupLayer.width())/2-100,
				left:20,
				top:(document.documentElement.clientHeight -
				this.popupLayer.height())/2 + $(document).scrollTop(),
				opacity:0.8
			},600,function(){this.popupLayer.css("opacity",1)}.binding(this));
			}.binding(this));
		}
		else
		{
			this.popupLayer.animate({
				//left:this.trigger.offset().left,
				top:this.trigger.offset().top,
				opacity:0.1
			},{duration:500,complete:function(){
				this.popupLayer.css("opacity",1);this.popupLayer.hide()}.binding(this)});
		}
	}

</script>

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
