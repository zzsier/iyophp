$(function(){
    autoSwiper();
    slideToggleFold();
    countTimeAgo();
    $("#closebtn").click(function(){
        $(this).parent().parent().hide();
    });
});
window.onload = function(){
    $(".flayer").show();
};
//����ͼ
function autoSwiper(){
    function onresizeScreen(){
        if($(document).width()>=1000){
            $(".focus,#slide_01").width(320).height(160);
            $(".picbox").width(320);
            $("#slide_01 img").width(320).height(160);
        }else{
            //$(".focus,#slide_01").width("auto").height("");
            //$(".picbox").width("auto");
            //$("#slide_01 img").width("100%").height("");
        };
        if($(document).width()<=375){
            $(".newslist dd h2").css({"font-size":"14px"});
        }else{
            $(".newslist dd h2").css({"font-size":"16px"});
        };
    };
    //��ʼ�Խ���ͼ���Ѻ��жϽ��PC�Ķ�ͼƬ����Ӧ��������
    //onresizeScreen();
    //onresize=function(){onresizeScreen();}
    var swiper1 = new Swiper('#slide_01', {
        pagination: '.swiper-pagination01',
        paginationClickable: true,
        loop : true,
        autoplay : 4000,
        spaceBetween: 30,
		onInit: function(){
		  //�������������WAP����ͼ����ʾ
		  //$("div[data-swiper-slide-index='2']").hide();
		  //$(".swiper-pagination01 span").eq(2).hide();
		}
    });

    var swiper2 = new Swiper('#slide_02', {
        pagination: '.swiper-pagination02',
        paginationClickable: true,
        loop : true,
        autoplay : 4000,
        spaceBetween: 30
    });

    var swiper3 = new Swiper('#slide_03', {
        pagination: '.swiper-pagination03',
        paginationClickable: true,
        loop : true,
        autoplay : 4000,
        spaceBetween: 30
    });

    var swiper0 = new Swiper('#slide_00', {
        pagination: '.swiper-pagination03',
        paginationClickable: true,
        loop : true,
        autoplay : 4000,
        spaceBetween: 30
    });

    var swiper4 = new Swiper('#slide_04', {
        pagination: '.swiper-pagination03',
        paginationClickable: true,
        loop : true,
        autoplay : 4000,
        spaceBetween: 30
    });

    var swiper5 = new Swiper('#slide_05', {
        pagination: '.swiper-pagination03',
        paginationClickable: true,
        loop : true,
        autoplay : 4000,
        spaceBetween: 30
    });


};
//�����ʾ����
function slideToggleFold(){
    $("#foldbtn").click(function(){
        $(this).toggleClass('show');
        $("#foldbox").slideToggle(100);
    });
    $(".clickbtn").click(
        function(){
            $(this).toggleClass('show');
            $(this).parent().find(".foldlist").slideDown('fast');
        });
};
//����ʱ��ǰ
function countTimeAgo(){
    function timeAgo(publishTime){
        var d_minutes,d_hours,d_days;
        var timeNow = parseInt(new Date().getTime()/1000);
        var d;
        d = timeNow - publishTime;
        d_days = parseInt(d/86400);
        d_hours = parseInt(d/3600);
        d_minutes = parseInt(d/60);
        if(d_days>0 && d_days<4){
            return d_days+"��ǰ";
        }else if(d_days<=0 && d_hours>0){
            return d_hours+"Сʱǰ";
        }else if(d_hours<=0 && d_minutes>0){
            return d_minutes+"����ǰ";
        }else{
            var s = new Date(publishTime*1000);
            // s.getFullYear()+"��";
            return (s.getMonth()+1)+"��"+s.getDate()+"��";
        }
    };
    var obj = $("time.timeago");
    var len = $(obj).length;
    for(var i=0;i<len;i++){
        var pTime = $(obj[i]).attr("publishTime");
        var pubTime = parseInt(Date.parse(pTime)/1000);
        $(obj[i]).html(timeAgo(pubTime));
    };
};
