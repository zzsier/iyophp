(function(){var e,d;(function(){typeof _mxB!="undefined"?d=window._mxB:(d=window._mxB=function(a){return new d.prototype.init(a)},typeof mx_info_ware=="undefined"&&(mx_info_ware={}),e=mx_info_ware,d.extend=function(a,c,b){b&&d.extend(a,b);for(var h in c)c.hasOwnProperty(h)&&(a[h]=c[h]);return a},d.extend(d,{ready:function(){d.isReady=1},idle:[1,1],getProtocol:function(){return"http://"},joinParameters:function(a,c){var b=[];if(c==",")for(var d in a)a.hasOwnProperty(d)&&Array.prototype.push.call(b,
a[d]);else if(c=="&")for(var f in a)a.hasOwnProperty(f)&&Array.prototype.push.call(b,f+"="+a[f]);return b.join(c)},createCacheBuster:function(){return Math.ceil(Math.random()*1E10)},getCookieEnabled:function(){return navigator.cookieEnabled?1:0},getFlashVersion:function(){var a="0,0,0,0";try{navigator.plugins&&navigator.plugins["Shockwave Flash"]?a=navigator.plugins["Shockwave Flash"].description:window.ActiveXObject&&new ActiveXObject("ShockwaveFlash.ShockwaveFlash")&&(a=(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version"))}catch(c){}a=
a.match(/\d+/g);return a[0]},getPreviousUrl:function(){var a="";try{a=top.document.referrer}catch(c){try{a=document.referrer}catch(b){}}return encodeURIComponent(a)},getCharset:function(){var a="utf-8";return a=window.ActiveXObject?document.charset:document.characterSet},load:function(a,c,b,h){var f,e=/loaded|complete/i,g="mx_bjs_$"+d.createCacheBuster();c?(f=document.createElement("script"),f.type="text/javascript",f.async=1,f.id=g,f.src=a,document.getElementsByTagName("head")[0].appendChild(f)):
(window.ActiveXObject&&(e=/complete/i),document.write('<script type="text/javascript" src="'+a+'" id="'+g+'"><\/script>'));if(f=d.$(g))f.onload=f.onreadystatechange=function(){if(!f.readyState||f.readyState.match(e))if(typeof b=="function"&&(b(),b=null),f&&f.parentNode)f.onload=f.onreadystatechange=null,f.parentNode.removeChild(f),f=null};h&&setTimeout(function(){if(f)typeof b=="function"&&(b(),b=null),f.src="javascript:void(0)"},h)},send:function(a,c){var b,d,f=function(a,b){var c;b?(c=document.createElement("script"),
c.type="text/javascript",c.async=!0):(c=document.createElement("img"),c.style.display="none");a.indexOf("cb=")==-1&&(a+=a.indexOf("?")>0?"&cb="+Math.ceil(Math.random()*1E9):"?cb="+Math.ceil(Math.random()*1E9));document.body.insertBefore(c,document.body.firstChild);c.src=a};if(a){b=a.split("|||");for(var e=0;e<b.length;e++)(d=b[e])&&f(d,c)}},$:function(a){return typeof a=="string"?document.getElementById(a):a},cookie:function(a,c,b){if(typeof c!=="undefined"){if(c===null){var d=new Date;d.setTime(d.getTime()-
1);c="";b=b||{};b.expires=d}a=a+"="+c;b&&(b.expires&&(a+=";expires="+b.expires.toUTCString()),b.path&&(a+=";path="+b.path),b.domain&&(a+=";domain="+b.domain),b.secure&&(a+=";secure"));document.cookie=a}else return RegExp(";?"+a+"=([^;]*);?").test(document.cookie)?decodeURIComponent(RegExp.$1):null},element:function(a,c,b,e){a=document.createElement(a);if(c)for(var f in c)a.setAttribute(f,c[f]);b&&d.css(a,b);if(e)a.innerHTML=e;return a},css:function(a,c){var b=d.$(a);if(typeof c=="string"){if(b.currentStyle)return b.currentStyle[c];
if(window.getComputedStyle)return document.defaultView.getComputedStyle(b,null)[c]}else if(typeof c=="object")for(var e in c)b.style[e]=c[e]},getClient:function(a){a=a.charAt(0).toUpperCase()+a.substr(1).toLowerCase();return document.compatMode=="BackCompat"?document.body["client"+a]:document.documentElement["client"+a]},getScroll:function(a){a=a.charAt(0).toUpperCase()+a.substr(1).toLowerCase();return document.documentElement["scroll"+a]||document.body["scroll"+a]},getPosition:function(a){var a=
d.$(a),c={left:0,top:0};if(a.getBoundingClientRect)c.left=Math.round(a.getBoundingClientRect().left+d.getScroll("left")-(document.documentElement.clientLeft||document.body.clientLeft||0)),c.top=Math.round(a.getBoundingClientRect().top+d.getScroll("top")-(document.documentElement.clientTop||document.body.clientTop||0));return c},getScreenIndex:function(a,c,b){var e=0,f=d.getClient("height"),j=0,g=d.$("mx_bjs_"+a),i=null;if(c&&d.$(c))j=d.getPosition(c).top;else if(b)j=b[0];else if(g)i=d.element("div",
{id:"vs_anch_"+a},{border:"none",background:"none",margin:0,padding:0,fontSize:0,height:"1px",width:"1px",position:"absolute"}),g.parentNode.insertBefore(i,g),j=d.getPosition(i).top,i.parentNode.removeChild(i);f&&(e=Math.ceil(j/f));return e},info:function(a,c,b){typeof e=="undefined"&&(e={});e[a]||(e[a]={});typeof b!="undefined"&&(b===null?delete e[a][c]:e[a][c]=b);return e[a][c]},rImp:function(a,c){var b=e[a];c?(b&&b.dAd?(b.dAd(),d.setImpFlag(a,0)):d.setImpFlag(a,1),b&&b.sdct&&d.send(b.sdct)):(b&&
b.ssct&&d.send(b.ssct),d.setImpFlag(a,0))},setImpFlag:function(a,c){c?(window["_ACS86_ENABLE_"+a+"_"]=!1,window._ADCHINA_CONTROL_=!0,typeof rem_inv=="function"&&rem_inv()):(window["_ACS86_ENABLE_"+a+"_"]=!0,window._ADCHINA_CONTROL_=!1,typeof com_show=="function"&&com_show())},sendcmp:function(a){var c=document.createElement("iframe"),b=document.body.firstChild;c.style.display="none";c.src="http://static.mlt01.com/cmpcf.htm?cn="+a;b.parentNode.insertBefore(c,b)}}),d.prototype={init:function(a){if(a){var c=
"mx_bjs_"+a.aid;(function(){if(!d.$(c)){var a=document.getElementsByTagName("script"),e=a.length,f=document.createElement("script");f.id=c;a[e-1].parentNode.insertBefore(f,a[e-1])}})();this.timestamp=(new Date).getTime();this.aid=a.aid;e[this.aid]=a;e["$tag_"+this.aid]=this;this.g()}},jsv:1,info:function(a,c){var b=this.aid;typeof e=="undefined"&&(e={});e[b]||(e[b]={});typeof c!="undefined"&&(c===null?delete e[b][a]:e[b][a]=c);return e[b][a]},getParameters:function(){var a={sp:d.joinParameters({aid:this.info("aid"),
gid:this.info("gid")===void 0?0:this.info("gid"),format:this.info("format")===void 0?0:this.info("format"),mode:this.info("mode")===void 0?1:this.info("mode"),ce:d.getCookieEnabled(),fv:d.getFlashVersion()},","),ec:d.getCharset(),re:[screen.width,screen.height].join(",")};if(this.info("vid"))a.vid=this.info("vid");this.info("ex")&&d.extend(a,this.info("ex"));if(d.getPreviousUrl())a.purl=d.getPreviousUrl();a.jsv=this.jsv;a.cb=d.createCacheBuster();a.si=d.getScreenIndex(this.aid,this.info("destid"),
this.info("coors"));return d.joinParameters(a,"&")},getServerUrl:function(){return d.getProtocol()+this.getBaseUrl()+"mmp.htm?"},getBaseUrl:function(){return this.info("serverbaseurl")?this.info("serverbaseurl"):this.getLBUrl()},getLBUrl:function(){return this.info("serverbaseurl")?this.info("serverbaseurl"):this.info("serverbaseurl","mlt01.com/")},g:function(a,c){var b=this;(new Date).getTime();var e;c||b.info("async")?(e=function(){d.idle[1]=1},function(){d.idle[0]&&d.idle[1]?(d.idle[1]=0,d.load(a||
b.getServerUrl()+b.getParameters(),c||b.info("async"),e,1E4)):setTimeout(arguments.callee,0)}()):(d.idle[0]=0,e=function(){d.idle[0]=1},d.load(a||b.getServerUrl()+b.getParameters(),c||b.info("async"),e,1E4))}},d.prototype.init.prototype=d.prototype)})();(function(){var a={gid:0,format:0,mode:1,serverbaseurl:"mlt01.com/",staticbaseurl:"pic.zol-img.com.cn/dsp/"};if(typeof mx_as_id==="number"){a.aid=mx_as_id;mx_as_id=null;if(typeof mx_group_id==="number")a.gid=mx_group_id,mx_group_id=null;if(typeof mx_format==
"string")a.format=mx_format,mx_format=null;if(typeof mx_mode==="number")a.mode=mx_mode,mx_mode=null;if(typeof mx_dest_id!=="undefined")a.destid=mx_dest_id,mx_dest_id=null;if(typeof mx_async=="number")a.async=mx_async,mx_async=null;if(typeof mx_dest_id!="undefined")a.destid=mx_dest_id,mx_dest_id=null;if(typeof mx_anch_id!="undefined")a.anchid=mx_anch_id,mx_anch_id=null;if(typeof mx_coors!="undefined")a.coors=mx_coors,mx_coors=null;if(typeof mx_static_base_url=="string"&&mx_static_base_url)a.staticbaseurl=
mx_static_base_url,mx_static_base_url=null;if(typeof mx_server_base_url=="string"&&mx_server_base_url)a.serverbaseurl=mx_server_base_url,mx_server_base_url=null;if(typeof mx_ad_none=="function")a.ad_none=mx_ad_none,mx_ad_none=null;if(typeof mx_show_end=="function")a.show_end=mx_show_end,mx_show_end=null;if(typeof mx_visitor_id=="string"&&mx_visitor_id)a.vid=mx_visitor_id,mx_visitor_id=null;if(typeof mx_ad_track=="string"&&mx_ad_track)a.ssct=mx_ad_track,mx_ad_track=null;if(typeof mx_default_ad_track==
"string"&&mx_default_ad_track)a.sdct=mx_default_ad_track,mx_default_ad_track=null;if(typeof mx_default_ad=="function")a.dAd=mx_default_ad,mx_default_ad=null;if(typeof mx_external=="object"&&mx_external)a.ex=mx_external,mx_external=null;d(a)}})()})();