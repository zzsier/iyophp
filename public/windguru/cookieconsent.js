(function(){if(!(window.hasCookieConsent||(window.hasCookieConsent=!0,-1<document.cookie.indexOf("cookieconsent_dismissed")))){"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var d={isArray:function(a){return"[object Array]"==Object.prototype.toString.call(a)},isObject:function(a){return"[object Object]"==Object.prototype.toString.call(a)},each:function(a,c,b,f){if(d.isObject(a)&&!f)for(var e in a)a.hasOwnProperty(e)&&c.call(b,a[e],
e,a);else for(f=0,e=a.length;f<e;f++)c.call(b,a[f],f,a)},merge:function(a,c){a&&d.each(c,function(b,c){d.isObject(b)&&d.isObject(a[c])?d.merge(a[c],b):a[c]=b})},bind:function(a,c){return function(){return a.apply(c,arguments)}},queryObject:function(a,c){var b,d=0,e=a;for(c=c.split(".");(b=c[d++])&&e.hasOwnProperty(b)&&(e=e[b]);)if(d===c.length)return e;return null},setCookie:function(a,c,b,d,e){b=b||365;var h=new Date;h.setDate(h.getDate()+b);a=[a+"="+c,"expires="+h.toUTCString(),"path="+e||"/"];
d&&a.push("domain="+d);document.cookie=a.join(";")},addEventListener:function(a,c,b){a.addEventListener?a.addEventListener(c,b):a.attachEvent("on"+c,b)}},n=function(){var a=function(c,b,g){if(d.isArray(b))return d.each(b,function(b){a(c,b,g)});c.addEventListener?c.addEventListener(b,g):c.attachEvent("on"+b,g)},c=function(a,b){return a.replace(/\{\{(.*?)\}\}/g,function(a,c){for(var h=c.split("||"),e;token=h.shift();){token=token.trim();if('"'===token[0])return token.slice(1,token.length-1);if(e=d.queryObject(b,
token))return e}return""})},b=function(a,b,c){a=a.parentNode.querySelectorAll("["+b+"]");d.each(a,function(a){var d=a.getAttribute(b);c(a,d)},window,!0)},f=function(c,e){b(c,"data-cc-event",function(c,b){var h=b.split(":"),f=d.queryObject(e,h[1]);a(c,h[0],d.bind(f,e))})},e=function(a,c){b(a,"data-cc-if",function(a,b){d.queryObject(c,b)||a.parentNode.removeChild(a)})};return{build:function(a,b){d.isArray(a)&&(a=a.join(""));a=c(a,b);var g;g=a;var k=document.createElement("div");k.innerHTML=g;g=k.children[0];
f(g,b);e(g,b);return g}}}(),k={options:{message:"This website uses cookies to ensure you get the best experience on our website. ",dismiss:"OK!",learnMore:"More info",link:null,container:null,theme:"light-floating",domain:null,path:"/",expiryDays:365,markup:'<div class="cc_banner-wrapper {{containerClasses}}">;<div class="cc_banner cc_container cc_container--open">;<a href="#null" data-cc-event="click:dismiss" target="_blank" class="cc_btn cc_btn_accept_all">{{options.dismiss}}</a>;<p class="cc_message">{{options.message}} <a data-cc-if="options.link" class="cc_more_info" href="{{options.link || "#null"}}">{{options.learnMore}}</a></p>;</div>;</div>'.split(";")},
init:function(){var a=window.cookieconsent_options;a&&this.setOptions(a);this.setContainer();this.options.theme?this.loadTheme(this.render):this.render()},setOptionsOnTheFly:function(a){this.setOptions(a);this.render()},setOptions:function(a){d.merge(this.options,a)},setContainer:function(){this.container=this.options.container?document.querySelector(this.options.container):document.body;this.containerClasses="";-1<navigator.appVersion.indexOf("MSIE 8")&&(this.containerClasses+=" cc_ie8")},loadTheme:function(a){var c=
this.options.theme;-1===c.indexOf(".css")&&(c="//s3.amazonaws.com/cc.silktide.com/"+c+".css");var b=document.createElement("link");b.rel="stylesheet";b.type="text/css";b.href=c;var f=!1;b.onload=d.bind(function(){!f&&a&&(a.call(this),f=!0)},this);document.getElementsByTagName("head")[0].appendChild(b)},render:function(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),delete this.element);this.element=n.build(this.options.markup,this);this.container.firstChild?
this.container.insertBefore(this.element,this.container.firstChild):this.container.appendChild(this.element)},dismiss:function(a){a.preventDefault&&a.preventDefault();a.returnValue=!1;this.setDismissedCookie();this.container.removeChild(this.element)},setDismissedCookie:function(){d.setCookie("cookieconsent_dismissed","yes",this.options.expiryDays,this.options.domain,this.options.path)}},l,m=!1;(l=function(){m||"complete"!=document.readyState||(k.init(),m=!0,window.update_cookieconsent_options=d.bind(k.setOptionsOnTheFly,
k))})();d.addEventListener(document,"readystatechange",l)}})();