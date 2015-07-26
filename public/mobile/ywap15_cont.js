$(function(){   
    fontsizeToggle();
    $("#closebtn").click(function(){
        $(this).parent().parent().hide();
    });
    $("#cbtn").click(function(){
        $(this).parent().hide();
    });
    var obj1 = $("#clabel");
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        $(".gfapp").css("display","none");
    }else{
        $(".gfapp").css("display","block");
        obj1.click(function(){
            $("#gfapp1").css("display","none");
        }); 
    };

    //微信OPENAPI接口
    wx.ready(function (){
        // 分享给朋友圈
        wx.onMenuShareTimeline(_shareCont);
        // 朋友
        wx.onMenuShareAppMessage(_shareCont);
        // QQ
        wx.onMenuShareQQ(_shareCont);
        // 新浪
        wx.onMenuShareWeibo(_shareCont);
    });
	
	//广告特殊处理
	//$(".baidulm").width($("body").width());
	
});
window.onload = function(){
    //图片自适应过大问题
    function onresizeScreen(){
        if($(window).width()>=1000){
            $(".picbox").width(320);
        }else{
            $(".picbox").width("auto");
        };
    };
    onresizeScreen();
    onresize=function(){onresizeScreen();}
};
function fontsizeToggle(){
    var fontsized = document.getElementById("contentsizeadd");
    var fontsizee = document.getElementById("contentsizedel");
    var fontsizec = document.getElementById("contentfontsize");
    fontsized.onclick = function(event){
        fontsizec.style.fontSize=20+"px";
        fontsized.style.display="none";
        fontsizee.style.display="block";
    };
    fontsizee.onclick = function(event){
        fontsizec.style.fontSize=16+"px";
        fontsized.style.display="block";
        fontsizee.style.display="none";
    };
};
