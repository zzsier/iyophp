@extends('layouts.default')

@section('content')
<script type="text/javascript" src={{{URL::asset('mobile/jquery-1.7.2.min.js')}}}></script>

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

			@if( $showjointag == true )
			@if( !$alreadyjoin )
			<style>
			.sign-btn {
				width: 161px; height: 50px; padding: 0 0 0 0;
				border: 0 none;
				border-bottom: 3px solid #ec2a53;
				background-color: #fd4b71;
				text-align: center;
				font: 24px/46px "Microsoft YaHei";
				color: #fff;
				cursor: pointer;
				background-position: 17px 10px;
			}
			</style>
			<div class="sign-upbox">
				<input class="sign-btn" type="button" value="我要报名" id="signBtn">
			</div>
			<script>
                $("#signBtn").click(function() {
                    var url = "http://123.59.53.158/activity/save";
					var data = {
						activeId: {{{ $topic->id }}},
					}
                    $.post(url, data,
                        function(json) {
                            if (typeof json != "undefined") {
                               setTimeout("window.location.reload()", 1500)
                            }
                        },
                        "json")
                });
			</script>
			@endif
			@endif

        </div>
    </section>

</section>

<section>
    <div id="SOHUCS" sid="81733337" style="width: 100%;">

<section class="reset-g section-title-wap section-title-b">
<div class="title-user-wap title-user-b"><span class="user-name-wap user-name-b">
</span></div>
</section>

@if( Auth::check() )
<section id="cy-cbox-wrapper" class="reset-g section-cbox-wap section-cbox-b">
<form action={{{ URL::to("/replies") }}} method="POST">
<div class="cbox-post-wap cbox-post-b">
	<div class="post-area-wap post-area-b">
		<textarea name="content" rows="3" class="area-text-wap area-text-b" placeholder="我来说两句..."></textarea>
		<input type="hidden" name="toid" value={{{ $topic->id }}} />
		<input type="hidden" name="type" value="mobile"/>
	</div>
	<div class="post-action-wap post-action-b" style="background:#000000;">
		<div class="action-issue-wap action-issue-b">
			<div class="issue-btn-wap issue-btn-b">
				<a class="btn-mutual-wap btn-mutual-b" href="#" }}}><button type="submit" class="mutual-btn-wap mutual-btn-b" style="color:#FFFFFF">发布</button></a>
			</div>
		</div>
	</div>
</div>
</form>
</section>
@endif

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
