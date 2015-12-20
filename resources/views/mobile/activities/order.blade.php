<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <title>个人中心</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
        <meta name="format-detection" content="telephone=no"/>
        <meta content="no-cache" http-equiv="Pragma">
        <meta content="no-store, must-revalidate" http-equiv="Cache-Control">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <link rel="stylesheet" type="text/css" href={{{URL::asset('activity/tk.css')}}}>
        <script src={{{URL::asset('jquery2/jquery-2.1.4.js')}}}></script>
    </head>
    <body style="display: none;">
		@foreach( $enrollments as $index => $enrollment )
        <div id="order_201512191507335477">
            <div class="date">{{{ date("Y年m月d日", strtotime($enrollment->created_at)) }}}</div>
            <div class="container wbg">
                <div class="corner">
                	<img src="{{{ URL::asset('activity/ico_c_2.png') }}}" />
                </div>
                <div class="order_title"><a href="{{{ URL::to("activities/".$enrollment->activity->id) }}}" style="color: #202538">
					{{{ $enrollment->activity->title }}}
				</a></div>
                <div class="t_info_inner">
                    <div class="t_info_box">
                        <div class="t_price">¥0 <span>1人</span></div>
                        <div class="t_addr">
                            <div class="date_addr">{{{ date("Y年m月d日", strtotime($enrollment->activity->departure_time)) }}}
							<span class="ml">{{{ $enrollment->activity->address }}}</span></div>
                        </div>
                    </div>
                    <!--<div class="t_info_line"><span>订单号：</span>201512191507335477</div>
                    <div class="t_info_line"><span>地址：</span>莲花山（长春）滑雪场</div>-->
                </div>
                
                <div class="order_inner_container">
                    <div class="crossdot"><img src="{{{ URL::asset('activity/cross_dot.png') }}}" /></div>
                    <div class="opration_box">
                        <div class="op">
                               &nbsp;
                               <a target="submitAjax" class="payment_light" onclick="confirmMessage('确认放弃订单？',this);return false;" 
									href="{{{ URL::to('activity/removeorder?orderId='.$enrollment->id) }}}">撤销订单</a>
                        </div>
                        <!--<div class="payment" style="color:red">
                             线下支付 ：<span>¥0</span>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
		@endforeach
        <div class="footer_in">&nbsp;</div>
        <div class="footer_bt bbg_light">
            &nbsp;
            <div class="bts_3">
                <div class="button"><a href="{{{ URL::to('activities') }}}"><img src="{{{ URL::asset('activity/bt_f.png') }}}" alt="" /></a></div>
                <div class="button">
				</div>
          		<div class="button"><a href="{{{ URL::to('activity/orders') }}}"><img src="{{{ URL::asset('activity/bt_o.png') }}}" alt="" /></a></div>
           </div>
        </div>
        <iframe id="submitAjax" name="submitAjax" style="display:none;"></iframe>
        <div id="msk"><img src="{{{ URL::asset('activity/laoding.gif') }}}" height="32" width="32" alt="" /></div>
    </body>
    <script type="text/javascript">
        $(function(){
            $("html").css("font-size",$(document).width()/750*100*0.625+"%");
            $("body").show();
            window.setTimeout(function(){$("#msk").fadeOut();}, 600);
            $(window).resize(function(event) {
                $("html").css("font-size",$(document).width()/750*100*0.625+"%");
            });
            
            $("div[id=payID]").each(function(){
                $(this).click(function(){
                    if($(this).attr("status")!=1){
                        location.href="./act.php?a=1079&oid="+$(this).attr("oid");
                    }
                });
            });
        });
        
        function alertMessage(message){
            alertTemp='<div id="msk3" style="display:block;">'+
                            '<div class="alert">'+
                                '<div class="tips">'+message+'</div>'+
                                '<div class="bt" style="cursor:pointer">好</div>'+
                            '</div>'+
                        '</div>';
            $("body").append(alertTemp);
            $("#msk3 .alert .bt").click(function(){
                $("#msk3").remove();
            });
        }
        
        function confirmMessage(message,thisObj){
            alertTemp='<div id="msk3" style="display:block;">'+
                            '<div class="alert">'+
                                '<div class="tips">'+message+'</div>'+
                                '<div class="double_bt no" style="cursor:pointer">不好</div>'+
                                '<div class="double_bt yes" style="cursor:pointer">好</div>'+
                            '</div>'+
                        '</div>';
            $("body").append(alertTemp);
            $("#msk3 .alert .no").click(function(){
                $("#msk3").remove();
                return false;
            });
            $("#msk3 .alert .yes").click(function(){
                $("#msk3").remove();
                var url = $(thisObj).attr('href');
                $('#submitAjax').attr('src','#');

                $.ajax({
                    url: url + "&t=" + (new Date()).getTime(),
                    data: "",
                    type: "GET",
                    success: function (json) {
						window.location.reload();
                    }
                });
                return false;
            });
            return false;
        }
        
        function delOrder(productID){
            $("#order_"+productID).remove();
        }
    </script>
</html>
