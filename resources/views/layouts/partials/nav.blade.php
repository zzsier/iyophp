<div class="pub-bbs-top">

    <div class="pub-bbs-top-inner clearfix">
        <ul class="pub-bbs-nav">
            <li class="pub-nav-home"><a target="_blank" href="http://123.59.53.158">IYO首页</a></li>
            <li><a target="_blank" href="#">商城</a></li>
            <li><a target="_blank" href="#">更多</a></li>
            <li><a target="_blank" href="#">论坛帮助</a></li>
        </ul>

        <script>
            @if (Auth::check())
                var userlogin = '<ul class="pub-bbs-login"><li class="pub-user-bar">'
                        +'<a href="http://my.zol.com.cn/'+userid+'/" target="_blank">'+userid+'</a></li>'
                        +'<li class="pub-menu" id="pubMyBbs" onMouseOver="__mores(\'pubMyBbs\')" onMouseOut="__moreh(\'pubMyBbs\')">'
                        +'<span class="ismore"><a href="http://my.zol.com.cn/bbs/'+userid+'/" target="_blank">我的论坛</a>'
                        +'<i class="ar-ico"></i></span><div class="pub-more-list" id="pubMyBbsDetailNotice">'
                        +'<a href="http://my.zol.com.cn/bbs/'+userid+'/" target="_blank">我的帖子</a>'
                        +'<a href="http://my.zol.com.cn/index.php?c=bbs&a=myreply&userid='+userid+'" target="_blank">我的回复</a>'
                        +'<a href="http://my.zol.com.cn/index.php?c=bbs&a=myattention&userid='+userid+'" target="_blank">我的关注</a>'
                        +'<a href="http://my.zol.com.cn/collection/" target="_blank">我的收藏</a>'
                        +'<a href="http://ask.zol.com.cn/me/" target="_blank">我的问答</a>'
                        +'<a href="http://my.zol.com.cn/index.php?c=task" target="_blank">我的任务</a></div></li>'
                        +'<li class="pub-menu" id="pubMessage" onMouseOver="__mores(\'pubMessage\')" onMouseOut="__moreh(\'pubMessage\')">'
                        +'<span class="ismore">'
                        +'<a id="messageSpanA" class="msg-ico msg-null" href="http://my.zol.com.cn/'+userid+'/message/" target="_blank" onclick="msgClear();">收件箱</a>'
                        +'<i class="ar-ico"></i></span><div class="pub-more-list pub-msg" id="pubMessageDetailNotice">'
                        +'<a href="http://my.zol.com.cn/index.php?c=Message_Private" target="_blank" onclick="msgClear();">私信</a>'
                        +'<a href="http://my.zol.com.cn/index.php?c=Message_Reply" target="_blank" onclick="msgClear();">回复</a>'
                        +'<a href="http://my.zol.com.cn/index.php?c=Message_At" target="_blank" onclick="msgClear();">@我</a>'
                        +'<a href="http://my.zol.com.cn/index.php?c=Message_Remind" target="_blank" onclick="msgClear();">提醒</a>'
                        +'<a href="http://my.zol.com.cn/index.php?c=Message_Notice" target="_blank" onclick="msgClear();">系统通知</a></div></li>'
                        +'<li class="pub-menu" id="pubFeed" onMouseOver="__mores(\'pubFeed\')" onMouseOut="__moreh(\'pubFeed\')">'
                        +'<span class="ismore"><a href="http://my.zol.com.cn/follow/" target="_blank" onclick="msgClear();">关注</a>'
                        +'<i class="ar-ico"></i></span><div class="pub-more-list pub-follow" id="pubFeedDetailNotice">'
                        +'<a href="http://my.zol.com.cn/index.php?c=me&a=default&userid='+userid+'" target="_blank" onclick="msgClear();">新动态</a>'
                        +'<a href="http://my.zol.com.cn/follower/" target="_blank" onclick="msgClear();">新粉丝</a></div></li>'
                        +'<li class="pub-menu" id="pubUser" onMouseOver="__mores(\'pubUser\')" onMouseOut="__moreh(\'pubUser\')">'
                        +'<span class="ismore"><a href="http://my.zol.com.cn/'+userid+'/settings/" target="_blank">账号</a><i class="ar-ico"></i></span>'
                        +'<div class="pub-more-list" id="pubUserDetailNotice"><a href="http://my.zol.com.cn/info_base.php" target="_blank">修改资料</a>'
                        +'<a href="http://my.zol.com.cn/info_pic.php" target="_blank">更改头像</a>'
                        +'<a href="http://my.zol.com.cn/change_pwd.php" target="_blank">修改密码</a>';
                +'<a class="pub-logout" href="http://service.zol.com.cn/user/login.php?type=quit" target="_self">退出</a></div></li></ul>';
                document.write(userlogin);
            @else
                        var registerhtml = '<ul class="pub-bbs-login"><li class="pub-user-bar">'
                        +'<span>请 [<a target="_blank" href="http://service.zol.com.cn/user/register.php">注册</a>]</span>'
                        +'|<span>[<a target="_self" href="http://service.zol.com.cn/user/login.php">登录</a>]</span>'
                        +'</li>'
                        +'</ul>';

                document.write(registerhtml);
            @endif

        </script>
        <script src="demo/index.js"></script>
    </div>

</div>


<!-- header -->
<div class="header box-shadow">
    <div class="header-inner clearfix">
        <a href="http://bbs.zol.com.cn/" class="logo"><h1>ZOL论坛</h1></a>
        <!-- 当搜索结果页时 给下面的div添加类名 search-result-page 同时加上下面的search-nav -->
        <div class="search-module bbs-index-search">
            <div class="search-nav" style="display:none;">
                <a href="http://detail.zol.com.cn/index.php?keyword=&amp;c=SearchList">产品</a>
                <a href="http://search.zol.com.cn/s/search.php?keyword=&amp;c=SearchList">资讯</a>
                <a class="current" href="javascript:void(0);">论坛</a>
                <a href="http://xiazai.zol.com.cn/search?type=1">下载</a>
                <a href="http://ask.zol.com.cn/new/search.php?kword=">问答</a>
            </div>
            <div class="searchbox border-radius-s3 clearfix">
                <form action="/index.php" method="get" onsubmit="return checkKword();">
                    <input name="c" value="search" type="hidden">
                    <input data-source="" id="searchBox" autocomplete="off" class="search-txt placeholder" name="kword" value="请输入帖子关键词" type="text">
                    <input class="search-btn border-radius-s3" value="搜索" type="submit">
                </form>
            </div>
        </div>
    </div>
</div>

<div class="wrapper">
    <div class="bbs-navbox border-radius-s3">
        <ul class="bbs-nav-list clearfix">
            <li class="current"><a href="###">IYO首页</a>
            </li>
            <li class=""><a href="http://localhost/bbs/video" target="_blank">游戏视频</a>
            </li>
            <li class=""><a href="http://localhost/bbs/moba" target="_blank">MOBA</a>
                <i class="hot-ico"></i>
            </li>
            <li class=""><a href="http://localhost/bbs/netgame" target="_blank">网游论坛</a>
            </li>
            <li class=""><a href="http://localhost/bbs/fps" target="_blank">FPS游戏</a>
            </li>
            <li class=""><a href="http://localhost/bbs/trade" target="_blank">游戏交易</a>
                <i class="hot-ico"></i>
            </li>
            <li class=""><a href="http://localhost/bbs/game" target="_blank">比赛</a>
            </li>

        </ul>
    </div>
</div>

<div class="wrapper">
    <div class="category-nav-box box-shadow border-radius-s3">
        <div class="main-category clearfix">
            <dl class="sjbbs">
                <dt><a href="http://bbs.zol.com.cn/sjbbs/" target="_blank">手机论坛</a></dt>
                <dd>
                    <h3><a href="http://bbs.zol.com.cn/sjbbs/" target="_blank">手机论坛</a></h3>
                    <p>
                        <a href="http://bbs.zol.com.cn/sjbbs/d1763.html" target="_blank">联想手机</a>
                    </p>
                    <p>
                        <a href="http://bbs.zol.com.cn/sjbbs/d33855.html" target="_blank">朵唯手机<i class="new-ico"></i></a>
                    </p>
                </dd>
            </dl>
            <dl class="dcbbs">
                <dt><a href="http://bbs.zol.com.cn/dcbbs/" target="_blank">摄影论坛</a></dt>
                <dd>
                    <h3><a href="http://bbs.zol.com.cn/dcbbs/" target="_blank">摄影论坛</a></h3>
                    <p>
                        <a href="http://bbs.zol.com.cn/dcbbs/jingxuan/" target="_blank">精彩推荐</a>
                    </p>
                    <p>
                        <a href="http://bbs.zol.com.cn/dcbbs/region/sitemap.html" target="_blank">地方俱乐部</a>
                    </p>
                </dd>
            </dl>
            <dl class="diybbs">
                <dt><a href="http://bbs.zol.com.cn/diybbs/" target="_blank">硬件论坛</a></dt>
                <dd>
                    <h3><a href="http://bbs.zol.com.cn/diybbs/" target="_blank">硬件论坛</a></h3>
                    <p>
                        <a href="http://bbs.zol.com.cn/diybbs/d231.html" target="_blank">DIY与攒机</a>
                    </p>
                    <p>
                        <a href="http://bbs.zol.com.cn/diybbs/d446.html" target="_blank">HKC</a>
                    </p>
                </dd>
            </dl>
            <dl class="nbbbs">
                <dt><a href="http://bbs.zol.com.cn/nbbbs/" target="_blank">笔记本论坛</a></dt>
                <dd>
                    <h3><a href="http://bbs.zol.com.cn/nbbbs/" target="_blank">笔记本论坛</a></h3>
                    <p>
                        <a href="http://bbs.zol.com.cn/nbbbs/d160.html" target="_blank">联想专区</a>
                    </p>
                    <p>
                        <a href="http://bbs.zol.com.cn/nbbbs/c1.html" target="_blank">本本大讨论</a>
                    </p>
                </dd>
            </dl>
            <dl class="padbbs">
                <dt><a href="http://bbs.zol.com.cn/padbbs/" target="_blank">平板论坛</a></dt>
                <dd>
                    <h3><a href="http://bbs.zol.com.cn/padbbs/" target="_blank">平板论坛</a></h3>
                    <p>
                        <a href="http://bbs.zol.com.cn/padbbs/d173.html" target="_blank">诺基亚专区</a>
                    </p>
                    <p>
                        <a href="http://bbs.zol.com.cn/padbbs/c4.html" target="_blank">平板汇</a>
                    </p>
                </dd>
            </dl>
        </div>
        <div class="other-bbs clearfix">
            <span>其他论坛：</span>
            <a href="http://bbs.zol.com.cn/otherbbs/d598.html" target="_blank">新手区</a>
            <a href="http://bbs.zol.com.cn/sjbbs/d36776.html" target="_blank">手把手ROM</a>
            <a href="http://bbs.zol.com.cn/index.php?c=search&amp;a=topic&amp;kword=ZOL%D0%C2%BB%FA%B1%ED" target="_blank">ZOL新机表</a>
            <a href="http://bbs.zol.com.cn/jdbbs/d58_m613.html" target="_blank">华为盒子</a>
            <a href="http://bbs.zol.com.cn/brand/c9.html" target="_blank">海能达</a>
            <a href="http://bbs.zol.com.cn/brand/c8.html" target="_blank">航嘉机电</a>
            <a href="http://bbs.zol.com.cn/techbbs/" target="_blank">技术论坛</a>
            <a href="http://bbs.zol.com.cn/gpsbbs/" target="_blank">GPS论坛</a>
            <a href="http://bbs.zol.com.cn/quanzi/d643.html" target="_blank">有问必答</a>
        </div>
    </div>
</div>


