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
 {lang login}
 </div>
</div>
<!-- userinfo start -->
<div class="loginbox <!--{if $_GET[infloat]}-->login_pop<!--{/if}-->">
	<!--{if $_GET[infloat]}-->
		<h2 class="log_tit"><a href="javascript:;" onClick="popup.close();"><span class="icon_close y">&nbsp;</span></a>{lang login}</h2>
	<!--{/if}-->
		<form id="loginform" method="post" action="member.php?mod=logging&action=login&loginsubmit=yes&loginhash=$loginhash&mobile=2" onSubmit="{if $_G['setting']['pwdsafety']}pwmd5('password3_$loginhash');{/if}" >
		<input type="hidden" name="formhash" id="formhash" value='{FORMHASH}' />
		<input type="hidden" name="referer" id="referer" value="<!--{if dreferer()}-->{echo dreferer()}<!--{else}-->forum.php?mobile=2<!--{/if}-->" />
		<input type="hidden" name="fastloginfield" value="username">
		<input type="hidden" name="cookietime" value="2592000">
		<!--{if $auth}-->
			<input type="hidden" name="auth" value="$auth" />
		<!--{/if}-->
	<div class="login_from">
		<ul>
			<li><input type="text" value="" tabindex="1" class="bus_login_input" size="30" autocomplete="off" value="" name="username" placeholder="{lang inputyourname}" fwin="login"></li>
			<li><input type="password" tabindex="2" class="bus_login_input" size="30" value="" name="password" placeholder="{lang login_password}" fwin="login"></li>
			<li class="questionli">
				<div class="login_select">
				<span class="login-btn-inner">
					<span class="login-btn-text">
						<span class="span_question">{lang security_question}</span>
					</span>
					<span class="icon-arrow">&nbsp;</span>
				</span>
				<select id="questionid_{$loginhash}" name="questionid" class="sel_list">
					<option value="0" selected="selected">{lang security_question}</option>
					<option value="1">{lang security_question_1}</option>
					<option value="2">{lang security_question_2}</option>
					<option value="3">{lang security_question_3}</option>
					<option value="4">{lang security_question_4}</option>
					<option value="5">{lang security_question_5}</option>
					<option value="6">{lang security_question_6}</option>
					<option value="7">{lang security_question_7}</option>
				</select>
				</div>
			</li>
			<li class="bl_none answerli" style="display:none;"><input type="text" name="answer" id="answer_{$loginhash}" class="bus_login_input" size="30" placeholder="{lang security_a}"></li>
		</ul>
		<!--{if $seccodecheck}-->
		<!--{subtemplate common/seccheck}-->
		<!--{/if}-->
	</div>
	<div class="btn_login"><button tabindex="3" value="true" name="submit" type="submit" class="bus_btn bus_login_btn"><span>{lang login}</span></button></div>
	</form>
	<!--{if $_G['setting']['connect']['allow'] && !$_G['setting']['bbclosed']}-->
	<p>{lang useqqconnectlogin}</p>
	<div class="btn_qqlogin"><a href="$_G[connect][login_url]&statfrom=login_simple">{lang qqconnect:connect_mobile_login}</a></div>
	<!--{/if}-->
	<!--{if $_G['setting']['regstatus']}-->
	<p class="reg_link"><a href="member.php?mod={$_G[setting][regname]}">{lang noregister}</a></p>
	<!--{/if}-->
	<!--{hook/logging_bottom_mobile}-->
</div>
<!-- userinfo end -->

<!--{if $_G['setting']['pwdsafety']}-->
	<script type="text/javascript" src="{$_G['setting']['jspath']}md5.js?{VERHASH}" reload="1"></script>
<!--{/if}-->
<!--{eval updatesession();}-->

<script type="text/javascript">
	(function() {
		$(document).on('change', '.sel_list', function() {
			var obj = $(this);
			$('.span_question').text(obj.find('option:selected').text());
			if(obj.val() == 0) {
				$('.answerli').css('display', 'none');
				$('.questionli').addClass('bl_none');
			} else {
				$('.answerli').css('display', 'block');
				$('.questionli').removeClass('bl_none');
			}
		});
	 })();
</script>
<!--{eval $nofooter = true;}-->
<!--{template common/footer}-->
