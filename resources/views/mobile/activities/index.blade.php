<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <title>活动&雪票首页</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
        <meta name="format-detection" content="telephone=no"/>
        <meta content="no-cache" http-equiv="Pragma">
        <meta content="no-store, must-revalidate" http-equiv="Cache-Control">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <link rel="stylesheet" type="text/css" href={{{URL::asset('activity/tk.css')}}}>
        <script src={{{URL::asset('jquery2/jquery-2.1.4.js')}}}></script>
        <script src={{{URL::asset('activity/jquery.nicescroll.min.js')}}}></script>
    </head>
    <body style="display: none;">
            <div class="nav">
            <ul class="nav_bt">
                <li class="">
                    <div class="single" onclick="showInner(0);">全部类型<span class="arr"><img src={{{URL::asset('activity/arr_wrap_nav.png')}}} /></span></div>
                </li>
                <li class="">
                    <div class="single" onclick="showInner(1);">全部日期<span class="arr"><img src={{{URL::asset('activity/arr_wrap_nav.png')}}} /></span></div>
                </li>
                <li class="">
                    <div class="single" onclick="showInner(2);">全部目的地<span class="arr"><img src={{{URL::asset('activity/arr_wrap_nav.png')}}} /></span></div>
                </li>
            </ul>
            <div style="clear:both;"></div>
            <div class="float_box">
                <ul class="list">
                    <li class="selected">
                        <a href="#">
                            <div class="inner">全部
                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                    <!--<li class="">
                        <a href="act.php?a=1075&country=1">
                            <div class="inner">国内
                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                    <li class="">
                        <a href="act.php?a=1075&country=2">
                            <div class="inner">国际
                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                    <li class="">
                        <a href="act.php?a=1075&country=4">
                            <div class="inner">训练营
                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                    <li class="">
                        <a href="act.php?a=1075&country=3">
                            <div class="inner">世界单板日
                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>-->
                </ul>
            </div>  
            <div class="float_box">
                <ul class="list">
                    <li class="selected">
                        <a href="#">
                            <div class="inner">全部
                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                    <!--<li class="">
                        <a href="act.php?a=1075&startDate=1">
                            <div class="inner">1周内
                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                    <li class="">
                        <a href="act.php?a=1075&startDate=2">
                            <div class="inner">1-2周内
                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                    <li class="">
                        <a href="act.php?a=1075&startDate=3">
                            <div class="inner">2周-1月内
                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                    <li class="">
                        <a href="act.php?a=1075&startDate=4">
                            <div class="inner">1个月以后
                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>-->
                </ul>
            </div>
            <div class="float_box">
                <ul class="list">
                    <li class="selected">
                        <a href="#">
                            <div class="inner">全部
                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                    <!--                    <li class="">
                        <a href="act.php?a=1075&city=%E5%8C%97%E4%BA%AC">
                            <div class="inner">北京                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                                        <li class="">
                        <a href="act.php?a=1075&city=%E5%90%89%E6%9E%97">
                            <div class="inner">吉林                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                                        <li class="">
                        <a href="act.php?a=1075&city=%E5%93%88%E5%B0%94%E6%BB%A8">
                            <div class="inner">哈尔滨                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                                        <li class="">
                        <a href="act.php?a=1075&city=%E5%A4%A9%E6%B4%A5">
                            <div class="inner">天津                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                                        <li class="">
                        <a href="act.php?a=1075&city=%E6%88%90%E9%83%BD">
                            <div class="inner">成都                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>
                                        <li class="">
                        <a href="act.php?a=1075&city=%E6%96%B0%E7%96%86">
                            <div class="inner">新疆                                <div class="ico"><img src={{{URL::asset('activity/ico_select.png')}}} /></div>
                            </div>
                        </a>
                    </li>-->
                                    </ul>
            </div>
        </div>
            <div class="container">
				@foreach( $activities as $index => $activity )
				<div class="active_single">
            	    <div class="img_box">
            	        <a href={{ URL::to("activities/$activity->id") }}><img src="{{{ $activity->image }}}" style="max-height:200px"></a>
            	        <div class="top_tk">
							<img src={{{URL::asset('activity/bg_tk_top.png')}}} />
						</div>
            	    </div>
            	    <div class="tk_info">
            	        <img src={{{URL::asset('activity/bg_tk.png')}}} />
            	        <div class="inner_box">
            	            <div class="left_box">
            	                <p class="t">{{{ $activity->title }}}</p>
            	                <p class="s">
								<span class="ico"><img src={{{URL::asset('activity/ico_local.png')}}} /></span>
									{{{ $activity->address }}}
								<span class="ico"><img src={{{URL::asset('activity/ico_limit.png')}}} /></span>
								{{{ date("m月d日", strtotime($activity->departure_time )) }}}
								</p>
            	            </div>
            	            <div class="right_box">
							<span>{{{ $activity->user->username }}}</span>
							</div>
            	        </div>
            	    </div>
            	</div>
				@endforeach
            </div>
        <div class="footer_in2"><img src={{{URL::asset('activity/ico_myorder_e.png')}}} ></div>
        <div class="float_myorder">
            <div class="bt_box"><a href={{{URL::to('activity/orders')}}}><img src={{{URL::asset('activity/ico_myorder.png')}}} ></a></div>
        </div>
        <div class="float_bg"></div>
        <div id="msk"><img src={{{URL::asset('activity/laoding.gif')}}} height="32" width="32" alt="" /></div>
    </body>
    <script type="text/javascript">
    $(function(){
        $("html").css("font-size",$(document).width()/750*100*0.625+"%");
        $("body").show();
        window.setTimeout(function(){$("#msk").fadeOut();}, 600);
        /*
        $(".float_box").css({"max-height":$(document).width()/750*800+"px","top":$(".nav").height()+1+"px"});
        $(".float_box").niceScroll({
            touchbehavior: true,
            cursoropacitymin :0,
            cursoropacitymax:0.6,
            cursorwidth:0,
            usetransition:true,
            hwacceleration:true,
            autohidemode:"hidden"
        });
        */
        $(window).resize(function(event) {
            $("html").css("font-size",$(document).width()/750*100*0.625+"%");
            //$(".float_box").css({"height":$(document).width()/750*800+"px","top":$(".nav").height()+1+"px"});
        });
    });
   
    function showInner(index){
        var float_boxs=$(".float_box");
        var lis=$(".nav_bt li");
        var imgs=$(".nav_bt li img");
        if(status==0){
            for(var i=0;i<lis.length;i++){
                if(i==index){
                    imgs.eq(i).attr("src","{{{URL::asset('activity/arr_open_nav.png')}}}");
                    float_boxs.eq(i).css("display","block");
                }
                else{
                    imgs.eq(i).attr("src","{{{URL::asset('activity/arr_wrap_nav.png')}}}");
                    float_boxs.eq(i).css("display","none");
                }
                //lis[i].className=i==index?"active":"";
            }
            $(".float_bg").css("display","block");
            status=1;
            lindex=index;
        }else{
            for(var i=0;i<lis.length;i++){
                imgs.eq(i).attr("src","{{{URL::asset('activity/arr_wrap_nav.png')}}}");
                float_boxs.eq(i).css("display","none");
            }
            $(".float_bg").css("display","none");
            status=0;
            if(lindex!=index){
                showInner(index);
            }
        }
    }
 


    </script>
</html>
