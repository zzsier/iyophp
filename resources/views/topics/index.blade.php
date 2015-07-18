@extends('layouts.default')

@section('title')
{{ trans('message.Topic List') }} @parent
@stop

@section('content')

    <link href="/Bbs/Bbs_list.css" rel="stylesheet" />
    <script src="/sjbbs/index.js"></script>
    <script src="/bbsmain/list.js"></script>

    <div class="wrapper">

        <div class="crumb">
            <a href="http://bbs.zol.com.cn/" target="_blank">ZOL论坛</a> &gt;
            <a href="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/【手机论坛】智能手机论坛-中关村在线手机论坛.html">手机论坛</a></div>

        <div class="moderator-infor clearfix">

            <div class="sign-box" data-role="calendarSignTarget">
                <span class="sign-btn border-radius-top" btn-role="calendarSign" id="signInBtn" data-role="user-login"><em>签到</em><br>07月15日</span>
                <div class="signed-today-numbox">今日已有<em class="z_todaySignNum">4045</em>人签到</div>
            </div>
            <!-- //签到 -->
            <div class="moderator-header clearfix">
                <h1>手机论坛</h1>
                <div class="attention-box">
                    <!-- 众信旅游冠名 -->
                </div>
            </div>
            <div class="moderator-else">
                <p><span>今日：<a href="http://bbs.zol.com.cn/sjbbs/new/" target="_blank"><em class="pink-txt">2779</em></a></span><span>主题：26970</span><span>帖子数：32977257</span></p>
                <div class="moderator-names"><span class="pink-txt">版主：</span>
                    <a href="http://my.zol.com.cn/bbs/fupy007/" target="_blank">幸福fupy007</a>
                    <a href="http://my.zol.com.cn/bbs/kyl5201314/" target="_blank">铁心木头人</a>
                    <a href="http://my.zol.com.cn/bbs/zoltest999/" target="_blank">zoltest999</a>
                </div>
            </div>
        </div>

        <a name="c" id="c"></a>

        <div class="list-main box-shadow border-radius-s3">
            <div class="list-main-top">
                <!-- 分页 -->
                <div class="pgs clearfix">
                    <div class="btn-div">
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
                    <span class="keyboard-page">支持键盘翻页 ( 左<i></i>右 )&nbsp;</span>
                </div>

                <div class="list-navs clearfix">
                    <a class="current" href="http://bbs.zol.com.cn/sjbbs/###"><span class="all">全部</span></a>
                    <a href="http://bbs.zol.com.cn/sjbbs/good.html#c"><span class="good">精华</span></a>
                    <a href="http://bbs.zol.com.cn/sjbbs/newproduct.html#c"><span class="newproduct">新品</span></a>
                    <a href="http://bbs.zol.com.cn/sjbbs/master.html#c"><span class="master">达人</span></a>
                    <a href="http://bbs.zol.com.cn/huodong/#c" target="_blank"><span class="active">活动</span></a>
                    <a href="http://bbs.zol.com.cn/sjbbs/topic.html#c"><span class="topic">话题</span></a>
                    <a href="http://bbs.zol.com.cn/sjbbs/resource.html#c"><span class="resource">资源</span></a>
                    <a href="http://bbs.zol.com.cn/sjbbs/pic.html#c"><span class="pic">图片模式</span></a>
                    <div class="classify-morebox" id="moreType">
                        <div class="classify-more-tip"><span class="close" onclick="this.parentNode.style.display=&#39;none&#39;;return false;"></span></div>
                    </div>
                </div>
            </div><!-- end class="list-main-top -->


            <table class="list " id="bookList">
                <tbody>
                <tr class="list-title">

                    <td colspan="2">
                        <div class="typebox">
                            <label class="check-label" for="new-open"><input id="new-open" name="ch1" type="checkbox" checked="">新标签打开</label>
                            <a class="current">最新回复</a> | <a href="http://bbs.zol.com.cn/sjbbs/new.html#c">最新发布</a> | <a href="http://bbs.zol.com.cn/sjbbs/reply.html#c">最多回复</a> | <a href="http://bbs.zol.com.cn/sjbbs/hot.html#c">最多查看</a> | 						</div>
                    </td>
                    <td class="author">作者/时间</td>
                    <td class="reply">回复/查看</td>
                    <td class="last-post">最后回复</td>

                </tr>
                <tr id="5_34130_134873">
                    <td class="folder">

                        <span title="一级置顶" class="ico-atop"></span>
                    </td>
                    <td class="title " data-pic="" data-url="/sjbbs/d34130_134873.html">
                        <div>
				<span class="iclass">
									</span>
                            <span class="iclass"><a target="_blank" href="http://bbs.zol.com.cn/index.php?c=search&a=topic&kword=%D0%A1K%B0%EF%C4%E3%C9%CF%CA%D7%D2%B3">#小K帮你上首页#</a></span>
                            <a class="topicurl listbook" style="" target="_blank" href="http://bbs.zol.com.cn/sjbbs/d34130_134873.html" title=" 7月15日 优秀帖征集！"> 7月15日 优秀帖征集！</a>
                            <span class="pages" title="共2页讨论,每页20条">[<a href="http://bbs.zol.com.cn/sjbbs/d34130_134873_2.html">2</a>]</span>
												<span class="pic" style="position:relative;">
                    <a class="small-pic" href="http://bbs.zol.com.cn/sjbbs/d34130_134873.html" target="_blank" title="主帖有图"></a>
                    <img class="load_img" src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/17317655_0240.jpg" style="display: none;">
                </span>
                        </div>
                    </td>




                    <td class="author">
                        <a class="name" href="http://my.zol.com.cn/bbs/admincode47/" target="_blank">ｋ管</a>
                        <span class="date">今天 10:12</span>
                    </td>

                    <td class="reply">
                        <span class="black">27</span>/
                        <i class="max-num">4911</i>
                    </td>

                    <td class="last-post">
                        <a class="name" href="http://my.zol.com.cn/bbs/dtlywjz/" target="_blank" title="">无限踪影</a>
                        <a href="http://bbs.zol.com.cn/sjbbs/d34130_134873_2.html#reply27" target="_blank" class="date">今天 17:51</a>
                    </td>
                </tr>
                <tr id="6_14_5258">
                    <td class="folder">

                        <span title="一级置顶" class="ico-atop"></span>
                    </td>
                    <td class="title " data-pic="" data-url="/quanzi/d14_5258.html">
                        <div>
				<span class="iclass">
									</span>
                            <a class="topicurl listbook" style="color:#fd4b71;font-weight:700;" target="_blank" href="http://bbs.zol.com.cn/quanzi/d14_5258.html" title="一句话证明你有多热！自拍支架免费送！">一句话证明你有多热！自拍支架免费送！</a>
                            <span class="pages" title="共1页讨论,每页20条">[<a href="http://bbs.zol.com.cn/quanzi/d14_5258.html">1</a>]</span>
												<span class="pic" style="position:relative;">
                    <a class="small-pic" href="http://bbs.zol.com.cn/quanzi/d14_5258.html" target="_blank" title="主帖有图"></a>
                    <img class="load_img" src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/17317655_0240.jpg" style="display: none;">
                </span>
                        </div>
                    </td>




                    <td class="author">
                        <a class="name" href="http://my.zol.com.cn/bbs/hxf491/" target="_blank">Z神通</a>
                        <span class="date">今天 17:41</span>
                    </td>

                    <td class="reply">
                        <span class="black">9</span>/
                        <i>743</i>
                    </td>

                    <td class="last-post">
                        <a class="name" href="http://my.zol.com.cn/bbs/xinyou1117/" target="_blank" title="">xinyou1117</a>
                        <a href="http://bbs.zol.com.cn/quanzi/d14_5258.html#reply9" target="_blank" class="date">今天 19:40</a>
                    </td>
                </tr>
                <tr id="5_98_208012">
                    <td class="folder">

                        <span title="二级置顶" class="ico-btop"></span>
                    </td>
                    <td class="title " data-pic="" data-url="/sjbbs/d98_208012.html">
                        <div>
				<span class="iclass">
									</span>
                            <span class="iclass"><a target="_blank" href="http://bbs.zol.com.cn/index.php?c=search&a=topic&kword=%C2%DB%CC%B3%B8%C9%BB%F5">#论坛干货#</a></span>
                            <a class="topicurl listbook" style="" target="_blank" href="http://bbs.zol.com.cn/sjbbs/d98_208012.html" title="三星GALAXY S6论坛教程、答疑、资源汇总贴">三星GALAXY S6论坛教程、答疑、资源汇总贴</a>
                            <span class="pages" title="共1页讨论,每页20条">[<a href="http://bbs.zol.com.cn/sjbbs/d98_208012.html">1</a>]</span>
												<span class="pic" style="position:relative;">
                    <a class="small-pic" href="http://bbs.zol.com.cn/sjbbs/d98_208012.html" target="_blank" title="主帖有图"></a>
                    <img class="load_img" src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/17317655_0240.jpg" style="display: none;">
                </span>
                        </div>
                    </td>




                    <td class="author">
                        <a class="name" href="http://my.zol.com.cn/bbs/sola_co/" target="_blank">sola_co</a>
                        <span class="date">2015-07-10</span>
                    </td>

                    <td class="reply">
                        <span class="black">11</span>/
                        <i class="max-num">6295</i>
                    </td>

                    <td class="last-post">
                        <a class="name" href="http://my.zol.com.cn/bbs/zxiqqek391/" target="_blank" title="">zxiqqek391</a>
                        <a href="http://bbs.zol.com.cn/sjbbs/d98_208012.html#reply11" target="_blank" class="date">今天 16:20</a>
                    </td>
                </tr>
                <tr class="edition-topic">
                    <td colspan="5">
                        <div class="edition-topic-inner"><span>版块主题</span><a id="existNewReply" style="display: none;" class="new-reply-btn" href="http://bbs.zol.com.cn/sjbbs/#">有新回复的主题... 点击查看</a></div>
                    </td>
                </tr>
                <tr id="5_34130_134945" class="sigle-list-pic">
                    <td class="folder">

                        <span title="" class=""></span>
                    </td>
                    <td class="title " data-pic="" data-url="/sjbbs/d34130_134945.html">
                        <div>
				<span class="iclass">
									</span>
                            <a class="topicurl listbook" style="" target="_blank" href="http://bbs.zol.com.cn/sjbbs/d34130_134945.html" title="YunOs精彩四周年开售！！">YunOs精彩四周年开售！！</a>
                            <span class="pages" title="共1页讨论,每页20条">[<a href="http://bbs.zol.com.cn/sjbbs/d34130_134945.html">1</a>]</span>
												<span class="pic" style="position:relative;">
                    <a class="small-pic" href="http://bbs.zol.com.cn/sjbbs/d34130_134945.html" target="_blank" title="主帖有图"></a>
                    <img class="load_img" src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/17317655_0240.jpg" style="display: none;">
                </span>
                        </div>
                    </td>




                    <td class="author">
                        <a class="name" href="http://my.zol.com.cn/bbs/qq_3i514141fs9k/" target="_blank">通川区妹纸清纯</a>
                        <span class="date">24分钟前</span>
                    </td>

                    <td class="reply">
                        <span class="black">2</span>/
                        <i>16</i>
                    </td>

                    <td class="last-post">
                        <a class="name" href="http://my.zol.com.cn/bbs/vsnla0b636/" target="_blank" title="">丶下水道美人鱼</a>
                        <a href="http://bbs.zol.com.cn/sjbbs/d34130_134945.html#reply2" target="_blank" class="date">20分钟前</a>
                    </td>
                </tr>
                <tr id="5_33962_1519" class="sigle-list-pic">
                    <td class="folder">

                        <span title="" class=""></span>
                    </td>
                    <td class="title " data-pic="" data-url="/sjbbs/d33962_1519.html">
                        <div>
				<span class="iclass">
					[<a href="http://bbs.zol.com.cn/sjbbs/d33962.html" title="手机主题" target="_blank">手机主题</a>][<a href="http://bbs.zol.com.cn/sjbbs/s36772.html" title="小板" target="_blank">小板</a>]				</span>
                            <a class="topicurl listbook" style="" target="_blank" href="http://bbs.zol.com.cn/sjbbs/d33962_1519.html" title="YunOs精彩四周年开售">YunOs精彩四周年开售</a>
                            <span class="pages" title="共1页讨论,每页20条">[<a href="http://bbs.zol.com.cn/sjbbs/d33962_1519.html">1</a>]</span>
												<span class="pic" style="position:relative;">
                    <a class="small-pic" href="http://bbs.zol.com.cn/sjbbs/d33962_1519.html" target="_blank" title="主帖有图"></a>
                    <img class="load_img" src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/17317655_0240.jpg" style="display: none;">
                </span>
                        </div>
                    </td>




                    <td class="author">
                        <a class="name" href="http://my.zol.com.cn/bbs/qq_3i514141fs9k/" target="_blank">通川区妹纸清纯</a>
                        <span class="date">25分钟前</span>
                    </td>

                    <td class="reply">
                        <span class="black">1</span>/
                        <i>11</i>
                    </td>

                    <td class="last-post">
                        <a class="name" href="http://my.zol.com.cn/bbs/6zpba0836e/" target="_blank" title="">被无视习惯了</a>
                        <a href="http://bbs.zol.com.cn/sjbbs/d33962_1519.html#reply1" target="_blank" class="date">20分钟前</a>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
        <!-- //list-main -->

        <!-- 下一页 -->
        <a class="loadding-more border-radius-s5 box-shadow" href="http://bbs.zol.com.cn/sjbbs/p2.html#c"><span class="line"><span>点击查看下一页&gt;&gt;</span></span></a>


        <!-- 页面底部分页 -->
        <div class="pgs pgs-foot clearfix">
            <div class="btn-div">
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
            <span class="keyboard-page">支持键盘翻页 ( 左<i></i>右 )&nbsp;</span>
        </div>
        <!-- 快速发帖 -->
        <script>
            var PbBook_Config = {
                "cateid"      : '0',
                "boardid"     : '34129',
                "bbsid"       : '5',
                "subid"       : '0',
                "manuid"      : '0',
                "productid"   : '0',
                "action"      : 'bbs',
                "boardType"   : '0',
                "bookType"    : 0
            }
        </script>
        <div class="quickSendPost">
            <div class="quickSendPost-header border-radius-top">快速发帖</div>
            <div class="quickSendPost-cont box-shadow">
                <div class="quickSendPost-filter clearfix">

                    <!-- 快速发帖 编辑内容高度107px -->
                    <div class="quickSendPost-editor">
                        <div class="quickSendPost-login">您需要登录后才可以发帖&nbsp;&nbsp;<a href="http://service.zol.com.cn/user/login.php">登录</a>&nbsp;<span class="line">|</span>&nbsp;<a href="http://service.zol.com.cn/user/register.php">注册</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="qq-login" href="http://service.zol.com.cn/user/api/qq/libs/oauth/redirect_to_login.php" title="使用qq账号登录"></a><a class="sina-login" href="http://service.zol.com.cn/user/api/sina/jump.php" title="使用新浪微博登录"></a></div>
                        <!-- 加载编辑器的容器 -->
                        <div id="container" class="edui-detail" style=""><div id="edui1" class="edui-editor  edui-detail" style="width: auto; z-index: 10;"><div id="edui1_toolbarbox" class="edui-editor-toolbarbox edui-detail"><div id="edui1_toolbarboxouter" class="edui-editor-toolbarboxouter edui-detail"><div class="edui-editor-toolbarboxinner edui-detail"><div id="edui2" class="edui-toolbar   edui-detail" onselectstart="return false;" onmousedown="return $EDITORUI[&quot;edui2&quot;]._onMouseDown(event, this);" style="-webkit-user-select: none;"><div id="edui3" class="edui-box edui-button edui-for-bold edui-detail"><div id="edui3_state" onmousedown="$EDITORUI[&quot;edui3&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui3&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui3&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui3&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-button-wrap edui-detail"><div id="edui3_body" unselectable="on" title="加粗" class="edui-button-body edui-detail" onmousedown="return $EDITORUI[&quot;edui3&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui3&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-detail"></div></div></div></div></div><div id="edui4" class="edui-box edui-splitbutton edui-for-forecolor edui-detail edui-colorbutton"><div title="字体颜色" id="edui4_state" onmousedown="$EDITORUI[&quot;edui4&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui4&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui4&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui4&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-splitbutton-body edui-detail"><div id="edui4_button_body" class="edui-box edui-button-body edui-detail" onclick="$EDITORUI[&quot;edui4&quot;]._onArrowClick();"><div class="edui-box edui-icon edui-detail"></div><div id="edui4_colorlump" class="edui-colorlump"></div></div><div class="edui-box edui-splitborder edui-detail"></div><div class="edui-box edui-arrow edui-detail" onclick="$EDITORUI[&quot;edui4&quot;]._onArrowClick();"></div></div></div></div><div id="edui13" class="edui-box edui-button edui-for-link edui-detail"><div id="edui13_state" onmousedown="$EDITORUI[&quot;edui13&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui13&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui13&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui13&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-button-wrap edui-detail"><div id="edui13_body" unselectable="on" title="超链接" class="edui-button-body edui-detail" onmousedown="return $EDITORUI[&quot;edui13&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui13&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-detail"></div><div class="edui-box edui-label edui-detail"></div></div></div></div></div><div id="edui14" class="edui-box edui-button edui-for-zolinsertcode edui-detail"><div id="edui14_state" onmousedown="$EDITORUI[&quot;edui14&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui14&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui14&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui14&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-button-wrap edui-detail"><div id="edui14_body" unselectable="on" title="插入代码" class="edui-button-body edui-detail" onmousedown="return $EDITORUI[&quot;edui14&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui14&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-detail"></div><div class="edui-box edui-label edui-detail"></div></div></div></div></div><div id="edui15" class="edui-box edui-button edui-for-zolblockquote edui-detail"><div id="edui15_state" onmousedown="$EDITORUI[&quot;edui15&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui15&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui15&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui15&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-button-wrap edui-detail"><div id="edui15_body" unselectable="on" title="插入引用" class="edui-button-body edui-detail" onmousedown="return $EDITORUI[&quot;edui15&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui15&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-detail"></div><div class="edui-box edui-label edui-detail"></div></div></div></div></div><div id="edui16" class="edui-box edui-button edui-for-zolemotion edui-detail"><div id="edui16_state" onmousedown="$EDITORUI[&quot;edui16&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui16&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui16&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui16&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-button-wrap edui-detail"><div id="edui16_body" unselectable="on" title="插入表情" class="edui-button-body edui-detail" onmousedown="return $EDITORUI[&quot;edui16&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui16&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-detail"></div><div class="edui-box edui-label edui-detail"></div></div></div></div></div><div id="edui17" class="edui-box edui-button edui-for-atuser edui-detail"><div id="edui17_state" onmousedown="$EDITORUI[&quot;edui17&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui17&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui17&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui17&quot;].Stateful_onMouseOut(event, this);" class="edui-detail edui-state-disabled"><div class="edui-button-wrap edui-detail"><div id="edui17_body" unselectable="on" title="@朋友" class="edui-button-body edui-detail" onmousedown="return $EDITORUI[&quot;edui17&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui17&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-detail"></div><div class="edui-box edui-label edui-detail"></div></div></div></div></div></div></div></div><div id="edui1_toolbarmsg" class="edui-editor-toolbarmsg edui-detail" style="display:none;"><div id="edui1_upload_dialog" class="edui-editor-toolbarmsg-upload edui-detail" onclick="$EDITORUI[&quot;edui1&quot;].showWordImageDialog();">点击上传</div><div class="edui-editor-toolbarmsg-close edui-detail" onclick="$EDITORUI[&quot;edui1&quot;].hideToolbarMsg();">x</div><div id="edui1_toolbarmsg_label" class="edui-editor-toolbarmsg-label edui-detail"></div><div style="height:0;overflow:hidden;clear:both;" class="edui-detail"></div></div></div><div id="edui1_iframeholder" class="edui-editor-iframeholder edui-detail" style="width: 960px; height: 107px; z-index: 10; overflow: hidden;"><iframe id="ueditor_0" width="100%" height="100%" frameborder="0" src="javascript:void(function(){document.open();document.write("<!DOCTYPE html><html xmlns='http://www.w3.org/1999/xhtml' class='view' ><head><style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}
                                            body{margin:8px;font-family:sans-serif;font-size:16px;}p{margin:5px 0;}</style><link rel='stylesheet' type='text/css' href='http://bbs.zol.com.cn/Ueditor/themes/iframe.css'/><style>p{font-size:14px;font-family:Microsoft YaHei}</style></head><body class='view' ></body><script type='text/javascript'  id='_initialScript'>setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant0'];editor._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);</script></html>");document.close();}())"></iframe></div><div id="edui1_bottombar" class="edui-editor-bottomContainer edui-detail"><table class="edui-detail"><tbody class="edui-detail"><tr class="edui-detail"><td id="edui1_elementpath" class="edui-editor-bottombar edui-detail"></td><td id="edui1_saveInfo" class="edui-editor-saveInfo edui-detail">&nbsp;</td><td id="edui1_saveTime" class="edui-editor-saveTime edui-detail">30秒后自动保存</td><td id="edui1_saveContent" class="edui-editor-saveContent edui-detail"><span class="edui-detail">保存数据</span></td><td id="edui1_recoverContent" class="edui-editor-recoverContent edui-detail"><span class="edui-detail">恢复数据</span></td><td id="edui1_wordCheck" class="edui-editor-wordCheck edui-detail"><span class="edui-detail">字数检查</span></td><td id="edui1_clearContent" class="edui-editor-clearContent edui-detail"><span class="edui-detail">清除内容</span></td><td id="edui1_wordcount" class="edui-editor-wordcount edui-detail"></td><td id="edui1_scale" class="edui-editor-scale edui-detail" style="display: none;"><div class="edui-editor-icon edui-detail"></div></td></tr></tbody></table></div><div id="edui1_scalelayer" class="edui-detail"></div></div></div>
                        <!-- 配置文件 -->
                        <script type="text/javascript" src="/js/ueditor.config.list.js"></script>
                        <!-- 编辑器源码文件 -->
                        <script type="text/javascript" src="/js/ueditor.all.js"></script>
                        <!--添加按钮
                        <script type="text/javascript" src="/js/addCustomize.detail.js"></script>-->
                        <!-- 实例化编辑器 -->
                        <script type="text/javascript">
                            var ue = UE.getEditor('container');
                        </script>
                        <!-- //加载编辑器的容器 end -->
                    </div>


                </div>
            </div>

            <table class="poup-pics" id="imgPopBox" style="display: none; top: 996px; left: 875px;"><tbody>
                <tr>
                    <td class="tl"></td>
                    <td class="tc"></td>
                    <td class="tr"></td>
                </tr>
                <tr>
                    <td class="cl"></td>
                    <td class="cc"><a href="" target="_blank" class="pic" id="pre_img"><img src="" alt=""><!--<span>捡垃圾的龙卷风啦记录的类</span>--></a></td>
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
                    userid      : '',
                    bbsid		: 5,
                    cateid 		: 0,
                    boardid 	: 0,
                    selfBoardid : 34129,
                    subid       : 0,
                    manuid		: 0,
                    productid	: 0,
                    anchorTag   : 'c',
                    hasImgPop   : true,
                    listType	: 'bbs',
                    adminer		: '0',
                    guidelau	: '如果iPhone 6S真的涨价了，你还会买吗?',
                    page 		: {nowPage : 1, maxPre : 899}

                }


            </script><script src="/Bbs/Bbs_list.js" charset="gbk"></script>
            <script src="/Bbs/search.js"></script>
            <script>
                //搜索提示处理
                $(function(){

                    $('#searchBox').zsuggest({offsetX:0, offsetY:20, width: 419, source: 'bbs', bbsid: 5, isSuggest: true});
                });
            </script>

            <script src="/Bbs/bbs_task_guide.js"></script>
            <script type="text/javascript" src="/Bbs/login.js"></script>
            <script src="/Bbs/jquery.calendar.js"></script>

            <!-- 公共尾部 -->
            <!-- <a class="fixed-call-survey" href="http://survey.zol.com.cn/front/1/734.html" target="_blank">意见反馈</a> -->
            <div class="wrapper foot">
                <script>
                    if (typeof WEB_CONFIG != 'undefined' && WEB_CONFIG.bbsid==1 && WEB_CONFIG.bookid) {
                        var __publicNavWidth=$(".wrapper").width();
                    } else {
                        var __publicNavWidth=1000;
                    }
                </script>
                <script language="JavaScript" type="text/javascript" src="/index/web_footc.js"></script>
                <script language="JavaScript" type="text/javascript" src="/index/web_foot.js"></script>
                <!--<script type="text/javascript" id="pv_d" src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/p.ht"></script>
                <script src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/cg_gmine.js" type="text/javascript"></script>
                <script src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/h.js" type="text/javascript"></script>
                <script type="text/javascript" id="adstat_js" src="./【手机论坛】智能手机论坛-中关村在线手机论坛_files/ol.js"></script>-->
            </div>

        </div></div>
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

    <script src="/index/run.js"></script>
    <script src="/index/jQuery.cookie.js"></script>

    </body></html>

<div class="col-md-9 topics-index main-col">
    <div class="panel panel-default">

        <div class="panel-heading">
          @if (isset($node))
            <div class="pull-left panel-title">{{ trans('message.Current Node') }}: {{{ $node->name }}}</div>
          @endif

          @include('topics.partials.filter')

          <div class="clearfix"></div>
        </div>

        @if ( ! $topics->isEmpty())

            <div class="panel-body remove-padding-horizontal">
                @include('topics.partials.topics', ['column' => false])
            </div>

            <div class="panel-footer text-right remove-padding-horizontal pager-footer">
                <!-- Pager -->
                {{ $topics->appends(Request::except('page', '_pjax'))->links() }}
            </div>

        @else
            <div class="panel-body">
                <div class="empty-block">{{ trans('message.Dont have any data Yet') }}~~</div>
            </div>
        @endif

    </div>

    <!-- Nodes Listing -->
    @include('nodes.partials.list')

</div>

@stop
