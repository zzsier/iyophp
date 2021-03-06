<!DOCTYPE html>
<html>
	<head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="stylesheet" type="text/css" href="/activity/content.css" />
        <script src={{{URL::asset('jquery2/jquery-2.1.4.js')}}}></script>
        <script src={{{URL::asset('activity/StackBlur.js')}}}></script> 
		<title>IYO 论坛</title>

        <script type="text/javascript">
            var html = document.documentElement;
            window.rem = html.getBoundingClientRect().width / 18;
            html.style.fontSize = window.rem + 'px';
            
            //设置模糊背景
            $(function(){
                    //报名
                    $("#baoming").click(function(){
						@if( Auth::check() )
							$("#apply_container").show();
						@else
							alert("请从内部软件访问");
						@endif
                    });                
                
                    $("input.field.name_field").val(localStorage._weixin_shop_user_name_);
                    $("input.field.phone_field").val(localStorage._weixin_shop_user_phone_);
                   
                    /*
                    $("img[id=cover]").each(function(i){
                        $(this).load(function(){
                            canvas=stackBlurImage( $(this)[0], 13, false );
                            $("img[id=bgPic]").eq(i).attr("src",canvas.toDataURL());
                        });
                    });
                    */

                   //进入第二步
                   $(".next-btn").click(function(){
                        username=$("input.field.name_field").val();
                        phone=$("input.field.phone_field").val();
                        ticketNum=parseInt($(".ticket-num").text());
                        identityIDObj=$("input.field.identityID_field");
                        passportIDObj=$("input.field.passportID_field");
                        if(ticketNum<=0){
                            alert("请选择数量");
                        }else if(username && phone){
                            if(identityIDObj.attr("class")!=undefined){
                                identityID=identityIDObj.val();
                                if(identityID){
                                    $("p.info-content.ticket_user_identityID").text(identityID);
                                    $("input[name=identityID]").val(identityID);
                                }else{
                                    alert("请填写身份证信息");
                                    return false;
                                }
                            }
                            if(passportIDObj.attr("class")!=undefined){
                                passportID=passportIDObj.val();
                                if(passportID){
                                    $("p.info-content.ticket_user_passportID").text(passportID);
                                    $("input[name=passportID]").val(passportID);
                                }else{
                                    alert("请填写护照信息");
                                    return false;
                                }
                            }
                            
                            $("#apply_container .step-1").hide();
                            $("#apply_container .step-2").show();

                            localStorage._weixin_shop_user_name_=username;
                            localStorage._weixin_shop_user_phone_=phone;

                            price=parseFloat($(".ticket_item.active .price").text());
                            tickDate=$(".time_item.active .name").attr("date");
                            
                            if(price==0){
                                $(".payment-wrap").eq(0).show();
                                $(".payment-wrap").eq(1).hide();
                            }else{
                                $(".payment-wrap").eq(0).hide();
                                $(".payment-wrap").eq(1).show();
                            }

                            $("p.info-content.ticket_num").text(ticketNum);
                            $("p.info-content.total_price").text(ticketNum*price);
                            $("p.info-content.ticket_user_name").text(username);
                            $("p.info-content.ticket_user_phone").text(phone);
                            $("p.info-content.ticket_user_note").text($("input.field.note_field").val());

                            $("input[name=num]").val(ticketNum);
                            $("input[name=price]").val(price);
                            $("input[name=tickDate]").val(tickDate);
                            $("input[name=name]").val(username);
                            $("input[name=phone]").val(phone);
                            $("input[name=note]").val($("input.field.note_field").val());
                        }else{
                            alert("请填写姓名和联系电话");
                        }
                   });
                   
                   $("form.checkout-form").attr("action","/activity/join");

                   //微信支付
                   //$("#weixinPay").click(function(){
                   //    $("input[name=payType]").val(1);
                   //    $("form.checkout-form").submit();
                   //});
                   
                   //线下支付
                   $("div[id=offLine]").each(function(){
                        $(this).click(function(){
                            $("input[name=payType]").val(2);
                            $("form.checkout-form").submit();
                        }); 
                   });
                   
                   //在线支付
                   //$("#onLine").click(function(){
                   //    $("input[name=payType]").val(3);
                   //    $("form.checkout-form").attr("target","submitAjax");
                   //    $("form.checkout-form").submit();
                   //});
                   
                   $(".prev-btn").click(function(){
                       $("#apply_container .step-1").show();
                       $("#apply_container .step-2").hide();
                   });
                   
                   $(".icon-close").click(function(){
                       $("#apply_container").hide();
                   });
                   
                   //选择时间
                   $(".time_item").each(function(){
                        $(this).click(function(){
                            $(".time_item").removeClass('active');
                            $(this).addClass("active");
                            
                            dateItem=$(this).attr("data");
                            dateItem=$.parseJSON(dateItem);
                            $(".ticket-list.tab_content").html('');
                            for(var i in dateItem['price']){
                                if(i==0){
                                    active='active';
                                    ticketNum=dateItem['ticketNum'][i];
                                    if(ticketNum<=0){
                                        ticketNum=0;
                                        $(".ticket-num").text(0);
                                    }
                                    $("span.num").text(ticketNum);
                                    if(parseInt($("p.ticket-num.ticket_num").text())>ticketNum){
                                        $("p.ticket-num.ticket_num").text(ticketNum);
                                    }
                                }else{
                                    active='';
                                }
                                htmlStr='<li class="ticket_item single-ticket '+active+'" layout="column" layout-align="start center">'+
                                            '<p class="price">'+dateItem['price'][i]+'</p>'+
                                            '<p class="name">'+dateItem['description'][i]+'</p>'+
                                        '</li>';
                                $(htmlStr).appendTo(".ticket-list.tab_content").click(function(){
                                    $(".ticket_item").removeClass('active');
                                    $(this).addClass("active");
                                    ticketNum=dateItem['ticketNum'][$(this).index()];
                                    if(ticketNum<=0){
                                        ticketNum=0;
                                        $(".ticket-num").text(0);
                                    }
                                    $("span.num").text(ticketNum);
                                    if(parseInt($("p.ticket-num.ticket_num").text())>ticketNum){
                                        $("p.ticket-num.ticket_num").text(ticketNum);
                                    }
                                });
                            }
                        }); 
                   });
                   $(".time_item").eq(0).click();
                   
                   //加减数量
                   $(".minus-btn").click(function(){
                       ticketNum=parseInt($(".ticket-num").text());
                       if(ticketNum>1){
                            $(".ticket-num").text(ticketNum-1);
                       }
                   });
                   $(".plus-btn").click(function(){
                       ticketNum=parseInt($(".ticket-num").text());
                       //maxNum=parseInt($(".limit > .num").text());
                       //if(ticketNum < maxNum){
                           $(".ticket-num").text(ticketNum+1);
                       //}else{
                           //alert('就剩这么多票啦~');
                       //}
                   });
                   
                   $(".share.share_btn").click(function(){
                        if(navigator.userAgent.indexOf('MicroMessenger') > -1){
                            $(".app-share-mask.app_share_mask").show();
                        }
                        if(navigator.userAgent.indexOf('goski') > -1){
                            title=document.title;
                            desc=$("meta[name=description]").attr("content");
                            link=location.href;
                            img='http://act.goski.cn/'+$("#cover").attr("src");
                            desc=$("meta[name=description]").attr("content");
                            location.href="goskishare://share?title="+title+"&desc="+desc+"&img="+img+"&link="+encodeURIComponent(link);
                        }
                   });
                   $(".app-share-mask.app_share_mask").click(function(){
                      $(this).hide(); 
                   });
                   
                   $("#myinfo").click(function(){
                       location.href="{{{URL::to('activity/orders')}}}";
                   });
                   
                   u=navigator.userAgent;
                   if(u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1 || u.indexOf('iPad') > -1){
                       $("#shengming").show();
                   }
                   
            });
            
            function showQRcode(){
                alert("这里应该显示二维码浮层");
            }
        </script>
    </head>
    
    <body>
        <main class="main-content">
            <div x-component="ActivityDetailPage" x-component-id="1441697910271">
                <section class="card activity-card activity-header">
                    <img id="bgPic" class="blur-pic loaded" src={{{ $activity->image }}} >
                    <div class="upper">
                        <div class="frontcover-wrap">
                            <img id="cover" class="frontcover loaded" alt={{{ $activity->title }}}
							src={{{ $activity->image }}}>
                        </div>
                        <div class="info-wrap" layout="row" layout-align="start center">
                            <div class="info" flex="">
                                <div class="title">
									{{{ $activity->title }}}
								</div>
                                <div class="info-detail" layout="row">
                                    <div class="avatar-wrap">
                                        <img class="avatar loaded" src="http://www.iyobbs.com/{{{ $activity->user->imageUrl }}}" />
                                    </div>
                                    <span class="by" style="color:white;">
                                        by
                                    </span>
                                    <span class="name">
										{{{ $activity->user->username }}}
									</span>
                                </div>
                            </div>
                            <div class="share share_btn">
                                <!--<p>
                                    <span class="icon-share">
                                    </span>
                                </p>
                                <p class="share-font">
                                    约好友
                                </p>-->
                            </div>
                            <span class="left-circle">
                            </span>
                            <span class="right-circle">
                            </span>
                        </div>
                    </div>
                </section>
                <section class="activity-info-card card panel">
                    <div class="inner">
                        <header class="panel-header" layout="row" layout-align="start center">
                            <span class="pipe">
                            </span>
                            <h2 class="title" style="width:100%">
                                <span style="float:left;">活动信息</span>
                                <span id="shengming" style="float:right;font-size: 0.6rem;margin-top: 3px;display: none;color:#aaa">(本活动与Apple Inc无关)</span>
                            </h2>
                        </header>
                        <ul class="activity-info-block panel-body activity-info-line">
						<!--
                            <li class="info-item ticket-info" layout="row" layout-align="start start">
                                <span class="icon-ticket">
                                </span>
                                <ul flex="" class="ticket-list activity-info-line">
                                                                        <li class="single-ticket" layout="row" layout-align="space-between center">
                                        <p>
                                            <span class="ticket-price">
                                                4320元                                            </span>
                                            <span class="balance">(仅剩32张)</span> 
                                        </p>
                                        <p class="ticket-name">
                                            沈阳出发（不含机票）                                        </p>
                                    </li>
                                                                        <li class="single-ticket" layout="row" layout-align="space-between center">
                                        <p>
                                            <span class="ticket-price">
                                                4321元                                            </span>
                                            <span class="balance">(仅剩32张)</span> 
                                        </p>
                                        <p class="ticket-name">
                                            上海出发（不含机票）                                        </p>
                                    </li>
                                                                        <li class="single-ticket" layout="row" layout-align="space-between center">
                                        <p>
                                            <span class="ticket-price">
                                                6666元                                            </span>
                                            <span class="balance">(仅剩32张)</span> 
                                        </p>
                                        <p class="ticket-name">
                                            北京出发                                        </p>
                                    </li>
                                </ul>
                            </li>
						-->
                            <li class="info-item" layout="row" layout-align="start center">
                                <span class="icon-time">
                                </span>
                                <p class="activity-info-line" flex="">
                                    <span class="activity-start activity_start">
										{{{ date("Y 年 m 月 d 日", strtotime($activity->departure_time)) }}}
									</span>
                                </p>
                            </li>
                            <li class="info-item" layout="row" layout-align="start center">
                                <span class="icon-location">
                                </span>
                                <p class="activity-info-line" flex="" layout="row" layout-align="space-between center">
                                    <a class="activity-location" flex="" href="http://map.baidu.com/mobile/webapp/search/search/qt=s&amp;wd=志贺高原/?third_party=uri_api">
										{{{ $activity->address }}}
									</a>
                                    <span class="icon-right">
                                    </span>
                                </p>
                            </li>
                            <li class="info-item" layout="row" layout-align="start center">
                                <span class="icon-phone">
                                </span>
                                <p class="activity-info-line phone-line" flex="" layout="row" layout-align="start center">
                                    <a class="phone" href="#">
										{{{ $activity->user->phone }}}
									</a>
                                </p>
                            </li>
                        </ul>
                    </div>
                </section>
                <section class="content-block card panel content_block">
                    <div class="inner">
                        <header class="panel-header" layout="row" layout-align="start center">
                            <span class="pipe">
                            </span>
                            <h2 class="title">
                                活动介绍
                            </h2>
                        </header>
                        <div class="activity-content-block">
                            <div class="activity-main-content editor-content raw-content ">
							    {!! $activity->body !!}
							</div>

<!--
                            <div class="activity-single-content">
                                <div class="title-wrap" layout="row" layout-align="start center">
                                    <span class="title">
                                        费用包含                                    </span>
                                    <span flex="" class="content-title-trangle">
                                    </span>
                                </div>
                                <div class="content editor-content raw-content ">
                                    <ol class=" list-paddingleft-2" style="list-style-type: decimal;"><li><p>北京至名古屋往返机票；</p></li><li><p>名古屋至志贺高原豪华大巴；</p></li><li><p>Ski out-Ski in 四星级酒店6晚住宿（两人一间）；</p></li><li><p>四星级酒店自助早、晚餐（非常丰富）；</p></li><li><p>极限运动专业保险；</p></li><li><p>滑雪顾问全程陪同。</p><p><br/></p><p>为什么不含雪票？</p><p>日本雪票非常便宜，全天不到￥250，滑几天买几天，不浪费一分钱。</p><p><br style="box-sizing: border-box;"/></p><p>为什么不含签证？</p><p>日本放宽对华旅游签证，已经有很多人都拿到了3年多次往返，不浪费一分钱。</p></li></ol>                                </div>
                            </div>
                                                        <div class="activity-single-content">
                                <div class="title-wrap" layout="row" layout-align="start center">
                                    <span class="title">
                                        行程计划                                    </span>
                                    <span flex="" class="content-title-trangle">
                                    </span>
                                </div>
                                <div class="content editor-content raw-content ">
                                    <p>Day 1</p><p>&nbsp;&nbsp;&nbsp;&nbsp;首都机场集合，直飞名古屋，大巴送到酒店。<br style="box-sizing: border-box;"/></p><p>Day 2、3、4、5、6</p><p>&nbsp;&nbsp;&nbsp;&nbsp;自由滑雪 或者 去看猴子泡温泉 或者 去长野市区观光<br style="box-sizing: border-box;"/></p><p>Day 7</p><p>&nbsp;&nbsp;&nbsp;&nbsp;轻井泽Outlet血拼半日，名古屋飞回北京</p>                                </div>
                            </div>
                                                        <div class="activity-single-content">
                                <div class="title-wrap" layout="row" layout-align="start center">
                                    <span class="title">
                                        酒店信息                                    </span>
                                    <span flex="" class="content-title-trangle">
                                    </span>
                                </div>
                                <div class="content editor-content raw-content ">
                                    <p style="white-space: normal;">志贺皇宫酒店<br/></p><p style="white-space: normal;">Shiga Palace Hotel酒店提供24小时开放的公共温泉浴池、包括各类美食的自助餐、均带免费无线网络连接的客房和雪具租赁服务，距离Kumanoyu Ski Resort滑雪胜地有5分钟的步行路程，距离砚之魂巴士站（Suzuri Bus Stop）有不到1分钟的步行路程，且该巴士站距离汤田中火车站（Yudanaka Train Station）有30分钟巴士车程。</p><p style="white-space: normal;">Big One餐厅供应日式和西式早餐与晚餐（自助式）。</p><p style="text-align: center;"><img src="/upload_act/ueditor/image/20151130/1448893518121302.jpg" title="1448893518121302.jpg" alt="34886256_640x360.jpg"/></p><p style="text-align: center;"><img src="/upload_act/ueditor/image/20151130/1448893542448684.jpg" title="1448893542448684.jpg" alt="34886261_640x360.jpg"/></p><p style="text-align: center;"><img src="/upload_act/ueditor/image/20151130/1448893567299759.jpg" title="1448893567299759.jpg" alt="34886284_640x360.jpg"/></p><p style="text-align: center;"><img src="/upload_act/ueditor/image/20151130/1448893598267378.jpg" title="1448893598267378.jpg" alt="34886289_640x360.jpg"/></p>                                </div>
                            </div>
                            <div class="activity-single-content">
                                <div class="title-wrap" layout="row" layout-align="start center">
                                    <span class="title">
                                        报名须知                                    </span>
                                    <span flex="" class="content-title-trangle">
                                    </span>
                                </div>
                                <div class="content editor-content raw-content ">
                                    <p style="margin-top: 0px; margin-bottom: 1em; white-space: normal; padding: 0px; border: 0px; font-family: Helvetica, &#39;STHeiti STXihei&#39;, &#39;Microsoft JhengHei&#39;, &#39;Microsoft YaHei&#39;, Tohoma, Arial; line-height: 24px; vertical-align: baseline; color: rgb(51, 51, 51);"><span style="font-family: arial, helvetica, sans-serif;">参加活动，即表明报名者经过合理判断，同意自行承担户外活动中的所有风险，包括利用交通工具及其他第三方设施的风险；对于活动中可能出现的意外事故，属于不可预知或即使预知也无法避免的安全事故，由自行投保的保险公司承担意外伤害保险赔付，雪场、旅行社、俱乐部、领队不为此承担责任；如因参加者本人疏忽、过失或故意等行为造成的事故（包括环保事故），除自负其责之外，还应对因此给他人所造成的损失损害负责，必要时将承担法律责任。</span></p><p style="margin-top: 0px; margin-bottom: 1em; white-space: normal; padding: 0px; border: 0px; font-family: Helvetica, &#39;STHeiti STXihei&#39;, &#39;Microsoft JhengHei&#39;, &#39;Microsoft YaHei&#39;, Tohoma, Arial; line-height: 24px; vertical-align: baseline; color: rgb(51, 51, 51);"><span style="font-family: arial, helvetica, sans-serif;">以上声明事项，参加者本人已详细阅读并了解所参加的活动的危险性、滑雪的原理以及其隐藏潜在的恐造成个人身心伤害、残疾或死亡，甚至造成他人身体及财产上等损害的风险性。为保障本人及他人身心安全，参加者本人同意确实遵守并对本人疏忽、过失或故意等行为造成的任何事故承担所有责任。</span></p><p style="margin-top: 0px; margin-bottom: 1em; white-space: normal; padding: 0px; border: 0px; font-family: Helvetica, &#39;STHeiti STXihei&#39;, &#39;Microsoft JhengHei&#39;, &#39;Microsoft YaHei&#39;, Tohoma, Arial; line-height: 24px; vertical-align: baseline; color: rgb(51, 51, 51);"><span style="color: rgb(255, 0, 0); font-family: arial, helvetica, sans-serif;">此行程针对滑雪发烧友，暂不接受12岁以下儿童报名，敬请谅解。</span></p><p style="margin-top: 0px; margin-bottom: 1em; white-space: normal; padding: 0px; border: 0px; font-family: Helvetica, &#39;STHeiti STXihei&#39;, &#39;Microsoft JhengHei&#39;, &#39;Microsoft YaHei&#39;, Tohoma, Arial; line-height: 24px; vertical-align: baseline; color: rgb(51, 51, 51);"><span style="font-family: arial, helvetica, sans-serif;">此免责声明协议目的，旨在提高参加者对滑雪活动的认知及安心与安全。</span></p>                                </div>
                            </div>
-->
                        </div>
                    </div>
                </section>
                <section class="card panel apply-user-block apply_list_block fold" >
                    <div class="inner">
                        <header class="panel-header" layout="row" layout-align="start center">
                            <span class="pipe">
                            </span>
                            <h2 class="title">
                                已报名
                            </h2>
                        </header>
                        <div class="panel-body">
                            <ul class="apply-users apply_user_container" style="padding-bottom: 2.05rem;">
								@foreach( $enrollments as $index => $enrollment )
                                <li class="single-apply-user" layout="row" layout-align="start center">
                                    <div class="avatar-wrap">
                                        <img class="avatar apply-user-avatar loaded" src="{{{ URL::asset($enrollment->user->imageUrl) }}}"/>
                                    </div>
                                    <span class="apply-user-name" flex="">
										{{{ $enrollment->user->username }}}
									</span>
                                    <span class="apply-success">
										@if ( $enrollment->flag == 0 )
										进行中
										@elseif ( $enrollment->flag == 1 )
										已通过
										@else
										已拒绝
										@endif
									</span>
                                    <span class="ticket-count">
										{{{ $enrollment->num }}}张
                                    </span>
                                    <span class="apply-user-time" flex="">
										{{{ date("m-d H:m", strtotime($enrollment->created_at)) }}}
									</span>
                                </li>
								@endforeach
                            </ul>
                            <!--
                            <footer layout="row" layout-align="center center">
                                <div class="fold-gradient">
                                </div>
                                <div class="apply_list_toggle">
                                    <div class="unfold-btn" layout="row" layout-align="center center">
                                        展开所有
                                        <span class="icon-down">
                                        </span>
                                    </div>
                                    <div class="fold-btn apply_list_toggle" layout="row" layout-align="center center">
                                        收起部分
                                        <span class="icon-down">
                                        </span>
                                    </div>
                                </div>
                            </footer>
                            -->
                        </div>
                    </div>
                </section>
                
                <!--报名信息-->
                
                <div ref="apply" id="apply_container" class="buy-ticket-container hide" style="display: none">
                    <div class="buy-ticket-mask apply_backdrop">
                    </div>
                    <div class="buy-ticket-wrap">
                        <div class="buy-step step-1 active step_info">
                            <div>
                                <!--<section class="buy-step-block time-list-block" >
                                    <header layout="row" layout-align="space-between center">
                                        <div class="buy-info-title" layout="row" layout-align="start center">
                                            <div class="pipe">
                                            </div>
                                            <h3>
                                                选择时间
                                            </h3>
                                        </div>
                                        <div class="close-btn close_btn">
                                            <span class="icon-close">
                                            </span>
                                        </div>
                                    </header>
                                    <div>
                                        <ul class="time-list">
                                            <li id="dateItem" data='{"price":["4320","4321","6666"],"description":["\u6c88\u9633\u51fa\u53d1\uff08\u4e0d\u542b\u673a\u7968\uff09","\u4e0a\u6d77\u51fa\u53d1\uff08\u4e0d\u542b\u673a\u7968\uff09","\u5317\u4eac\u51fa\u53d1"],"ticketNum":[32,32,32]}' class="time_item single-time tab_item" layout="row" layout-align="center center" ><p class="name" date="2016-02-28">2月28日</p></li>                                        </ul>
                                    </div>
                                </section>
                                <section class="buy-step-block ticket-list-block ">
                                    <header layout="row" layout-align="start center">
                                        <div class="buy-info-title" layout="row" layout-align="start center">
                                            <div class="pipe">
                                            </div>
                                            <h3>
                                                选择票价
                                            </h3>
                                        </div>
                                    </header>
                                    <div>
                                        <ul class="ticket-list tab_content active">
                                            <li class="ticket_item single-ticket" layout="column" layout-align="start center">
                                                <p class="price"></p>
                                                <p class="name"></p>
                                            </li>
                                        </ul>
                                    </div>
                                </section>-->
                            </div>
                            <section class="buy-step-block ticket-num-block" layout="row" layout-align="space-between center">
                                <header layout="row" layout-align="start center">
                                    <div class="buy-info-title" layout="row" layout-align="start center">
                                        <div class="pipe">
                                        </div>
                                        <h3>
                                            选择数量
                                        </h3>
                                        <!--<div class="limit" style="display:block">
                                            (仅剩<span class="num">0</span>张)
                                        </div>-->
                                    </div>
                                </header>
                                <div layout="row" layout-align="start center">
                                    <div class="minus-btn dec_btn untouch inactive">
                                        <span class="icon-minus">
                                        </span>
                                    </div>
                                    <p class="ticket-num ticket_num">1</p>
                                    <div class="plus-btn inc_btn untouch">
                                        <span class="icon-plus">
                                        </span>
                                    </div>
                                </div>
                            </section>
                            <section class="buy-step-block user-info-block">
                                <header layout="row" layout-align="start center">
                                    <div class="buy-info-title" layout="row" layout-align="start center">
                                        <div class="pipe">
                                        </div>
                                        <h3>
                                            填写信息
                                        </h3>
                                    </div>
                                    <p class="hint">
                                        请务必填写真实信息
                                    </p>
                                </header>
                                <div>
                                    <div class="single-field" layout="row" layout-align="space-between center">
                                        <label>
                                            姓　名
                                        </label>
                                        <input class="field name_field" type="text" value="" placeholder="填写真实姓名(必填)"/>
                                    </div>
                                    <div class="single-field" layout="row" layout-align="space-between center">
                                        <label>
                                            手　机
                                        </label>
                                        <input class="field phone_field" type="tel" value="" placeholder="填写手机号码(必填)"
                                        />
                                    </div>
                                    <div class="single-field" layout="row" layout-align="space-between center">
                                        <label>
                                            身份证
                                        </label>
                                        <input class="field identityID_field" type="text" value="" placeholder="填写身份证编号(必填)"
                                        />
                                    </div>
                                                                        <div class="single-field" layout="row" layout-align="space-between center">
                                        <label>
                                            备　注
                                        </label>
                                        <input class="field note_field" type="text" placeholder="填写备注" />
                                    </div>
                                </div>
                            </section>
                            <footer class="tab-footer" >
                                <div class="next-btn next_step_btn">
                                    下一步
                                    <p class="arrow-icon">
                                        <span class="icon-right">
                                        </span>
                                    </p>
                                </div>
                            </footer>
                        </div>
                        <div class="buy-step step-2 step_checkout">
                            <section class="buy-step-block order-info-block">
                                <header layout="row" layout-align="space-between center">
                                    <div class="buy-info-title" layout="row" layout-align="start center">
                                        <div class="pipe">
                                        </div>
                                        <h3>
                                            订单信息
                                        </h3>
                                    </div>
                                    <div class="close-btn close_btn">
                                        <span class="icon-close">
                                        </span>
                                    </div>
                                </header>
                                <div>
                                    <div class="single-info" layout="row" layout-align="space-between center">
                                        <p class="info-title">
                                            活动
                                        </p>
                                        <p class="info-content" style="overflow:hidden;white-space:nowrap;width:89%">
                                            <span class="price ticket_price">
                                            </span>
                                            <span class="ticket_name">{{{ $activity->title }}}</span>
                                        </p>
                                    </div>
                                    <div class="single-info" layout="row" layout-align="space-between center">
                                        <p class="info-title">
                                            数量
                                        </p>
                                        <p class="info-content ticket_num">1</p>
                                    </div>
                                    <div class="single-info" layout="row" layout-align="space-between center" style="display:none">
                                        <p class="info-title">
                                            总计
                                        </p>
                                        <p class="info-content total_price"></p>
                                    </div>
                                    <div class="single-info" layout="row" layout-align="space-between center">
                                        <p class="info-title">
                                            姓名
                                        </p>
                                        <p class="info-content ticket_user_name">
                                        </p>
                                    </div>
                                    <div class="single-info" layout="row" layout-align="space-between center">
                                        <p class="info-title">
                                            手机
                                        </p>
                                        <p class="info-content ticket_user_phone">
                                        </p>
                                    </div>
                                    <div class="single-info" layout="row" layout-align="space-between center">
                                        <p class="info-title">
                                            身份证
                                        </p>
                                        <p class="info-content ticket_user_identityID">
                                        </p>
                                    </div>
                                    <div class="single-info" layout="row" layout-align="space-between center">
                                        <p class="info-title">
                                            备注
                                        </p>
                                        <p class="info-content ticket_user_note">
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <section class="buy-step-block pay-info-block payment_block">
                                <header layout="row" layout-align="start center">
                                    <div class="buy-info-title" layout="row" layout-align="start center">
                                        <!--<div class="pipe">
                                        </div>
                                        <h3>
                                            支付方式
                                        </h3>-->
                                    </div>
                                    <!--<p class="hint">
                                        &quot;线下支付&quot;需要到活动现场完成支付。
                                    </p>-->
                                </header>
                                <div layout="row" layout-align="center center">
                                    
                                    <div class="payment-wrap" layout="row" layout-align="center center">
                                        <div id="weixinPay" class="promo pay-btn payment_type active" data-type="1" style="diplay:none">
                                            微信支付
                                        </div>
                                    </div>
                                    
                                    <div class="payment-wrap" layout="row" layout-align="center center">
                                        <div id="offLine" class="promo pay-btn payment_type active" data-type="1">
                                            提交报名
                                        </div>
									</div>
								</div>
                            </section>
                            <footer class="tab-footer">
                                <div class="prev-btn prev_step_btn" layout="row" layout-align="start center">
                                    <p class="arrow-icon">
                                        <span class="icon-right">
                                        </span>
                                    </p>
                                    上一步
                                </div>
                                <form class="checkout-form checkout_form" action="" method="POST">
                                    <input type="hidden" name="activityID" value="{{{ $activity->id }}}"/>
                                    <input type="hidden" name="title" value="{{{ $activity->title }}}" />
                                    <input type="hidden" name="name" value="" />
                                    <input type="hidden" name="phone" value=""/>
                                    <input type="hidden" name="identityID" value=""/>
                                    <input type="hidden" name="passportID" value=""/>
                                    <input type="hidden" name="note" value="" />
                                    <input type="hidden" name="num" value="" />
                                    <input type="hidden" name="price" value="" />
                                    <input type="hidden" name="tickDate" value="" />
                                    <input type="hidden" name="payType" value="" />
                                </form>
                                <iframe id="submitAjax" name="submitAjax" style="display:none;"></iframe>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <div class="tab activity-tab">
            <div class="activity-tab-wrap action-bar" layout="row" layout-align="start center">
                <div id="baoming" flex="" class="action-bar-button apply-now apply_btn" layout="row" layout-align="center center">
                    <span class="icon-activity">
                    </span>
                    我要报名
                </div>
                <div id="myinfo" class="action-bar-subbutton join-group group_qrcode">
                    <span class="icon-me">
                    </span>
                    我的报名
                </div>
            </div>
        </div>
        <div class="app-share-mask app_share_mask">
            <img class="share-text" src="http://img.goski.cn/upload_goski/static/201510/5632f59965cdb.jpg">
        </div>
        <!--
        <nav class="inner-tab activity-page">
            <ul>
                <li class="tab_toggle" style="z-index: 99999;">
                    <div class="tips">
                        收起
                    </div>
                    <span class="icon-hand-hollow">
                    </span>
                </li>
                <li class="toggle-list tab-share-btn">
                    <div class="tips">
                        别说话，分享我
                    </div>
                    <span class="icon-friend-circle">
                    </span>
                </li>
                <li class="toggle-list qrcode-btn">
                    <div class="tips">
                        爱我就去关注我
                    </div>
                    <span class="icon-qrcode">
                    </span>
                </li>
                <li class="toggle-list">
                    <a href="/activity">
                        <div class="tips">
                            不过瘾，这还有
                        </div>
                        <span class="icon-more">
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
        -->
    </body>
</html>
