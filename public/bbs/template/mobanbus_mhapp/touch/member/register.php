<?php echo '模板巴士原创模板，版权所有，盗版必究，官网 www.mobanbus.cn';exit;?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset={CHARSET}">
<meta http-equiv="Cache-control" content="{if $_G['setting']['mobile'][mobilecachetime] > 0}{$_G['setting']['mobile'][mobilecachetime]}{else}no-cache{/if}" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<meta name="format-detection" content="telephone=no" />
<meta name="keywords" content="{if !empty($metakeywords)}{echo dhtmlspecialchars($metakeywords)}{/if}" />
<meta name="description" content="{if !empty($metadescription)}{echo dhtmlspecialchars($metadescription)} {/if},$_G['setting']['bbname']" />
<title><!--{if !empty($navtitle)}-->$navtitle - <!--{/if}--><!--{if empty($nobbname)}--> $_G['setting']['bbname'] - <!--{/if}--> {lang waptitle} - Powered by Discuz!</title>
<link rel="stylesheet" href="{STATICURL}image/mobile/style.css" type="text/css" media="all">
<script type="text/javascript">var STYLEID = '{STYLEID}', STATICURL = '{STATICURL}', IMGDIR = '{IMGDIR}', VERHASH = '{VERHASH}', charset = '{CHARSET}', discuz_uid = '$_G[uid]', cookiepre = '{$_G[config][cookie][cookiepre]}', cookiedomain = '{$_G[config][cookie][cookiedomain]}', cookiepath = '{$_G[config][cookie][cookiepath]}', showusercard = '{$_G[setting][showusercard]}', attackevasive = '{$_G[config][security][attackevasive]}', disallowfloat = '{$_G[setting][disallowfloat]}', creditnotice = '<!--{if $_G['setting']['creditnotice']}-->$_G['setting']['creditnames']<!--{/if}-->', defaultstyle = '$_G[style][defaultextstyle]', REPORTURL = '$_G[currenturl_encode]', SITEURL = '$_G[siteurl]', JSPATH = '$_G[setting][jspath]';</script>
<script src="{STATICURL}js/mobile/jquery-1.8.3.min.js?{VERHASH}"></script>
<script src="{STATICURL}js/mobile/common.js?{VERHASH}" charset="{CHARSET}"></script>
<link rel="stylesheet" href="template/mobanbus_mhapp/mhapp_st/css/mobanbus_mhapp_st.css" />
<link rel="stylesheet" href="template/mobanbus_mhapp/mhapp_st/css/mobanbus.min.css" />
</head>
<body class="mobanbus">
<section class="mobanbus_wrap busactive bus_login">

<div>
{eval $loginhash = 'L'.random(4);}
<div class="bus_login_logo">
 <div class="ctain">
 <i class="icon-user"></i>
 </div>
 <div class="txt">
 {lang register}
 </div>
</div>
<!-- registerbox start -->
<div class="loginbox registerbox">
	<div class="login_from">
		<form method="post" autocomplete="off" name="register" id="registerform" action="member.php?mod={$_G[setting][regname]}&mobile=2">
		<input type="hidden" name="regsubmit" value="yes" />
		<input type="hidden" name="formhash" value="{FORMHASH}" />
		<!--{eval $dreferer = str_replace('&amp;', '&', dreferer());}-->
		<input type="hidden" name="referer" value="$dreferer" />
		<input type="hidden" name="activationauth" value="{if $_GET[action] == 'activation'}$activationauth{/if}" />
		<input type="hidden" name="agreebbrule" value="$bbrulehash" id="agreebbrule" checked="checked" />
		<ul>
			<li><input type="text" tabindex="1" class="bus_login_input" size="30" autocomplete="off" value="" name="{$_G['setting']['reginput']['username']}" placeholder="{lang registerinputtip}" fwin="login"></li>
			<li><input type="password" tabindex="2" class="bus_login_input" size="30" value="" name="{$_G['setting']['reginput']['password']}" placeholder="{lang login_password}" fwin="login"></li>
			<li><input type="password" tabindex="3" class="bus_login_input" size="30" value="" name="{$_G['setting']['reginput']['password2']}" placeholder="{lang registerpassword2}" fwin="login"></li>
			<li class="bl_none"><input type="email" tabindex="4" class="bus_login_input" size="30" autocomplete="off" value="" name="{$_G['setting']['reginput']['email']}" placeholder="{lang registeremail}" fwin="login"></li>
			<!--{if empty($invite) && ($_G['setting']['regstatus'] == 2 || $_G['setting']['regstatus'] == 3)}-->
				<li><input type="text" name="invitecode" autocomplete="off" tabindex="5" class="bus_login_input" size="30" value="{lang invite_code}" placeholder="{lang invite_code}" fwin="login"></li>
			<!--{/if}-->
			<!--{if $_G['setting']['regverify'] == 2}-->
				<li><input type="text" name="regmessage" autocomplete="off" tabindex="6" class="bus_login_input" size="30" value="{lang register_message}" placeholder="{lang register_message}" fwin="login"></li>
			<!--{/if}-->
		</ul>
		<!--{if $secqaacheck || $seccodecheck}-->
			<!--{subtemplate common/seccheck}-->
		<!--{/if}-->
	</div>
	<div class="btn_register"><button tabindex="7" value="true" name="regsubmit" type="submit" class="bus_btn bus_login_btn"><span>{lang quickregister}</span></button></div>
	<p class="reg_link"><a href="member.php?mod=logging&action=login&mobile=2">{lang login}</a></p>
	</form>
</div>
<!-- registerbox end -->

<!--{eval $nofooter = true;}-->
<!--{template common/footer}-->
