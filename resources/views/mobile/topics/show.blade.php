@extends('layouts.default')

@section('content')

<link rel="stylesheet" type="text/css" href={{{URL::asset('mobile/ywap15.css')}}}>
<link rel="stylesheet" type="text/css" href={{{URL::asset('mobile/ywap15_cont.css')}}}>

<link id="skin_css" rel="stylesheet" type="text/css" media="screen" href={{{URL::asset('mobile/wap-default.css')}}}>
<link id="frame_css" rel="stylesheet" type="text/css" media="screen" href={{{URL::asset('mobile/wap-changyan2.css')}}}>

<section class="wrap">
    <section class="newstitle">
        <h1>{{{ $topic->title }}}</h1>
        <dl>
            <dt>{{{ date("Y-m-d", strtotime($topic->created_at)) }}}　IYO手机频道 </dt>
        </dl>
    </section>
    <section class="newscontentbox" id="contentfontsize">
        <div class="newscontent">
			{!! $topic->body !!}
        </div>
    </section>

</section>

<section>
    <div id="SOHUCS" sid="81733337" style="width: 100%;">

<section class="reset-g section-title-wap section-title-b">
<div class="title-user-wap title-user-b"><span class="user-name-wap user-name-b">
<span id="cy-user-name">登 录</span>
</span></div>
</section>

<section id="cy-cbox-wrapper" class="reset-g section-cbox-wap section-cbox-b">
<div class="cbox-post-wap cbox-post-b">
<div class="post-area-wap post-area-b">
<textarea name="cy-cbox" rows="3" class="area-text-wap area-text-b" placeholder="我来说两句..."></textarea>
<input type="hidden" name="cyan-reply-id">
</div>
<div class="post-action-wap post-action-b">
<div class="action-function-wap action-function-b">
<ul class="function-list-wap function-list-b">

<li class="list-face-wap list-face-b">
<a class="face-mutual-wap face-mutual-b" href="javascript:void(0)">
<i class="mutual-pic-wap mutual-pic-b"></i>
</a>
</li>



</ul>
</div>
<div class="action-issue-wap action-issue-b">
<div class="issue-site-wap issue-site-b issue-site-e"></div>
<div class="issue-btn-wap issue-btn-b">
<a class="btn-mutual-wap btn-mutual-b" href="javascript:void(0)"><button type="button" class="mutual-btn-wap mutual-btn-b">发布</button></a>
</div>
</div>
<div class="face-box-wap" style="display:none">
<div class="box-cont-wap">
<div class="cont-roll-wap">
<ul class="cont-list-wap">
<li code="/奋斗"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face01.png"></li>
<li code="/鼓掌"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face02.png"></li>
<li code="/发怒"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face03.png"></li>
<li code="/色"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face04.png"></li>
<li code="/给力"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face05.png"></li>
<li code="/憨笑"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face06.png"></li>
<li code="/大哭"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face13.png"></li>
<li code="/疑问"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face14.png"></li>
<li code="/鄙视"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face15.png"></li>
<li code="/钱"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face16.png"></li>
<li code="/闭嘴"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face17.png"></li>
<li code="/可怜"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face18.png"></li>
<li code="/可爱"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face07.png"></li>
<li code="/抓狂"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face08.png"></li>
<li code="/流汗"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face09.png"></li>
<li code="/强"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face10.png"></li>
<li code="/弱"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face11.png"></li>
<li code="/玫瑰"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face12.png"></li>
<li code="/惊讶"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face19.png"></li>
<li code="/浮云"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face20.png"></li>
<li code="/打酱油"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face21.png"></li>
<li code="/握手"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face22.png"></li>
<li code="/拳头"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face23.png"></li>
<li code="/酒"><img src="http://changyan.itc.cn/upload/mobile/v1/wap-imgs/face/face24.png"></li>
</ul>
</div>
<div class="cont-page-wap"><span class="page-now-wap"></span><span></span></div>
</div>
</div>
</div>
</div>
</section>

<section id="cy-comment-list-wrapper" class="reset-g section-list-wap">
	<section id="cy-latest-list-wrapper" class="list-kinds-wap list-hot-wap">
	<h3 class="kinds-title-wap kinds-title-b">最新评论</h3>
	@foreach ($replies as $index => $reply)
		<article id="comment_756867688" class="kinds-comment-wap kinds-comment-b">
			<div class="comment-header-wap">
			<div class="header-wrap-wap">
			<div class="wrap-msg-wap">
			<div class="msg-name-wap msg-name-b">{{{ $reply->user->username }}}</div>
			<div class="msg-time-wap msg-time-b"><span class="time-date-wap">{{{ date("m-d H:i", strtotime($reply->created_at)) }}}</span></div>
			</div>
			</div>
			</div>
			<div class="comment-cont-wap" data-reply-id="756867688">
				<p class="cont-text-wap cont-text-b" data-content={{{ $reply->body }}}>
					{!! $reply->body !!}
				</p>
			</div>
		</article>
	@endforeach

	</section>
</section>
<script type="text/javascript" src={{{URL::asset('mobile/ywap15_cont.js')}}}></script>

</section>

@stop
