<?php echo '模板巴士原创模板，版权所有，盗版必究，官网 www.mobanbus.cn';exit;?>
<!--{hook/global_footer_mobile}-->
<!--{eval $useragent = strtolower($_SERVER['HTTP_USER_AGENT']);$clienturl = ''}-->
<!--{if strpos($useragent, 'iphone') !== false || strpos($useragent, 'ios') !== false}-->
<!--{eval $clienturl = $_G['cache']['mobileoem_data']['iframeUrl'] ? $_G['cache']['mobileoem_data']['iframeUrl'].'&platform=ios' : 'http://www.discuz.net/mobile.php?platform=ios';}-->
<!--{elseif strpos($useragent, 'android') !== false}-->
<!--{eval $clienturl = $_G['cache']['mobileoem_data']['iframeUrl'] ? $_G['cache']['mobileoem_data']['iframeUrl'].'&platform=android' : 'http://www.discuz.net/mobile.php?platform=android';}-->
<!--{elseif strpos($useragent, 'windows phone') !== false}-->
<!--{eval $clienturl = $_G['cache']['mobileoem_data']['iframeUrl'] ? $_G['cache']['mobileoem_data']['iframeUrl'].'&platform=windowsphone' : 'http://www.discuz.net/mobile.php?platform=windowsphone';}-->
<!--{/if}-->
</div>
<!-- Mobanbus_cn mobanbus_bd end -->
<div class="bus_back">
<a href="javascript:history.go(-1);"><img src="static/image/mobile/images/icon_back.png" style="display: inline; visibility: visible;"></a>
</div>
<div id="mask" style="display:none;"></div>
<!--{if !$nofooter}-->
<div class="footer">
	<div>
		<!--{if !$_G[uid] && !$_G['connectguest']}-->
		<a href="forum.php?mod=guide&view=hot">{lang mobilehome}</a> | <a href="member.php?mod=logging&action=login" title="{lang login}">{lang login}</a> | <a href="<!--{if $_G['setting']['regstatus']}-->member.php?mod={$_G[setting][regname]}<!--{else}-->javascript:;" style="color:#D7D7D7;<!--{/if}-->" title="{$_G['setting']['reglinkname']}">{lang register}</a>
		<!--{else}-->
		<a href="forum.php?mod=guide&view=hot">{lang mobilehome}</a> | <a href="home.php?mod=space&uid={$_G[uid]}&do=profile&mycenter=1">{$_G['member']['username']}</a> | <a href="member.php?mod=logging&action=logout&formhash={FORMHASH}" title="{lang logout}" class="dialog">{lang logout}</a>
		<!--{/if}-->
	</div>
	<div class="bus_foot_nav">
		<a href="{$_G['setting']['mobile']['simpletypeurl'][0]}">{lang no_simplemobiletype}</a>
		<a href="javascript:;" style="color:#D7D7D7;">{lang mobile2version}</a>
		<a href="{$_G['setting']['mobile']['nomobileurl']}">{lang nomobiletype}</a>
		<!--{if $clienturl}--><a href="$clienturl">{lang clientversion}</a><!--{/if}-->
	</div>
	<p>&copy; Comsenz Inc.</p>
</div>
<!-- Mobanbus_cn footer end -->
<!--{/if}-->
			
</html>
<!--{eval updatesession();}-->
<!--{if defined('IN_MOBILE')}-->
	<!--{eval output();}-->
<!--{else}-->
	<!--{eval output_preview();}-->
<!--{/if}-->