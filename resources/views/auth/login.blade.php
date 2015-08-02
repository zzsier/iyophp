<!DOCTYPE html>
<!-- saved from url=(0040)http://service.zol.com.cn/user/login.php -->
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=GBK">
    <meta charset="gb2312">
    <title>IYO登录注册页</title>
    <link rel="stylesheet" href="http://service.zol.com.cn/user/css/login2014/reset.css">
    <link rel="stylesheet" href="http://service.zol.com.cn/user/css/login2014/login.css">
    <style>
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px white inset;
        }
    </style>
</head>

<body>
<div class="wrapper">
    <div class="header clearfix">
        <span class="logo-tip">Hi,IYO论坛欢迎您!</span>
    </div>

    <div class="content clearfix">

        <!-- 登录注册版块 -->
        <div id="unauth_main" class="login-regist">
            <div class="login-box">
                <div class="title">帐号登录</div>
                <form id="loginForm" class="formBox" action="" method="post" onsubmit="return false;">
                    <div class="itembox user-name">
                        <i class="right-ico" style="display: none;"></i>
                        <div class="item">
                            <i class="ico"></i>
                            <i class="delete-btn" style="display: inline;"></i>
                            <label for="J_LoginUser" class="txt-tip" style="display: none;">用户ID/邮箱/手机号</label>
                            <input autocomplete="off" tabindex="1" style="ime-mode:disabled" id="J_LoginUser" type="text" class="txt tabInput" value="" name="userid">
                        </div>
                    </div>

                    <div class="itembox user-pwd">
                        <i class="right-ico" style="display: none;"></i>
                        <div class="item">
                            <i class="ico"></i>
                            <i class="delete-btn" style="display: none;"></i>
                            <label for="J_LoginPsw" class="txt-tip">密码</label>
                            <input id="J_LoginPsw" tabindex="2" type="password" autocomplete="off" class="txt tabInput" value="">
                            <input style="display:none;" name="pwd" type="password" id="pwd" class=" password-text password-text-click" value="">
                        </div>
                    </div>

                    <!--<div class="member-pass clearfix">
                        <a class="forget-pwd" href="http://my.zol.com.cn/index.php?c=getPassword" target="_blank">忘记密码?</a>
                        <input id="autoMemberPass_login" name="is_auto" checked="checked" type="checkbox" value="1"><label for="autoMemberPass_login" class="autologon">下次自动登录</label>
                    </div>-->
                    <div id="loginBtnBox" class="login-btn"><span class="wait-bar" id="wait-bar"></span><input id="J_LoginButton" type="submit" value="马上登录" tabindex="4" class="tabInput pass-btn"></div>
                    <!--<div class="pass-reglink">还没有ZOL帐号？<a class="switch" href="http://service.zol.com.cn/user/login.php#">免费注册</a></div>-->
                </form>
            </div>
            <!-- //登录版块end -->

            <!--<div class="regist-box" style="display:none;">
                <div class="title">帐号注册</div>
                <div id="registForm" class="formBox">
                    <input type="hidden" name="act" value="register_do">
                    <input type="hidden" name="type" value="1">
                    <div class="itembox user-name">
                        <i class="right-ico"></i>
                        <div class="item">
                            <i class="ico"></i>
                            <i class="delete-btn"></i>
                            <label for="J_RegistUser" class="txt-tip">请输入常用邮箱或手机号</label>
                            <input id="J_RegistUser" tabindex="1" type="text" class="txt tabInput" value="" autocomplete="off" name="username">
                        </div>
                    </div>

                    <div class="itembox user-pwd">
                        <i class="right-ico"></i>
                        <div class="item">
                            <i class="ico"></i>
                            <i class="delete-btn"></i>
                            <label for="J_RegistPsw" class="txt-tip">密码,4-16位数字/字母/特殊符号(空格除外)</label>
                            <input type="password" tabindex="2" id="J_RegistPsw" class="txt tabInput" name="J_RegistPsw">
                        </div>
                    </div>


                    <div class="itembox pass-verifycode" id="phoneCodeBox" style="display:none">
                        <i class="right-ico"></i>
                        <span class="verifycode-img"><img id="phoneCodeImg" title="验证码图片" alt="验证码图片" class=" pass-verifyCode" width="113" height="38" src="./登录注册页—中关村在线_files/captchasrc.php"></span>
                        <a href="javascript:;" class="verifycode-changelink" id="phoneResCode">换一张</a>
                        <div class="item">
                            <label for="J_phoneCode" class="txt-tip">验证码</label>
                            <input id="J_phoneCode" type="text " tabindex="3" class="txt " value="" autocomplete="off">
                        </div>
                    </div>

                    <div class="itembox pass-verifycode">
                        <i class="right-ico"></i>
                        <span class="verifycode-img"><img id="verifyCodeImg_reg" title="验证码图片" alt="验证码图片" class="pass-verifyCode verifyCodeImg" width="113" height="38" src="./登录注册页—中关村在线_files/captchasrc.php"></span>
                        <a href="javascript:;" class="verifycode-changelink changeCodeBtn">换一张</a>
                        <span class="verifycode-send" id="sendPhoneCode" style="display:none">免费获取验证码</span>
                        <div class="item">
                            <label for="J_verifyCode" class="txt-tip">验证码</label>
                            <input id="J_verifyCode" tabindex="3" type="text " class="txt tabInput" value="" autocomplete="off">
                        </div>
                    </div>
                    <div class="member-pass clearfix">
                        <input id="autoMemberPass_reg" name="is_auto" checked="checked" type="checkbox" value="1"><label for="autoMemberPass_reg" class="autologon">已阅读并同意</label><a href="https://service.zol.com.cn/user/protocol.php" target="_blank">中关村在线用户注册协议</a><span class="member-pass-special">和</span><a href="https://service.zol.com.cn/user/privacy.php" target="_blank">隐私权声明</a>
                    </div>
                    <input type="submit" tabindex="4" value="免费注册" id="J_RegButton" class="pass-btn tabInput">
                    <div class="pass-reglink">已有ZOL帐号，<a class="switch" href="http://service.zol.com.cn/user/login.php#">立即登录</a></div>
                    <input type="hidden" value="1437926124" id="regT">
                    <input type="hidden" value="3c28709cffb9e48b34b96e65139fd47e35364546" id="sendCodeToken">
                </div>
            </div>-->
            <!-- //注册版块邮箱注册end -->
        </div>
    </div>
</div>

<script>
    var WEB_CONFIG = {
        'supportMail' 	 : ["@qq.com","@163.com","@126.com","@hotmail.com","@sina.com","@gmail.com","@yahoo.com"],
        'webType'	  	 : 'login',
        'phoneSendInter' : 100,
        'imgCode'		 : 'https://service.zol.com.cn/captchasrc.php?param=d1ebFf1tugdhPNVmJiegQ5gR_9zX0fi6jtfsbQMjpSJvWSChkOnohI9B9E894Nb7RtyC-eefQUgJsAhJtaFRKHvk1YPkKK5M',
        'backUrl'		 : 'http://www.zol.com.cn/',
        'test' 			 : '0',
        'lastUserid'	 : '0kxo0w'
    }
</script>

<script type="text/javascript" src={{{URL::asset('Bbs/login/jquery-1.7.2.min.js')}}}></script>
<!--<script type="text/javascript" src="./登录注册页—中关村在线_files/md5.js"></script>
<script type="text/javascript" src="./登录注册页—中关村在线_files/json.js"></script>-->
<script type="text/javascript" src={{{URL::asset('Bbs/login/dom.js')}}}></script>
<script type="text/javascript" src={{{URL::asset('Bbs/login/check.js')}}}></script>
<script type="text/javascript" src={{{URL::asset('Bbs/login/login.js')}}}></script>


<div class="foot">
    <div class="wrapper">
        <div class="footerw">
            &nbsp;&#169;<script type="text/javascript">
                var yearStr;
                now = new Date();
                yearStr = now.getFullYear();
                document.write(yearStr);</script>2015 中关村在线 版权所有.
        </div>
    </div>
</div>



</body></html>
