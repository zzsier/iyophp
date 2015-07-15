<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"/>
    <meta content="telephone=no" name="format-detection" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <title>问卷调查</title>
    <link href="/css/base.css" type="text/css" rel="stylesheet">
    <script type="text/javascript">
	window.onerror = function(message, url, line_num) {
		alert(message);
		//var monitor_host='http://monitor.m.koudai.com/monitor/';
		//var script = document.createElement("script");
	    //var url_=monitor_host+'activity/jsErrorReported.do';
        //    url_+='?errorMsg='+encodeURIComponent(message);
        //    url_+='&from='+encodeURIComponent(url);
        //    url_+='&lineNum='+encodeURIComponent(line_num);
        //    url_+='&ua='+encodeURIComponent(navigator.userAgent);
        //    url_+='&url='+encodeURIComponent(document.URL);
        //    url_+='&type=quesiton&'+Math.random();
		// 	script.type = "text/javascript";
	    //    script.src =url_;
	    //    script.async = true;
	    //    document.getElementsByTagName('head')[0].appendChild(script);
		return false;
	};
</script>
</head>
<body><!--COMPRESS.CODE.START-->

<header id="logo_header">&nbsp;</header>

<header>
    <p id="desc"></p>
</header>

<p id="step" class="rel"> <span id="step_span" class="abs">&nbsp;</span> &nbsp;</p>

<section id="question_sec">

</section>
<a href="javascript:void(0)" id="question_begin" class="btnok margin_auto" style="display:none">开始</a>
<a href="javascript:void(0)" id="question_next" class="btnok margin_auto">下一步</a>
<a href="javascript:void(0)" id="question_submit" class="btnok margin_auto">提交</a>

<footer id="question_ft" class="c_txt"></footer>
<script src="/js/base_H5.js"></script>
<script>
(function(){
    var w=window, cache={};

    function mTpl(str, data, startSelector, endSelector, isCache){
        var fn, d=data, valueArr=[], isCache=isCache!=undefined ? isCache : true;
        if(isCache && cache[str]){
            for (var i=0, list=cache[str].propList, len=list.length; i<len; i++){valueArr.push(d[list[i]]);}
            fn=cache[str].parsefn;
        }else{
            var a=startSelector, b=endSelector, propArr=[], formatTpl=(function(str){
                if(!a){a='['+'%'; b='%'+']';}
                var el=document.getElementById(str), tpl=el? el.innerHTML : str;

                return tpl
                        .replace(/\\/g, "\\\\")
                        .replace(/[\r\t\n]/g, " ")
                        .split(a).join("\t")
                        .replace(/'/g, "\r")
                        .replace(new RegExp("\t=(.*?)"+b,"g"), "';\n s+=$1;\n s+='")
                        .split("\t").join("';\n")
                        .split(b).join("\n s+='")
                        .split("\r").join("\\'");
            })(str);

            for (var p in d) {propArr.push(p);valueArr.push(d[p]);}
            fn = new Function(propArr, "var s='';\n s+='" + formatTpl+ "';\n return s");
            isCache && (cache[str]={parsefn:fn, propList:propArr});
        }

        try{
            return fn.apply(w,valueArr);
        }catch(e){
            var fnName='mTpl'+Date.now(), fnStr='var '+ fnName+'='+fn.toString(),
                    head=document.getElementsByTagName("head")[0], script = document.createElement("script");
            ua = navigator.userAgent.toLowerCase();
            if(ua.indexOf('gecko') > -1 && ua.indexOf('khtml') == -1){w['eval'].call(w, fnStr); return}
            script.innerHTML = fnStr;
            head.appendChild(script);
            head.removeChild(script);
            w[fnName].apply(w,valueArr);
        }
    }

    typeof exports != "undefined" ? exports.mTpl = mTpl : w.mTpl = mTpl;
})();
var enAnArray='A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(',');
//获取电话
function getTelHtml(q){
    var tmpl = '<article class="question_atc" >'+
            '<h2>[%=title%]：</h2> '+
            '<input type="tel" name="user_telephone" id="user_telephone" class="question_input">'+
            '</article>';
    return mTpl(tmpl,q);
    //return mTpl({str:tmpl,data:q});
}
//获取多选题
function getCheckBoxHtml(q,islast,i,length){
    q.islast=islast;
    q.i=i;
    q.len=length;
    q.anValues=enAnArray;
    var tmpl = '<article class="question_atc" [%if(i==0){%]class="hide"[%}%]  [%if(islast){%]id="question_lastest" class="hide"[%}%] data-muti="1">'+
            '<h2>[%=title%]</h2>'+
            '[%for(var j=0;j<data.length;j++){ var asJson=data[j];%]'+
            '<div><label>'+
            '<input type="checkbox" name="q_[%=(i+1)%]" value="[%=anValues[j]%]" data-goto="[%if(asJson.next>1){%][%=(asJson.next-(i+1))%][%}else if(asJson.datagoto==-2){%][%=(len-(i+2))%][%}%]" class="question_checkbox"'+
            '[%if(asJson.extra_type=="true"){%] data-input="1" data-must="[%if(asJson.extra_necessory){%]1[%}else{%]0[%}%]"[%}%] >[%=asJson.title%]'+
            ' [%if(asJson.extra_type=="true"){%] </label> <label><input type="text" maxlength="100" placeholder="[%if(asJson.extra_necessory){%]必填[%}else{%]选填[%}%]" class="question_input">[%}%]'+
            '</label></div>'+
            '[%}%]'+
            '</article>';
    return mTpl(tmpl,q);
    //return mTpl({str:tmpl,data:q});
}
//获取单选题
function getRadioHtml(q,islast,i,length){
    q.islast=islast;
    q.i=i;
    q.len=length;
    q.anValues=enAnArray;
    var tmpl = '<article class="question_atc"  [%if(islast){%]id="question_lastest" class="hide"[%}%]  data-muti="0">'+
            '<h2>[%=title%]</h2>'+
            '[%for(var j=0;j<data.length;j++){ var asJson=data[j];%]'+
            '<div><label>'+
            '<input type="radio" name="q_[%=(i+1)%]" value="[%=anValues[j]%]" data-goto="[%if(asJson.next>(i+1)){%][%=(asJson.next-(i+1))%][%}%]" class="question_radio"'+
            '[%if(asJson.extra_type=="true"){%] data-input="1" data-must="[%if(asJson.extra_necessory){%]1[%}else{%]0[%}%]"[%}%] >[%=asJson.title%]'+
            ' [%if(asJson.extra_type=="true"){%]</label> <label><input type="text" maxlength="100" placeholder="[%if(asJson.extra_necessory){%]必填[%}else{%]选填[%}%]" class="question_input">[%}%]'+
            '</label></div>'+
            '[%}%]'+
            '</article>';
    return mTpl(tmpl,q);
}
//获取填空题
function getInputHtml(q,islast,i,length){
    q.islast=islast;
    q.i=i;
    q.len=length;
    var tmpl = '<article  class="question_atc" [%if(islast){%]id="question_lastest" class="hide"[%}%]  data-input="1" >'+
            '<h2>[%=title%]</h2>'+
            '<input type="text" maxlength="200" placeholder="必填"  class="question_input">'+
            '</article>';
    return mTpl(tmpl,q);
}
//获取矩阵题
function getMatrixHtml(q,islast,i,length){
    q.islast=islast;
    q.i=i;
    q.len=length;
    q.anValues=enAnArray;
    var tmpl='<article  class="question_atc"  data-rows="[%=rows.length%]" data-matrix="1" [%if(islast){%]id="question_lastest" class="hide"[%}%] >'+
            '<div class="field ui-field-contain" id="div11" req="1" topic="11" data-role="fieldcontain" type="6"><div class="field-label">'+
            '<h2>[%=title%]</h2>'+
            '<span class="qtypetip">&nbsp;</span></div>'+
            '<table cellspacing="0" class="matrix-rating">'+
            '<tbody>'+
            '<tr class="trlabel">'+
            '<th></th>'+
            '[%for(var j=0;j<columns.length;j++){ var clo=columns[j];%]'+
            '<th>[%=clo.title%]</th>'+
            '[%}%]'+
            '</tr>'+
            '[%for(var x=0;x<rows.length;x++){ var row=rows[x];%]'+
            '<tr><td class="title">[%=row.title%]</td>'+
           // '</tr><tr tp="d" fid="q11_0">'+
            '[%for(var j=0;j<columns.length;j++){ var clo=columns[j];%]'+
            '<td><input type="radio" name="q_[%=(i+1)%]_[%=(x+1)%]" value="[%=anValues[j]%]" data-goto="" class="question_radio q_[%=(x)%]" ></td>'+
            '[%}%]'+
            '</tr>'+
            '[%}%]'+
            '</tbody></table>' +
            '</div>'+
            '</article>';
    return mTpl(tmpl,q);
}


function getHtml(data){
    var tpml= ''+
            '[%for(var i=0;i<questions.length;i++){ var q=questions[i]; var as=q.data;%]' +
            '[%if(q.type=="tel"&&i==0){%]'+//如果是电话,且是第一个，则需要验证电话
            '[%=getTelHtml(q)%]'+
            '[%}else if(q.type=="checkbox"){%]'+
            '[%=getCheckBoxHtml(q,i==(questions.length-1),i,questions.length)%]'+
            '[%}else if(q.type=="radio"){%]'+
            '[%=getRadioHtml(q,i==(questions.length-1),i,questions.length)%]'+
            '[%}else if(q.type=="vote"){%]'+
            '[%=getRadioHtml(q,i==(questions.length-1),i,questions.length)%]'+
            '[%}else if(q.type=="matrix"){%]'+
            '[%=getMatrixHtml(q,i==(questions.length-1),i,questions.length)%]'+
            '[%}else if(q.type=="text"){%]'+
            '[%=getInputHtml(q,i==(questions.length-1),i,questions.length)%]'+
            '[%}'+
            '}%]';
	var content = eval('(' + data.content + ')');
    var html= mTpl(tpml,content);// mTpl({str:tpml,data:data.result});

    return html;
}

function trim(s)
{
    return s.replace(/(^\s*)|(\s*$)/g, '');
}
var Ques = {
    count : $(".question_atc").length(),
    data : [],//13910099304,a,abc,e用户输入的内容,a,,a,b
    step : 0,
    atc : $(".question_atc"),
    getAnData:function(){
        var target = $(".current_question_atc").eq(0),//定位dom
                muti = Number(target.attr("data-muti")),//是否多选
                isInput=Number(target.attr("data-input")),//是否天空
                isMatrix=Number(target.attr("data-matrix")),//是否矩阵
                data = "",//临时数据存放
                goto = false,//默认不跳转
                gotoCount = 0,//默认跳转个数
                mustInput = false,//默认不需要输入内容
                hasSelected = false,//默认没有选中的
                inputNoSelect=false;
                extInputValue='';
        var reData={
            goto:false,
            gotoCount:0,
            data:data,
            status:1
        }

        if(muti){//多选
            var _checkbox = target.find(".question_checkbox"),
                    _l = _checkbox.length(),
                    _dom = $$(".current_question_atc")[0].getElementsByClassName("question_checkbox");

            for(var i = 0; i < _l; i++){
                var checkDom=_checkbox.eq(i);
                if(_dom[i].checked){//第某个选中
                    hasSelected = true;
                    data += ','+_dom[i].value;//选中值
                    if(Number(checkDom.attr("data-input"))){//需要输入
                        extInputValue=checkDom.parent().parent().find(".question_input").eq(0).val();
                        data = data + extInputValue;

                        if(Number(checkDom.attr("data-must"))){//必须输入
                            mustInput = true;
                        }
                    }
                    if(Number(checkDom.attr("data-goto"))){//向后跳转几个
                        goto = true;
                        gotoCount = Number(checkDom.attr("data-goto"));
                    }
                }
                //检测输入了但是没选选项的
                else{
                  //  alert(checkDom.attr("data-input"));
                    if(Number(checkDom.attr("data-input"))) {//有输入东西但是没选择
                      // alert(checkDom.parent().parent().find(".question_input").eq(0).val());
                        if(checkDom.parent().parent().find(".question_input").eq(0).val()&&trim(checkDom.parent().parent().find(".question_input").eq(0).val())!=''){
                            inputNoSelect=true;
                            continue;
                        }

                    }
                }

            }
            data=data.substr(1,data.length);

        }
        else if(isMatrix){//矩阵题
            var rows=Number(target.attr("data-rows"));//获取行数
            var selectCount=0;
            for(var j=0;j<rows;j++){
                var cssname='.q_'+j;
                var _radio = target.find(cssname),
                        _l = _radio.length(),
                        _dom = $$(".current_question_atc")[0].getElementsByClassName('q_'+j);
                for(var i = 0; i < _l; i++){
                    if(_dom[i].checked){//第某个选中
                      //  hasSelected = true;
                        data += ','+_dom[i].value;//选中值
                        selectCount++;
                        break;
                    }
                }

            }
            if(selectCount==rows){
                hasSelected = true;
            }
            data=data.substr(1,data.length);
        }
        else   if(isInput){
            mustInput = true;
            data = encodeURIComponent(trim(target.find(".question_input").eq(0).val()));
        }
        else{//单选
            var _radio = target.find(".question_radio"),
                    _l = _radio.length(),
                    _dom = $$(".current_question_atc")[0].getElementsByClassName("question_radio");

            for(var i = 0; i < _l; i++){
                if(_dom[i].checked){//第某个选中
                    hasSelected = true;
                    data = _dom[i].value;//选中值

                    if(Number(_radio.eq(i).attr("data-goto"))){//向后跳转几个
                        goto = true;
                        gotoCount = Number(_radio.eq(i).attr("data-goto"));
                    }

                    if(Number(_radio.eq(i).attr("data-input"))){//需要输入
                        extInputValue=_radio.eq(i).parent().parent().find(".question_input").eq(0).val();
                        data = data + extInputValue;

                        if(Number(_radio.eq(i).attr("data-must"))){//必须输入
                            mustInput = true;
                        }
                    }

                    break;
                }
            }
        }
        //如果是纯填空题
        if(isInput){
            if(mustInput && (!target.find(".question_input").eq(0).val()||trim(target.find(".question_input").eq(0).val())=='')){
                M._alert("请输入内容");
                reData.status=-1;
                return reData;
            }
        }
        else if(inputNoSelect){
            M._alert("输入了内容但是没有选择该选项");
            reData.status=-1;
            return reData;
        }
        else{
            if(!hasSelected){
                M._alert("请选择");
                reData.status=-1;
                return reData;
            }

            if(hasSelected && mustInput && (trim(extInputValue)==''||extInputValue=="")){
                M._alert("请输入内容");
                reData.status=-1;
                return reData;
            }
        }
        reData={
            goto:goto,
            gotoCount:Number(gotoCount),
            data:data,
            status:1
        }
        return reData;
    },
    doQues : function(){
        $("#question_next").bind("click",function(){

            var reData= Ques.getAnData();
            if(reData.status==-1){
                return;
            }
            Ques.step = Ques.step + 1 + (reData.goto ? reData.gotoCount : 0);
            Ques.data.push(reData.data);
            if(reData.goto){
                for(var i = reData.gotoCount; i--;){
                    Ques.data.push(" ");
                }
            }

            Ques.doStep();
        })
    },
    doStep : function(){
        $(".current_question_atc").eq(0).removeClass("current_question_atc");
//            console.log(Ques.step);
//            console.log(Ques.count);

        if(Ques.step == Ques.count-1){
            Ques.atc.eq(Ques.step).addClass("current_question_atc");
            $("#question_next").hide();
            //$("#question_lastest").show();
            $("#question_submit").show().bind("click",function(){
                var reData= Ques.getAnData();
                if(reData.status==-1){
                    return;
                }
                try{
                Ques.data.push(reData.data);
                $("#step_span").css("width","100%");
                ;//Ques.data.join(",")

                M.gaq("填写问卷-完成");

                $("#question_lastest").hide();
                $(this).hide();
                }
                catch(e){
                   throw new Error(e);
                   M._alert("提交问卷异常！","");
                }
                //http://localhost:8080/questionnaire/submit?question_id=2&answer=asdfsdsf
              try{
               M.ajax({
                    type : "get",
                    url :"http://123.59.53.158/question/answer?id="+qId+"&answer="+ encodeURIComponent(Ques.data.join("|")) ,
                    success : function(data){
                        if(data.code==0){
                            M._alert(window.finishText,"")
                            M.gaq("提交问卷-成功");
                            M.setCookie("already_answer_"+qId,"1");
                        }
                        else{
                            M._alert("提交问卷失败！","");
                        }

                    },
                    error:function(data){
                           M._alert("提交问卷失败！","");

                    }
                })
               }
               catch(e){
                throw new Error(e);
                M._alert("提交问卷异常！","");
               }

  //               M.jsonp("${question_host}submit?question_id="+qId+"&answer="+ encodeURIComponent(Ques.data.join("|")),function(data){
  //                  M.gaq("提交问卷-成功");
  //                  M.setCookie("already_answer_"+qId,"1");
  //              })
            })
        }
        else{
            Ques.atc.eq(Ques.step).addClass("current_question_atc");
        }

        $("#step_span").css("width",Ques.step/Ques.count*100 +"%");
    },

    init : function(){
        Ques.count =$(".question_atc").length();
        Ques.atc =$(".question_atc"),
        Ques.doStep();

        $("#question_begin").bind("click",function(){
            //如果又电话号码，则需要验证
            //  console.log(("#user_telephone").length());
            _this = $(this);
            if($("#user_telephone")&&$("#user_telephone").length()>0) {
                var tele = $("#user_telephone").val();


                if (_this.hasClass("isLoading")) {
                    return;
                }

                if (tele && !isNaN(tele)) {
                    _this.addClass("isLoading").html("loading...");

                    M.ajax({
                        type: "jsonp",
                        part: "UDC",
                        url: "http://login.koudai.com/weidian/seller/observe?param=" + M.toJSON({
                            telephone: tele,
                            country_code: "86"
                        }),
                        success: function (data) {//省略status_code的判断
							var content = eval('(' + data.content + ')');
                            if (content.registed) {//已经注册过的卖家
                                _this.hide();
                                $("#question_next").show();
                                Ques.step = 1;
                                Ques.data.push(tele);
                                Ques.doStep();
                                Ques.doQues();
                                M.gaq("填写问卷-开始");
                            }
                            else {
                                M._alert("请正确输入微店注册手机号");
                                _this.removeClass("isLoading").html("开始");
                            }
                        },
                        error: function (data) {
                            M._alert(data.status.status_reason);
                            _this.removeClass("isLoading").html("开始");
                        }
                    })
                }
                else {
                    M._alert("请正确输入微店注册手机号");
                }
            }else{
                var reData= Ques.getAnData();
                if(reData.status==-1){
                    return;
                }
                Ques.step = Ques.step + 1 + (reData.goto ? reData.gotoCount : 0);
                Ques.data.push(reData.data);
                if(reData.goto){
                    for(var i = reData.gotoCount; i--;){
                        Ques.data.push(" ");
                    }
                }
                _this.hide();
                $("#question_next").show();
                Ques.doStep();
                Ques.doQues();
                M.gaq("填写问卷-开始");
            }
        })
    }
}
var qId= M.urlQuery('id');
M.jsonp("http://123.59.53.158/question/query?id="+qId,function(data){
	var content = eval('(' + data.content + ')');
    //$('#desc').html(content);
    window.finishText=content.finishtext||content.finishText;
    var logo=content.logo||'http://s.koudai.com/images/common/common_hd_logo.png?v=2015030502';
    $('#question_sec').html(getHtml(data));
    $('#logo_header').css('background-image','url('+logo+')');
    $("#question_begin").show();
    if(Number(M.getCookie("already_answer_"+qId)) === 1){
        $("#step").hide();
        $("#question_begin").hide();
        M._alert("您已成功填写过，感谢您的支持！","",true);
    }
    else{
        Ques.init();

    }
});
</script>
</body>
</html>
