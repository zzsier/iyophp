
	
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
        var _url="http://123.59.53.158/nodes/"+node_id+"/?type=mobile&page="+pageNo;
        $.ajax({
            type:"get",
                dataType:"json",
                url:_url,
                success:function(data){
                var list = data.data;
				//for( var topic in list ) {
                for(var i = 0; i < list.length; i++){
                    _e+='<a href="http://123.59.53.158/topics/'+list[i].id+'"><dl><dt><img alt="" src="'+list[i].image+'"></dt><dd><h2>'
					+list[i].title+'<time>'+list[i].shortTime+'</time></h2><div></div></dd></dl></a>';
                    //_e+='<a href="http://123.59.53.158/topics/'+topic.id+'"><dl><dt><img alt="" src="'+topic.image+'"></dt><dd><h2>'
					//+topic.title+'<time>'+topic.shortTime+'</time></h2><div></div></dd></dl></a>';
                }
                $("#newslist section").append(_e);
				if( list.length < 10 ) {
					$("#clickbtn").hide();
				}
            }
        });
    }
});
