@extends('backend.layouts.default')

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
	<div class="title-top border-radius-top box-shadow-top clearfix" id="bookTitle">
	  	<h1>{{{ $activity->title }}}</h1>
	</div>
	
	<table class="post-list host-post box-shadow" style="padding-bottom:40px;margin-bottom:50px;">
		<tbody>
			<tr>
				<td class="post-side" rowspan="3">
				<!-- 楼主信息区域 -->
					<div class="portrait">
						<p class="name ">
						@if ( $activity->user != NULL)
							<a class="user-name">{{{ $activity->user->username }}}</a>
						@else
							<a class="user-name" href="#">匿名用户</a>
						@endif
						</p>
						<div class="picbox">
							<a class="pic" href="#">
								@if ( $activity->user != NULL)
									<img src="http://123.59.53.158/{{{ $activity->user->imageUrl }}}" 
										alt={{{ $activity->user->username }}} title={{{ $activity->user->username }}} width="100" height="100">
								@endif
							</a>
						</div>

					</div>
				</td>
				<td class="post-title clearfix">
					<span class="publish-time">发表于 {{{ date("Y-m-d H:i:s", strtotime($activity->created_at)) }}}</span>
				</td>
			</tr>

			<tr>
				<td class="post-main">
					<div id="bookContent">
						{!! $activity->body !!}

						<div class="member-listbox">
							<div class="member-header">
								<span class="member-tip"></span>
							</div>
						</div>

					</div>
				</td>
			</tr>
			<tr>
				<td class="post-footer">
					<div class="main-options clearfix">
						<div class="options">
							<div class="options-btns clearfix">
								<a class="btn border-radius-s3" href={{{ URL::to("activities/$activity->id/edit") }}} type="book">编辑</a>
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


    <div class="panel panel-default">
		<div class="panel-heading">
			<div class="clearfix"><h4>已报名</h4></div>
		</div>
        <div class="panel-body remove-padding-horizontal">
			<ul class="list-group row topic-list center-block">
			@foreach( $activity->enrollments as $index => $enrollment )
			<li class="list-group-item media" style="margin-top: 0px;">
				@if( $enrollment->flag == 0 )
				<a class="pull-right" href={{{ URL::to("activity/agree?enrollment_id=$enrollment->id") }}}>
					<span class="badge badge-reply-count"> 同意 </span>
				</a>
				<a class="pull-right" href={{{ URL::to("activity/deny?enrollment_id=$enrollment->id") }}}>
					<span class="badge badge-reply-count"> 拒绝 </span>
				</a>
				@elseif( $enrollment->flag == 1 )
					<span class="pull-right badge badge-reply-count"> 已同意 </span>
				@else
					<span class="pull-right badge badge-reply-count"> 已拒绝 </span>
				@endif

				<div class="avatar pull-left">
					<a href="#">
						<img class="media-object img-thumbnail avatar" src="{{{ URL::to($enrollment->user->imageUrl) }}}"
							title="{{{ $enrollment->user->username }}}" style="width:48px;height:48px;">
					</a>
				</div>
			
				
				<div class="infos">
					<div class="media-heading">
						<a href="#" class="mkellipsis" title="哈哈">
							{{{ $enrollment->user->username }}}
						</a>
						<span class="mkellipsis" style="margin-right:20px;"> 姓名： {{{ $enrollment->username }}} </span>
						<span class="mkellipsis" style="margin-right:20px;"> 票数： {{{ $enrollment->num }}} </span>
						<span class="timeago text-right"> 于 {{{ date("Y-m-d H:i", strtotime($enrollment->created_at)) }}} </span>
					</div>
					<div class="meta">
						<span class="fa fa-thumbs-o-up remove-padding-left text-left mkellipsis" style="margin-right:20px;"> 手机号: {{{ $enrollment->phone }}} </span>
						<span class="fa fa-thumbs-o-up remove-padding-left text-left mkellipsis" style="margin-right:20px;"> 身份证号: {{{ $enrollment->identity }}} </span>
						<span class="mkellipsis"> 备注： {{{ $enrollment->content }}} </span>
					</div>
				</div>
			</li>
			@endforeach
			</ul>
        </div>
    </div>

<script src={{{URL::asset('Bbs/login.js')}}}></script>
<script src={{{URL::asset('Bbs/jquery.calendar.js')}}}></script>
<script src={{{URL::asset('Bbs/search.js')}}}></script>

@stop
