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
                <a href="http://xiazai.zol.com.cn/search?wd=&amp;type=1">下载</a>
                <a href="http://ask.zol.com.cn/new/search.php?kword=">问答</a>
            </div>
            <div class="searchbox border-radius-s3 clearfix">
                <form action="/index.php" method="get" onsubmit="return checkKword();">
                    <input name="c" value="search" type="hidden">
                    <input data-source="" id="searchBox" autocomplete="off" style="height:40px" class="search-txt placeholder" name="kword" value="请输入帖子关键词" type="text">
                    <input class="search-btn border-radius-s3" value="搜索" type="submit">
                </form>
            </div>
        </div>
    </div>
</div>

<div class="wrapper">
    <div class="bbs-navbox border-radius-s3">
        <ul class="bbs-nav-list clearfix">
            <li class="current"><a href="###">首页</a>
            </li>
            <li class=""><a href="http://bbs.zol.com.cn/huodong/" target="_blank">视频</a>
            </li>
            <li class=""><a href="http://try.zol.com.cn/" target="_blank">MOBA</a>
                <i class="hot-ico"></i>
            </li>
            <li class=""><a href="http://bbs.zol.com.cn/quanzi/" target="_blank">网游</a>
            </li>
            <li class=""><a href="http://bbs.zol.com.cn/vip/" target="_blank">FPS</a>
            </li>
            <li class=""><a href="http://bbs.zol.com.cn/top/" target="_blank">交易</a>
                <i class="hot-ico"></i>
            </li>
            <li class=""><a href="http://jindou.zol.com/" target="_blank">比赛</a>
            </li>

        </ul>
    </div>
</div>

