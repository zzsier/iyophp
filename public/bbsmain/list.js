if(undefined==adsLoad){var adsFunc=[];var adsLoad=(function(){function a(){}a.prototype={"save":function(b){adsFunc.push(b)},"run":function(){var f=adsFunc.length;var d=[];for(var b=0;b<f;b++){try{if(typeof adsFunc[b]=="function"){adsFunc[b]()}}catch(c){d.push(c)}}adsFunc=[]}};return function(b,c){var d=new a();if("save"==b){if("function"==typeof c){d.save(c)}}else{if("run"==b){d.run()}}return d}})();var adsLoadReady=function(a){var e=!!(window.attachEvent&&!window.opera);var d=/webkit\/(\d+)/i.test(navigator.userAgent)&&(RegExp.$1<525);var b=false;function c(){if(b){return}b=true;a()}if(e){if(self==top){(function(){if(b){return}try{document.documentElement.doScroll("left")}catch(f){setTimeout(arguments.callee,0);return}c()})()}window.attachEvent("onload",c)}else{if(d){(function(){if(b){return}if(/loaded|complete/.test(document.readyState)){c()}else{setTimeout(arguments.callee,0)}})();window.addEventListener("load",c,false)}else{document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);c()},false);window.addEventListener("load",c,false)}}};adsLoadReady(function(){adsLoad("run")});function write_ad(ad,num){var is_spider=!!navigator.userAgent.match(/ToutiaoSpider/i);if(true===is_spider){return false}if(num==undefined){num=0}try{eval(ad+"("+num+");")}catch(e){}}var ad_is_ios=!!navigator.userAgent.match(/iPhone|iPad|iPod/i);function ad_check_exsit(func_name){try{if(undefined!=eval(func_name)){return true}return false}catch(e){return false}}};
if(undefined==ad_location){function ad_get_cookie(b){var a=document.cookie;var g=a.split("; ");var f=g.length;var e="";var d=null;for(var c=0;c<f;c++){d=g[c].split("=");if(b==d[0]){e=d[1];break}}return e}function ad_set_cookie(c,e){var b=ad_set_cookie.arguments;var g=ad_set_cookie.arguments.length;var d=(g>2)?b[2]:null;var f=(g>3)?b[3]:null;var a=(g>4)?b[4]:null;var h=(g>5)?b[5]:false;document.cookie=c+"="+escape(e)+((d==null)?"":("; expires="+d.toGMTString()))+((f==null)?"":("; path="+f))+((a==null)?"":("; domain="+a))+((h==true)?"; secure":"")}var ad_location="";var ad_location_arr=new Array();var ad_sheng_str=ad_shi_str="";ad_location=ad_get_cookie("z_pro_city");if(""===ad_location){document.write("<script src=http://stat.zol.com.cn/adrs/iparea.php?r="+Math.random()+"></sc"+"ript>")}else{ad_location_arr=unescape(ad_location).split("&");ad_sheng_str=ad_location_arr[0].replace("s_provice=","");ad_shi_str=ad_location_arr[1].replace("s_city=","")}};
if(undefined==ad_file_arr){var ad_file_arr=new Array();function write_group_ad(c,a,b){if(!a){return}if(undefined==b){b=0}if(c){var j=document.getElementById(c)}else{var j=null}var d=a.split("#");var f=d.length;var e=first_char=0;var g=0;for(e=0;e<f;e++){file_name=d[e].replace(".inc","");first_char=file_name.charAt(0);if(first_char>-1&&first_char<10){file_name=file_name.substr(1)}if(-1!==file_name.indexOf("{SHENG}")){file_name=file_name.replace("{SHENG}",ad_sheng_str);if(-1!==file_name.indexOf("{SHI}")){file_name=file_name.replace("{SHI}",ad_shi_str)}}if(ad_check_exsit(file_name)){if(1==f){write_ad(file_name)}else{ad_file_arr[ad_file_arr.length]=file_name}g=1;if(9==first_char){break}}}if(0<b){var h=document.getElementById(c+"_"+b);if(1==g&&j){j.style.display=""}if(h){if(1==g){h.style.display=""}else{h.style.display="none"}}}else{if(j){if(1==g){j.style.display=""}else{j.style.display="none"}}}}function ad_w(b){if(undefined==b){b=""}var a=ad_file_arr.shift();if(undefined!=a){if(b){document.write("<"+b+">")}write_ad(a);if(b){document.write("</"+b+">")}}}};
if(typeof deconcept=="undefined"){var deconcept=new Object()}if(typeof deconcept.util=="undefined"){deconcept.util=new Object()}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object()}deconcept.SWFObject=function(n,b,m,e,j,k,g,f,d,l){if(!document.getElementById){return}this.DETECT_KEY=l?l:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(n){this.setAttribute("swf",n)}if(b){this.setAttribute("id",b)}if(m){this.setAttribute("width",m)}if(e){this.setAttribute("height",e)}if(j){this.setAttribute("version",new deconcept.PlayerVersion(j.toString().split(".")))}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true}if(k){this.addParam("bgcolor",k)}var a=g?g:"high";this.addParam("quality",a);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var i=(f)?f:window.location;this.setAttribute("xiRedirectUrl",i);this.setAttribute("redirectUrl","");if(d){this.setAttribute("redirectUrl",d)}};deconcept.SWFObject.prototype={useExpressInstall:function(a){this.xiSWFPath=!a?"expressinstall.swf":a;this.setAttribute("useExpressInstall",true)},setAttribute:function(a,b){this.attributes[a]=b},getAttribute:function(a){return this.attributes[a]},addParam:function(b,a){this.params[b]=a},getParams:function(){return this.params},addVariable:function(b,a){this.variables[b]=a},getVariable:function(a){return this.variables[a]},getVariables:function(){return this.variables},getVariablePairs:function(){var c=new Array();var b;var a=this.getVariables();for(b in a){c[c.length]=b+"="+a[b]}return c},getSWFHTML:function(){var b="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath)}b='<embed type="application/x-shockwave-flash" src="'+this.getAttribute("swf")+'" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'" style="'+this.getAttribute("style")+'"';b+=' id="'+this.getAttribute("id")+'" name="'+this.getAttribute("id")+'" ';var f=this.getParams();for(var e in f){b+=[e]+'="'+f[e]+'" '}var d=this.getVariablePairs().join("&");if(d.length>0){b+='flashvars="'+d+'"'}b+="/>"}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath)}b='<object id="'+this.getAttribute("id")+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'" style="'+this.getAttribute("style")+'">';b+='<param name="movie" value="'+this.getAttribute("swf")+'" />';var c=this.getParams();for(var e in c){b+='<param name="'+e+'" value="'+c[e]+'" />'}var a=this.getVariablePairs().join("&");if(a.length>0){b+='<param name="flashvars" value="'+a+'" />'}b+="</object>"}return b},write:function(b){if(this.getAttribute("useExpressInstall")){var a=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(a)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title)}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var c=(typeof b=="string")?document.getElementById(b):b;c.innerHTML=this.getSWFHTML();return true}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"))}}return false}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var f=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var a=navigator.plugins["Shockwave Flash"];if(a&&a.description){f=new deconcept.PlayerVersion(a.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."))}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var b=1;var c=3;while(b){try{c++;b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+c);f=new deconcept.PlayerVersion([c,0,0])}catch(d){b=null}}}else{try{var b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(d){try{var b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");f=new deconcept.PlayerVersion([6,0,21]);b.AllowScriptAccess="always"}catch(d){if(f.major==6){return f}}try{b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(d){}}if(b!=null){f=new deconcept.PlayerVersion(b.GetVariable("$version").split(" ")[1].split(","))}}}return f};deconcept.PlayerVersion=function(a){this.major=a[0]!=null?parseInt(a[0]):0;this.minor=a[1]!=null?parseInt(a[1]):0;this.rev=a[2]!=null?parseInt(a[2]):0};deconcept.PlayerVersion.prototype.versionIsValid=function(a){if(this.major<a.major){return false}if(this.major>a.major){return true}if(this.minor<a.minor){return false}if(this.minor>a.minor){return true}if(this.rev<a.rev){return false}return true};deconcept.util={getRequestParameter:function(c){var d=document.location.search||document.location.hash;if(c==null){return d}if(d){var b=d.substring(1).split("&");for(var a=0;a<b.length;a++){if(b[a].substring(0,b[a].indexOf("="))==c){return b[a].substring((b[a].indexOf("=")+1))}}}return""}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var b=document.getElementsByTagName("OBJECT");for(var c=b.length-1;c>=0;c--){b[c].style.display="none";for(var a in b[c]){if(typeof b[c][a]=="function"){b[c][a]=function(){}}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs)};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true}}if(!document.getElementById&&document.all){document.getElementById=function(a){return document.all[a]}}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;
function detail_top() {document.writeln("<div id=\"AD_1_104437\" gmine=\"104437\"  class=\"wrap__AD gmine_ad\" style=\"width:1000px;height:60px;text-align:center;float:none;margin-top:0px;\"><a href=\"http:\/\/click.hm.baidu.com\/clk?2c784fea49ef1881c323af499f84cb59\" target=\"_blank\"><img src=\"http:\/\/pic.zol-img.com.cn\/201507\/com81521bbs1000_0714.jpg\" width=\"1000px\" height=\"60px\" alt=\"\" border=\"0\" \/><\/a><\/div>");}
function list_bottom() {document.writeln("<script type=\'text\/javascript\'>");document.writeln("var googletag = googletag || {};");document.writeln("googletag.cmd = googletag.cmd || [];");document.writeln("(function() {");document.writeln("var gads = document.createElement(\'script\');");document.writeln("gads.async = true;");document.writeln("gads.type = \'text\/javascript\';");document.writeln("var useSSL = \'https:\' == document.location.protocol;");document.writeln("gads.src = (useSSL ? \'https:\' : \'http:\') + ");document.writeln("\'\/\/www.googletagservices.com\/tag\/js\/gpt.js\';");document.writeln("var node = document.getElementsByTagName(\'script\')[0];");document.writeln("node.parentNode.insertBefore(gads, node);");document.writeln("})();");document.writeln("<\/script>");document.writeln("");document.writeln("<div id=\'div-gpt-ad-1428029309567-0\'>");document.writeln("<script type=\'text\/javascript\'>");document.writeln("googletag.cmd.push(function() {");document.writeln("googletag.defineSlot(\'\/8456\/IDG.CN_B2C_zol.com.cn\', [728, 90], \'div-gpt-ad-1428029309567-0\')");document.writeln(".addService(googletag.pubads())");document.writeln(".setTargeting(\"category\",\"bbs\");");document.writeln("googletag.pubads().collapseEmptyDivs();\/\/");document.writeln("googletag.enableServices();");document.writeln("googletag.display(\'div-gpt-ad-1428029309567-0\');");document.writeln("});");document.writeln("<\/script>");document.writeln("<\/div><script type=\"text\/javascript\">");document.writeln("    \/*所有列表页值得看一看下通栏*\/");document.writeln("    var cpro_id = \"u1792961\";");document.writeln("<\/script>");document.writeln("<script src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/c.js\" type=\"text\/javascript\"><\/script>");}
function bbs_reply_right_button() {document.writeln("<script async src=\"\/\/pagead2.googlesyndication.com\/pagead\/js\/adsbygoogle.js\"><\/script>");document.writeln("<!-- 论坛帖子页快速回帖右侧 -->");document.writeln("<ins class=\"adsbygoogle\"");document.writeln("     style=\"display:inline-block;width:200px;height:200px\"");document.writeln("     data-ad-client=\"ca-pub-2770955497366251\"");document.writeln("     data-ad-slot=\"3510969925\"><\/ins>");document.writeln("<script>");document.writeln("(adsbygoogle = window.adsbygoogle || []).push({});");document.writeln("<\/script>");}
function topic_right_level4_ad_all() {document.writeln("<!-- 1880：自动组合 -->");document.writeln("<script type=\"text\/javascript\">\/\/<![CDATA[");document.writeln("ac_as_id = 1880;");document.writeln("ac_format = 0;");document.writeln("ac_mode = 1;");document.writeln("ac_group_id = 1;");document.writeln("ac_server_base_url = \"afp.zol-img.com.cn\/\";");document.writeln("\/\/]]><\/script>");document.writeln("<script type=\"text\/javascript\" src=\"http:\/\/pic.zol-img.com.cn\/dsp\/k.js\"><\/script>");}
function detail_next_to_reply_others() {document.writeln("<script async src=\"\/\/pagead2.googlesyndication.com\/pagead\/js\/adsbygoogle.js\"><\/script>");document.writeln("<!-- 论坛帖子页大家都在看上 -->");document.writeln("<ins class=\"adsbygoogle\"");document.writeln("     style=\"display:inline-block;width:970px;height:90px\"");document.writeln("     data-ad-client=\"ca-pub-2770955497366251\"");document.writeln("     data-ad-slot=\"4230602728\"><\/ins>");document.writeln("<script>");document.writeln("(adsbygoogle = window.adsbygoogle || []).push({});");document.writeln("<\/script>");}
function detail_bottom() {document.writeln("<!-- 71945：zol_bbs_new -->");document.writeln("<script type=\"text\/javascript\">\/\/<![CDATA[");document.writeln("ac_as_id = 71945;");document.writeln("ac_format = 0;");document.writeln("ac_mode = 1;");document.writeln("ac_group_id = 1;");document.writeln("ac_server_base_url = \"afp.csbew.com\/\";");document.writeln("\/\/]]><\/script>");document.writeln("<script type=\"text\/javascript\" src=\"http:\/\/static.csbew.com\/k.js\"><\/script><script  language=\"javascript\">var a =+ new Date;document.write(\'<img src=\"http:\/\/ca.cbsi.com.cn\/rpv?s=zol&on=zol&id=64462&tmp=\'+a+\'\" width=0 height=0 border=0 style=\"display:none\">\');<\/script><div id=\"AD_1_66902\" gmine=\"66902\"  class=\"wrap__AD gmine_ad\" style=\"width:1000px;height:90px;text-align:center;float:none;margin-top:8px;\"><iframe src=\"http:\/\/pic.zol-img.com.cn\/201203\/iframe_auto_66902.html\" width=\"1000px\" height=\"90px\" marginheight=\"0\"  marginwidth=\"0\"  frameborder=\"0\"  scrolling=\"no\"><\/iframe><\/div><script type=\"text\/javascript\" src=\"http:\/\/rs.zol.com.cn\/precise?apid=5\"><\/script>");}
function gallery_popup() {document.writeln("<script language=\"javascript\">");document.writeln("  var cpro_id = \"u1341056\";");document.writeln("   (window[\"cproStyleApi\"]=window[\"cproStyleApi\"]||{})[cpro_id]={");document.writeln("        tn:\"baiduCustSTagLinkUnitImage\"}");document.writeln("<\/script>");document.writeln("<script src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/c.js\" type=\"text\/javascript\"><\/script>");document.writeln("");}
function allbbs_topic_bottom_link() {document.writeln("<script type=\"text\/javascript\">");document.writeln("\/*论坛帖子页楼主主题底部468*40*\/");document.writeln("var cpro_id = \"u1238423\";");document.writeln("<\/script>");document.writeln("<script src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/c.js\" type=\"text\/javascript\"><\/script>");}
function gallery_bottom() {document.writeln("<script type=\"text\/javascript\">");document.writeln("\/*论坛组图页相关图集推荐后960*90*\/");document.writeln("var cpro_id = \"u1468274\";");document.writeln("<\/script>");document.writeln("<script src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/c.js\" type=\"text\/javascript\"><\/script>");}
function detail_bottom() {document.writeln("<div id=\"AD_1_66902\" gmine=\"66902\"  class=\"wrap__AD gmine_ad\" style=\"width:1000px;height:90px;text-align:center;float:none;margin-top:8px;\"><iframe src=\"http:\/\/pic.zol-img.com.cn\/201203\/iframe_auto_66902.html\" width=\"1000px\" height=\"90px\" marginheight=\"0\"  marginwidth=\"0\"  frameborder=\"0\"  scrolling=\"no\"><\/iframe><\/div><script type=\"text\/javascript\" src=\"http:\/\/rs.zol.com.cn\/precise?apid=5\"><\/script>");}
function detail_bottom() {document.writeln("<div id=\"AD_1_66902\" gmine=\"66902\"  class=\"wrap__AD gmine_ad\" style=\"width:1000px;height:90px;text-align:center;float:none;margin-top:8px;\"><iframe src=\"http:\/\/pic.zol-img.com.cn\/201203\/iframe_auto_66902.html\" width=\"1000px\" height=\"90px\" marginheight=\"0\"  marginwidth=\"0\"  frameborder=\"0\"  scrolling=\"no\"><\/iframe><\/div><script type=\"text\/javascript\" src=\"http:\/\/rs.zol.com.cn\/precise?apid=5\"><\/script>");}
function detail_bottom() {document.writeln("<div id=\"AD_1_66902\" gmine=\"66902\"  class=\"wrap__AD gmine_ad\" style=\"width:1000px;height:90px;text-align:center;float:none;margin-top:8px;\"><iframe src=\"http:\/\/pic.zol-img.com.cn\/201203\/iframe_auto_66902.html\" width=\"1000px\" height=\"90px\" marginheight=\"0\"  marginwidth=\"0\"  frameborder=\"0\"  scrolling=\"no\"><\/iframe><\/div><script type=\"text\/javascript\" src=\"http:\/\/rs.zol.com.cn\/precise?apid=5\"><\/script>");}
function detail_next_to_reply_others() {document.writeln("<script type=\"text\/javascript\">");document.writeln("var cpro_id=\"u2211224\";");document.writeln("(window[\"cproStyleApi\"] = window[\"cproStyleApi\"] || {})[cpro_id]={at:\"3\",rsi0:\"1000\",rsi1:\"90\",pat:\"6\",tn:\"baiduCustNativeAD\",rss1:\"#FFFFFF\",conBW:\"1\",adp:\"1\",ptt:\"0\",titFF:\"%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91\",titFS:\"14\",rss2:\"#000000\",titSU:\"0\",ptbg:\"90\",piw:\"0\",pih:\"0\",ptp:\"0\"}");document.writeln("<\/script>");document.writeln("<script src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/c.js\" type=\"text\/javascript\"><\/script>");}
function detail_next_to_reply_others() {document.writeln("<script type=\"text\/javascript\">");document.writeln("var cpro_id=\"u2211224\";");document.writeln("(window[\"cproStyleApi\"] = window[\"cproStyleApi\"] || {})[cpro_id]={at:\"3\",rsi0:\"1000\",rsi1:\"90\",pat:\"6\",tn:\"baiduCustNativeAD\",rss1:\"#FFFFFF\",conBW:\"1\",adp:\"1\",ptt:\"0\",titFF:\"%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91\",titFS:\"14\",rss2:\"#000000\",titSU:\"0\",ptbg:\"90\",piw:\"0\",pih:\"0\",ptp:\"0\"}");document.writeln("<\/script>");document.writeln("<script src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/c.js\" type=\"text\/javascript\"><\/script>");}
function detail_bottom() {document.writeln("<!-- 71945：zol_bbs_new -->");document.writeln("<script type=\"text\/javascript\">\/\/<![CDATA[");document.writeln("ac_as_id = 71945;");document.writeln("ac_format = 0;");document.writeln("ac_mode = 1;");document.writeln("ac_group_id = 1;");document.writeln("ac_server_base_url = \"afp.csbew.com\/\";");document.writeln("\/\/]]><\/script>");document.writeln("<script type=\"text\/javascript\" src=\"http:\/\/static.csbew.com\/k.js\"><\/script><script  language=\"javascript\">var a =+ new Date;document.write(\'<img src=\"http:\/\/ca.cbsi.com.cn\/rpv?s=zol&on=zol&id=64462&tmp=\'+a+\'\" width=0 height=0 border=0 style=\"display:none\">\');<\/script><div id=\"AD_1_66902\" gmine=\"66902\"  class=\"wrap__AD gmine_ad\" style=\"width:1000px;height:90px;text-align:center;float:none;margin-top:8px;\"><iframe src=\"http:\/\/pic.zol-img.com.cn\/201203\/iframe_auto_66902.html\" width=\"1000px\" height=\"90px\" marginheight=\"0\"  marginwidth=\"0\"  frameborder=\"0\"  scrolling=\"no\"><\/iframe><\/div><script type=\"text\/javascript\" src=\"http:\/\/rs.zol.com.cn\/precise?apid=5\"><\/script>");}
function detail_bottom() {document.writeln("<!-- 71945：zol_bbs_new -->");document.writeln("<script type=\"text\/javascript\">\/\/<![CDATA[");document.writeln("ac_as_id = 71945;");document.writeln("ac_format = 0;");document.writeln("ac_mode = 1;");document.writeln("ac_group_id = 1;");document.writeln("ac_server_base_url = \"afp.csbew.com\/\";");document.writeln("\/\/]]><\/script>");document.writeln("<script type=\"text\/javascript\" src=\"http:\/\/static.csbew.com\/k.js\"><\/script><script  language=\"javascript\">var a =+ new Date;document.write(\'<img src=\"http:\/\/ca.cbsi.com.cn\/rpv?s=zol&on=zol&id=64462&tmp=\'+a+\'\" width=0 height=0 border=0 style=\"display:none\">\');<\/script><div id=\"AD_1_66902\" gmine=\"66902\"  class=\"wrap__AD gmine_ad\" style=\"width:1000px;height:90px;text-align:center;float:none;margin-top:8px;\"><iframe src=\"http:\/\/pic.zol-img.com.cn\/201203\/iframe_auto_66902.html\" width=\"1000px\" height=\"90px\" marginheight=\"0\"  marginwidth=\"0\"  frameborder=\"0\"  scrolling=\"no\"><\/iframe><\/div><script type=\"text\/javascript\" src=\"http:\/\/rs.zol.com.cn\/precise?apid=5\"><\/script>");}
function detail_top() {document.writeln("<script type=\"text\/javascript\">");document.writeln("var cpro_id=\"u2191286\";");document.writeln("(window[\"cproStyleApi\"] = window[\"cproStyleApi\"] || {})[cpro_id]={at:\"3\",rsi0:\"1000\",rsi1:\"90\",pat:\"6\",tn:\"baiduCustNativeAD\",rss1:\"#FFFFFF\",conBW:\"1\",adp:\"1\",ptt:\"0\",titFF:\"%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91\",titFS:\"14\",rss2:\"#000000\",titSU:\"0\",ptbg:\"90\",piw:\"0\",pih:\"0\",ptp:\"0\"}");document.writeln("<\/script>");document.writeln("<script src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/c.js\" type=\"text\/javascript\"><\/script>");}
function detail_top() {document.writeln("<script type=\"text\/javascript\">");document.writeln("var cpro_id=\"u2191286\";");document.writeln("(window[\"cproStyleApi\"] = window[\"cproStyleApi\"] || {})[cpro_id]={at:\"3\",rsi0:\"1000\",rsi1:\"90\",pat:\"6\",tn:\"baiduCustNativeAD\",rss1:\"#FFFFFF\",conBW:\"1\",adp:\"1\",ptt:\"0\",titFF:\"%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91\",titFS:\"14\",rss2:\"#000000\",titSU:\"0\",ptbg:\"90\",piw:\"0\",pih:\"0\",ptp:\"0\"}");document.writeln("<\/script>");document.writeln("<script src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/c.js\" type=\"text\/javascript\"><\/script>");}
function detail_bottom() {document.writeln("<div id=\"AD_1_66902\" gmine=\"66902\"  class=\"wrap__AD gmine_ad\" style=\"width:1000px;height:90px;text-align:center;float:none;margin-top:8px;\"><iframe src=\"http:\/\/pic.zol-img.com.cn\/201203\/iframe_auto_66902.html\" width=\"1000px\" height=\"90px\" marginheight=\"0\"  marginwidth=\"0\"  frameborder=\"0\"  scrolling=\"no\"><\/iframe><\/div><script type=\"text\/javascript\" src=\"http:\/\/rs.zol.com.cn\/precise?apid=5\"><\/script>");}
function detail_bottom() {document.writeln("<div id=\"AD_1_66902\" gmine=\"66902\"  class=\"wrap__AD gmine_ad\" style=\"width:1000px;height:90px;text-align:center;float:none;margin-top:8px;\"><iframe src=\"http:\/\/pic.zol-img.com.cn\/201203\/iframe_auto_66902.html\" width=\"1000px\" height=\"90px\" marginheight=\"0\"  marginwidth=\"0\"  frameborder=\"0\"  scrolling=\"no\"><\/iframe><\/div><script type=\"text\/javascript\" src=\"http:\/\/rs.zol.com.cn\/precise?apid=5\"><\/script>");}
function detail_bottom() {document.writeln("<!-- 71945：zol_bbs_new -->");document.writeln("<script type=\"text\/javascript\">\/\/<![CDATA[");document.writeln("ac_as_id = 71945;");document.writeln("ac_format = 0;");document.writeln("ac_mode = 1;");document.writeln("ac_group_id = 1;");document.writeln("ac_server_base_url = \"afp.csbew.com\/\";");document.writeln("\/\/]]><\/script>");document.writeln("<script type=\"text\/javascript\" src=\"http:\/\/static.csbew.com\/k.js\"><\/script><script  language=\"javascript\">var a =+ new Date;document.write(\'<img src=\"http:\/\/ca.cbsi.com.cn\/rpv?s=zol&on=zol&id=64462&tmp=\'+a+\'\" width=0 height=0 border=0 style=\"display:none\">\');<\/script><div id=\"AD_1_66902\" gmine=\"66902\"  class=\"wrap__AD gmine_ad\" style=\"width:1000px;height:90px;text-align:center;float:none;margin-top:8px;\"><iframe src=\"http:\/\/pic.zol-img.com.cn\/201203\/iframe_auto_66902.html\" width=\"1000px\" height=\"90px\" marginheight=\"0\"  marginwidth=\"0\"  frameborder=\"0\"  scrolling=\"no\"><\/iframe><\/div><script type=\"text\/javascript\" src=\"http:\/\/rs.zol.com.cn\/precise?apid=5\"><\/script>");}
function detail_bottom() {document.writeln("<!-- 71945：zol_bbs_new -->");document.writeln("<script type=\"text\/javascript\">\/\/<![CDATA[");document.writeln("ac_as_id = 71945;");document.writeln("ac_format = 0;");document.writeln("ac_mode = 1;");document.writeln("ac_group_id = 1;");document.writeln("ac_server_base_url = \"afp.csbew.com\/\";");document.writeln("\/\/]]><\/script>");document.writeln("<script type=\"text\/javascript\" src=\"http:\/\/static.csbew.com\/k.js\"><\/script><script  language=\"javascript\">var a =+ new Date;document.write(\'<img src=\"http:\/\/ca.cbsi.com.cn\/rpv?s=zol&on=zol&id=64462&tmp=\'+a+\'\" width=0 height=0 border=0 style=\"display:none\">\');<\/script><div id=\"AD_1_66902\" gmine=\"66902\"  class=\"wrap__AD gmine_ad\" style=\"width:1000px;height:90px;text-align:center;float:none;margin-top:8px;\"><iframe src=\"http:\/\/pic.zol-img.com.cn\/201203\/iframe_auto_66902.html\" width=\"1000px\" height=\"90px\" marginheight=\"0\"  marginwidth=\"0\"  frameborder=\"0\"  scrolling=\"no\"><\/iframe><\/div><script type=\"text\/javascript\" src=\"http:\/\/rs.zol.com.cn\/precise?apid=5\"><\/script>");}
