<?php exit; ?>
<!--{subtemplate common/header}-->
<script type="text/javascript" src="template/jmxzw_20150218_business_series/beauty_15_02_10/js/jquery-1.5.1.min.js" charset="gb2312"></script>
<script type="text/javascript"> 
     var syq = jQuery.noConflict(); 
</script>
<div class="mod_backtop hide" id="j_backtop"><a href="javascript:" title="回顶部" ytag="72300">回顶部</a></div>
<script type="text/javascript">var fid = parseInt('$_G[fid]'), tid = parseInt('$_G[tid]');</script>
<!--{if $modmenu['thread'] || $modmenu['post']}-->
	<script type="text/javascript" src="{$_G['setting']['jspath']}forum_moderate.js?{VERHASH}"></script>
<!--{/if}-->

<script type="text/javascript" src="{$_G['setting']['jspath']}forum_viewthread.js?{VERHASH}"></script>
<script type="text/javascript">zoomstatus = parseInt($_G['setting']['zoomstatus']);var imagemaxwidth = '{$_G['setting']['imagemaxwidth']}';var aimgcount = new Array();</script>

<style id="diy_style" type="text/css"></style>

<div class="indexContBox hotRecommandBox mt20">
    <div class="indexContBoxTit">
        <h3><span>站长推</span><label>荐</label></h3>
    </div>
    <div class="indexContent" id="recommandCon">
        <!--站长推荐内容 start-->
        <div id="portal-block-258799999446" class="udiyblock" type="CommonSource">              
            <div class="recommandCon">
                <ul class="recom_img">
                   <!--[diy=diynavtop]--><div id="diynavtop" class="area"></div><!--[/diy]-->
			   </ul>

               <ul class="recom_txt">
                  <!--[diy=diy_xzw_top_bbs_textwz]--><div id="diy_xzw_top_bbs_textwz" class="area"></div><!--[/diy]-->
			   </ul>
             </div>
        </div> 
        <!--站长推荐内容 end-->
    </div>
</div>

<div id="pt" class="bm cl">
	<div class="z">
		<a href="./" class="nvhm" title="{lang homepage}">$_G[setting][bbname]</a><em>&raquo;</em><a href="forum.php"{if $_G['setting']['forumjump']} id="fjump" onmouseover="delayShow(this, 'showForummenu($_G[fid])');" class="showmenu" {/if}>{$_G[setting][navs][2][navname]}</a>$navigation <em>&rsaquo;</em> <a href="forum.php?mod=viewthread&tid=$_G[tid]">$_G[forum_thread][short_subject]</a>
	</div>
</div>

<!--{hook/viewthread_top}-->
<!--{ad/text/wp a_t}-->

<style id="diy_style" type="text/css"></style>
<div class="wp">
	<!--[diy=diy1]--><div id="diy1" class="area"></div><!--[/diy]-->
</div>

<div id="ct" class="wp cl">
	<div id="pgt" class="pgs mbm cl {if $modmenu['thread']}pbm bbs{/if}">
		<div class="pgt">$multipage</div>
		<span class="y pgb"{if $_G['setting']['visitedforums']} id="visitedforums" onmouseover="$('visitedforums').id = 'visitedforumstmp';this.id = 'visitedforums';showMenu({'ctrlid':this.id,'pos':'34'})"{/if}><a href="$upnavlink">{lang return_forumdisplay}</a></span>
		<!--{if $_G['forum']['threadsorts'] && $_G['forum']['threadsorts']['templatelist']}-->
			<!--{loop $_G['forum']['threadsorts']['types'] $id $name}-->
				<button id="newspecial" class="pn pnc" onclick="location.href='forum.php?mod=post&action=newthread&fid=$_G[fid]&extra=$extra&sortid=$id'"><strong>{lang i_want}$name</strong></button>
			<!--{/loop}-->
		<!--{else}-->
			<!--{if !$_G['forum_thread']['is_archived']}--><a id="newspecial" class="xzw_newspecial" onmouseover="$('newspecial').id = 'newspecialtmp';this.id = 'newspecial';showMenu({'ctrlid':this.id})"{if !$_G['forum']['allowspecialonly'] && empty($_G['forum']['picstyle']) && !$_G['forum']['threadsorts']['required']} onclick="showWindow('newthread', 'forum.php?mod=post&action=newthread&fid=$_G[fid]')"{else} onclick="location.href='forum.php?mod=post&action=newthread&fid=$_G[fid]';return false;"{/if} href="javascript:;" title="{lang send_posts}"> </a><!--{/if}-->
		<!--{/if}-->
		<!--{if $allowpostreply && !$_G['forum_thread']['archiveid']}-->
			<a id="post_reply"  class="xzw_post_reply" onclick="showWindow('reply', 'forum.php?mod=post&action=reply&fid=$_G[fid]&tid=$_G[tid]')" href="javascript:;" title="{lang reply}"> </a>
		<!--{/if}-->
		<!--{hook/viewthread_postbutton_top}-->
	</div>

<!--{if $_G['group']['allowpost'] && ($_G['group']['allowposttrade'] || $_G['group']['allowpostpoll'] || $_G['group']['allowpostreward'] || $_G['group']['allowpostactivity'] || $_G['group']['allowpostdebate'] || $_G['setting']['threadplugins'] || $_G['forum']['threadsorts'])}-->
	<ul class="p_pop" id="newspecial_menu" style="display: none">
		<!--{if !$_G['forum']['allowspecialonly']}--><li><a href="forum.php?mod=post&action=newthread&fid=$_G[fid]">{lang post_newthread}</a></li><!--{/if}-->
		<!--{if $_G['forum']['threadsorts'] && !$_G['forum']['allowspecialonly']}-->
			<!--{loop $_G['forum']['threadsorts']['types'] $id $threadsorts}-->
				<!--{if $_G['forum']['threadsorts']['show'][$id]}-->
					<li class="popupmenu_option"><a href="forum.php?mod=post&action=newthread&fid=$_G[fid]&sortid=$id">$threadsorts</a></li>
				<!--{/if}-->
			<!--{/loop}-->
		<!--{/if}-->
		<!--{if $_G['group']['allowpostpoll']}--><li class="poll"><a href="forum.php?mod=post&action=newthread&fid=$_G[fid]&special=1">{lang post_newthreadpoll}</a></li><!--{/if}-->
		<!--{if $_G['group']['allowpostreward']}--><li class="reward"><a href="forum.php?mod=post&action=newthread&fid=$_G[fid]&special=3">{lang post_newthreadreward}</a></li><!--{/if}-->
		<!--{if $_G['group']['allowpostdebate']}--><li class="debate"><a href="forum.php?mod=post&action=newthread&fid=$_G[fid]&special=5">{lang post_newthreaddebate}</a></li><!--{/if}-->
		<!--{if $_G['group']['allowpostactivity']}--><li class="activity"><a href="forum.php?mod=post&action=newthread&fid=$_G[fid]&special=4">{lang post_newthreadactivity}</a></li><!--{/if}-->
		<!--{if $_G['group']['allowposttrade']}--><li class="trade"><a href="forum.php?mod=post&action=newthread&fid=$_G[fid]&special=2">{lang post_newthreadtrade}</a></li><!--{/if}-->
		<!--{if $_G['setting']['threadplugins']}-->
			<!--{loop $_G['forum']['threadplugin'] $tpid}-->
				<!--{if array_key_exists($tpid, $_G['setting']['threadplugins']) && @in_array($tpid, $_G['group']['allowthreadplugin'])}-->
					<li class="popupmenu_option"{if $_G['setting']['threadplugins'][$tpid][icon]} style="background-image:url(source/plugin/$tpid/$_G['setting']['threadplugins'][$tpid][icon])"{/if}><a href="forum.php?mod=post&action=newthread&fid=$_G[fid]&specialextra=$tpid">{$_G['setting']['threadplugins'][$tpid][name]}</a></li>
				<!--{/if}-->
			<!--{/loop}-->
		<!--{/if}-->
	</ul>
<!--{/if}-->

<!--{if $modmenu['post']}-->
	<div id="mdly" class="fwinmask" style="display:none;">
		<table cellspacing="0" cellpadding="0" class="fwin">
			<tr>
				<td class="t_l"></td>
				<td class="t_c"></td>
				<td class="t_r"></td>
			</tr>
			<tr>
				<td class="m_l">&nbsp;&nbsp;</td>
				<td class="m_c">
					<div class="f_c">
						<div class="c">
							<h3>{lang admin_select}&nbsp;<strong id="mdct" class="xi1"></strong>&nbsp;{lang piece}: </h3>
							<!--{if $_G['forum']['ismoderator']}-->
								<!--{if $_G['group']['allowwarnpost']}--><a href="javascript:;" onclick="modaction('warn')">{lang modmenu_warn}</a><span class="pipe">|</span><!--{/if}-->
								<!--{if $_G['group']['allowbanpost']}--><a href="javascript:;" onclick="modaction('banpost')">{lang modmenu_banpost}</a><span class="pipe">|</span><!--{/if}-->
								<!--{if $_G['group']['allowdelpost'] && !$rushreply}--><a href="javascript:;" onclick="modaction('delpost')">{lang modmenu_deletepost}</a><span class="pipe">|</span><!--{/if}-->
							<!--{/if}-->
							<!--{if $_G['forum']['ismoderator'] && $_G['group']['allowstickreply'] || $_G['forum_thread']['authorid'] == $_G['uid']}--><a href="javascript:;" onclick="modaction('stickreply')">{lang modmenu_stickpost}</a><span class="pipe">|</span><!--{/if}-->
							<!--{if $_G['forum_thread']['pushedaid'] && $allowpostarticle}--><a href="javascript:;" onclick="modaction('pushplus', '', 'aid=$_G[forum_thread][pushedaid]', 'portal.php?mod=portalcp&ac=article&op=pushplus')">{lang modmenu_pushplus}</a><span class="pipe">|</span><!--{/if}-->
						</div>
					</div>
				</td>
				<td class="m_r"></td>
			</tr>
			<tr>
				<td class="b_l"></td>
				<td class="b_c"></td>
				<td class="b_r"></td>
			</tr>
		</table>
	</div>
<!--{/if}-->

<!--{if $modmenu['thread']}-->
	<div id="modmenu" class="xi2 pbm">
		<!--{eval $modopt=0;}-->
		<!--{if $_G['forum']['ismoderator']}-->
			<!--{if $_G['group']['allowdelpost']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modthreads(3, 'delete')">{lang modmenu_deletethread}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['allowbumpthread'] && !$_G['forum_thread']['is_archived']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modthreads(3, 'down')">{lang modmenu_updown}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['allowstickthread'] && ($_G['forum_thread']['displayorder'] <= 3 || $_G['adminid'] == 1) && !$_G['forum_thread']['is_archived']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modthreads(1, 'stick')">{lang modmenu_stickthread}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['allowhighlightthread'] && !$_G['forum_thread']['is_archived']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modthreads(1, 'highlight')">{lang modmenu_highlight}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['allowdigestthread'] && !$_G['forum_thread']['is_archived']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modthreads(1, 'digest')">{lang modmenu_digestpost}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['allowrecommendthread'] && !empty($_G['forum']['modrecommend']['open']) && $_G['forum']['modrecommend']['sort'] != 1 && !$_G['forum_thread']['is_archived']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modthreads(1, 'recommend')">{lang modmenu_recommend}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['allowstampthread'] && !$_G['forum_thread']['is_archived']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modaction('stamp')">{lang modmenu_stamp}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['allowstamplist'] && !$_G['forum_thread']['is_archived']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modaction('stamplist')">{lang modmenu_icon}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['allowclosethread'] && !$_G['forum_thread']['is_archived'] && $_G['forum']['status'] != 3}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modthreads(4)"><!--{if !$_G['forum_thread']['closed']}-->{lang modmenu_switch_off}<!--{else}-->{lang modmenu_switch_on}<!--{/if}--></a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['allowmovethread'] && !$_G['forum_thread']['is_archived'] && $_G['forum']['status'] != 3}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modthreads(2, 'move')">{lang modmenu_move}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['allowedittypethread'] && !$_G['forum_thread']['is_archived']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modthreads(2, 'type')">{lang modmenu_type}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if !$_G['forum_thread']['special'] && !$_G['forum_thread']['is_archived']}-->
				<!--{if $_G['group']['allowcopythread'] && $_G['forum']['status'] != 3}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modaction('copy')">{lang modmenu_copy}</a><span class="pipe">|</span><!--{/if}-->
				<!--{if $_G['group']['allowmergethread'] && $_G['forum']['status'] != 3}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modaction('merge')">{lang modmenu_merge}</a><span class="pipe">|</span><!--{/if}-->
				<!--{if $_G['group']['allowrefund'] && $_G['forum_thread']['price'] > 0}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modaction('refund')">{lang modmenu_restore}</a><span class="pipe">|</span><!--{/if}-->
			<!--{/if}-->
			<!--{if $_G['group']['allowsplitthread'] && !$_G['forum_thread']['is_archived'] && $_G['forum']['status'] != 3}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modaction('split')">{lang modmenu_split}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['allowrepairthread'] && !$_G['forum_thread']['is_archived']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modaction('repair')">{lang modmenu_repair}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['forum_thread']['is_archived'] && $_G['adminid'] == 1}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modaction('restore', '', 'archiveid={$_G[forum_thread][archiveid]}')">{lang modmenu_archive}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['forum_firstpid']}-->
				<!--{if $_G['group']['allowwarnpost']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modaction('warn', '$_G[forum_firstpid]')">{lang modmenu_warn}</a><span class="pipe">|</span><!--{/if}-->
				<!--{if $_G['group']['allowbanpost']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modaction('banpost', '$_G[forum_firstpid]')">{lang modmenu_banthread}</a><span class="pipe">|</span><!--{/if}-->
			<!--{/if}-->
			<!--{if $_G['group']['allowremovereward'] && $_G['forum_thread']['special'] == 3 && !$_G['forum_thread']['is_archived']}--><!--{eval $modopt++}--><a href="javascript:;" onclick="modaction('removereward')">{lang modmenu_removereward}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['forum']['status'] == 3 && in_array($_G['adminid'], array('1','2')) && $_G['forum_thread']['closed'] < 1}--><a href="javascript:;" onclick="modthreads(5, 'recommend_group');return false;">{lang modmenu_grouprecommend}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['allowmanagetag']}--><a href="javascript:;" onclick="showWindow('mods', 'forum.php?mod=tag&op=manage&tid=$_G[tid]', 'get', 0)">{lang post_tag}</a><span class="pipe">|</span><!--{/if}-->
			<!--{if $_G['group']['alloweditusertag']}--><a href="javascript:;" onclick="showWindow('usertag', 'forum.php?mod=misc&action=usertag&tid=$_G[tid]', 'get', 0)">{lang usertag}</a><span class="pipe">|</span><!--{/if}-->
		<!--{/if}-->
		<!--{if $allowpusharticle && $allowpostarticle}--><!--{eval $modopt++}--><a href="portal.php?mod=portalcp&ac=article&from_idtype=tid&from_id=$_G['tid']">{lang modmenu_pusharticle}</a><span class="pipe">|</span><!--{/if}-->
		<!--{hook/viewthread_modoption}-->
	</div>
<!--{/if}-->

<!--{hook/viewthread_beginline}-->

<div class="xzw_pl">

<div id="postlist" class="pl bm xzw_pl_ct">
	<div class="xzw_pl_block_title">
	<table cellspacing="0" cellpadding="0">
		<tr>
			<td class="pls ptm pbm">
				<!--{if $_G['page'] > 1}-->
				<div id="tath" class="cl">
					<!--{if $_G[forum_thread][authorid] && $_G[forum_thread][author]}-->
						<a href="home.php?mod=space&uid=$_G[forum_thread][authorid]" title="$_G[forum_thread][author]"><!--{avatar($_G[forum_thread][authorid],small)}--></a>
						{lang thread_author}: <a href="home.php?mod=space&uid=$_G[forum_thread][authorid]" title="$_G[forum_thread][author]">$_G[forum_thread][author]</a>
					<!--{else}-->
						{lang thread_author}:
						<!--{if $_G['forum']['ismoderator']}-->
							<a href="home.php?mod=space&uid=$_G[forum_thread][authorid]">{lang anonymous}</a>
						<!--{else}-->
							{lang anonymous}
						<!--{/if}-->
					<!--{/if}-->
				</div>
				<!--{else}-->
				<div class="hm">
					<span class="xg1">{lang show}:</span> <span class="xi1">$_G[forum_thread][views]</span><span class="pipe">|</span><span class="xg1">{lang reply}:</span> <span class="xi1">$_G[forum_thread][replies]</span>
				</div>
				<!--{/if}-->
			</td>
			<td class="plc ptm pbn vwthd">
				<!--{if !IS_ROBOT}-->
					<div class="y">
						<!--{if $post['invisible'] == 0}--><a href="forum.php?mod=viewthread&action=printable&tid=$_G[tid]" title="{lang thread_printable}" target="_blank"><img src="{IMGDIR}/print.png" alt="{lang thread_printable}" class="vm" /></a>
						<!--{/if}-->
						<a href="forum.php?mod=redirect&goto=nextoldset&tid=$_G[tid]" title="{lang last_thread}"><img src="{IMGDIR}/thread-prev.png" alt="{lang last_thread}" class="vm" /></a>
						<a href="forum.php?mod=redirect&goto=nextnewset&tid=$_G[tid]" title="{lang next_thread}"><img src="{IMGDIR}/thread-next.png" alt="{lang next_thread}" class="vm" /></a>
					</div>
				<!--{/if}-->
				<h1 class="ts">
					<!--{if $_G['forum_thread']['typeid'] && $_G['forum']['threadtypes']['types'][$_G['forum_thread']['typeid']]}-->
						<!--{if !IS_ROBOT && ($_G['forum']['threadtypes']['listable'] || $_G['forum']['status'] == 3)}-->
							<a href="forum.php?mod=forumdisplay&fid=$_G[fid]&filter=typeid&typeid=$_G[forum_thread][typeid]">[{$_G['forum']['threadtypes']['types'][$_G['forum_thread']['typeid']]}]</a>
						<!--{else}-->
							[{$_G['forum']['threadtypes']['types'][$_G['forum_thread']['typeid']]}]
						<!--{/if}-->
					<!--{/if}-->
					<!--{if $threadsorts && $_G['forum_thread']['sortid']}-->
						<a href="forum.php?mod=forumdisplay&fid=$_G[fid]&filter=sortid&sortid=$_G[forum_thread][sortid]">[{$_G['forum']['threadsorts']['types'][$_G['forum_thread']['sortid']]}]</a>
					<!--{/if}-->
					<a href="forum.php?mod=viewthread&tid=$_G[tid]" id="thread_subject">$_G[forum_thread][subject]</a>
				</h1>
				<span class="xg1">
					<!--{if $_G['forum_thread'][displayorder] == -2}-->({lang moderating})
					<!--{elseif $_G['forum_thread'][displayorder] == -3}-->({lang have_ignored})
					<!--{elseif $_G['forum_thread'][displayorder] == -4}-->({lang draft})
					<!--{/if}-->
					<!--{if $_G['forum_thread']['recommendlevel']}-->
						&nbsp;<img src="{IMGDIR}/recommend_$_G['forum_thread']['recommendlevel'].gif" alt="" title="{lang thread_recommend} $_G['forum_thread'][recommends]" />
					<!--{/if}-->
					<!--{if $_G['forum_thread'][heatlevel]}-->
						&nbsp;<img src="{IMGDIR}/hot_$_G['forum_thread'][heatlevel].gif" alt="" title="$_G['forum_thread'][heatlevel] {lang heats}" />
					<!--{/if}-->
					<!--{if $_G['forum_thread']['closed'] == 1}-->
						&nbsp;<img src="{IMGDIR}/locked.gif" alt="{lang close}" title="{lang close}" class="vm" />
					<!--{/if}-->
					<a href="forum.php?mod=viewthread&tid=$_G[tid]$fromuid" onclick="return copyThreadUrl(this)" {if $fromuid}title="{lang share_url_copy_comment}"{/if}>[{lang share_url_copy}]</a>
				</span>
				<!--{hook/viewthread_title_extra}-->
			</td>
		</tr>
	</table>
	<!--{if $_G['forum_thread']['replycredit'] > 0 || $rushreply}-->
	<div id="pl_top">
		<table cellspacing="0" cellpadding="0">
        
			<tr class="ad">
				<td class="pls"></td>
				<td class="plc"></td>
			</tr>
            
			<!--{if $_G['forum_thread']['replycredit'] > 0 }-->
				<tr>
					<td class="pls vm ptm">
						<img src="{IMGDIR}/thread_prize_s.png" class="hm" alt="{lang replycredit}" />
							<strong>{$_G['forum_thread']['replycredit']} {$_G['setting']['extcredits'][$_G[forum_thread][replycredit_rule][extcreditstype]][unit]}{$_G['setting']['extcredits'][$_G[forum_thread][replycredit_rule][extcreditstype]][title]}</strong>
					</td>
					<td class="plc ptm pbm xi1">
						{lang thread_replycredit_tips1} {lang thread_replycredit_tips2}<!--{if $_G['forum_thread']['replycredit_rule'][random] > 0}--><span class="xg1">{lang thread_replycredit_tips3}</span><!--{/if}-->
					</td>
				</tr>
				<!--{if $rushreply}-->
				<tr class="ad">
					<td class="pls"></td>
					<td class="plc"></td>
				</tr>
				<!--{/if}-->
		<!--{/if}-->

		<!--{if $rushreply}-->
			<tr>
				<td class="pls vm ptm">
					<img src="{IMGDIR}/rushreply_s.png" class="vm" alt="{lang rushreply}" />
					<strong>{lang rushreply}</strong>
				</td>
				<td class="plc ptm pbm xi1">
					<!--{if $rushresult[rewardfloor]}-->
						<span class="y">
						<!--{if $_G['uid'] == $_G['thread']['authorid'] || $_G['forum']['ismoderator']}--><a href="javascript:;" onclick="showWindow('membernum', 'forum.php?mod=ajax&action=get_rushreply_membernum&tid=$_G[tid]')" class="y pn xi2"><span>{lang thread_rushreply_statnum}</span></a><!--{/if}-->
						<!--{if !$_GET['checkrush']}-->
								<a href="forum.php?mod=viewthread&tid=$post[tid]&checkrush=1" rel="nofollow" class="y pn xi2"><span>{lang rushreply_view}</span></a>
						<!--{/if}-->
						</span>
					<!--{/if}-->
					<!--{if $rushresult[creditlimit] == ''}-->
						{lang thread_rushreply}&nbsp;
					<!--{else}-->
						{lang thread_rushreply_limit} &nbsp;
					<!--{/if}-->
					<!--{if $rushresult[starttimefrom]}-->
						{lang thread_rushreply_start}$rushresult[starttimefrom]&nbsp;
					<!--{/if}-->
					<!--{if $rushresult[starttimeto]}-->
						{lang thread_rushreply_over}$rushresult[starttimeto]&nbsp;
					<!--{/if}-->
					<!--{if $rushresult[stopfloor]}-->
						{lang thread_rushreply_end}$rushresult[stopfloor]&nbsp;
					<!--{/if}-->
					<!--{if $rushresult[rewardfloor]}-->
						{lang thread_rushreply_floor}: $rushresult[rewardfloor]&nbsp;
					<!--{/if}-->
					<!--{if $rushresult[rewardfloor] && $_GET['checkrush']}-->
						<p class="ptn">
							<!--{if $countrushpost}-->[<strong>$countrushpost</strong>]{lang thread_rushreply_rewardnum}<!--{else}--> {lang thread_rushreply_noreward} <!--{/if}-->&nbsp;&nbsp;
							<a href="forum.php?mod=viewthread&tid=$_G[tid]" class="xi2">{lang thread_rushreply_check_back}</a>
						</p>
					<!--{/if}-->
				</td>
			</tr>
		<!--{/if}-->
		</table>
	</div>
	<!--{/if}-->
	</div>
    
	<!--{hook/viewthread_title_row}-->


<!--
	<table cellspacing="0" cellpadding="0" class="ad"><tr><td class="pls"></td><td class="plc"></td></tr></table>
-->
	<!--{eval $postcount = 0;}-->
	<!--{loop $postlist $post}-->
			<!--{if $rushreply && $_GET['checkrush'] && $post['rewardfloor'] != 1}-->
				<!--{eval continue;}-->
			<!--{/if}-->
			<div id="post_$post[pid]" class="xzw_pl_block">
				<!--{subtemplate forum/viewthread_node}-->
			</div>
			<!--{eval $postcount++;}-->
	<!--{/loop}-->

	<div id="postlistreply" class="pl"><div id="post_new" class="viewthread_table" style="display: none"></div></div>
</div>

</div>


<!--{if $modmenu['thread']}-->
	<div class="xi2 mbm pbm bbs">
	<script type="text/javascript">
		$('modmenu').lastChild.style.visibility = 'hidden';
		document.write($('modmenu').innerHTML);
	</script>
	</div>
<!--{/if}-->

<form method="post" autocomplete="off" name="modactions" id="modactions">
	<input type="hidden" name="formhash" value="{FORMHASH}" />
	<input type="hidden" name="optgroup" />
	<input type="hidden" name="operation" />
	<input type="hidden" name="listextra" value="$_GET[extra]" />
	<input type="hidden" name="page" value="$page" />
</form>

$_G['forum_tagscript']

<div class="pgs mtm mbm cl">
	$multipage
	<span class="pgb y"{if $_G['setting']['visitedforums']} id="visitedforumstmp" onmouseover="$('visitedforums').id = 'visitedforumstmp';this.id = 'visitedforums';showMenu({'ctrlid':this.id,'pos':'21'})"{/if}><a href="$upnavlink">{lang return_forumdisplay}</a></span>
	<!--{if !$_G['forum_thread']['is_archived']}-->
		<a id="newspecialtmp" class="xzw_newspecial" onmouseover="$('newspecial').id = 'newspecialtmp';this.id = 'newspecial';showMenu({'ctrlid':this.id})"{if !$_G['forum']['allowspecialonly'] && empty($_G['forum']['picstyle']) && !$_G['forum']['threadsorts']['required']} onclick="showWindow('newthread', 'forum.php?mod=post&action=newthread&fid=$_G[fid]')"{else} onclick="location.href='forum.php?mod=post&action=newthread&fid=$_G[fid]';return false;"{/if} href="javascript:;" title="{lang send_posts}"> </a>
	<!--{/if}-->
	<!--{if $allowpostreply && !$_G['forum_thread']['archiveid']}-->
		<a id="post_replytmp"  class="xzw_post_reply" onclick="showWindow('reply', 'forum.php?mod=post&action=reply&fid=$_G[fid]&tid=$_G[tid]')" href="javascript:;" title="{lang reply}"> </a>
	<!--{/if}-->
</div>


<!--{hook/viewthread_middle}-->
<!--[diy=diyfastposttop]--><div id="diyfastposttop" class="area"></div><!--[/diy]-->
<!--{if $fastpost}-->
	<!--{subtemplate forum/viewthread_fastpost}-->
<!--{/if}-->

<!--{hook/viewthread_bottom}-->

<!--{if ($_G['setting']['visitedforums']) && $_G['forum']['status'] != 3}-->
	<div id="visitedforums_menu" class="p_pop blk cl" style="display: none;">
		<table cellspacing="0" cellpadding="0">
			<tr>
				<td id="v_forums">
					<h3 class="mbn pbn bbda xg1">{lang viewed_forums}</h3>
					<ul class="xl xl1">
						$_G['setting']['visitedforums']
					</ul>
				</td>
			</tr>
		</table>
	</div>
<!--{/if}-->
<!--{if $_G['medal_list']}-->
<!--{loop $_G['medal_list'] $medalid $medal}-->
	<div id="md_{$medalid}_menu" class="tip tip_4" style="display: none;">
		<div class="tip_horn"></div>
		<div class="tip_c">
			<h4>$medal[name]</h4>
			<p>$medal[description]</p>
		</div>
	</div>
<!--{/loop}-->
<!--{/if}-->

<!--{if !IS_ROBOT && !empty($_G[setting][lazyload])}-->
	<script type="text/javascript">
	new lazyload();
	</script>
<!--{/if}-->

<!--{if !IS_ROBOT && $_G['setting']['threadmaxpages'] > 1}-->
	<script type="text/javascript">document.onkeyup = function(e){keyPageScroll(e, <!--{if $page > 1}-->1<!--{else}-->0<!--{/if}-->, <!--{if $page < $_G['setting']['threadmaxpages'] && $page < $_G['page_next']}-->1<!--{else}-->0<!--{/if}-->, 'forum.php?mod=viewthread&tid=$_G[tid]<!--{if $_GET[authorid]}-->&authorid=$_GET[authorid]<!--{/if}-->', $page);}</script>
<!--{/if}-->
</div>

<div class="wp mtn">
	<!--[diy=diy3]--><div id="diy3" class="area"></div><!--[/diy]-->
</div>
<!--{if $_G['relatedlinks'] || $_GET['highlight']}-->
	<script type="text/javascript">
		var relatedlink = [];
		<!--{loop $_G['relatedlinks'] $key $link}-->
		relatedlink[$key] = {'sname':'$link[name]', 'surl':'$link[url]'};
		<!--{/loop}-->
		{eval $highlights = explode(' ', str_replace(array('\'', chr(125)), array('&#039;', '&#125;'), dhtmlspecialchars($_GET['highlight'])));}
		<!--{loop $highlights $word}-->
		{eval $key++;}
		relatedlink[$key] = {'sname':'$word', 'surl':''};
		<!--{/loop}-->
		relatedlinks('postmessage_$_G[forum_firstpid]');
	</script>
<!--{/if}-->

<!--{if !empty($_G['cookie']['clearUserdata']) && $_G['cookie']['clearUserdata'] == 'forum'}-->
	<script type="text/javascript">saveUserdata('forum_'+discuz_uid, '')</script>
<!--{/if}-->

<script type="text/javascript">
<!--{if $_G['forum']['picstyle'] && ($_G['forum']['ismoderator'] || $_G['uid'] == $_G['thread']['authorid'])}-->
function showsetcover(obj) {
	if(obj.parentNode.id == 'postmessage_$_G[forum_firstpid]') {
		var defheight = $_G['setting']['forumpicstyle']['thumbheight'];
		var defwidth = $_G['setting']['forumpicstyle']['thumbwidth'];
		var newimgid = 'showcoverimg';
		var imgsrc = obj.src ? obj.src : obj.file;
		if(!imgsrc) return;

		var tempimg=new Image();
		tempimg.src=imgsrc;
		if(tempimg.complete) {
			if(tempimg.width < defwidth || tempimg.height < defheight) return;
		} else {
			return;
		}
		if($(newimgid) && obj.id != newimgid) {
			$(newimgid).id = 'img'+Math.random();
		}
		if($(newimgid+'_menu')) {
			var menudiv = $(newimgid+'_menu');
		} else {
			var menudiv = document.createElement('div');
			menudiv.className = 'tip tip_4 aimg_tip';
			menudiv.id = newimgid+'_menu';
			menudiv.style.position = 'absolute';
			menudiv.style.display = 'none';
			obj.parentNode.appendChild(menudiv);
		}
		menudiv.innerHTML = '<div class="tip_c xs0"><a onclick="showWindow(\'setcover_'+newimgid+'\', this.href)" href="forum.php?mod=ajax&amp;action=setthreadcover&amp;tid=$_G[tid]&amp;pid=$_G[forum_firstpid]&amp;fid=$_G[fid]&imgurl='+imgsrc+'">{lang set_cover}</a></div>';
		obj.id = newimgid;
		showMenu({'ctrlid':newimgid,'pos':'12'});
	}
	return;
}
<!--{/if}-->
function succeedhandle_followmod(url, msg, values) {
	var fObj = $('followmod_'+values['fuid']);
	if(values['type'] == 'add') {
		fObj.innerHTML = '{lang nofollow}';
		fObj.href = 'home.php?mod=spacecp&ac=follow&op=del&fuid='+values['fuid'];
	} else if(values['type'] == 'del') {
		fObj.innerHTML = '{lang follow}';
		fObj.href = 'home.php?mod=spacecp&ac=follow&op=add&hash={FORMHASH}&fuid='+values['fuid'];
	}
}
<!--{if $_G['blockedpids']}-->
var blockedPIDs = [<!--{echo implode(',', $_G['blockedpids'])}-->];
<!--{/if}-->
<!--{if $postlist && empty($_G['setting']['disfixedavatar'])}-->
fixed_avatar([<!--{echo implode(',', array_keys($postlist))}-->], {if empty($_G['setting']['disfixednv_viewthread']) }1{else}0{/if});
<!--{elseif empty($_G['setting']['disfixednv_viewthread'])}-->
fixed_top_nv();
<!--{/if}-->
</script>
<!--{template common/footer}-->
