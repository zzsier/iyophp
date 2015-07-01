<?php if(!defined('IN_DISCUZ')) exit('Access Denied'); hookscriptoutput('index');
0
|| checktplrefresh('./template/jmxzw_20150218_business_series/portal/index.htm', './template/jmxzw_20150218_business_series/common/header.htm', 1434823015, 'diy', './data/template/10_diy_portal_index.tpl.php', './template/jmxzw_20150218_business_series', 'portal/index')
|| checktplrefresh('./template/jmxzw_20150218_business_series/portal/index.htm', './template/jmxzw_20150218_business_series/common/xzw_sidemenu.htm', 1434823015, 'diy', './data/template/10_diy_portal_index.tpl.php', './template/jmxzw_20150218_business_series', 'portal/index')
|| checktplrefresh('./template/jmxzw_20150218_business_series/portal/index.htm', './template/jmxzw_20150218_business_series/common/footer.htm', 1434823015, 'diy', './data/template/10_diy_portal_index.tpl.php', './template/jmxzw_20150218_business_series', 'portal/index')
|| checktplrefresh('./template/jmxzw_20150218_business_series/portal/index.htm', './template/default/common/header_common.htm', 1434823015, 'diy', './data/template/10_diy_portal_index.tpl.php', './template/jmxzw_20150218_business_series', 'portal/index')
|| checktplrefresh('./template/jmxzw_20150218_business_series/portal/index.htm', './template/default/common/header_qmenu.htm', 1434823015, 'diy', './data/template/10_diy_portal_index.tpl.php', './template/jmxzw_20150218_business_series', 'portal/index')
|| checktplrefresh('./template/jmxzw_20150218_business_series/portal/index.htm', './template/jmxzw_20150218_business_series/common/xzw_top_search_simple.htm', 1434823015, 'diy', './data/template/10_diy_portal_index.tpl.php', './template/jmxzw_20150218_business_series', 'portal/index')
;?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo CHARSET;?>" />
<?php if($_G['config']['output']['iecompatible']) { ?><meta http-equiv="X-UA-Compatible" content="IE=EmulateIE<?php echo $_G['config']['output']['iecompatible'];?>" /><?php } ?>
<title><?php if(!empty($navtitle)) { ?><?php echo $navtitle;?> - <?php } if(empty($nobbname)) { ?> <?php echo $_G['setting']['bbname'];?> - <?php } ?> Powered by Discuz!</title>
<?php echo $_G['setting']['seohead'];?>

<meta name="keywords" content="<?php if(!empty($metakeywords)) { echo dhtmlspecialchars($metakeywords); } ?>" />
<meta name="description" content="<?php if(!empty($metadescription)) { echo dhtmlspecialchars($metadescription); ?> <?php } if(empty($nobbname)) { ?>,<?php echo $_G['setting']['bbname'];?><?php } ?>" />
<meta name="generator" content="Discuz! <?php echo $_G['setting']['version'];?>" />
<meta name="author" content="Discuz! Team and Comsenz UI Team" />
<meta name="copyright" content="2001-2013 Comsenz Inc." />
<meta name="MSSmartTagsPreventParsing" content="True" />
<meta http-equiv="MSThemeCompatible" content="Yes" />
<base href="<?php echo $_G['siteurl'];?>" /><link rel="stylesheet" type="text/css" href="data/cache/style_10_common.css?<?php echo VERHASH;?>" /><?php if($_G['uid'] && isset($_G['cookie']['extstyle']) && strpos($_G['cookie']['extstyle'], TPLDIR) !== false) { ?><link rel="stylesheet" id="css_extstyle" type="text/css" href="<?php echo $_G['cookie']['extstyle'];?>/style.css" /><?php } elseif($_G['style']['defaultextstyle']) { ?><link rel="stylesheet" id="css_extstyle" type="text/css" href="<?php echo $_G['style']['defaultextstyle'];?>/style.css" /><?php } ?><script type="text/javascript">var STYLEID = '<?php echo STYLEID;?>', STATICURL = '<?php echo STATICURL;?>', IMGDIR = '<?php echo IMGDIR;?>', VERHASH = '<?php echo VERHASH;?>', charset = '<?php echo CHARSET;?>', discuz_uid = '<?php echo $_G['uid'];?>', cookiepre = '<?php echo $_G['config']['cookie']['cookiepre'];?>', cookiedomain = '<?php echo $_G['config']['cookie']['cookiedomain'];?>', cookiepath = '<?php echo $_G['config']['cookie']['cookiepath'];?>', showusercard = '<?php echo $_G['setting']['showusercard'];?>', attackevasive = '<?php echo $_G['config']['security']['attackevasive'];?>', disallowfloat = '<?php echo $_G['setting']['disallowfloat'];?>', creditnotice = '<?php if($_G['setting']['creditnotice']) { ?><?php echo $_G['setting']['creditnames'];?><?php } ?>', defaultstyle = '<?php echo $_G['style']['defaultextstyle'];?>', REPORTURL = '<?php echo $_G['currenturl_encode'];?>', SITEURL = '<?php echo $_G['siteurl'];?>', JSPATH = '<?php echo $_G['setting']['jspath'];?>', CSSPATH = '<?php echo $_G['setting']['csspath'];?>', DYNAMICURL = '<?php echo $_G['dynamicurl'];?>';</script>
<script src="<?php echo $_G['setting']['jspath'];?>common.js?<?php echo VERHASH;?>" type="text/javascript"></script>
<?php if(empty($_GET['diy'])) { $_GET['diy'] = '';?><?php } if(!isset($topic)) { $topic = array();?><?php } ?>
<meta name="application-name" content="<?php echo $_G['setting']['bbname'];?>" />
<meta name="msapplication-tooltip" content="<?php echo $_G['setting']['bbname'];?>" />
<?php if($_G['setting']['portalstatus']) { ?>
<meta name="msapplication-task" content="name=<?php echo $_G['setting']['navs']['1']['navname'];?>;action-uri=<?php echo !empty($_G['setting']['domain']['app']['portal']) ? 'http://'.$_G['setting']['domain']['app']['portal'] : $_G['siteurl'].'portal.php'; ?>;icon-uri=<?php echo $_G['siteurl'];?><?php echo IMGDIR;?>/portal.ico" />
<?php } ?>
<meta name="msapplication-task" content="name=<?php echo $_G['setting']['navs']['2']['navname'];?>;action-uri=<?php echo !empty($_G['setting']['domain']['app']['forum']) ? 'http://'.$_G['setting']['domain']['app']['forum'] : $_G['siteurl'].'forum.php'; ?>;icon-uri=<?php echo $_G['siteurl'];?><?php echo IMGDIR;?>/bbs.ico" />
<?php if($_G['setting']['groupstatus']) { ?>
<meta name="msapplication-task" content="name=<?php echo $_G['setting']['navs']['3']['navname'];?>;action-uri=<?php echo !empty($_G['setting']['domain']['app']['group']) ? 'http://'.$_G['setting']['domain']['app']['group'] : $_G['siteurl'].'group.php'; ?>;icon-uri=<?php echo $_G['siteurl'];?><?php echo IMGDIR;?>/group.ico" />
<?php } if(helper_access::check_module('feed')) { ?>
<meta name="msapplication-task" content="name=<?php echo $_G['setting']['navs']['4']['navname'];?>;action-uri=<?php echo !empty($_G['setting']['domain']['app']['home']) ? 'http://'.$_G['setting']['domain']['app']['home'] : $_G['siteurl'].'home.php'; ?>;icon-uri=<?php echo $_G['siteurl'];?><?php echo IMGDIR;?>/home.ico" />
<?php } if($_G['basescript'] == 'forum' && $_G['setting']['archiver']) { ?>
<link rel="archives" title="<?php echo $_G['setting']['bbname'];?>" href="<?php echo $_G['siteurl'];?>archiver/" />
<?php } if(!empty($rsshead)) { ?>
<?php echo $rsshead;?><?php } $setmark = date('ymd',time());?> 
<?php if(widthauto()) { ?>

<link rel="stylesheet" id="css_widthauto" type="text/css" href="data/cache/style_<?php echo STYLEID;?>_widthauto.css?<?php echo VERHASH;?>" />
<script type="text/javascript">HTMLNODE.className += ' widthauto'</script>
<?php } if($_G['basescript'] == 'forum' || $_G['basescript'] == 'group') { ?>
<script src="<?php echo $_G['setting']['jspath'];?>forum.js?<?php echo VERHASH;?>" type="text/javascript"></script>
<?php } elseif($_G['basescript'] == 'home' || $_G['basescript'] == 'userapp') { ?>
<script src="<?php echo $_G['setting']['jspath'];?>home.js?<?php echo VERHASH;?>" type="text/javascript"></script>
<?php } elseif($_G['basescript'] == 'portal') { ?>
<script src="<?php echo $_G['setting']['jspath'];?>portal.js?<?php echo VERHASH;?>" type="text/javascript"></script>
<?php } if($_G['basescript'] != 'portal' && $_GET['diy'] == 'yes' && check_diy_perm($topic)) { ?>
<script src="<?php echo $_G['setting']['jspath'];?>portal.js?<?php echo VERHASH;?>" type="text/javascript"></script>
<?php } if($_GET['diy'] == 'yes' && check_diy_perm($topic)) { ?>
<link rel="stylesheet" type="text/css" id="diy_common" href="data/cache/style_<?php echo STYLEID;?>_css_diy.css?<?php echo VERHASH;?>" />
<?php } ?>
<link href="template/jmxzw_20150218_business_series/beauty_15_02_10/css/comm.css" rel="stylesheet">

<meta http-equiv="X-UA-Compatible" content="IE=8" >
<meta http-equiv="X-UA-Compatible" content="IE=9" >
<meta http-equiv="X-UA-Compatible" content="IE=edge" >
<script language="javascript" type="text/javascript">
<!-- 
if (top.location != self.location)top.location=self.location;
// -->
</script>
<script type="text/javascript">
  var _S_MDD_NAME_ = "",
    _NEW_GUIDE_ = "";
  var mkurl = "<?php echo $_G['siteurl'];?>";
  var isrun = 0;
</script>
</head>
<body id="nv_<?php echo $_G['basescript'];?>" class="pg_<?php echo CURMODULE;?><?php if($_G['basescript'] === 'portal' && CURMODULE === 'list' && !empty($cat)) { ?> <?php echo $cat['bodycss'];?><?php } ?>" onkeydown="if(event.keyCode==27) return false;">
<div id="append_parent"></div>
<div id="ajaxwaitid"></div>
<?php if($_GET['diy'] == 'yes' && check_diy_perm($topic)) { ?> <?php include template('common/header_diy'); ?> 
<?php } ?> 
<?php if(check_diy_perm($topic)) { ?> <?php include template('common/header_diynav'); ?> 
<?php } ?> 
<?php if(CURMODULE == 'topic' && $topic && empty($topic['useheader']) && check_diy_perm($topic)) { ?> 
<?php echo $diynav;?> 
<?php } ?> 
<?php if(empty($topic) || $topic['useheader']) { ?> 
<?php if($_G['setting']['mobile']['allowmobile'] && (!$_G['setting']['cacheindexlife'] && !$_G['setting']['cachethreadon'] || $_G['uid']) && ($_GET['diy'] != 'yes' || !$_GET['inajax']) && ($_G['mobile'] != '' && $_G['cookie']['mobile'] == '' && $_GET['mobile'] != 'no')) { ?>
<div class="xi1 bm bm_c"> 请选择 <a href="<?php echo $_G['siteurl'];?>forum.php?mobile=yes">进入手机版</a> <span class="xg1">|</span> <a href="<?php echo $_G['setting']['mobile']['nomobileurl'];?>">继续访问电脑版</a> </div>
<?php } ?> 
<?php if($_G['setting']['shortcut'] && $_G['member']['credits'] >= $_G['setting']['shortcut']) { ?>
<div id="shortcut"> <span><a href="javascript:;" id="shortcutcloseid" title="关闭">关闭</a></span> 您经常访问 <?php echo $_G['setting']['bbname'];?>，试试添加到桌面，访问更方便！ <a href="javascript:;" id="shortcuttip">添加 <?php echo $_G['setting']['bbname'];?> 到桌面</a> </div>
<script type="text/javascript">setTimeout(setShortcut, 2000);</script> 
<?php } ?>

<div id="xzw_wp">
  <div id="toptb" class="cl"> 
    <?php if(!empty($_G['setting']['pluginhooks']['global_cpnav_top'])) echo $_G['setting']['pluginhooks']['global_cpnav_top'];?>
    <div class="wp">
      <div class="z"> 
        <?php if(is_array($_G['setting']['topnavs']['0'])) foreach($_G['setting']['topnavs']['0'] as $nav) { ?> 
        <?php if($nav['available'] && (!$nav['level'] || ($nav['level'] == 1 && $_G['uid']) || ($nav['level'] == 2 && $_G['adminid'] > 0) || ($nav['level'] == 3 && $_G['adminid'] == 1))) { ?><?php echo $nav['code'];?><?php } ?> 
        <?php } ?> 
        <?php if(!empty($_G['setting']['pluginhooks']['global_cpnav_extra1'])) echo $_G['setting']['pluginhooks']['global_cpnav_extra1'];?> 
      </div>
      <div class="y"> 
        <!-- common/xzw_top_search --> 
        
        <a id="switchblind" href="javascript:;" onClick="toggleBlind(this)" title="开启辅助访问" class="switchblind">开启辅助访问</a> 
        
        <?php if(!empty($_G['setting']['pluginhooks']['global_cpnav_extra2'])) echo $_G['setting']['pluginhooks']['global_cpnav_extra2'];?> 
        <?php if(is_array($_G['setting']['topnavs']['1'])) foreach($_G['setting']['topnavs']['1'] as $nav) { ?> 
        <?php if($nav['available'] && (!$nav['level'] || ($nav['level'] == 1 && $_G['uid']) || ($nav['level'] == 2 && $_G['adminid'] > 0) || ($nav['level'] == 3 && $_G['adminid'] == 1))) { ?><?php echo $nav['code'];?><?php } ?> 
        <?php } ?> 
        <?php if(empty($_G['disabledwidthauto']) && $_G['setting']['switchwidthauto']) { ?> 
        <a href="javascript:;" id="switchwidth" onClick="widthauto(this)" title="<?php if(widthauto()) { ?>切换到窄版<?php } else { ?>切换到宽版<?php } ?>" class="switchwidth"><?php if(widthauto()) { ?>切换到窄版<?php } else { ?>切换到宽版<?php } ?></a> 
        <?php } ?> 
        <?php if($_G['uid'] && !empty($_G['style']['extstyle'])) { ?><a id="sslct" href="javascript:;" onMouseOver="delayShow(this, function() {showMenu({'ctrlid':'sslct','pos':'34!'})});">切换风格</a><?php } ?> 
        
        <?php if($_G['uid']) { ?> 
        
        <strong > <a class="avts" href="home.php?mod=space&amp;uid=<?php echo $_G['uid'];?>" ><?php echo avatar($_G[uid],small);?></a> 
        <a href="home.php?mod=space&amp;uid=<?php echo $_G['uid'];?>" target="_blank" title="访问我的空间"><?php echo $_G['member']['username'];?></a> 
        </strong> 
        
        <?php if(check_diy_perm($topic)) { ?> 
        <?php echo $diynav;?> 
        <?php } ?> 

        <?php if($_G['group']['allowinvisible']) { ?> 
        <span id="loginstatus"> <a id="loginstatusid" href="member.php?mod=switchstatus" title="切换在线状态" onClick="ajaxget(this.href, 'loginstatus');return false;" class="xi2"></a> </span> 
        <?php } ?> 
        <?php if(!empty($_G['setting']['pluginhooks']['global_usernav_extra1'])) echo $_G['setting']['pluginhooks']['global_usernav_extra1'];?> 
        <span class="pipe">|</span><?php if(!empty($_G['setting']['pluginhooks']['global_usernav_extra4'])) echo $_G['setting']['pluginhooks']['global_usernav_extra4'];?><a href="home.php?mod=spacecp">设置</a> <span class="pipe">|</span><a href="home.php?mod=space&amp;do=pm" id="pm_ntc"<?php if($_G['member']['newpm']) { ?> class="new"<?php } ?>>消息</a> <span class="pipe">|</span><a href="home.php?mod=space&amp;do=notice" id="myprompt"<?php if($_G['member']['newprompt']) { ?> class="new"<?php } ?> onMouseOver="showMenu({'ctrlid':'myprompt'});">提醒<?php if($_G['member']['newprompt']) { ?>(<?php echo $_G['member']['newprompt'];?>)<?php } ?></a><span id="myprompt_check"></span> 
        <?php if(empty($_G['cookie']['ignore_notice']) && ($_G['member']['newpm'] || $_G['member']['newprompt_num']['follower'] || $_G['member']['newprompt_num']['follow'] || $_G['member']['newprompt'])) { ?><script language="javascript">delayShow($('myprompt'), function() {showMenu({'ctrlid':'myprompt','duration':3})});</script><?php } ?> 
        <?php if($_G['setting']['taskon'] && !empty($_G['cookie']['taskdoing_'.$_G['uid']])) { ?><span class="pipe">|</span><a href="home.php?mod=task&amp;item=doing" id="task_ntc" class="new">进行中的任务</a><?php } ?> 
        
        <?php if(($_G['group']['allowmanagearticle'] || $_G['group']['allowpostarticle'] || $_G['group']['allowdiy'] || getstatus($_G['member']['allowadmincp'], 4) || getstatus($_G['member']['allowadmincp'], 6) || getstatus($_G['member']['allowadmincp'], 2) || getstatus($_G['member']['allowadmincp'], 3))) { ?> 
        <span class="pipe">|</span><a href="portal.php?mod=portalcp"><?php if($_G['setting']['portalstatus'] ) { ?>门户管理<?php } else { ?>模块管理<?php } ?></a> 
        <?php } ?> 
        
        <?php if($_G['uid'] && $_G['group']['radminid'] > 1) { ?> 
        <span class="pipe">|</span><a href="forum.php?mod=modcp&amp;fid=<?php echo $_G['fid'];?>" target="_blank"><?php echo $_G['setting']['navs']['2']['navname'];?>管理</a> 
        <?php } ?> 
        <?php if($_G['uid'] && $_G['adminid'] == 1 && $_G['setting']['cloud_status']) { ?> 
        <span class="pipe">|</span><a href="admin.php?frames=yes&amp;action=cloud&amp;operation=applist" target="_blank">云平台</a> 
        <?php } ?> 
        <?php if($_G['uid'] && getstatus($_G['member']['allowadmincp'], 1)) { ?> 
        <span class="pipe">|</span><a href="admin.php" target="_blank">管理中心</a> 
        <?php } ?> 
        <?php if(!empty($_G['setting']['pluginhooks']['global_usernav_extra2'])) echo $_G['setting']['pluginhooks']['global_usernav_extra2'];?> 
        <span class="pipe">|</span><a href="member.php?mod=logging&amp;action=logout&amp;formhash=<?php echo FORMHASH;?>">退出</a> 
        
        <?php if(!empty($_G['setting']['pluginhooks']['global_usernav_extra3'])) echo $_G['setting']['pluginhooks']['global_usernav_extra3'];?> 
        
        <!--
<a href="home.php?mod=spacecp&amp;ac=credit&amp;showcredit=1" id="extcreditmenu"<?php if(!$_G['setting']['bbclosed']) { ?> onmouseover="delayShow(this, showCreditmenu);" class="showmenu"<?php } ?>>积分: <?php echo $_G['member']['credits'];?></a>
<span class="pipe">|</span><a href="home.php?mod=spacecp&amp;ac=usergroup" id="g_upmine" class="showmenu" onmouseover="delayShow(this, showUpgradeinfo)"> <?php echo $_G['group']['grouptitle'];?></a>
        --> 
        
        <a href="javascript:;" id="qmenu" onMouseOver="delayShow(this,function(){showMenu({'ctrlid':'qmenu','pos':'34!','ctrlclass':'a','duration':2});showForummenu(<?php echo $_G['fid'];?>);})">快捷导航</a> 
        
        <?php } elseif(!empty($_G['cookie']['loginuser'])) { ?> 
        <strong><a id="loginuser" class="noborder"><?php echo dhtmlspecialchars($_G['cookie']['loginuser']); ?></a></strong> <span class="pipe">|</span><a href="member.php?mod=logging&amp;action=login" onClick="showWindow('login', this.href)">激活</a> <span class="pipe">|</span><a href="member.php?mod=logging&amp;action=logout&amp;formhash=<?php echo FORMHASH;?>">退出</a> 
        
        <?php } elseif(!$_G['connectguest']) { ?> 
        <?php if(!empty($_G['setting']['pluginhooks']['global_login_extra'])) echo $_G['setting']['pluginhooks']['global_login_extra'];?> 
        
        <?php if(!empty($_G['style']['extstyle'])) { ?><a id="sslct" href="javascript:;" onMouseOver="delayShow(this, function() {showMenu({'ctrlid':'sslct','pos':'34!'})});">切换风格</a><?php } ?> 
        
        <a class="top_login" href="member.php?mod=logging&amp;action=login&amp;referer=<?php echo rawurlencode($dreferer); ?>" onClick="showWindow('login', this.href);return false;"  title="登录" > 登录 </a> <a class="top_reg"  href="member.php?mod=<?php echo $_G['setting']['regname'];?>"  title="Register" > <?php echo $_G['setting']['reglinkname'];?> </a> <a class="top_find_psw" href="javascript:;" onClick="showWindow('login', 'member.php?mod=logging&action=login&viewlostpw=1')"> 找回密码 </a> 
        <?php } else { ?> 
        <?php if(!empty($_G['setting']['pluginhooks']['global_usernav_extra1'])) echo $_G['setting']['pluginhooks']['global_usernav_extra1'];?> 
        <a href="member.php?mod=logging&amp;action=logout&amp;formhash=<?php echo FORMHASH;?>" class="xzw_inline">退出</a> <strong class="vwmy qq"><?php echo $_G['member']['username'];?></strong> 用户组: <?php echo $_G['group']['grouptitle'];?> 
        <?php } ?> 
        
      </div>
    </div>
</div>

<?php if(!IS_ROBOT) { ?> 

<?php if($_G['uid']) { ?>
<ul id="myprompt_menu" class="p_pop" style="display: none;">
  <li><a href="home.php?mod=space&amp;do=pm" id="pm_ntc" style="background-repeat: no-repeat; background-position: 0 50%;"><em class="prompt_news<?php if(empty($_G['member']['newpm'])) { ?>_0<?php } ?>"></em>消息</a></li>
  <li><a href="home.php?mod=follow&amp;do=follower"><em class="prompt_follower<?php if(empty($_G['member']['newprompt_num']['follower'])) { ?>_0<?php } ?>"></em>新听众<?php if($_G['member']['newprompt_num']['follower']) { ?>(<?php echo $_G['member']['newprompt_num']['follower'];?>)<?php } ?></a></li>
  
  <?php if($_G['member']['newprompt'] && $_G['member']['newprompt_num']['follow']) { ?>
  <li><a href="home.php?mod=follow"><em class="prompt_concern"></em>我关注的(<?php echo $_G['member']['newprompt_num']['follow'];?>)</a></li>
  <?php } ?> 
  <?php if($_G['member']['newprompt']) { ?> 
  <?php if(is_array($_G['member']['category_num'])) foreach($_G['member']['category_num'] as $key => $val) { ?>  <li><a href="home.php?mod=space&amp;do=notice&amp;view=<?php echo $key;?>"><em class="notice_<?php echo $key;?>"></em><?php echo lang('template', 'notice_'.$key); ?>(<span class="rq"><?php echo $val;?></span>)</a></li>
  <?php } ?> 
  <?php } ?> 
  <?php if(empty($_G['cookie']['ignore_notice'])) { ?>
  <li class="ignore_noticeli"><a href="javascript:;" onClick="setcookie('ignore_notice', 1);hideMenu('myprompt_menu')" title="暂不提醒"><em class="ignore_notice"></em></a></li>
  <?php } ?>
</ul>
<?php } ?> 

<?php if(!empty($_G['style']['extstyle'])) { ?>
<div id="sslct_menu" class="cl p_pop" style="display: none;"> 
  <?php if(!$_G['style']['defaultextstyle']) { ?><span class="sslct_btn" onClick="extstyle('')" title="默认"><i></i> 默认</span><?php } ?> 
  <?php if(is_array($_G['style']['extstyle'])) foreach($_G['style']['extstyle'] as $extstyle) { ?> 
  <span class="sslct_btn" onClick="extstyle('<?php echo $extstyle['0'];?>')" title="<?php echo $extstyle['1'];?>"><i style='background:<?php echo $extstyle['2'];?>'></i> <?php echo $extstyle['1'];?> </span> 
  <?php } ?> 
</div>
<?php } ?> <div id="qmenu_menu" class="p_pop <?php if(!$_G['uid']) { ?>blk<?php } ?>" style="display: none;">
<?php if(!empty($_G['setting']['pluginhooks']['global_qmenu_top'])) echo $_G['setting']['pluginhooks']['global_qmenu_top'];?>
<?php if($_G['uid']) { ?>
<ul class="cl nav"><?php if(is_array($_G['setting']['mynavs'])) foreach($_G['setting']['mynavs'] as $nav) { if($nav['available'] && (!$nav['level'] || ($nav['level'] == 1 && $_G['uid']) || ($nav['level'] == 2 && $_G['adminid'] > 0) || ($nav['level'] == 3 && $_G['adminid'] == 1))) { ?>
<li><?php echo $nav['code'];?></li>
<?php } } ?>
</ul>
<?php } elseif($_G['connectguest']) { ?>
<div class="ptm pbw hm">
请先<br /><a class="xi2" href="member.php?mod=connect"><strong>完善帐号信息</strong></a> 或 <a href="member.php?mod=connect&amp;ac=bind" class="xi2 xw1"><strong>绑定已有帐号</strong></a><br />后使用快捷导航
</div>
<?php } else { ?>
<div class="ptm pbw hm">
请 <a href="javascript:;" class="xi2" onclick="lsSubmit()"><strong>登录</strong></a> 后使用快捷导航<br />没有帐号？<a href="member.php?mod=<?php echo $_G['setting']['regname'];?>" class="xi2 xw1"><?php echo $_G['setting']['reglinkname'];?></a>
</div>
<?php } if($_G['setting']['showfjump']) { ?><div id="fjump_menu" class="btda"></div><?php } ?>
<?php if(!empty($_G['setting']['pluginhooks']['global_qmenu_bottom'])) echo $_G['setting']['pluginhooks']['global_qmenu_bottom'];?>
</div> 
<?php } ?> <?php echo adshow("headerbanner/wp a_h");?><div class="ic_header">
  <div class="wp">
    <div class="grid_c1">  
    <div class="mod_logo">
            <?php $mnid = getcurrentnav();?>            <h2><?php if(!isset($_G['setting']['navlogos'][$mnid])) { ?><a href="<?php if($_G['setting']['domain']['app']['default']) { ?>http://<?php echo $_G['setting']['domain']['app']['default'];?>/<?php } else { ?>./<?php } ?>" title="<?php echo $_G['setting']['bbname'];?>"><?php echo $_G['style']['boardlogo'];?></a><?php } else { ?><?php echo $_G['setting']['navlogos'][$mnid];?><?php } ?>
            </h2>      
        </div>
        <?php if($_G['setting']['search']) { $slist = array();?><?php if($_G['fid'] && $_G['forum']['status'] != 3 && $mod != 'group') { ?><?php
$slist[forumfid] = <<<EOF
<li><a href="javascript:;" rel="curforum" fid="{$_G['fid']}" >本版</a></li>
EOF;
?><?php } if($_G['setting']['portalstatus'] && $_G['setting']['search']['portal']['status'] && ($_G['group']['allowsearch'] & 1 || $_G['adminid'] == 1)) { ?><?php
$slist[portal] = <<<EOF
<li><a href="javascript:;" rel="article">文章</a></li>
EOF;
?><?php } if($_G['setting']['search']['forum']['status'] && ($_G['group']['allowsearch'] & 2 || $_G['adminid'] == 1)) { ?><?php
$slist[forum] = <<<EOF
<li><a href="javascript:;" rel="forum" class="curtype">帖子</a></li>
EOF;
?><?php } if(helper_access::check_module('blog') && $_G['setting']['search']['blog']['status'] && ($_G['group']['allowsearch'] & 4 || $_G['adminid'] == 1)) { ?><?php
$slist[blog] = <<<EOF
<li><a href="javascript:;" rel="blog">日志</a></li>
EOF;
?><?php } if(helper_access::check_module('album') && $_G['setting']['search']['album']['status'] && ($_G['group']['allowsearch'] & 8 || $_G['adminid'] == 1)) { ?><?php
$slist[album] = <<<EOF
<li><a href="javascript:;" rel="album">相册</a></li>
EOF;
?><?php } if($_G['setting']['groupstatus'] && $_G['setting']['search']['group']['status'] && ($_G['group']['allowsearch'] & 16 || $_G['adminid'] == 1)) { ?><?php
$slist[group] = <<<EOF
<li><a href="javascript:;" rel="group">{$_G['setting']['navs']['3']['navname']}</a></li>
EOF;
?><?php } ?><?php
$slist[user] = <<<EOF
<li><a href="javascript:;" rel="user">用户</a></li>
EOF;
?>
<?php } if($_G['setting']['search'] && $slist) { ?>
<div id="search_mid_temp" class="y <?php if($_G['setting']['srchhotkeywords'] && count($_G['setting']['srchhotkeywords']) > 5) { ?>scbar_narrow <?php } ?>cl">
<form id="scbar_form" method="<?php if($_G['fid'] && !empty($searchparams['url'])) { ?>get<?php } else { ?>post<?php } ?>" autocomplete="off" onsubmit="searchFocus($('scbar_txt'))" action="<?php if($_G['fid'] && !empty($searchparams['url'])) { ?><?php echo $searchparams['url'];?><?php } else { ?>search.php?searchsubmit=yes<?php } ?>" target="_blank">
<input type="hidden" name="mod" id="scbar_mod" value="search" />
<input type="hidden" name="formhash" value="<?php echo FORMHASH;?>" />
<input type="hidden" name="srchtype" value="title" />
<input type="hidden" name="srhfid" value="<?php echo $_G['fid'];?>" />
<input type="hidden" name="srhlocality" value="<?php echo $_G['basescript'];?>::<?php echo CURMODULE;?>" />
<?php if(!empty($searchparams['params'])) { if(is_array($searchparams['params'])) foreach($searchparams['params'] as $key => $value) { $srchotquery .= '&' . $key . '=' . rawurlencode($value);?><input type="hidden" name="<?php echo $key;?>" value="<?php echo $value;?>" />
<?php } ?>
<input type="hidden" name="source" value="discuz" />
<input type="hidden" name="fId" id="srchFId" value="<?php echo $_G['fid'];?>" />
<input type="hidden" name="q" id="cloudsearchquery" value="" />
<?php } ?>

        <div class="search_cart_wrap" id="j_search">
            <div class="mod_search">
                    <table cellspacing="0" cellpadding="0">
                      <tr>
                        <td class="search_txt_td">
                        <div id="search_input_show" onClick="showMenu({'ctrlid':'search_input_show','ctrlclass':'as','evt':'click','fade':1})">
                           <input class="mod_search_con" type="text" name="srchtxt" id="scbar_txt" autocomplete="off" x-webkit-speech speech />
                        </div>
                        </td>
                        <td class="search_type_td"><a href="javascript:;" id="scbar_type" class="showmenu xg1 xs2" onclick="showMenu(this.id)" hidefocus="true">搜索</a></td>
                        <td>
                            <input class="mod_search_btn" tabindex="9" hotname="I.HEADER.SEARCHBTN" ytag="00401" type="submit" />
                        </td>
                      </tr>
                    </table>
            </div>
            <div class="mod_skey" id="page_sKey">
<div id="scbar_hot">
<?php if($_G['setting']['srchhotkeywords']) { ?>
<strong class="xw1">热搜: </strong><?php if(is_array($_G['setting']['srchhotkeywords'])) foreach($_G['setting']['srchhotkeywords'] as $val) { if($val=trim($val)) { $valenc=rawurlencode($val);?><?php
$__FORMHASH = FORMHASH;$srchhotkeywords[] = <<<EOF


EOF;
 if(!empty($searchparams['url'])) { 
$srchhotkeywords[] .= <<<EOF

<a href="{$searchparams['url']}?q={$valenc}&source=hotsearch{$srchotquery}" target="_blank" class="xi2" sc="1">{$val}</a>

EOF;
 } else { 
$srchhotkeywords[] .= <<<EOF

<a href="search.php?mod=forum&amp;srchtxt={$valenc}&amp;formhash={$__FORMHASH}&amp;searchsubmit=true&amp;source=hotsearch" target="_blank" class="xi2" sc="1">{$val}</a>

EOF;
 } 
$srchhotkeywords[] .= <<<EOF


EOF;
?>
<?php } } echo implode('', $srchhotkeywords);; } ?>
</div>          
            </div>            
        </div>
</form>
</div>
<ul id="scbar_type_menu" class="p_pop" style="display: none;"><?php echo implode('', $slist);; ?></ul>
<script type="text/javascript">
initSearchmenu('scbar', '<?php echo $searchparams['url'];?>');
</script>
<?php } ?> 
    </div>
  </div>
</div>

<div id="hd">
  <div id="menu">
    <ul>
      <?php if(is_array($_G['setting']['navs'])) foreach($_G['setting']['navs'] as $nav) { ?> 
      <?php if($nav['available'] && (!$nav['level'] || ($nav['level'] == 1 && $_G['uid']) || ($nav['level'] == 2 && $_G['adminid'] > 0) || ($nav['level'] == 3 && $_G['adminid'] == 1))) { ?>
      <li <?php if($mnid == $nav['navid']) { ?>class="a" <?php } ?><?php echo $nav['nav'];?>></li>
      <?php } ?> 
      <?php } ?>
    </ul>
    <?php if(!empty($_G['setting']['pluginhooks']['global_nav_extra'])) echo $_G['setting']['pluginhooks']['global_nav_extra'];?> 
  </div>
  
  <script src="<?php echo $_G['style']['styleimgdir'];?>/nv.js" type="text/javascript"></script> 
  <?php if(!empty($_G['setting']['plugins']['jsmenu'])) { ?>
  <ul class="p_pop h_pop" id="plugin_menu" style="display: none">
    <?php if(is_array($_G['setting']['plugins']['jsmenu'])) foreach($_G['setting']['plugins']['jsmenu'] as $module) { ?> 
    <?php if(!$module['adminid'] || ($module['adminid'] && $_G['adminid'] > 0 && $module['adminid'] >= $_G['adminid'])) { ?>
    <li><?php echo $module['url'];?></li>
    <?php } ?> 
    <?php } ?>
  </ul>
  <?php } ?> 
  <?php echo $_G['setting']['menunavs'];?>
  <div id="mu" class="cl"> 
    <?php if($_G['setting']['subnavs']) { ?> 
    <?php if(is_array($_G['setting']['subnavs'])) foreach($_G['setting']['subnavs'] as $navid => $subnav) { ?> 
    <?php if($_G['setting']['navsubhover'] || $mnid == $navid) { ?>
    <ul class="cl <?php if($mnid == $navid) { ?>current<?php } ?>" id="snav_<?php echo $navid;?>" style="display:<?php if($mnid != $navid) { ?>none<?php } ?>">
      <?php echo $subnav;?>
    </ul>
    <?php } ?> 
    <?php } ?> 
    <?php } ?> 
  </div>
  <?php echo adshow("subnavbanner/a_mu");?> 
</div>

<?php if(!empty($_G['setting']['pluginhooks']['global_header'])) echo $_G['setting']['pluginhooks']['global_header'];?> 
<?php } ?>
<div id="wp" class="wp">
<link rel="stylesheet" href="template/jmxzw_20150218_business_series/wrap/slideshow/css/style.css" type="text/css" />
<script src="template/jmxzw_20150218_business_series/beauty_15_02_10/js/jquery-1.5.1.min.js" type="text/javascript" charset="gb2312"></script>
<script type="text/javascript"> 
     var syq = jQuery.noConflict();
</script>
<script src="template/jmxzw_20150218_business_series/beauty_15_02_10/js/jquery.countdownTimer.min.js" type="text/javascript" charset="gb2312"></script>
<script src="template/jmxzw_20150218_business_series/beauty_15_02_10/js/header.js?v=2015011615" type="text/javascript" charset="utf-8"></script>
<style id="diy_style" type="text/css"></style>
<div style="clear:both;"></div>

    <div class="head_show">
        <div class="leftbox">
                <div class="mod_cate mod_cate_on" id="category_container">
  <ul class="mod_cate_bd" id="frist_list">
    <li id="cate0" index="0" panel="true" class="mod_cate_li">
            <div class="mod_cate_r1">
                <h3><a target="_blank" href="#" ytag="85000" r="true">食品饮料</a></h3>
                <a target="_blank" class="mod_cate_prom" href="#" ytag="85001" r="true">副标题</a>   
            </div>
            <div class="mod_cate_r2">
                <a target="_blank" href="#" ytag="85002" r="true">饼干/曲奇/蛋卷</a>
                <a target="_blank" href="#" ytag="85003" r="true">果干/蜜饯</a>
                <a target="_blank" href="#" ytag="85004" r="true">糖果/巧克力</a>
                <a target="_blank" href="#" ytag="85005" r="true">坚果炒货</a> 
            </div>
    </li>

    <li id="cate1" index="1" panel="true" class="mod_cate_li">
        <div class="mod_cate_r1">
            <h3><a target="_blank" href="#" ytag="86000" r="true">进口商品</h3>
            <a target="_blank" class="mod_cate_prom" href="#" ytag="86002" r="true">副标题</a>  
        </div>
        <div class="mod_cate_r2">
            <a target="_blank" class="mod_cate_hl" href="#" ytag="86003" r="true">进口饼干</a>
            <a target="_blank" href="#" ytag="86004" r="true">进口牛奶</a>
            <a target="_blank" href="#" ytag="86005" r="true">蜜饯坚果</a>
            <a target="_blank" class="mod_cate_hl" href="#" ytag="86006" r="true">进口零食</a>
        </div>
    </li>

    <li id="cate2" index="2" panel="true" class="mod_cate_li">
        <div class="mod_cate_r1">
            <h3><a target="_blank" href="#" ytag="87000" r="true">粮油副食</a></h3>
            <a target="_blank" class="mod_cate_prom" href="#" ytag="87002" r="true">副标题</a>  
        </div>
        <div class="mod_cate_r2">
            <a target="_blank" href="#" ytag="87003" r="true">方便速食</a>
            <a target="_blank" href="#" ytag="87004" r="true">菌菇干货</a>
            <a target="_blank" href="#" ytag="87005" r="true">大米面粉 </a>
            <a target="_blank" href="#" ytag="87006" r="true">健康杂粮</a>
        </div>
    </li>

    <li id="cate3" index="3" panel="true" class="mod_cate_li">
        <div class="mod_cate_r1">
            <h3><a target="_blank" href="#" ytag="88000" r="true">家居家电</a></h3>
            <a target="_blank" class="mod_cate_prom" href="#" ytag="88001" r="true">副标题</a>    
        </div>
        <div class="mod_cate_r2">
            <a target="_blank" class="mod_cate_hl" href="#" ytag="88002" r="true">化妆/美容工具</a>
            <a target="_blank" href="#" ytag="88003" r="true">个人清洁用具</a>
            <a target="_blank" href="#" ytag="88004" r="true">伞/雨具</a>
            <a target="_blank" href="#" ytag="88005" r="true">卫浴用具/配件</a>  
        </div>
    </li>

    <li id="cate4" index="4" panel="true" class="mod_cate_li">
        <div class="mod_cate_r1">
            <h3><a target="_blank" href="#" ytag="89000" r="true">家庭清洁</a></h3>
        </div>
        <div class="mod_cate_r2">
            <a target="_blank" href="#" ytag="89001" r="true">衣物清洁剂</a>
            <a target="_blank" class="mod_cate_hl" href="#" ytag="89002" r="true">客厅/厨卫清洁剂</a>
            <a target="_blank" class="mod_cate_hl" href="#" ytag="89003" r="true">家私/皮具护理品</a>
        </div>
    </li>

    <li id="cate5" index="5" panel="true" class="mod_cate_li">
        <div class="mod_cate_r1">
            <h3><a target="_blank" href="#" ytag="90000" r="true">美容洗护</a></h3>
              </div>
        <div class="mod_cate_r2">
            <a target="_blank" class="mod_cate_hl" href="#" ytag="90001" r="true">洗发/护发</a>
            <a target="_blank" href="#" ytag="90002" r="true">牙膏/牙刷</a>
            <a target="_blank" href="#" ytag="90003" r="true">沐浴露/香皂</a>
            <a target="_blank" href="#" ytag="90004" r="true">驱蚊醒脑/清凉油</a>   
         </div>
    </li>

    <li id="cate6" index="6" panel="true" class="mod_cate_li">
        <div class="mod_cate_r1">
            <h3><a target="_blank" href="#" ytag="90000" r="true">母婴用品</a></h3>
              </div>
        <div class="mod_cate_r2">
            <a target="_blank" class="mod_cate_hl" href="#" ytag="90001" r="true">纸尿裤/拉拉裤</a>
            <a target="_blank" href="#" ytag="90002" r="true">洗护用品</a>
            <a target="_blank" href="#" ytag="90003" r="true">驱蚊/退烧</a>
            <a target="_blank" href="#" ytag="90004" r="true">湿巾</a>   
        </div>
    </li>
  <ul>
</div> 
        </div>
        <!-- 头部end -->
        <div class="rightbox wrapper">
            <!--[diy=diy_xzw_wrapper_datas]--><div id="diy_xzw_wrapper_datas" class="area"></div><!--[/diy]--> 
        </div>
        <!-- wrapper end -->
    </div>

    <!-- 头部end -->
    <div id="J_beauty_bg_top">
        <div class="g-wrap f-clearfix">
        <div class="g-change-l">    
            <!--  首页 全屏横幅广告占位 1  -->
            <div class="wp xzw_index">
                    <!--[diy=diy_xzw_ad_1]--><div id="diy_xzw_ad_1" class="area"></div><!--[/diy]--> 
            </div>    
            <div class="w_h J_scrollspy ">
                <div class="brand-tit-long">
                    <div class="brand-tit-l">
                       <h2>今日新品</h2>
                    </div>
                    <div class="brand-tit-r">
                        <dl>
                            <dd><a class="LETTER-RED" href="forum.php?mod=misc&amp;action=nav" onclick="showWindow('nav', this.href, 'get', 0)"> 快捷发布 + </a></dd>
                            <dd><a href="#" target="_blank" class="">进口纯牛奶</a></dd>
                            <dd><a href="#" target="_blank" class="">进口咖啡饮料</a></dd>
                            <dd><a href="#" target="_blank" class="">葡萄酒</a></dd>
                            <dd><a href="#" target="_blank" class="">夏威夷果</a></dd>
                            <dd><a href="#" target="_blank" class="">碧根果</a></dd>
                            <dd><a href="#" target="_blank" class="">梅类</a></dd>
                            <dd><a href="#" target="_blank" class="">果冻</a></dd>
                        </dl>
                    </div>
                </div> 
                <!--[diy=diy_xzwgw20150211_J_hotSaleWrap_1]--><div id="diy_xzwgw20150211_J_hotSaleWrap_1" class="area"></div><!--[/diy]--> 
            </div>
        </div>
        <!--右侧-->
    <div class="g-fixed-r">
        <div class="m-class-entry">
            <a title="抢过来的果干" href="#" target="_blank" class="class-entry-item">
                <img src="template/jmxzw_20150218_business_series/beauty_15_02_10/showmap/beauty01.png" alt="抢过来的果干" width="238" height="60" class="class-entry-img">
                <span class="class-entry-icon">&gt;</span>
            </a> 
            <a title="零食巧克力" href="#" target="_blank" class="class-entry-item">
                <img src="template/jmxzw_20150218_business_series/beauty_15_02_10/showmap/beauty02.png" alt="零食巧克力" width="238" height="60" class="class-entry-img">
                <span class="class-entry-icon">&gt;</span>
            </a> 
            <a title="洋货大会战" href="#" target="_blank" class="class-entry-item">
                <img src="template/jmxzw_20150218_business_series/beauty_15_02_10/showmap/beauty03_yqb.jpg" alt="洋货大会战" width="238" height="60" class="class-entry-img">
                <span class="class-entry-icon">&gt;</span>
            </a> 
            <a title="嘉顿饼干" href="#" target="_blank" class="class-entry-item">
                <img src="template/jmxzw_20150218_business_series/beauty_15_02_10/showmap/beauty04_1f8.jpg" alt="嘉顿饼干" width="238" height="60" class="class-entry-img">
                <span class="class-entry-icon">&gt;</span>
            </a> 
        </div>

   <div class="parents-care-products" id="J_pcpWrap">
    <div class="reco-head">
        <span class="head-title"><i class="ico-eyes-blue"></i> 热门推荐商品</span>
    </div>
    <div class="reco-content-wrap">
        <div class="reco-content-inner" id="J_rcInner_0">
            <!--[diy=diy_xzwgw20150211_J_rcInner_0]--><div id="diy_xzwgw20150211_J_rcInner_0" class="area"></div><!--[/diy]-->
        </div>   
    </div>
</div>
        </div>
    </div>
</div>
<div class="mod_backtop hide" id="j_backtop"><a href="javascript:" title="回顶部" ytag="72300">回顶部</a></div>
<!-- ddd -->
<!--  首页 全屏横幅广告占位 4  -->
<div class="wp xzw_index">
        <!--[diy=diy_xzw_ad_4]--><div id="diy_xzw_ad_4" class="area"></div><!--[/diy]--> 
</div>

<div class="brand-tit-long">
    <div class="brand-tit-l">
       <h2>论坛导航</h2>
    </div>
    <div class="brand-tit-r">
        <dl>
            <dd><a class="LETTER-RED" href="forum.php?mod=misc&amp;action=nav" onclick="showWindow('nav', this.href, 'get', 0)"> 快捷发布 + </a></dd>
            <dd><a href="#" target="_blank" class="">进口纯牛奶</a></dd>
            <dd><a href="#" target="_blank" class="">进口咖啡饮料</a></dd>
            <dd><a href="#" target="_blank" class="">葡萄酒</a></dd>
            <dd><a href="#" target="_blank" class="">夏威夷果</a></dd>
            <dd><a href="#" target="_blank" class="">碧根果</a></dd>
            <dd><a href="#" target="_blank" class="">梅类</a></dd>
            <dd><a href="#" target="_blank" class="">果冻</a></dd>
        </dl>
    </div>
</div> 

<!--  社区导读模块  -->
<div class="wp xzw_index col_inner ">
<!--
<div class=" xzw_col_1-11_ct">
-->
<div class=" ">
  		<!--[diy=diy_xzw_guide_bbs]--><div id="diy_xzw_guide_bbs" class="area"></div><!--[/diy]--> 
    </div>
</div>

<div class="wp xzw_index">  
  <!--[diy=diy_ad_bottom_1]--><div id="diy_ad_bottom_1" class="area"></div><!--[/diy]--> 
</div>

<div class="wp col_inner xzw_index ">
<!--
        <h2><a href="#" target="_blank"> 友情链接 </a> <span><a href="#"> 申请链接 +  </a></span></h2>
-->
<div class="col_inner_ct">
  		<!--[diy=diy_ad_2]--><div id="diy_ad_2" class="area"></div><!--[/diy]--> 
  	</div>
</div>

<div  style="clear:both;"></div>

<!-- 活动类型 -->
<script src="misc.php?mod=diyhelp&action=get&type=index&diy=<?php echo $_G['gp_diy'];?>&r=<?php echo random(4); ?>" type="text/javascript" type="text/javascript"></script> 
<script type="text/javascript">
/* <![CDATA[ */
var slider_settings = {"timeout":"6000"};
/* ]]> */
</script></div>

<div class="ic_market" id="j_market">
    <div class="grid_c1">
                <a target="_blank" class="market_link" title="17期：送货狂想曲" href="#" ytag="70000"><img src="template/jmxzw_20150218_business_series/beauty_15_02_10/img/bottompic.jpg" class="market_img_1" /></a>
    </div>
</div>

<script>
 var b = syq("#j_backtop");
        if (b.length > 0) {
            var c = document.documentElement.clientHeight || document.body.clientHeight;
            var a = Math.min(c, 500);
            syq(window).bind("scroll resize",
            function() {
                var e = syq(this).scrollTop();
                if (e < a) {
                    b.fadeOut()
                } else {
                    b.fadeIn()
                }
                if (syq.browser.msie && (syq.browser.version == "6.0") && !syq.support.style) {
                    var d = c - 200 + e;
                    b.css({
                        top: d
                    })
                }
            });
            b.click(function() {
                syq(window).scrollTop(0);
                return false
            })
        }
</script><!--[if !IE]>|xGv00|214340f353f2e67f2068580a6653e1d8<![endif]-->

<div class="ic_footer">
    <div class="ic_footer_inner">
        <div class="mod_agree">
            <ul class="mod_agree_con">                          
                <li class="mod_agree_item mod_agree_item1">
                    <i></i>
                    <a target="_blank" href="#" ytag="72100" rel="nofollow"><strong>正品保障</strong><span>全场正品，行货保障</span></a>
                </li>
                <li class="mod_agree_item mod_agree_item2">
                    <i></i>
                    <a target="_blank" href="#" ytag="72101" rel="nofollow"><strong>一日三送</strong><span>闪电配送，谁比我快</span></a>
                </li>
                <li class="mod_agree_item mod_agree_item3">
                    <i></i>
                    <a target="_blank" href="#" ytag="72102" rel="nofollow"><strong>货到付款</strong><span>货到付款，安心便捷</span></a>
                </li>
                <li class="mod_agree_item mod_agree_item4">
                    <i></i>
                    <a target="_blank" href="#" ytag="72103" rel="nofollow"><strong>维修保障</strong><span>服务保证，全国联保</span></a>
                </li>
                <li class="mod_agree_item mod_agree_item5">
                    <i></i>
                    <a target="_blank" href="#" ytag="72104" rel="nofollow"><strong>无忧退货</strong><span>无忧退货，7日尊享</span></a>
                </li>
                <li class="mod_agree_item mod_agree_item6">
                    <i></i>
                    <a target="_blank" href="#" ytag="72105" rel="nofollow"><strong>价格保护</strong><span>价格保护，下单无忧</span></a>
                </li>
            </ul>
        </div>
        <div class="mod_help">                  
            <div class="mod_help_item">
                <h5>常用服务</h5>
                <ul>
                    <li><a target="_blank" href="#" ytag="70100" rel="nofollow">问题咨询</a></li>
                    <li><a target="_blank" href="#" ytag="70101" rel="nofollow">修改订单</a></li>
                    <li><a target="_blank" href="#" ytag="70102" rel="nofollow">催办订单</a></li>
                    <li><a target="_blank" href="#" ytag="70103" rel="nofollow">保修退换货</a></li>
                    <li><a target="_blank" href="#" ytag="70104" rel="nofollow">上门安装</a></li>
                </ul>
            </div>                  

        <div class="mod_help_item">
                <h5>购物</h5>
                <ul>
                    <li><a target="_blank" href="#" ytag="70200" rel="nofollow">怎样购物</a></li>
                    <li><a target="_blank" href="#" ytag="70201" rel="nofollow">积分优惠券介绍</a></li>
                    <li><a target="_blank" href="#" ytag="70202" rel="nofollow">订单状态说明</a></li>
                    <li><a target="_blank" href="#" ytag="70203" rel="nofollow">礼品卡介绍</a></li>
                </ul>
            </div>                  
        <div class="mod_help_item">
            <h5>付款</h5>
                <ul>
                    <li><a target="_blank" href="#" ytag="70300" rel="nofollow">货到付款</a></li>
                    <li><a target="_blank" href="#" ytag="70301" rel="nofollow">在线支付</a></li>
                    <li><a target="_blank" href="#" ytag="70302" rel="nofollow">其他支付方式</a></li>
                    <li><a target="_blank" href="#" ytag="70303" rel="nofollow">发票说明</a></li>
                </ul>
            </div>                  
        <div class="mod_help_item">
                <h5>配送</h5>
                <ul>
                    <li><a target="_blank" href="#" ytag="70400" rel="nofollow">快递相关</a></li>
                    <li><a target="_blank" href="#" ytag="70401" rel="nofollow">价格保护</a></li>
                </ul>
        </div>                  

        <div class="mod_help_item">
                <h5>售后</h5>
                <ul>
                    <li><a target="_blank" href="#" ytag="70500" rel="nofollow">售后服务政策</a></li>
                    <li><a target="_blank" href="#" ytag="70501" rel="nofollow">退换货服务流程</a></li>
                    <li><a target="_blank" href="#" ytag="70502" rel="nofollow">优质售后服务</a></li>
                    <li><a target="_blank" href="#" ytag="70503" rel="nofollow">特色服务指南</a></li>
                    <li><a target="_blank" href="#" ytag="70504" rel="nofollow">服务时效承诺</a></li>
                </ul>
        </div>                  

        <div class="mod_help_item">
                <h5>商家合作</h5>
                <ul>
                    <li><a target="_blank" href="#" ytag="70600" rel="nofollow">企业采购</a></li>
                </ul>
        </div>              
        </div>

        <div class="mod_way">           
            <div class="mod_way_item mod_way_mb">
                <i class="mod_way_mb_img"></i>
                <div class="mod_way_mb_info">
                    <h5>手机二维码</h5>
                    <p>轻松一点，迅速查看！</p>
                    <p><a href="#" ytag="72000" class="mod_way_mb_iphone">app store下载</a><a href="#" ytag="72001" class="mod_way_mb_android">android下载</a></p>
                </div>
            </div>
            <div class="mod_way_item mod_way_wx">
                <i class="mod_way_wx_img"></i>
                <div class="mod_way_wx_info">
                    <h5>官方微信</h5>
                    <p>扫描二维码，即刻亲密互动，还有劲爆优惠等你来拿！</p>
                </div>
            </div>
            <div class="mod_way_item mod_way_em">
                <i class="mod_way_em_img"></i>
                <div class="mod_way_em_info">
                    <h5>订阅QQ邮件</h5>
                    <p><a target="_blank" href="#" ytag="72002" rel="nofollow">第一手促销资讯，尊享邮件特惠商品，优惠不错过！</a></p>
                </div>
            </div>

            <div class="mod_way_item mod_way_wb">
                <ul>
                    <li><span class="mod_way_wb_sina">官方新浪微博</span><a target="_blank" href="#" ytag="72003">立即关注</a></li>
                    <li><span class="mod_way_wb_tc">官方腾讯微博</span><a target="_blank" href="#">立即关注</a></li>
                </ul>
            </div>
        </div>
    </div>

<?php if(empty($topic) || ($topic['usefooter'])) { $focusid = getfocus_rand($_G[basescript]);?><?php if($focusid !== null) { $focus = $_G['cache']['focus']['data'][$focusid];?><?php $focusnum = count($_G['setting']['focus'][$_G[basescript]]);?><div class="focus" id="sitefocus">
  <div class="bm">
    <div class="bm_h cl"> <a href="javascript:;" onclick="setcookie('nofocus_<?php echo $_G['basescript'];?>', 1, <?php echo $_G['cache']['focus']['cookie'];?>*3600);$('sitefocus').style.display='none'" class="y" title="关闭">关闭</a>
      <h2> 
        <?php if($_G['cache']['focus']['title']) { ?><?php echo $_G['cache']['focus']['title'];?><?php } else { ?>站长推荐<?php } ?> 
        <span id="focus_ctrl" class="fctrl"><img src="<?php echo IMGDIR;?>/pic_nv_prev.gif" alt="上一条" title="上一条" id="focusprev" class="cur1" onclick="showfocus('prev');" /> <em><span id="focuscur"></span>/<?php echo $focusnum;?></em> <img src="<?php echo IMGDIR;?>/pic_nv_next.gif" alt="下一条" title="下一条" id="focusnext" class="cur1" onclick="showfocus('next')" /></span> </h2>
    </div>
    <div class="bm_c" id="focus_con"> </div>
  </div>
</div><?php $focusi = 0;?> <?php if(is_array($_G['setting']['focus'][$_G['basescript']])) foreach($_G['setting']['focus'][$_G['basescript']] as $id) { ?><div class="bm_c" style="display: none" id="focus_<?php echo $focusi;?>">
  <dl class="xld cl bbda">
    <dt><a href="<?php echo $_G['cache']['focus']['data'][$id]['url'];?>" class="xi2" target="_blank"><?php echo $_G['cache']['focus']['data'][$id]['subject'];?></a></dt>
    <?php if($_G['cache']['focus']['data'][$id]['image']) { ?>
    <dd class="m"><a href="<?php echo $_G['cache']['focus']['data'][$id]['url'];?>" target="_blank"><img src="<?php echo $_G['cache']['focus']['data'][$id]['image'];?>" alt="<?php echo $_G['cache']['focus']['data'][$id]['subject'];?>" /></a></dd>
    <?php } ?>
    <dd><?php echo $_G['cache']['focus']['data'][$id]['summary'];?></dd>
  </dl>
  <p class="ptn cl"><a href="<?php echo $_G['cache']['focus']['data'][$id]['url'];?>" class="xi2 y" target="_blank">查看 &raquo;</a></p>
</div><?php $focusi ++;?> 
<?php } ?> 
<script type="text/javascript">
      var focusnum = <?php echo $focusnum;?>;
      if(focusnum < 2) {
        $('focus_ctrl').style.display = 'none';
      }
      if(!$('focuscur').innerHTML) {
        var randomnum = parseInt(Math.round(Math.random() * focusnum));
        $('focuscur').innerHTML = Math.max(1, randomnum);
      }
      showfocus();
      var focusautoshow = window.setInterval('showfocus(\'next\', 1);', 5000);
    </script> 
<?php } ?> 
<?php if($_G['uid'] && $_G['member']['allowadmincp'] == 1 && $_G['setting']['showpatchnotice'] == 1) { ?>
<div class="focus patch" id="patch_notice"></div>
<?php } ?> <?php echo adshow("footerbanner/wp a_f/1");?><?php echo adshow("footerbanner/wp a_f/2");?><?php echo adshow("footerbanner/wp a_f/3");?> <?php echo adshow("float/a_fl/1");?><?php echo adshow("float/a_fr/2");?> <?php echo adshow("couplebanner/a_fl a_cb/1");?><?php echo adshow("couplebanner/a_fr a_cb/2");?> <?php echo adshow("cornerbanner/a_cn");?> 

<?php if(!empty($_G['setting']['pluginhooks']['global_footer'])) echo $_G['setting']['pluginhooks']['global_footer'];?>

     <div class="cnLink">
        <?php if($_G['setting']['site_qq']) { ?><a href="http://wpa.qq.com/msgrd?V=3&amp;Uin=<?php echo $_G['setting']['site_qq'];?>&amp;Site=<?php echo $_G['setting']['bbname'];?>&amp;Menu=yes&amp;from=discuz" target="_blank" title="QQ"><img src="<?php echo IMGDIR;?>/site_qq.jpg" alt="QQ" /></a><span class="pipe">|</span><?php } ?>
        <?php if(is_array($_G['setting']['footernavs'])) foreach($_G['setting']['footernavs'] as $nav) { if($nav['available'] && ($nav['type'] && (!$nav['level'] || ($nav['level'] == 1 && $_G['uid']) || ($nav['level'] == 2 && $_G['adminid'] > 0) || ($nav['level'] == 3 && $_G['adminid'] == 1)) ||
                !$nav['type'] && ($nav['id'] == 'stat' && $_G['group']['allowstatdata'] || $nav['id'] == 'report' && $_G['uid'] || $nav['id'] == 'archiver' || $nav['id'] == 'mobile' || $nav['id'] == 'darkroom'))) { ?><?php echo $nav['code'];?><span class="pipe">|</span><?php } } ?>
                <strong><a href="<?php echo $_G['setting']['siteurl'];?>" target="_blank"><?php echo $_G['setting']['sitename'];?></a></strong>
        <?php if($_G['setting']['icp']) { ?>( <a href="http://www.miitbeian.gov.cn/" target="_blank"><?php echo $_G['setting']['icp'];?></a> )<?php } ?>
        <?php if(!empty($_G['setting']['pluginhooks']['global_footerlink'])) echo $_G['setting']['pluginhooks']['global_footerlink'];?>
        <?php if($_G['setting']['statcode']) { ?><?php echo $_G['setting']['statcode'];?><?php } ?>
        <p>
             GMT<?php echo $_G['timenow']['offset'];?>, <?php echo $_G['timenow']['time'];?>
            <span id="debuginfo">
            <?php if(debuginfo()) { ?>, Processed in <?php echo $_G['debuginfo']['time'];?> second(s), <?php echo $_G['debuginfo']['queries'];?> queries
                <?php if($_G['gzipcompress']) { ?>, Gzip On<?php } if(C::memory()->type) { ?>, <?php echo ucwords(C::memory()->type); ?> On<?php } ?>.
            <?php } ?>
            </span>
        </p>
     </div>
     <div class="cnCopyright">
            <p>Powered by <strong><a href="http://www.discuz.net/" target="_blank">Discuz</a></strong> <em><?php echo $_G['setting']['version'];?></em><?php if(!empty($_G['setting']['boardlicensed'])) { ?> <a href="http://license.comsenz.com/?pid=1&amp;host=<?php echo $_SERVER['HTTP_HOST'];?>" target="_blank">Licensed</a><?php } ?></p>
            <p class="xs0">&copy; 2015-2016</p>
     </div>
</div>
<?php } ?> 

<?php if(!$_G['setting']['bbclosed']) { ?> 
<?php if($_G['uid'] && !isset($_G['cookie']['checkpm'])) { ?> 
<script src="home.php?mod=spacecp&ac=pm&op=checknewpm&rand=<?php echo $_G['timestamp'];?>" type="text/javascript"></script> 
<?php } ?> 

<?php if($_G['uid'] && helper_access::check_module('follow') && !isset($_G['cookie']['checkfollow'])) { ?> 
<script src="home.php?mod=spacecp&ac=follow&op=checkfeed&rand=<?php echo $_G['timestamp'];?>" type="text/javascript"></script> 
<?php } ?> 

<?php if(!isset($_G['cookie']['sendmail'])) { ?> 
<script src="home.php?mod=misc&ac=sendmail&rand=<?php echo $_G['timestamp'];?>" type="text/javascript"></script> 
<?php } ?> 

<?php if($_G['uid'] && $_G['member']['allowadmincp'] == 1 && !isset($_G['cookie']['checkpatch'])) { ?> 
<script src="misc.php?mod=patch&action=checkpatch&rand=<?php echo $_G['timestamp'];?>" type="text/javascript"></script> 
<?php } ?> 

<?php } ?> 

<?php if($_GET['diy'] == 'yes') { ?> 
<?php if(check_diy_perm($topic) && (empty($do) || $do != 'index')) { ?> 
<script src="<?php echo $_G['setting']['jspath'];?>common_diy.js?<?php echo VERHASH;?>" type="text/javascript"></script> 
<script src="<?php echo $_G['setting']['jspath'];?>portal_diy<?php if(!check_diy_perm($topic, 'layout')) { ?>_data<?php } ?>.js?<?php echo VERHASH;?>" type="text/javascript"></script> 
<?php } ?> 
<?php if($space['self'] && CURMODULE == 'space' && $do == 'index') { ?> 
<script src="<?php echo $_G['setting']['jspath'];?>common_diy.js?<?php echo VERHASH;?>" type="text/javascript"></script> 
<script src="<?php echo $_G['setting']['jspath'];?>space_diy.js?<?php echo VERHASH;?>" type="text/javascript"></script> 
<?php } ?> 
<?php } ?> 
<?php if($_G['uid'] && $_G['member']['allowadmincp'] == 1 && $_G['setting']['showpatchnotice'] == 1) { ?> 
<script type="text/javascript">patchNotice();</script> 
<?php } ?> 
<?php if($_G['uid'] && $_G['member']['allowadmincp'] == 1 && empty($_G['cookie']['pluginnotice'])) { ?>
<div class="focus plugin" id="plugin_notice"></div>
<script type="text/javascript">pluginNotice();</script> 
<?php } ?> 
<?php if($_G['uid'] && !empty($_G['cookie']['lip'])) { ?>
<div class="focus plugin" id="ip_notice"></div>
<script type="text/javascript">ipNotice();</script> 
<?php } ?> 
<?php if($_G['member']['newprompt'] && (empty($_G['cookie']['promptstate_'.$_G['uid']]) || $_G['cookie']['promptstate_'.$_G['uid']] != $_G['member']['newprompt']) && $_GET['do'] != 'notice') { ?> 
<script type="text/javascript">noticeTitle();</script> 
<?php } ?> 

<?php if(($_G['member']['newpm'] || $_G['member']['newprompt']) && empty($_G['cookie']['ignore_notice'])) { ?> 
<script src="<?php echo $_G['setting']['jspath'];?>html5notification.js?<?php echo VERHASH;?>" type="text/javascript"></script> 
<script type="text/javascript">
  var h5n = new Html5notification();
  if(h5n.issupport()) {
    <?php if($_G['member']['newpm'] && $_GET['do'] != 'pm') { ?>
    h5n.shownotification('pm', '<?php echo $_G['siteurl'];?>home.php?mod=space&do=pm', '<?php echo avatar($_G[uid],small,true);?>', '新的短消息', '有新的短消息，快去看看吧');
    <?php } ?>
    <?php if($_G['member']['newprompt'] && $_GET['do'] != 'notice') { ?>
        <?php if(is_array($_G['member']['category_num'])) foreach($_G['member']['category_num'] as $key => $val) { ?>          <?php $noticetitle = lang('template', 'notice_'.$key);?>          h5n.shownotification('notice_<?php echo $key;?>', '<?php echo $_G['siteurl'];?>home.php?mod=space&do=notice&view=<?php echo $key;?>', '<?php echo avatar($_G[uid],small,true);?>', '<?php echo $noticetitle;?> (<?php echo $val;?>)', '有新的提醒，快去看看吧');
        <?php } ?>
    <?php } ?>
  }
  </script> 
<?php } ?> <?php userappprompt();?> 
<?php if($_G['basescript'] != 'userapp') { ?>
<div id="scrolltop"> 
  <?php if($_G['fid'] && $_G['mod'] == 'viewthread') { ?> 
  <span><a href="forum.php?mod=post&amp;action=reply&amp;fid=<?php echo $_G['fid'];?>&amp;tid=<?php echo $_G['tid'];?>&amp;extra=<?php echo $_GET['extra'];?>&amp;page=<?php echo $page;?><?php if($_GET['from']) { ?>&amp;from=<?php echo $_GET['from'];?><?php } ?>" onclick="showWindow('reply', this.href)" class="replyfast" title="快速回复"><b>快速回复</b></a></span> 
  <?php } ?> 
  <span hidefocus="true"><a title="返回顶部" onclick="window.scrollTo('0','0')" class="scrolltopa" ><b>返回顶部</b></a></span> 
  <?php if($_G['fid']) { ?> 
  <span> 
  <?php if($_G['mod'] == 'viewthread') { ?> 
  <a href="forum.php?mod=forumdisplay&amp;fid=<?php echo $_G['fid'];?>" hidefocus="true" class="returnlist" title="返回列表"><b>返回列表</b></a> 
  <?php } else { ?> 
  <a href="forum.php" hidefocus="true" class="returnboard" title="返回版块"><b>返回版块</b></a> 
  <?php } ?> 
  </span> 
  <?php } ?> 
</div>
<script type="text/javascript">_attachEvent(window, 'scroll', function () { showTopLink(); });checkBlind();</script> 
<?php } ?> 
<?php if(isset($_G['makehtml'])) { ?> 
<script src="<?php echo $_G['setting']['jspath'];?>html2dynamic.js?<?php echo VERHASH;?>" type="text/javascript"></script> 
<script type="text/javascript">
    var html_lostmodify = <?php echo TIMESTAMP;?>;
    htmlGetUserStatus();
    <?php if(isset($_G['htmlcheckupdate'])) { ?>
    htmlCheckUpdate();
    <?php } ?>
  </script> 
<?php } ?> <?php output();?></body></html> 