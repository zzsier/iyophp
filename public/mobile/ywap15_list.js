
	
$(function(){

	function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
	}
	
    if(getQueryString("list")=="pingce"){
        $("#top nav li").eq(1).addClass("show").siblings().removeClass("show");
    }
    if(getQueryString("list")=="daogou"){
        $("#top nav li").eq(2).addClass("show").siblings().removeClass("show");
    }

    autoSwiper();

    $("#closebtn").click(function(){
        $(this).parent().parent().hide();
    });
    $(".clickbtn").click(function(){
        getNextArticle();
    });
    $("#cbtn").click(function(){
        $(this).parent().hide();
    });

    //初始对焦点图的友好判断解决PC阅读图片自适应过大问题
    function autoSwiper(){
    function onresizeScreen(){
        if($(document).width()>=1000){
            $(".picbox").width(320);
        }else{
            $(".picbox").width("auto");
        };
    };
    onresizeScreen();
    onresize=function(){onresizeScreen();}
    };

    var pageNo =  1;
    var oPingce = getQueryString("list")=="pingce";
    var oDaogou = getQueryString("list")=="daogou";
    function getNextArticle(){
        pageNo ++;
        var _e = "";
        var _url="http://wap.yesky.com/wap/ajaxarticlelist.jhtml?sitemapId=" + sitemapId + "&pageNo="+pageNo;
        if(oPingce){_url = "http://wap.yesky.com/wap/ajaxarticlelist.jhtml?sitemapId=" + sitemapId + "&pageNo="+pageNo+"&list=pingce";}
        if(oDaogou){_url = "http://wap.yesky.com/wap/ajaxarticlelist.jhtml?sitemapId=" + sitemapId + "&pageNo="+pageNo+"&list=daogou";}
        $.ajax({
            type:"get",
                dataType:"json",
                url:_url,
                success:function(data){
                var list = data.articlelists;
                for(var i = 0; i < 10; i++){
                    _e+='<a href="'+list[i].url+'"><dl><dt><img alt="'+list[i].title3+'" src="'+list[i].image1+'"></dt><dd><h2>'+list[i].title2+'<time>'+list[i].shortTime+'</time></h2><div>'+list[i].digest+'</div></dd></dl></a>';
                }
                $("#newslist section").append(_e);
            }
        });
    }
});