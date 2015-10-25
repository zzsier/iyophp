@extends('layouts.default')

@section('title')
{{ trans('message.Topic List') }} @parent
@stop

@section('content')

	<link href={{{URL::asset('demo/Bbs_index.css')}}} rel="stylesheet">
	<link href={{{URL::asset('Bbs/Bbs_list.css')}}} rel="stylesheet" />
	<script src={{{URL::asset('sjbbs/index.js')}}}></script>
	<script src={{{URL::asset('bbsmain/list.js')}}}></script>

	<div class="wrapper">

		<div class="crumb">
			<a href={{ URL::to("/") }}>IYO论坛</a> &gt;
			@if (isset($node))
				<a href={{ URL::to("nodes/$node->id") }}> {{{ $node->name }}}</a>
			@endif
		</div>

		<!--<div class="moderator-infor clearfix">-->
			<!-- //签到 -->
			<!-- <div class="sign-box" data-role="calendarSignTarget">
				<span class="sign-btn border-radius-top" btn-role="calendarSign" id="signInBtn" data-role="user-login"><em>签到</em><br>07月15日</span>
				<div class="signed-today-numbox">今日已有<em class="z_todaySignNum">4045</em>人签到</div>
			</div>-->
			<!--<div class="moderator-header clearfix">
				<h1>{{{ $node->name }}}论坛</h1>
			</div>-->
			<!--<div class="moderator-else">
				<p><span>今日：<a href="http://bbs.zol.com.cn/sjbbs/new/" target="_blank"><em class="pink-txt">2779</em></a></span><span>主题：26970</span><span>帖子数：32977257</span></p>
				<div class="moderator-names"><span class="pink-txt">版主：</span>
					<a href="http://my.zol.com.cn/bbs/fupy007/" target="_blank">幸福fupy007</a>
					<a href="http://my.zol.com.cn/bbs/kyl5201314/" target="_blank">铁心木头人</a>
					<a href="http://my.zol.com.cn/bbs/zoltest999/" target="_blank">zoltest999</a>
				</div>
			</div>-->
		<!--</div>-->

		<a name="c" id="c"></a>

		<div class="list-main box-shadow border-radius-s3">
			<div class="list-main-top">
				<!-- 分页 -->
				<div class="pgs clearfix">
					<div class="btn-div">
						<div class="publish-btn">
							<a href={{ Auth::check() ? URL::to("topics/create?node_id=$node->id") : 'javascript:;' }} class="fb-btn-up border-radius-s3" {{ Auth::check() ? '' : 'data-role=user-login' }}><span>发表新帖</span></a>
						</div>

					</div>
					<!--<div class="page-go">
						<span>去第</span>
						<input class="text border-radius-s3" type="text" id="jumpUrlInput1" value="">
						<span>页</span>
						<a href="http://bbs.zol.com.cn/sjbbs/###" class="btn-blue border-radius-s3" id="jumpUrl1">确定</a>
					</div>
					<div class="page">
						<span class="current">1</span><a href="http://bbs.zol.com.cn/sjbbs/p2.html#c">2</a><a href="http://bbs.zol.com.cn/sjbbs/p3.html#c">3</a><span>...</span><a href="http://bbs.zol.com.cn/sjbbs/p899.html#c">899</a><a href="http://bbs.zol.com.cn/sjbbs/p2.html#c" class="next">下一页</a>	</div>
					<span class="keyboard-page">支持键盘翻页 ( 左<i></i>右 )&nbsp;</span> -->
				</div>

				<div class="list-navs clearfix">
					<a class={{ $topictype == 1 ? 'current' : ';' }} href={{ URL::to("nodes/$node->id") }}><span class="all">全部</span></a>
					<a class={{ $topictype == 2 ? 'current' : ';' }} href={{ URL::to("nodes/$node->id?filter=excellent") }}><span class="good">精华</span></a>
					@foreach ($subnodes as $index => $subnode)
						<a class={{ $topictype == $subnode->id ? 'current' : ';' }} href={{ URL::to("nodes/$node->id?subnode=$subnode->id") }}><span class="topic">{{{ $subnode->name }}}</span></a>
					@endforeach
				</div>
			</div><!-- end class="list-main-top -->


			<table class="list " id="bookList">
				<tbody>
				<tr class="list-title">
					<td colspan="2">
						<div class="typebox">
							<!--
							<label class="check-label" for="new-open"><input id="new-open" name="ch1" type="checkbox" checked="">新标签打开</label>
							<a class="current">最新回复</a> 
							| <a href="http://bbs.zol.com.cn/sjbbs/new.html#c">最新发布</a> 
							| <a href="http://bbs.zol.com.cn/sjbbs/reply.html#c">最多回复</a> 
							| <a href="http://bbs.zol.com.cn/sjbbs/hot.html#c">最多查看</a> | 
							-->
						</div>
					</td>
					<td class="author">作者/时间</td>
					<td class="reply">回复/查看</td>
					<td class="last-post">最后回复</td>
				</tr>

				@foreach ($topicslv1 as $topic)
				<tr>
					<td class="folder">
						<span title="一级置顶" class="ico-atop"></span>
					</td>
					<td class="title " data-pic="" data-url={{ URL::to("topics/$topic->id") }}>
						<div>
							<a class="topicurl listbook" style="" href={{ URL::to("topics/$topic->id") }} > {{{ $topic->title }}} </a>
						</div>
					</td>

					<td class="author">

						@if ( $topic->user != NULL)
							<a class="name" href="#">{{{ $topic->user->username }}}</a>
						@else
							<a class="name" href="#">匿名用户</a>
						@endif
						<span class="date">{{{ date("Y-m-d", strtotime($topic->created_at)) }}}</span>
					</td>

					<td class="reply">
						<span class="black">{{{ $topic->reply_count }}}</span>/
						<i class="max-num">{{{ $topic->view_count }}}</i>
					</td>

					<td class="last-post">
						<a class="name" href="#" title="">{{{ $topic->last_reply_user_id }}}</a>
						<a href="http://bbs.zol.com.cn/sjbbs/d34130_134873_2.html#reply27" class="date"></a>
					</td>
				</tr>
				@endforeach

				@foreach ($topicslv2 as $index => $topic)
				<tr>
					<td class="folder">
						<span title="二级置顶" class="ico-btop"></span>
					</td>
					<td class="title " data-pic="" data-url={{ URL::to("topics/$topic->id") }}>
						<div>
							<a class="topicurl listbook" style="" href={{ URL::to("topics/$topic->id") }} > {{{ $topic->title }}} </a>
						</div>
					</td>

					<td class="author">

						@if ( $topic->user != NULL)
							<a class="name" href="#">{{{ $topic->user->username }}}</a>
						@else
							<a class="name" href="#">匿名用户</a>
						@endif

						<span class="date">{{{ date("Y-m-d", strtotime($topic->created_at)) }}}</span>
					</td>

					<td class="reply">
						<span class="black">{{{ $topic->reply_count }}}</span>/
						<i class="max-num">{{{ $topic->view_count }}}</i>
					</td>

					<td class="last-post">
						<a class="name" href="#" title="">{{{ $topic->last_reply_user_id }}}</a>
						<a href="http://bbs.zol.com.cn/sjbbs/d34130_134873_2.html#reply27" class="date"></a>
					</td>
				</tr>
				@endforeach

				<tr class="edition-topic">
					<td colspan="5">
						<div class="edition-topic-inner"><span>版块主题</span>
						<!--<a id="existNewReply" style="display: none;" class="new-reply-btn" href="http://bbs.zol.com.cn/sjbbs/#">有新回复的主题... 点击查看</a>-->
						</div>
					</td>
				</tr>


				@foreach ($ntopics as $topic)
				<tr>
					<td class="folder">
						<span title="" class=""></span>
					</td>
					<td class="title " data-pic="" data-url={{ URL::to("topics/$topic->id") }}>
						<div>
							<a class="topicurl listbook" style="" href={{ URL::to("topics/$topic->id") }} > {{{ $topic->title }}} </a>
						</div>
					</td>

					<td class="author">
						@if ( $topic->user != NULL)
							<a class="name" href="#">{{{ $topic->user->username }}}</a>
						@else
							<a class="name" href="#">匿名用户</a>
						@endif
						<span class="date">{{{ date("Y-m-d", strtotime($topic->created_at)) }}}</span>
					</td>

					<td class="reply">
						<span class="black">{{{ $topic->reply_count }}}</span>/
						<i class="max-num">{{{ $topic->view_count }}}</i>
					</td>

					<td class="last-post">
						<a class="name" href="#" title="">{{{ $topic->last_reply_user_id }}}</a>
						<a href="http://bbs.zol.com.cn/sjbbs/d34130_134873_2.html#reply27" class="date"></a>
					</td>
				</tr>
				@endforeach

				</tbody>
			</table>

		</div>
		<!-- //list-main -->

		<!-- 下一页
		<a class="loadding-more border-radius-s5 box-shadow" href="http://bbs.zol.com.cn/sjbbs/p2.html#c"><span class="line"><span>点击查看下一页&gt;&gt;</span></span></a>
		-->

		<style  type="text/css">
		.pagination{display:inline-block;padding-right:0;margin:20px 0;border-radius:4px}.pagination>li{display:inline}.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:6px 12px;margin-left:-1px;line-height:1.42857143;color:#428bca;text-decoration:none;background-color:#fff;border:1px solid #ddd}.pagination>li:first-child>a,.pagination>li:first-child>span{margin-left:0;border-top-left-radius:4px;border-bottom-left-radius:4px}.pagination>li:last-child>a,.pagination>li:last-child>span{border-top-right-radius:4px;border-bottom-right-radius:4px}.pagination>li>a:focus,.pagination>li>a:hover,.pagination>li>span:focus,.pagination>li>span:hover{color:#2a6496;background-color:#eee;border-color:#ddd}.pagination>.active>a,.pagination>.active>a:focus,.pagination>.active>a:hover,.pagination>.active>span,.pagination>.active>span:focus,.pagination>.active>span:hover{z-index:2;color:#fff;cursor:default;background-color:#428bca;border-color:#428bca}.pagination>.disabled>a,.pagination>.disabled>a:focus,.pagination>.disabled>a:hover,.pagination>.disabled>span,.pagination>.disabled>span:focus,.pagination>.disabled>span:hover{color:#777;cursor:not-allowed;background-color:#fff;border-color:#ddd}.pagination-lg>li>a,.pagination-lg>li>span{padding:10px 16px;font-size:18px}.pagination-lg>li:first-child>a,.pagination-lg>li:first-child>span{border-top-left-radius:6px;border-bottom-left-radius:6px}.pagination-lg>li:last-child>a,.pagination-lg>li:last-child>span{border-top-right-radius:6px;border-bottom-right-radius:6px}.pagination-sm>li>a,.pagination-sm>li>span{padding:5px 10px;font-size:12px}.pagination-sm>li:first-child>a,.pagination-sm>li:first-child>span{border-top-left-radius:3px;border-bottom-left-radius:3px}.pagination-sm>li:last-child>a,.pagination-sm>li:last-child>span{border-top-right-radius:3px;border-bottom-right-radius:3px}.pager{padding-left:0;margin:20px 0;text-align:center;list-style:none}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#fff;border:1px solid #ddd;border-radius:15px}.pager li>a:focus,.pager li>a:hover{text-decoration:none;background-color:#eee}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.pager .disabled>a,.pager .disabled>a:focus,.pager .disabled>a:hover,.pager .disabled>span{color:#777;cursor:not-allowed;background-color:#fff}
		</style>

		<!-- 页面底部分页 -->
		<div class="pgs pgs-foot clearfix">
		@if( $topictype == 1 )
			<?php echo $ntopics->render(); ?>
		@elseif( $topictype == 2 )
			<?php echo $ntopics->appends(['filter' => 'excellent'])->render(); ?>
		@else
			<?php echo $ntopics->appends(['subnode' => $topictype])->render(); ?>
		@endif
			<!--<div class="btn-div">
				<div class="publish-btn">
					<a href="javascript:;" class="fb-btn-up border-radius-s3" data-role="user-login"><span>发表新帖</span></a>
				</div>

			</div>
			<div class="page-go">
				<span>去第</span>
				<input class="text border-radius-s3" type="text" id="jumpUrlInput1" value="">
				<span>页</span>
				<a href="http://bbs.zol.com.cn/sjbbs/###" class="btn-blue border-radius-s3" id="jumpUrl1">确定</a>
			</div>
			<div class="page">
				<span class="current">1</span><a href="http://bbs.zol.com.cn/sjbbs/p2.html#c">2</a><a href="http://bbs.zol.com.cn/sjbbs/p3.html#c">3</a><span>...</span><a href="http://bbs.zol.com.cn/sjbbs/p899.html#c">899</a><a href="http://bbs.zol.com.cn/sjbbs/p2.html#c" class="next">下一页</a>	</div>
			<span class="keyboard-page">支持键盘翻页 ( 左<i></i>右 )&nbsp;</span>-->
		</div>
		<!-- 快速发帖 -->
		<script>
			var PbBook_Config = {
				"cateid"	  : '0',
				"boardid"	 : '34129',
				"bbsid"	   : '5',
				"subid"	   : '0',
				"manuid"	  : '0',
				"productid"   : '0',
				"action"	  : 'bbs',
				"boardType"   : '0',
				"bookType"	: 0
			}
		</script>
		<div class="quickSendPost">
		<!--
			<div class="quickSendPost-header border-radius-top">快速发帖</div>
			<div class="quickSendPost-cont box-shadow">
				<div class="quickSendPost-filter clearfix">

					<div class="quickSendPost-editor">
						<div class="quickSendPost-login">您需要登录后才可以发帖&nbsp;&nbsp;<a href="http://service.zol.com.cn/user/login.php">登录</a>&nbsp;<span class="line">|</span>&nbsp;<a href="http://service.zol.com.cn/user/register.php">注册</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="qq-login" href="http://service.zol.com.cn/user/api/qq/libs/oauth/redirect_to_login.php" title="使用qq账号登录"></a><a class="sina-login" href="http://service.zol.com.cn/user/api/sina/jump.php" title="使用新浪微博登录"></a></div>
						<div id="container" class="edui-detail" style=""><div id="edui1" class="edui-editor  edui-detail" style="width: auto; z-index: 10;"><div id="edui1_toolbarbox" class="edui-editor-toolbarbox edui-detail"><div id="edui1_toolbarboxouter" class="edui-editor-toolbarboxouter edui-detail"><div class="edui-editor-toolbarboxinner edui-detail"><div id="edui2" class="edui-toolbar   edui-detail" onselectstart="return false;" onmousedown="return $EDITORUI[&quot;edui2&quot;]._onMouseDown(event, this);" style="-webkit-user-select: none;"><div id="edui3" class="edui-box edui-button edui-for-bold edui-detail"><div id="edui3_state" onmousedown="$EDITORUI[&quot;edui3&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui3&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui3&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui3&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-button-wrap edui-detail"><div id="edui3_body" unselectable="on" title="加粗" class="edui-button-body edui-detail" onmousedown="return $EDITORUI[&quot;edui3&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui3&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-detail"></div></div></div></div></div><div id="edui4" class="edui-box edui-splitbutton edui-for-forecolor edui-detail edui-colorbutton"><div title="字体颜色" id="edui4_state" onmousedown="$EDITORUI[&quot;edui4&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui4&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui4&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui4&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-splitbutton-body edui-detail"><div id="edui4_button_body" class="edui-box edui-button-body edui-detail" onclick="$EDITORUI[&quot;edui4&quot;]._onArrowClick();"><div class="edui-box edui-icon edui-detail"></div><div id="edui4_colorlump" class="edui-colorlump"></div></div><div class="edui-box edui-splitborder edui-detail"></div><div class="edui-box edui-arrow edui-detail" onclick="$EDITORUI[&quot;edui4&quot;]._onArrowClick();"></div></div></div></div><div id="edui13" class="edui-box edui-button edui-for-link edui-detail"><div id="edui13_state" onmousedown="$EDITORUI[&quot;edui13&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui13&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui13&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui13&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-button-wrap edui-detail"><div id="edui13_body" unselectable="on" title="超链接" class="edui-button-body edui-detail" onmousedown="return $EDITORUI[&quot;edui13&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui13&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-detail"></div><div class="edui-box edui-label edui-detail"></div></div></div></div></div><div id="edui14" class="edui-box edui-button edui-for-zolinsertcode edui-detail"><div id="edui14_state" onmousedown="$EDITORUI[&quot;edui14&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui14&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui14&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui14&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-button-wrap edui-detail"><div id="edui14_body" unselectable="on" title="插入代码" class="edui-button-body edui-detail" onmousedown="return $EDITORUI[&quot;edui14&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui14&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-detail"></div><div class="edui-box edui-label edui-detail"></div></div></div></div></div><div id="edui15" class="edui-box edui-button edui-for-zolblockquote edui-detail"><div id="edui15_state" onmousedown="$EDITORUI[&quot;edui15&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui15&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui15&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui15&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-button-wrap edui-detail"><div id="edui15_body" unselectable="on" title="插入引用" class="edui-button-body edui-detail" onmousedown="return $EDITORUI[&quot;edui15&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui15&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-detail"></div><div class="edui-box edui-label edui-detail"></div></div></div></div></div><div id="edui16" class="edui-box edui-button edui-for-zolemotion edui-detail"><div id="edui16_state" onmousedown="$EDITORUI[&quot;edui16&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui16&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui16&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui16&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-button-wrap edui-detail"><div id="edui16_body" unselectable="on" title="插入表情" class="edui-button-body edui-detail" onmousedown="return $EDITORUI[&quot;edui16&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui16&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-detail"></div><div class="edui-box edui-label edui-detail"></div></div></div></div></div><div id="edui17" class="edui-box edui-button edui-for-atuser edui-detail"><div id="edui17_state" onmousedown="$EDITORUI[&quot;edui17&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui17&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui17&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui17&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-button-wrap edui-detail"><div id="edui17_body" unselectable="on" title="@朋友" class="edui-button-body edui-detail" onmousedown="return $EDITORUI[&quot;edui17&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui17&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-detail"></div><div class="edui-box edui-label edui-detail"></div></div></div></div></div></div></div></div><div id="edui1_toolbarmsg" class="edui-editor-toolbarmsg edui-detail" style="display:none;"><div id="edui1_upload_dialog" class="edui-editor-toolbarmsg-upload edui-detail" onclick="$EDITORUI[&quot;edui1&quot;].showWordImageDialog();">点击上传</div><div class="edui-editor-toolbarmsg-close edui-detail" onclick="$EDITORUI[&quot;edui1&quot;].hideToolbarMsg();">x</div><div id="edui1_toolbarmsg_label" class="edui-editor-toolbarmsg-label edui-detail"></div><div style="height:0;overflow:hidden;clear:both;" class="edui-detail"></div></div></div><div id="edui1_iframeholder" class="edui-editor-iframeholder edui-detail" style="width: 960px; height: 107px; z-index: 10; overflow: hidden;"><iframe id="ueditor_0" width="100%" height="100%" frameborder="0" src="javascript:void(function(){document.open();document.write("<!DOCTYPE html><html xmlns='http://www.w3.org/1999/xhtml' class='view' ><head><style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}
											body{margin:8px;font-family:sans-serif;font-size:16px;}p{margin:5px 0;}</style><link rel='stylesheet' type='text/css' href={{{URL::asset('Bbs/iframe.css')}}} /><style>p{font-size:14px;font-family:Microsoft YaHei}</style></head><body class='view' ></body><script type='text/javascript'  id='_initialScript'>setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant0'];editor._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);</script></html>");document.close();}())"></iframe></div>
											<div id="edui1_scalelayer" class="edui-detail"></div></div></div>
						<script type="text/javascript" src={{{URL::asset('js/ueditor.config.list.js')}}}></script>
						<script type="text/javascript" src={{{URL::asset('js/ueditor.all.js')}}}></script>
						<script type="text/javascript" src="/js/addCustomize.detail.js"></script>
						<script type="text/javascript">
							var ue = UE.getEditor('container');
						</script>
					</div>


				</div>
			</div>
			-->

			<table class="poup-pics" id="imgPopBox" style="display: none; top: 996px; left: 875px;"><tbody>
				<tr>
					<td class="tl"></td>
					<td class="tc"></td>
					<td class="tr"></td>
				</tr>
				<tr>
					<td class="cl"></td>
					<td class="cc"><a href="" class="pic" id="pre_img"><img src="" alt=""></a></td>
					<td class="cr"></td>
				</tr>
				<tr>
					<td class="bl"></td>
					<td class="bc"></td>
					<td class="br"></td>
				</tr>
				</tbody></table>
			<script>
				var WEB_CONFIG = {
					userid	  : '',
					bbsid		: 5,
					cateid 		: 0,
					boardid 	: 0,
					selfBoardid : 34129,
					subid	   : 0,
					manuid		: 0,
					productid	: 0,
					anchorTag   : 'c',
					hasImgPop   : true,
					listType	: 'bbs',
					adminer		: '0',
					guidelau	: '如果iPhone 6S真的涨价了，你还会买吗?',
					page 		: {nowPage : 1, maxPre : 899}

				}


			</script>
			
			<script src={{{URL::asset('Bbs/Bbs_list.js')}}} charset="gbk"></script>
			<script src={{{URL::asset('Bbs/search.js')}}}></script>
			<!--
			<script>
				//搜索提示处理
				$(function(){

					$('#searchBox').zsuggest({offsetX:0, offsetY:20, width: 419, source: 'bbs', bbsid: 5, isSuggest: true});
				});
			</script>
			-->

			<script src={{{URL::asset('Bbs/bbs_task_guide.js')}}}></script>
			<script type="text/javascript" src={{{URL::asset('Bbs/login.js')}}}></script>
			<script src={{{URL::asset('Bbs/jquery.calendar.js')}}}></script>

			<!-- 公共尾部 -->
			<!-- <a class="fixed-call-survey" href="http://survey.zol.com.cn/front/1/734.html">意见反馈</a> -->
			<div class="wrapper foot">
				<script>
					if (typeof WEB_CONFIG != 'undefined' && WEB_CONFIG.bbsid==1 && WEB_CONFIG.bookid) {
						var __publicNavWidth=$(".wrapper").width();
					} else {
						var __publicNavWidth=1000;
					}
				</script>
				<!--<script language="JavaScript" type="text/javascript" src={{{URL::asset('index/web_footc.js')}}}></script>
				<script language="JavaScript" type="text/javascript" src={{{URL::asset('index/web_foot.js')}}}></script>
				<script type="text/javascript" id="pv_d" src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/p.ht"></script>
				<script src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/cg_gmine.js" type="text/javascript"></script>
				<script src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/h.js" type="text/javascript"></script>
				<script type="text/javascript" id="adstat_js" src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/ol.js"></script>-->
			</div>

		</div>

	</div>
	<div id="edui_fixedlayer" class="edui-detail" style="position: fixed; left: 0px; top: 0px; width: 0px; height: 0px;">
		<div id="edui18" class="edui-popup  edui-bubble edui-detail" onmousedown="return false;" style="display: none;">
			<div id="edui18_body" class="edui-popup-body edui-detail">
				<iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank" class="edui-detail"></iframe>
				<div class="edui-shadow edui-detail"></div>
				<div id="edui18_content" class="edui-popup-content edui-detail">  </div>
			</div>
		</div>
	</div>

	<style type="text/css">
		.zol-global-footer{min-width:1000px; margin: 20px auto 0; background: #333; clear:both;}
		.zol-global-footer,.zol-global-footer *{float: none;}
		.zol-footer {float: none; height: 40px; min-width: 960px; overflow: hidden; float: none; clear: both; padding: 0 10px; background: #333; color: #ccc; text-align: left; font-size: 12px; font-family: arial; line-height: 40px;}.zol-footer *{float: none;}.zol-footer span {_display: inline; float:right; margin: 0 -7px 0 0; color:#666; font-family:"宋体"; font-size:10px; -webkit-text-size-adjust:none;}.zol-footer a{padding: 0 6px 0 7px; color:#ccc; text-decoration:none; font-family:Arial; font-size:12px;}.zol-footer a:hover{color:#ccc; text-decoration: underline;} .zol-footer i {display: none;}.zol-footer .footerw-2015{float: none; height: 40px; width:1000px; margin: 0 auto; line-height: 40px;}.zol-global-footer-fixed{position: fixed; bottom: 0; left: 0; width: 100%;}
	</style>
	<div id="zolGlobalFooter" class="zol-global-footer">
		<div class="zol-footer">
			<div class="footerw-2015">
				&nbsp;&#169;IYO游戏论坛</div>
		</div>
	</div>

	<script src={{{URL::asset('index/run.js')}}}></script>
	<script src={{{URL::asset('index/jQuery.cookie.js')}}}></script>

</div>

@stop
