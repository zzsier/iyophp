@extends('layouts.default')

@section('title')
{{ trans('message.Topic List') }} @parent
@stop

@section('content')

    <link href={{{URL::asset('Bbs/Bbs_publish.css')}}} type="text/css" rel="stylesheet">
	<script src={{{URL::asset('Bbs/Bbs_publish.js')}}} charset="gbk"></script>

    <script>
        var boardid = {{{ isset($node)?$node->id:'0' }}};

        Publish_Config = {
            cateid  : '1',
            boardid : {{{ isset($node)?$node->id:'0' }}},
            bbsid	: '6',
            productid : '0',
            manuid    : '0',
            subid     : {{{ isset($topic)?$topic->cate_id:'0' }}},
            pageType  : '',
            topic_id : {{{ isset($topic)?$topic->id:'0' }}},
            book_type  : ''
        },WEB_CONFIG = {
            boardid : {{{ isset($node)?$node->id:'0' }}},
            attachFilesize : '5MB'
        };
    </script>
	<!--<script src={{{URL::asset('Bbs/zh-cn.js')}}} charset="gbk"></script>-->
    <link href={{{URL::asset('Bbs/ueditor.css')}}} type="text/css" rel="stylesheet">
    <style id="edui-customize-zolemotion-style">.edui-default  .edui-for-zolemotion .edui-icon {undefined}</style>
    <style id="edui-customize-zolattachment-style">.edui-default  .edui-for-zolattachment .edui-icon {undefined}</style>
    <style id="edui-customize-zolinsertvideo-style">.edui-default  .edui-for-zolinsertvideo .edui-icon {undefined}</style>
    <style id="edui-customize-inserthidden-style">.edui-default  .edui-for-inserthidden .edui-icon {undefined}</style>
    <style id="edui-customize-zolblockquote-style">.edui-default  .edui-for-zolblockquote .edui-icon {undefined}</style>
    <style id="edui-customize-zolinsertcode-style">.edui-default  .edui-for-zolinsertcode .edui-icon {undefined}</style>
    <style id="edui-customize-atuser-style">.edui-default  .edui-for-atuser .edui-icon {undefined}</style>
	<script src={{{URL::asset('Bbs/codemirror.js')}}} charset="gbk"></script>
    <link href={{{URL::asset('Bbs/codemirror.css')}}} type="text/css" rel="stylesheet">

    @if (isset($topic))
        {!! Form::model($topic, ['route' => ['topics.update', $topic->id], 'id' => 'topic-create-form', 'method' => 'patch']) !!}
    @else
        {!! Form::open(['route' => 'topics.store','id' => 'topic-create-form', 'method' => 'post']) !!}
    @endif

    <div class="wrapper">
        <input type="hidden" value="150" id="userScore">
        <input type="hidden" value="6" id="bbsID">
        <input type="hidden" value="" id="fenLouArr">
        <!-- 面包屑 -->
        <div class="crumb">
            <a href={{{ URL::to('/') }}}>IYO论坛</a> &gt; 
			<a href={{{ URL::to("nodes/$node->id") }}}>{{{ $node->name }}}</a> &gt; <a href="">发表新帖</a>
		</div>
		<div class="section border-radius">
            <div class="section-header"><h3><i class="line"></i>发表新帖</h3></div>
            <div class="filter-area clearfix">
                <span class="star-txt">*</span>

				@if( isset($subnodes) )
                <div class="selectbox2" id="bookBrand">
                    <span class="select-label border-radius" title={{{ $node->name }}} alt={{{ $node->name }}}><i class="trangle border-radius"></i>{{{ $node->name }}}</span>
                    <ul class="border-radius">
					@if ( $node )
                        <li data-id={{ $node->id }} data-type="subcate" data-subbbsid="" title={{ $node->name }} alt={{ $node->name }}>{{ $node->name }}</li>
					@endif
                    </ul>
                </div>

                <div class="selectbox2" id="bookModel">
                    @if( isset($category) )
                        <span class="select-label border-radius" title={{{ $category->name }}} alt={{{ $category->name }}}> <i class="trangle border-radius"></i>{{{ $category->name }}}</span>
                    @else
                        <span class="select-label border-radius" title="选择子版" alt="选择子版"><i class="trangle border-radius"></i>选择子版</span>
                    @endif
                    <ul class="border-radius">
					@foreach ($subnodes as $index => $subnode)
                        <li data-id={{ $subnode->id }} data-type="subcate" data-subbbsid="" title={{ $subnode->name }} alt={{ $subnode->name }} > {{ $subnode->name }}</li>
					@endforeach
                    </ul>
                </div>
				@endif

                <div class="tp-text border-radius">
                    <span class="tp-tip">0/40</span>
					@if( isset($topic) )
                    {!! Form::text('titleInput', $topic->title, ['class' => 'txt', 'id' => 'titleInput', 'placeholder' =>  '请输入标题']) !!}
					@else
                    {!! Form::text('titleInput', null, ['class' => 'txt', 'id' => 'titleInput', 'placeholder' =>  '请输入标题']) !!}
					@endif
                </div>

            </div>


            <div class="edit-post clearfix">
                <div class="content editor-simple">
                    <span class="edit-control-level" id="switchSeniorBtn">常用</span>
                    <!-- 加载编辑器的容器 -->
                    <div id="container" class="edui-default" style="">
					</div>
                    <!-- 配置文件 -->
                    <script type="text/javascript" src={{{URL::asset('Bbs/ueditor.config.js')}}}></script>
                    <!-- 编辑器源码文件 -->
                    <script type="text/javascript" src={{{URL::asset('Bbs/ueditor.all.js')}}}></script>
                    <!--添加按钮 -->
                    <script type="text/javascript" src={{{URL::asset('Bbs/addCustomize.js')}}}></script>
                    <!-- 实例化编辑器 -->
                    <script type="text/javascript">
                        var ue = UE.getEditor('container');
                        ue.ready(function() {
                            @if( isset($topic) )
                            ue.setContent('{!! $topic->body !!}');
                            @endif
                        });
                    </script>
                </div>


                <script>
                    var swfu,swfu2,swfa;
                    Reload = function() {
                        var settings = {
                            flash_url : "/Bbs/swfupload.swf",
                            upload_url: "http://123.59.53.158/moment/upload",
                            file_size_limit : "100 MB",
                            file_types : "*.jpg;*.gif;*.png;*.bmp;",
                            file_types_description : "Image Files",
                            file_upload_limit : 1000,  //配置上传个数
                            file_queue_limit : 0,
                            button_cursor:'-2',
                            debug: false,
                            progressWraper: 0,
                            // Button settings
                            button_image_url: "http://icon.zol.com.cn/community/publish/upload-bg.png",
                            button_width: "120",
                            button_height: "40",
                            button_placeholder_id: "uploadImgBtn",
                            button_text: '',
                            button_text_style: "",
                            button_text_left_padding: 0,
                            button_text_top_padding: 3,

                            file_queued_handler : swfUpload.fileQueued,
                            file_queue_error_handler : swfUpload.fileQueueError,
                            file_dialog_complete_handler : swfUpload.fileDialogComplete,
                            upload_start_handler : swfUpload.uploadStart,
                            upload_progress_handler : swfUpload.uploadProgress,
                            upload_error_handler : swfUpload.uploadError,
                            upload_success_handler : swfUpload.uploadSuccess,
                            upload_complete_handler : swfUpload.uploadComplete,
                            queue_complete_handler : swfUpload.queueComplete
                        };

                        var settings2 = {
                            flash_url : "/Bbs/swfupload.swf",
                            upload_url: "http://123.59.53.158/moment/upload",
                            //post_params: {"PHPSESSID" : "fb"},
                            file_size_limit : "100 MB",
                            file_types : "*.jpg;*.gif;*.png;*.bmp;",
                            file_types_description : "Image Files",
                            file_upload_limit : 1000,  //配置上传个数
                            file_queue_limit : 0,
                            //custom_settings : {
                            //progressTarget : "fsUploadProgress",
                            //cancelButtonId : "btnCancel"
                            //},
                            button_cursor:'-2',
                            debug: false,
                            progressWraper: 0,
                            // Button settings
                            button_image_url: "http://icon.zol.com.cn/community/publish/upload-goon-bg.png",
                            button_width: "54",
                            button_height: "24",
                            button_placeholder_id: "uploadImgBtn2",
                            button_text: '',
                            button_text_style: "",
                            button_text_left_padding: 0,
                            button_text_top_padding: 0,

                            file_queued_handler : swfUpload.fileQueued,
                            file_queue_error_handler : swfUpload.fileQueueError,
                            file_dialog_complete_handler : swfUpload.fileDialogComplete,
                            upload_start_handler : swfUpload.uploadStart,
                            upload_progress_handler : swfUpload.uploadProgress,
                            upload_error_handler : swfUpload.uploadError,
                            upload_success_handler : swfUpload.uploadSuccess,
                            upload_complete_handler : swfUpload.uploadComplete,
                            queue_complete_handler : swfUpload.queueComplete
                        };
                        swfu = new SWFUpload(settings);
                        swfu2 = new SWFUpload(settings2);

						var atta_settings = {
						   	flash_url: "http://123.59.53.158/Bbs/swfupload.swf",
						    upload_url: "http://123.59.53.158/moment/upload",
						    file_size_limit: fileSize,
						    file_types: "*.chm;*.zip;*.rar;*.jpg;*.gif;*.png;",
						    file_types_description: "Attach Files",
						    file_upload_limit: 5,
						    file_queue_limit: 5,
						    button_cursor: "-2",
						    debug: false,
						    progressWraper: 0,
						    button_image_url: "http://icon.zol.com.cn/community/publish/select-file-bg.png",
						    button_width: "117",
						    button_height: "33",
						    button_placeholder_id: "uploadAttachBtn",
						    button_text: "",
						    button_text_style: "",
						    button_text_left_padding: 0,
						    button_text_top_padding: 0,
						    file_queued_handler: swfUpload.fileQueued_Attach,
						    file_queue_error_handler: swfUpload.fileQueueError_Attach,
						    file_dialog_complete_handler: swfUpload.fileDialogComplete_Attach,
						    upload_start_handler: swfUpload.uploadStart_Attach,
						    upload_progress_handler: swfUpload.uploadProgress_Attach,
						    upload_error_handler: swfUpload.uploadError_Attach,
						    upload_success_handler: swfUpload.uploadSuccess_Attach,
						    upload_complete_handler: swfUpload.uploadComplete_Attach,
						    queue_complete_handler: swfUpload.queueComplete_Attach
						};
						swfa = new SWFUpload(atta_settings)
                    };
                </script>

                <div class="sidebar illustration" id="illustration">
                    <div class="preview" id="preview" style="display: none;">
                        <img width="210" height="223" alt="" src="">
                    </div>
                    <div class="sidebar-head"><h3>快速插图</h3></div>
                    <div class="illustration-outer">
                        <div class="pic-upload">
							<span class="pic-upload-btn" id="uploadImgBtn">上传图片</span>
                        </div>

                        <div class="illustrated" style="display:none;">
                            <div class="illustrated-curmb" id="cancelPicUpload" style="display:none;">
                                <a href="javascript:;" onclick="javascript:swfUpload.cancel();">取消上传</a>
                            </div>
                            <div class="illustrated-curmb" id="managePicList" style="display:none;">
                                <a href="javascript:;" class="sort" onclick="FB.reSortPic();">排序</a>
                                <a href="javascript:;" onclick="javascript:FB.delUploadPic();">全部清除</a>
								<a href="javascript:;" id="uploadImgBtn2">继续上传</a>
                            </div>
                            <span class="turn-up" style="visibility: hidden;"><em></em></span>
                            <div class="pic-list-box">
                                <ul class="pic-list clearfix" id="picUploadArea"></ul>
                            </div>
                            <span class="turn-down" style="visibility: hidden;"><em></em></span>

                            <div class="illustrated-bottom">
                                <div class="illustrated-size">
                                    <span class="size">图片尺寸：</span>
                                    <div class="selectbox" id="picSize">
                                        <span class="select-label border-radius"><i class="trangle"></i>800px</span>
                                        <ul class="border-radius" style="display:none;">
                                            <li>240PX</li>
                                            <li>500PX</li>
                                            <li>800PX</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="exifbox clearfix"><label class="release"><input type="checkbox" id="isExif" name="is_exif" value="1">插入exif信息</label></div>
                                <div class="bottom-mod clearfix">
                                    <span class="btn-blue border-radius" onclick="FB.insertAllPic();">全部插入</span>
                                    <label class="release">
                                        <input type="checkbox" id="isFenLou">
                                        分楼层发布
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- //section -->

        <!-- 发帖分类 add jialp at 20141212 -->

        <div class="rewardbox">
			@if (Auth::check() && Auth::user()->can("manage_topics") )
            <div class="filter-else-area clearfix">
			@else
            <div class="filter-else-area clearfix" style="display:none;">
			@endif
                <div class="color-set clearfix">
                    <label for="titleColorSet">置顶:</label>
                    <select id="is_top">
                        @if( !isset($topic) || $topic->is_top == 0 )
                            <option value="0" selected="selected" class="border-radius">不置顶</option>
                            <option value="1" class="border-radius">一级置顶</option>
                            <option value="2" class="border-radius">二级置顶</option>
                        @elseif( $topic->is_top == 1 )
                            <option value="0" class="border-radius">不置顶</option>
                            <option value="1" selected="selected" class="border-radius">一级置顶</option>
                            <option value="2" class="border-radius">二级置顶</option>
                        @else
                            <option value="0" class="border-radius">不置顶</option>
                            <option value="1" class="border-radius">一级置顶</option>
                            <option value="2" selected="selected" class="border-radius">二级置顶</option>
                        @endif
                    </select>
                </div>

                <div class="color-set post-set-top clearfix">
                    <label for="postSetTop">
					@if( isset($topic) && $topic->is_excellent == 1 )
					<input id="is_excellent" checked="checked" type="checkbox">精华帖</label>
					@else
					<input id="is_excellent" type="checkbox">精华帖</label>
					@endif
                </div>
            </div>

            <div class="post-publish clearfix">
                <span class="btn-gray border-radius" id="previewBook">预览</span>
                <span class="btn-blue border-radius" id="publishBookBtn">发表</span>

                @if( isset($topic) )
				@if (Auth::check() && Auth::user()->can("manage_topics") )
                <span class="btn-gray border-radius" id="deleteBookBtn">删除</span>
                <script>

                $("#deleteBookBtn").click(function() {
                    var url = "/topics/{{{ $topic->id }}}?boardid={{{$node->id}}}";
                    $.ajax({
                        url: url + "?t=" + (new Date()).getTime(),
                        data: "",
                        type: "DELETE",
                        success: function (json) {
                            if (json.info == "err") {
                            Layer.showTips({
                                type: "warn",
                                content: json.msg,
                                disappear: 5000
                            });
                            $("#deleteBookBtn").text("\u53d1\u8868");
                            $("#deleteBookBtn").removeClass("btn-loading");
                            FB.isCurPublish = 0;
                            return false;
                            } else {
                                if (json.info == "ok") {
                                    FB.isCurPublish = 0;
                                    var url = json.url;
                                    $("#publishBookBtn").text("\u53d1\u8868\u6210\u529f");
                                    $("#pbBookBtn").text("\u53d1\u8868\u6210\u529f");
                                    Layer.alert({
                                        content: json.tips,
                                        nextLine: FB.replyTips
                                    });
                                    if (location.search && location.search.search("f=") > 0 && typeof taskGuide !== "undefined") {
                                        taskGuide.jumpTo(location.href.toString(), 5500)
                                    } else {
                                        setTimeout(function () {
                                            window.location.href = url
                                        }, 5500)
                                    }
                                }
                            }
                        }
                    });
                });

                </script>
                @endif
                @endif

            </div>
        </div>
    </div>

    {!! Form::close() !!}

    <div class="wrap-foot"></div>

    <div id="xiuxiuContainer" style="display: none;"><div id="xiuxiuFlash"></div></div>
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
        <!--<script language="JavaScript" type="text/javascript" src={{{URL::asset('Bbs/web_footc.js')}}}></script>
        <script language="JavaScript" type="text/javascript" src={{{URL::asset('Bbs/web_foot.js')}}}></script>-->

    </div>
    <script src={{{URL::asset('Bbs/msg.json')}}}></script>
    <script type="text/javascript">
        $(function() {
            MSG.get(function(json) {
                msgStatus(json);
            }, '', 1)
        });
        function msgClear()
        {
            setTimeout(function() {
                MSG.get(function(json) {
                    msgStatus(json);
                }, '', 1);
                if (document.getElementById('zol-follow-api')) {
                    document.getElementById('zol-follow-api').parentNode.removeChild(document.getElementById('zol-follow-api'))
                }
            }, 10000);
        }
        function msgStatus(json) {
            if (json.unreadMsg) {
                document.getElementById('messageSpanA').className = 'msg-ico';
                if (document.getElementById('messageMsgNum')) {
                    document.getElementById('messageMsgNum').innerHTML = json.unreadMsg;
                } else {
                    var obj = document.createElement("span");
                    obj.className = "msg-num";
                    obj.setAttribute('id', 'messageMsgNum');
                    obj.innerHTML = json.unreadMsg;
                    document.getElementById("pubMessageDetailNotice").parentNode.insertBefore(obj, document.getElementById("pubMessageDetailNotice")); //更新创建
                }
            } else {
                document.getElementById('messageSpanA').className = 'msg-ico msg-null';
                if (document.getElementById('messageMsgNum')) {
                    document.getElementById('messageMsgNum').parentNode.removeChild(document.getElementById('messageMsgNum'))
                }
            }

            var msgNoticeStr = '';
            msgNoticeStr += '<a href="http://my.zol.com.cn/index.php?c=Message_Private" onclick="msgClear();">私信';
            if (json['1'] > 0) {
                msgNoticeStr += '<span>(<b>' + json['1'] + '</b>)</span>';
            }
            msgNoticeStr += '</a><a href="http://my.zol.com.cn/index.php?c=Message_Reply" onclick="msgClear();">回复';
            if (json['2']  > 0) {
                msgNoticeStr += '<span>(<b>' + json['2'] + '</b>)</span>';
            }
            msgNoticeStr += '</a><a href="http://my.zol.com.cn/index.php?c=Message_At" onclick="msgClear();">@我';
            if (json['3'] > 0) {
                msgNoticeStr += '<span>(<b>' + json['3'] + '</b>)</span>';
            }
            msgNoticeStr += '</a><a href="http://my.zol.com.cn/index.php?c=Message_Remind" onclick="msgClear();">提醒';
            if (json['5'] > 0) {
                msgNoticeStr += '<span>(<b>' + json['5'] + '</b>)</span>';
            }
            msgNoticeStr += '</a><a href="http://my.zol.com.cn/index.php?c=Message_Notice" onclick="msgClear();">系统通知';
            if (json['4'] > 0) {
                msgNoticeStr += '<span>(<b>' + json['4'] + '</b>)</span>';
            }
            msgNoticeStr += '</a>';
            document.getElementById("pubMessageDetailNotice").innerHTML = msgNoticeStr;
            if (json.unreadFeed) {
                if (document.getElementById('feedMsgNum')) {
                    document.getElementById('feedMsgNum').innerHTML = json.unreadFeed;
                } else {
                    var obj = document.createElement("span");
                    obj.className = "msg-num";
                    obj.setAttribute('id', 'feedMsgNum');
                    obj.innerHTML = json.unreadFeed;
                    document.getElementById("pubFeedDetailNotice").parentNode.insertBefore(obj, document.getElementById("pubFeedDetailNotice")); //更新创建
                }
            } else {
                if (document.getElementById('feedMsgNum')) {
                    document.getElementById('feedMsgNum').parentNode.removeChild(document.getElementById('feedMsgNum'))
                }
            }
            var feedNoticeStr = '';
            feedNoticeStr += '<a href="http://my.zol.com.cn/index.php?c=me&a=default&userid=0kxo0w" target="_blank" onclick="msgClear();">新动态';
            if (json.feed > 0) {
                feedNoticeStr += '<span>(<b>' + json.feed + '</b>)</span>';
            }
            feedNoticeStr += '<a href="http://my.zol.com.cn/follower/" target="_blank" onclick="msgClear();">新粉丝';
            if (json.follower > 0) {
                feedNoticeStr += '<span>(<b>' + json.follower + '</b>)</span>';
            }
            feedNoticeStr += '</a>';
            document.getElementById("pubFeedDetailNotice").innerHTML = feedNoticeStr;
        }

        //未完成任务提示
        $(function(){
            (function(){
                var target = $('#pubMyBbs'),s = '<i class="news-ico"></i>';

                //请求有没有未完成的任务,显示红点
                $.get('/index.php?c=Ajax_Task&a=initDot',{},function(json){
                    if (json.info == 'ok') {
                        target && target.find('span.ismore').append(s) &&
                        target.find('#pubMyBbsDetailNotice').find('a:last').addClass('my-task').append(s);
                    }
                },'json');
            })();
        });
    </script>



    <script src={{{URL::asset('Bbs/xiuxiu.js')}}} type="text/javascript"></script>

    <div id="edui_fixedlayer" class="edui-default" style="position: fixed; left: 0px; top: 0px; width: 0px; height: 0px;">
        <div id="edui100" class="edui-popup  edui-bubble edui-default" onmousedown="return false;" style="display: none;">
            <div id="edui100_body" class="edui-popup-body edui-default">
                <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank" class="edui-default"></iframe> <div class="edui-shadow edui-default"></div> <div id="edui100_content" class="edui-popup-content edui-default">
                </div>
            </div>
        </div>
    </div>

    <style type="text/css">.zol-global-footer{min-width:1000px; margin: 20px auto 0; background: #333; clear:both;}.zol-global-footer,.zol-global-footer *{float: none;}.zol-footer {float: none; height: 40px; min-width: 960px; overflow: hidden; float: none; clear: both; padding: 0 10px; background: #333; color: #ccc; text-align: left; font-size: 12px; font-family: arial; line-height: 40px;}.zol-footer *{float: none;}.zol-footer span {_display: inline; float:right; margin: 0 -7px 0 0; color:#666; font-family:"宋体"; font-size:10px; -webkit-text-size-adjust:none;}.zol-footer a{padding: 0 6px 0 7px; color:#ccc; text-decoration:none; font-family:Arial; font-size:12px;}.zol-footer a:hover{color:#ccc; text-decoration: underline;} .zol-footer i {display: none;}.zol-footer .footerw-2015{float: none; height: 40px; width:1000px; margin: 0 auto; line-height: 40px;}.zol-global-footer-fixed{position: fixed; bottom: 0; left: 0; width: 100%;}</style>
	
    <script>
	    ue.addListener("ready", function(editor) {
            setTimeout(function() {
				Reload();
             },
            1000);
        });
 
    </script>

@stop
