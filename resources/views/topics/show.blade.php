@extends('layouts.default')

@section('title')
{{{ $topic->title }}}_@parent
@stop

@section('content')

<link href={{{URL::asset('Bbs/ueditor.css')}}} type="text/css" rel="stylesheet">
<link href={{{URL::asset('Bbs/Bbs_book.css')}}} type="text/css" rel="stylesheet">
<style id="edui-customize-zolinsertcode-style">.edui-default  .edui-for-zolinsertcode .edui-icon {undefined}</style>
<style id="edui-customize-zolblockquote-style">.edui-default  .edui-for-zolblockquote .edui-icon {undefined}</style>
<style id="edui-customize-zolemotion-style">.edui-default  .edui-for-zolemotion .edui-icon {undefined}</style>
<style id="edui-customize-atuser-style">.edui-default  .edui-for-atuser .edui-icon {undefined}</style>
<script src={{{URL::asset('Bbs/codemirror.js')}}} charset="gbk"></script>
<link href={{{URL::asset('Bbs/codemirror.css')}}} type="text/css" rel="stylesheet">


<script>
var boardid = '41',
	bookid  = '4402',
	userid  = '0kxo0w',
	page	= '1';

var Detail_Config = {
		bbsid	   : '6',
		reportType : {"1":"\u5e7f\u544a","2":"\u53cd\u52a8","3":"\u8272\u60c5","4":"\u8fdd\u89c4\u8fdd\u6cd5"},
		totalPage  : '3',
		title	  : '#ZOL论坛神回复精选# 秒懂看点、槽点、尿点（第十八期）',
		showjointag : {{ $showjointag?"true":"false" }}
},WEB_CONFIG = {
		mainProid : '',
		userid : {{{ Auth::id() }}},
		writer	 : 'admincode47',
		isPhoneCharge : 0,
		isShareBtn	: 0,
		modifyLimitScore : '100',
		pageType : 'detail',
		selfBoardid   : '41',
		bbsid	 : '6',
		topic_id : {{{ $topic->id }}},
		cateid 	 : 5,
		boardid  : '41',
		bookid   : '4402',
		subid	: 0,
		manuid	 : 0,
		productid: 0,
		booktoptype: 1,		
		listUrl  : '/quanzi/d41.html',
		ipCk	 : '58 I5/L3j7QuMDg5MDgwLjE0MzQ2OTgwMTE=',
		adminer	 : '',
		userArr  : ["admincode47","3hlifacd90","pjucfad561","r2ozm5","2858518788","watt008","mijiye68332","1xxooxx1","lym731552206","zyc3545","1111ll1","wolf1001","fyjc0513","ymtvuo","fupy007","ilovediy23","sina_s41404m21h"],
		replyIdArr : ["111487","111488","111496","111499","111503","111504","111505","111506","111507","111527","111528","111529","111530","111531","111534","111537","111543","111548","111550","111556"],
		delayLoad : {
			'zTuan' : ''
		}
},
Z_TuanParams = {
	productId   : WEB_CONFIG.productid, 
	formType	:'2',
	productName :""//产品名，选填
};
</script>

<script src={{{URL::asset('Bbs/Bbs_book.js')}}} charset="gbk"></script>

<div class="wrapper">
	<div class="crumb">
	<a href="http://123.59.53.158/">IYO论坛</a> &gt; 
	<a href={{{ URL::to("nodes/$node->id") }}}>{{{ $node->name }}}</a>
	</div>	
	<div class="title-top border-radius-top box-shadow-top clearfix" id="bookTitle">
	  	<h1>{{{ $topic->title }}}</h1>
	</div>
	
	<table class="post-list host-post box-shadow" data-id="admincode47">
		<tbody>
			<tr>
				<td class="post-side" rowspan="3">
				<!-- 楼主信息区域 -->
					<div class="portrait">
						<p class="name "><a class="user-name">{{{ $topic->user->username }}}</a></p>
						<div class="picbox">
							<a class="pic" href="http://my.zol.com.cn/bbs/admincode47/">
								<img src="http://123.59.53.158/{{{ $topic->user->imageUrl }}}" alt={{{ $topic->user->username }}} title={{{ $topic->user->username }}} width="100" height="100">
							</a>
						</div>

					</div>
				</td>
				<td class="post-title clearfix">
					<span class="publish-time">发表于 {{{ date("Y-m-d H:i:s", strtotime($topic->created_at)) }}}</span>
					<!--<span class="host border-radius-s3" id="copyBookUrl">楼主</span>-->
				</td>
			</tr>

			<tr>
				<td class="post-main">
					<div id="bookContent">
						{!! $topic->body !!}

						@if( $showjointag == true )
						@if( !$alreadyjoin )
						<div class="sign-upbox">
							<input class="sign-btn" type="button" value="我要报名" id="signBtn"><span>旁观不如马上行动</span>
						</div>
						@endif

						<div class="member-listbox">
							<div class="member-header">
								<!--<h5>共有383人参加此次活动</h5>-->
								<span class="member-tip">参加此次活动的用户名单，如有特殊情况不能参加，请提前通知管理员哦</span>
								<!--<a class="look-more" href="http://bbs.zol.com.cn/index.php?c=active&a=signList&bbsid=6&boardid=2&bookid=26177">查看所有报名人员(383)&gt;&gt;</a>-->
							</div>
							<ul class="member-list clearfix">
								@if ( Auth::id() == $topic->user->id || Auth::user()->can("manage_topics") )
									@foreach( $activities as $index => $activity )
									<li>
										<a href="#">
											<img width="50" height="50" src={{{ URL::to($activity->user->imageUrl) }}} alt={{{ $activity->user->username }}}>
											<span class="user-name">{{{ $activity->user->username }}}</span>
										</a>
										@if( $activity->flag == 0 )
											<a href={{{ URL::to("activity/agree?activity_id=$activity->id&topic_id=$topic->id") }}}>
											<span class="user-name">同意</span>
											</a>
											<a href={{{ URL::to("activity/deny?activity_id=$activity->id&topic_id=$topic->id") }}}>
											<span class="user-name">拒绝</span>
											</a>
										@elseif( $activity->flag == 1 )
											<span class="user-name">已同意</span>
										@else
											<span class="user-name">已拒绝</span>
										@endif
									</li>
									@endforeach
								@else
									@foreach( $activities as $index => $activity )
									@if( $activity->flag == 1 )
									<li>
										<a href="#">
											<img width="50" height="50" src={{{ URL::to($activity->user->imageUrl) }}} alt={{{ $activity->user->username }}}>
											<span class="user-name">{{{ $activity->user->username }}}</span>
										</a>
									</li>
									@endif
									@endforeach
								@endif
							</ul>
						</div>
						@endif

					</div>
				</td>
			</tr>
			<tr>
				<td class="post-footer">
					<div class="main-options clearfix">
						<div class="options">
							<div class="options-btns clearfix">
								@if( Auth::check() )
								@if ( Auth::id() == $topic->user->id || Auth::user()->can("manage_topics") )
								<a class="btn border-radius-s3" href={{{ URL::to("topics/$topic->id/edit") }}} type="book">编辑</a>
								@endif
								@endif
								<!--<a class="btn border-radius-s3" data-options="report" href="###">举报</a>
								<a class="btn border-radius-s3" href="/sjbbs/d33669_1404_uid_0kxo0w.html">只看此人</a>
        						<a class="btn-blue btn-2 border-radius-s3" data-options="score" href="###" data-userid="0kxo0w" data-param="0kxo0w">评分</a>
        						<a class="btn-blue btn-2 border-radius-s3" href="###" id="replyAuthorBtn">回复</a>-->
        					</div>
						</div>
					</div>
					<!-- //main-options end -->
				</td>


				</tr>

		</tbody>
	</table>
			
	<input type="hidden" id="userScore" value="">
	<input type="hidden" value="/index.php?c=publish&amp;a=reply&amp;boardid=41&amp;bookid=4402&amp;bbsid=6" id="seniorReplyUrl">
	<input type="hidden" id="addScoreStr" value="1|2|3|5">


	@if ( isset($replies) )
		@foreach ($replies as $index => $reply)
		<a id="reply1"></a>
		<table class="post-list  box-shadow replyList" data-id="3hlifacd90">
			<tbody>
				<tr>
					<td class="post-side" rowspan="3">
						<div class="portrait">
								<p class="name "><a class="user-name">{{{ $reply->user->username }}}</a></p>
								<div class="picbox">
								<a class="pic" href="http://123.59.53.158/{{{ $reply->user->imageUrl }}}">
									<img src="http://123.59.53.158/{{{ $reply->user->imageUrl }}}" alt={{{ $reply->user->username }}} title={{{ $reply->user->username }}} width="100" height="100">
								</a>
							</div>
					   	</div>
					</td>
					<td class="post-title clearfix">
						<span class="publish-time">发表于 {{{ date("Y-m-d H:i:s", strtotime($reply->created_at)) }}}</span>
						<!--<span class="floor">1楼</span>-->
					</td>
				</tr>
				<tr>
					<td class="post-main">
						{!! $reply->body !!}
					</td>
				</tr>
						</tbody>
		</table>
		@endforeach
	@endif
	

	<div class="pgs-foot clearfix">
		<div class="btn-div">
			<div class="publish-btn">
				<a href={{ URL::to("topics/create?node_id=$node->id") }} class="fb-btn-up border-radius-s3 cir_btn"><span>发表新帖</span></a>
		   	</div>
			<a href={{{ URL::to("nodes/$node->id") }}} class="back border-radius-s3"><span>返回列表</span></a>		
		</div>

		<style  type="text/css">
		.pagination{display:inline-block;padding-right:0;margin:20px 0;border-radius:4px}.pagination>li{display:inline}.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:6px 12px;margin-left:-1px;line-height:1.42857143;color:#428bca;text-decoration:none;background-color:#fff;border:1px solid #ddd}.pagination>li:first-child>a,.pagination>li:first-child>span{margin-left:0;border-top-left-radius:4px;border-bottom-left-radius:4px}.pagination>li:last-child>a,.pagination>li:last-child>span{border-top-right-radius:4px;border-bottom-right-radius:4px}.pagination>li>a:focus,.pagination>li>a:hover,.pagination>li>span:focus,.pagination>li>span:hover{color:#2a6496;background-color:#eee;border-color:#ddd}.pagination>.active>a,.pagination>.active>a:focus,.pagination>.active>a:hover,.pagination>.active>span,.pagination>.active>span:focus,.pagination>.active>span:hover{z-index:2;color:#fff;cursor:default;background-color:#428bca;border-color:#428bca}.pagination>.disabled>a,.pagination>.disabled>a:focus,.pagination>.disabled>a:hover,.pagination>.disabled>span,.pagination>.disabled>span:focus,.pagination>.disabled>span:hover{color:#777;cursor:not-allowed;background-color:#fff;border-color:#ddd}.pagination-lg>li>a,.pagination-lg>li>span{padding:10px 16px;font-size:18px}.pagination-lg>li:first-child>a,.pagination-lg>li:first-child>span{border-top-left-radius:6px;border-bottom-left-radius:6px}.pagination-lg>li:last-child>a,.pagination-lg>li:last-child>span{border-top-right-radius:6px;border-bottom-right-radius:6px}.pagination-sm>li>a,.pagination-sm>li>span{padding:5px 10px;font-size:12px}.pagination-sm>li:first-child>a,.pagination-sm>li:first-child>span{border-top-left-radius:3px;border-bottom-left-radius:3px}.pagination-sm>li:last-child>a,.pagination-sm>li:last-child>span{border-top-right-radius:3px;border-bottom-right-radius:3px}.pager{padding-left:0;margin:20px 0;text-align:center;list-style:none}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#fff;border:1px solid #ddd;border-radius:15px}.pager li>a:focus,.pager li>a:hover{text-decoration:none;background-color:#eee}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.pager .disabled>a,.pager .disabled>a:focus,.pager .disabled>a:hover,.pager .disabled>span{color:#777;cursor:not-allowed;background-color:#fff}
		</style>

		<!-- 页面底部分页 -->
		<div class="pgs pgs-foot clearfix">
		<?php echo $replies->render(); ?>
		</div>

				
		<!--<div class="page-go">
			<span>去第</span>
			<input class="text border-radius-s3" type="text" value="">
			<span>页</span>
			<a href="javascript:;" id="goToPage" class="btn-blue border-radius-s3">确定</a>
		</div>
		
		<div class="page"><span class="current">1</span><a href="http://bbs.zol.com.cn/quanzi/d41_4402_2.html" target="_self">2</a><a href="http://bbs.zol.com.cn/quanzi/d41_4402_3.html" target="_self">3</a><a href="http://bbs.zol.com.cn/quanzi/d41_4402_2.html" class="next" target="_self">下一页</a></div>
		<span class="keyboard-page">支持键盘翻页 ( 左<i></i>右 )&nbsp;</span>-->
	</div>
	<!-- //pgs-foot -->
	
	@if( Auth::check() )
	<div class="reply-section border-radius-s5 box-shadow">
		<a href="#" class="user-pic">
		<img width="100" height="100" src="http://123.59.53.158/{{{ Auth::user()->imageUrl }}}" alt={{{ Auth::user()->username }}} title={{{ Auth::user()->username }}}>
		</a>
		<div class="reply-editor editor-simple">
				<div id="container" class="edui-detail" style="">
				</div>
				<!-- 配置文件 -->
				<script type="text/javascript" src={{{URL::asset('Bbs/ueditor.config.reply.js')}}}></script>
				<!-- 编辑器源码文件 -->
				<script type="text/javascript" src={{{URL::asset('Bbs/ueditor.all.js')}}}></script>
				<!--添加按钮 -->
				<script type="text/javascript" src={{{URL::asset('Bbs/addCustomize.detail.js')}}}></script>
				<!-- 实例化编辑器 -->
				<script type="text/javascript">
					var ue = UE.getEditor('container');
				</script>
		</div>

		<div class="reply-footer clearfix">
			<a class="btn-blue border-radius-s3" href="javascript:;" id="publishReply">发表回复</a>
		</div>
	</div>
	@endif
	
<!--<script src={{{URL::asset('Bbs/Bbs_book.js')}}} charset="gbk"></script>-->
<script src={{{URL::asset('Bbs/login.js')}}}></script>
<script src={{{URL::asset('Bbs/jquery.calendar.js')}}}></script>
<script src={{{URL::asset('Bbs/search.js')}}}></script>
<script>

if (typeof ue != "undefined") {
	ue.addListener("ready",
		function(editor) {
			$("#publishReply").click(function() {
				var content = ue.getContent();
				reply(content, "bottom", ue.getContentTxt().length)
			});
			$(ue.container).find("iframe").contents().keydown(function(event) {
				if (event.keyCode == 13 && event.ctrlKey) {
					$("#publishReply").click()
				}
				return
			})
		})
}

function reply(content, type, length) {

	if (!content || !content.replace(/\s*/, "")) {
		Layer.tips({
			content: "<p>\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a~</p>"
		});
		return false
	}

	var con_len = length ? length: content.replace(/<[^>].*?>/g, "").replace(/{:\d+_\d+:}/g, "").length;

	if ( con_len < 5 ) {
		Layer.tips({
			content: "<p>\u5185\u5bb9\u8fc7\u5c11~</p>"
		});
		return false
	}

	content = content.replace(/\n/g, "<br>");
	var toid = 0;
	var txtid = 0;
	var picid = 0;

	var data = {
		content: content,
		toid: {{ $topic->id }}
	};

	$.post("/replies", data,
		function(json) {
			if (typeof json != "undefined" || !json) {
				if (json.info == "ok") {
					Layer.alert({
						content: json.tips
					});
					window.location.reload();
					return true;
				} else {
					if (json.info == "err") {
						Layer.tips({
							content: "<p>" + json.msg + "</p>"
						});
						return false
					}
				}
			}
		},
		"json")
};

 


</script>

@stop
