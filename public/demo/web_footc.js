(function(window,document){var publicFooterWidth=typeof(__publicNavWidth)!=="undefined"?parseInt(__publicNavWidth,10):980;var css=[".zol-global-footer{min-width:"+(publicFooterWidth?publicFooterWidth+"px":"100%")+"; margin: 20px auto 0; background: #333; clear:both;}",".zol-global-footer,.zol-global-footer *{float: none;}",".zol-footer {float: none; height: 40px; min-width: 960px; overflow: hidden; float: none; clear: both; padding: 0 10px; background: #333; color: #ccc; text-align: left; font-size: 12px; font-family: arial; line-height: 40px;}",".zol-footer *{float: none;}",'.zol-footer span {_display: inline; float:right; margin: 0 -7px 0 0; color:#666; font-family:"\u5b8b\u4f53"; font-size:10px; -webkit-text-size-adjust:none;}',".zol-footer a{padding: 0 6px 0 7px; color:#ccc; text-decoration:none; font-family:Arial; font-size:12px;}",".zol-footer a:hover{color:#ccc; text-decoration: underline;} .zol-footer i {display: none;}",".zol-footer .footerw-2015{float: none; height: 40px; width:"+(publicFooterWidth?publicFooterWidth+"px":"100%")+"; margin: 0 auto;}",".zol-global-footer-fixed{position: fixed; bottom: 0; left: 0; width: 100%;}"].join("");var docEle=document.documentElement||document.body;var fixedClass=docEle.clientHeight>docEle.offsetHeight+60?" zol-global-footer-fixed":"";var footerHtml=['<div class="zol-footer'+fixedClass+'">','<div class="footerw-2015"><span>','<a href="http://www.zol.com.cn/marketing/profile.html">\u516c\u53f8\u7b80\u4ecb</a>|','<a href="http://www.zol.com.cn/marketing/milestone.html">\u516c\u53f8\u5386\u7a0b</a>|','<a href="http://e.zol.com.cn/">\u8425\u9500\u63a8\u5e7f</a>|','<a href="http://link.zol.com.cn/">\u5a92\u4f53\u5408\u4f5c</a>|','<a href="http://www.zol.com.cn/brand.html">\u54c1\u724c\u5927\u5168</a>|','<a href="http://service.zol.com.cn/user/login.php?type=reg">\u5e10\u53f7\u6ce8\u518c</a>|','<a href="http://zhaopin.zol.com.cn/">\u62db\u8058\u4fe1\u606f</a>|','<a href="http://www.zol.com.cn/marketing/customer_service.html">\u8054\u7cfb\u65b9\u5f0f</a>|','<a href="http://service.zol.com.cn/user/privacy.php">\u9690\u79c1\u58f0\u660e</a>|','<a href="http://www.zol.com.cn/webcenter/map.html">\u7ad9\u70b9\u5730\u56fe</a>|','<a href="http://service.zol.com.cn/complain/">\u53cd\u9988\u7ea0\u9519</a>',"</span>&nbsp;","&copy;"+new Date().getFullYear()+" \u4e2d\u5173\u6751\u5728\u7ebf \u7248\u6743\u6240\u6709","</div></div>"].join("");var style=document.createElement("style");style.type="text/css";if(style.styleSheet){style.styleSheet.cssText=css}else{style.appendChild(document.createTextNode(css))}var zolFooterNode=document.createElement("div");zolFooterNode.setAttribute("id","zolGlobalFooter");zolFooterNode.className="zol-global-footer";zolFooterNode.innerHTML=footerHtml;var appendFooter=function(){document.getElementsByTagName("body")[0].appendChild(style);document.getElementsByTagName("body")[0].appendChild(zolFooterNode)};var doScroll=function(){try{document.documentElement.doScroll("left")}catch(error){return setTimeout(doScroll,20)}appendFooter()};if(window.addEventListener){document.addEventListener("DOMContentLoaded",appendFooter,false)}else{if(window.attachEvent){doScroll()}}})(window,document);