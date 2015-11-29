(function($, WEB_CONFIG, Z_Check, Z_Dom){

    var e=$("#unauth_main"),d=800;g=e.find(".login-box .switch"),gg=e.find(".regist-box .switch"),k=e.find(".login-box"),l=e.find(".regist-box"),r=k.find(".txt");
    var oLoginForm	= $('#loginForm'),
        oRegForm	= $('#registForm'),
        oChangeForm = $('#changeEmailForm'),
        oLoginUser 	= $('#J_LoginUser'),
        oLoginPwd  	= $('#J_LoginPsw'),
        oChangeUser = $('#J_ChangeUser'),
        oRegUser 	= $('#J_RegistUser'),
        oRegPwd		= $('#J_RegistPsw'),
        oRegCode	= $('#J_verifyCode'),
        oLoginCode	= $('#J_verifyCodeLogin'),
        oImgCode	= $('#verifyCodeImg'),
        oSendPhone	= $('#sendPhoneCode'),
    //oChangeCode	= $('#changeCodeBtn'),
        oLoginBtn	= $('#J_LoginButton'),
        oRegBtn		= $('#J_RegButton'),
        oChangeEmail= $('#J_ChaButton'),
        oSets 		= $('#J_LoginUser, #J_LoginPsw, #J_RegistUser, #J_ChangeUser, #J_verifyCode, #J_verifyCodeLogin, #J_phoneCode'),
        width    	= 0,
        time     	= 0,
        firstCode   = true,
        backUrl  	= WEB_CONFIG.backUrl,
        webType		= WEB_CONFIG.webType,
        lastUserid  = WEB_CONFIG.lastUserid;

    var h = {
        t : null,

        handleObj : null,

        caches : {},

        vailUser : false,
        vailCode : false,

        //返回补全框信息
        getDom : function(id, type){
            var s = id + '_' + webType;
            if(type != 'name'){
                s = typeof this.caches[s] === 'undefined' ?  $('#' + s) : this.caches[s];
            }
            return s;
        },

        //将回车按钮转化为tab
        enterToTab : function(input) {

            var flag = false,
                oForm = webType == 'reg' ? oRegForm : oLoginForm;
            if ( webType == 'change' ) {
                oForm = oChangeForm;
            }
            oForm.find('.tabInput').each(function(i){
                var o = $(this);

                if(flag === true){
                    o.focus();
                    return false;
                }

                if(o.attr('id') == input.attr('id') && o.attr('class') == input.attr('class')){
                    flag = true;
                }
            })
        },

        checkUser : function(o, succFunc){
            o.get(0).checkUserTimer = setTimeout(function(){
                var result,
                    errMsg 	= '',
                    sVal 	= o.val();

                if(!sVal){
                    return false;
                }

                if(sVal.indexOf('@') >= 0){
                    result = Z_Check.checkEmail(sVal);
                    errMsg = '邮件格式不正确';
                }else{
                    if (isNaN(sVal)) {
                        errMsg = '请输入正确的邮箱或手机号';
                    } else {
                        result = Z_Check.checkPhone(sVal);
                        errMsg = '手机格式不正确,请输入11位大陆手机号';
                    }

                }

                if(!result){
                    Z_Dom.disError(o, errMsg)
                    return false;
                }

                var data = {
                    'userid' : o.val(),
                    'act'	 : 'check'
                };

                $.post('./ajax/login2014/checkRegUserid.php', data, function(json){
                    if(json.info == 'ok'){
                        Z_Dom.disSuccess(o, 1);
                        succFunc && succFunc(json.ext);
                        h.vailUser = true;
                    }else{
                        Z_Dom.disError(o, json.msg);
                        $('#noticeTip').on('click', '.fastLogin', function(){
                            h.flip.login();
                            oLoginUser.val(oRegUser.val());
                            setTimeout(function(){
                                oLoginPwd.focus();
                            },800)

                        })
                        succFunc && succFunc(json.ext);;
                    }
                }, 'json')
            }, 150)
        },

        checkEmail : function(o){
            o.get(0).checkUserTimer = setTimeout(function(){
                var result,
                    errMsg 	= '',
                    sVal 	= o.val();

                if(!sVal){
                    return false;
                }

                if(sVal.indexOf('@') >= 0){
                    result = Z_Check.checkEmail(sVal);
                    errMsg = '邮件格式不正确';
                }else{
                    errMsg = '邮件格式不正确';
                }

                if(!result){
                    Z_Dom.disError(o, errMsg)
                    return false;
                }

                var data = {
                    'userid' : o.val(),
                    'act'	 : 'check',
                    'type'	 : 'email'
                };

                $.post('./ajax/login2014/checkRegUserid.php', data, function(json){
                    if(json.info == 'ok'){
                        Z_Dom.disSuccess(o, 1);
                        //succFunc && succFunc();
                        h.vailUser = true;
                    }else{
                        Z_Dom.disError(o, json.msg);
                    }
                }, 'json')
            }, 150)
        },
        //登陆处理
        login : function(){
            var data	 = null,
                code         = null,
                self 	 	 = this,
                hiddenPwd	 = null,
                userid   	 = oLoginUser.val().replace(/(^\s*)|(\s*$)/,""),
                password 	 = oLoginPwd.val().replace(/(^\s*)|(\s*$)/,"");

            if(!userid){
                oLoginUser.focus();
                Z_Dom.disError(oLoginUser,  '请填写账号/注册邮箱/注册手机号')
                return false;
            }

            if(!password){
                Z_Dom.disError(oLoginPwd,  '请填写密码', 1)
                return false;
            }

            //验证码
            if ($('#imgCodeBox').css('display') == 'block') {
                code = oLoginCode.val().replace(/(^\s*)|(\s*$)/,"");
                if(!code){
                    oLoginCode.focus();
                    Z_Dom.disError(oLoginCode,  '请填写验证码')
                    return false;
                }
            }

            oLoginBtn.attr('disabled', true);

            //按钮处理
            $('#loginBtnBox').addClass('login-btn-wait');
            oLoginBtn.val('登录中');

            //hiddenPwd = CryptoJS.MD5(password+"zol");
            $("#pwd").val(password);
            var checked = $('#autoMemberPass_login').attr('checked') ? 1 : 0;

            data = 	'{"phone":"'+userid+ '","password":"'+$("#pwd").val()+'"}';
            h.loginAjax('/user/login',data);
        },

        //注册处理
        register : function(){

            var data	 = null,
                self 	 	 = this,
                hiddenPwd	 = null,
                userid   	 = oRegUser.val().replace(/(^\s*)|(\s*$)/,""),
                password 	 = oRegPwd.val().replace(/(^\s*)|(\s*$)/,""),
                code	 	 = oRegCode.val().replace(/(^\s*)|(\s*$)/,""),
                checked = $('#autoMemberPass_reg').attr('checked') ? 1 : 0;
            clearTimeout(h.codeErrorNoticeTimer);
            if(!userid){
                Z_Dom.disError(oRegUser,  '请填写注册邮箱/注册手机号', 1)
                return false;
            }

//				if(h.vailUser === false){
//					Z_Dom.disError(oRegUser,  '请检查填写的注册邮箱/注册手机号是否正确', 1)
//					return false;
//				}

            if(!password){
                Z_Dom.disError(oRegPwd,  '请填写密码', 1)
                return false;
            }

            if(!code){
                Z_Dom.disError(oRegCode,  '请填写验证码', 1)
                return false;
            }

//				if(h.vailCode === false){
//					//oRegCode.focus();
//					Z_Dom.disError(oRegCode,  '验证码有误', 1)
//					return false;
//				}

            if(!checked){
                Z_Dom.disError(oRegCode,  '请阅读并同意用户注册协议和隐私权声明', false)
                return false;
            }

            oRegBtn.attr('disabled', true);

            // hiddenPwd = CryptoJS.MD5(password+"zol");
            // $("#pwd").val(pwd);

            data = 	'username='+userid+
            '&password='+$("#J_RegistPsw").val()+
            '&code='+code+
            '&backUrl='+backUrl;
            h.regAjax('/user/ajax/login2014/registerControl.php',data);
        },


        //进度条
        waitBar : function(num,url){
            clearInterval(time);
            time = setInterval(function(){
                $('#wait-bar').css('width',width+'%');
                if (width >= num) {
                    clearInterval(time);
                    if (url) {
                        window.location.href="/";
                    }
                }
                width  += 2;
            },30)
        },

        'loginAjax' : function(url,data){
            var xmlhttp;
            if (window.XMLHttpRequest) {		//非IE5  IE6
                xmlHttp=new XMLHttpRequest();
            } else {
                xmlHttp=new ActiveXObject("MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP");
            }
            xmlHttp.onreadystatechange=function(){
                //进度条
                $('#wait-bar').show();
                var readyState = xmlHttp.readyState;
                if (readyState < 4) {
                    h.waitBar(25*readyState,'');
                } else if (xmlHttp.readyState==4) {
                    if(xmlHttp.status==500){
                        alert(xmlHttp.responseText);
                    }
                    //响应完成
                    var json=xmlHttp.responseText;
                    if (json) {
                        json = JSON.parse(json);
                        if (json.code!='0') {

                            //出错  按钮处理
                            $('#loginBtnBox').removeClass('login-btn-wait');
                            oLoginBtn.val('马上登录');

                            //进度条
                            clearInterval(time);
                            $('#wait-bar').hide();


                            if (json.message) {
                                var obj = oLoginUser;

                                setTimeout(function(){
                                    Z_Dom.disError(obj,json.message)
                                    $('#noticeTip').on('click', '.fastReg', function(){
                                        h.flip.reg();
                                        oRegUser.val(oLoginUser.val());
                                        setTimeout(function(){
                                            oRegPwd.focus();
                                        },500);
                                        return false;
                                    })
                                }, 0)


                            }

                            oLoginBtn.attr('disabled', false);
                        } else {
                            h.waitBar(100, "/");
                        }
                    } else {
                        //出错  按钮处理
                        $('#loginBtnBox').removeClass('login-btn-wait');
                        oLoginBtn.val('马上登录');

                        //进度条
                        clearInterval(time);
                        $('#wait-bar').hide();
                        Z_Dom.disError(oRegPwd,'登录出错');

                        oLoginBtn.attr('disabled', false);
                    }

                } else {
                    //出错  按钮处理
                    $('#loginBtnBox').removeClass('login-btn-wait');
                    oLoginBtn.val('马上登录');

                    //进度条
                    clearInterval(time);
                    $('#wait-bar').hide();
                    Z_Dom.disError(oRegPwd,'登录出错');

                    oLoginBtn.attr('disabled', false);
                }
            };
            xmlHttp.open("POST",url,true);
            xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlHttp.send(data);
        },

        'regAjax' : function(url,data){
            var xmlhttp;
            if (window.XMLHttpRequest) {		//非IE5  IE6
                xmlHttp=new XMLHttpRequest();
            } else {
                xmlHttp=new ActiveXObject("MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP");
            }
            xmlHttp.onreadystatechange=function(){
                if (xmlHttp.readyState==4) {
                    //响应完成
                    var json=xmlHttp.responseText;
                    if (json) {
                        json = JSON.parse(json);
                        if (json.info=='error') {
                            if (json.msg) {
                                var oMsg = null;
                                switch(json.ext){
                                    case 'user':
                                        oMsg = oRegUser;
                                        break;
                                    case 'code':
                                        oMsg = oRegCode;

                                        break;
                                    case 'pwd':
                                        oMsg = oRegPwd;

                                        break;
                                }

                                Z_Dom.disError(oMsg,json.msg)
                            }

                            if (json.ext.indexOf('zol.com.cn') != -1) {
                                window.location.href=json.ext;
                            }
                            oRegBtn.attr('disabled', false);

                        } else {
                            var url = json.ext;

                            h.stat();
                            if (url) {
                                window.location.href=url;
                            } else {
                                window.location.href=backUrl;
                            }


                        }
                    } else {
                        Z_Dom.disError(null,'注册出错');
                        oRegBtn.attr('disabled', false);
                    }

                }
            };
            xmlHttp.open("POST",url,true);
            xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlHttp.send(data);
        },

        //翻转
        flip : {

            'reg' : function(){
                if (e.hasClass("switching")) return;
                e.addClass("switching");
                setTimeout(function(){ k.hide(), l.show();}, d/2);
                setTimeout(function(){ e.removeClass("switching")}, d);

                WEB_CONFIG.webType = webType = 'reg';

                Z_Dom.refreshImgCode(h.getDom('verifyCodeImg'));
                setTimeout(function(){
                    oRegUser.focus();
                }, 500)
            },

            'login' : function(){
                if (e.hasClass("switching")) return;
                e.addClass("switching");
                setTimeout(function(){ k.show(), l.hide();}, d/2);
                setTimeout(function(){ e.removeClass("switching")}, d);

                WEB_CONFIG.webType = webType = 'login';

                if ($('#imgCodeBox').css('display') == 'block') {
                    Z_Dom.refreshImgCode(h.getDom('verifyCodeImg'));
                }
                setTimeout(function(){
                    oLoginUser.focus();
                }, 500)
            }
        },

        getKeyCode : function(e){
            return e.keyCode;
        },

        doEnter : function(event, callback){
            var e = event || window.event;

            if(e.keyCode != 13) {
                return false;
            }

            callback && callback();
        },

        stat : function(){

            var oScript = null,
                ipCk = this.getCookie('ip_ck'),
                countUrl = 'http://pvtest.zol.com.cn/images/pvevents.gif';

            var s = window.location.href.split('#'),
                webUrl = encodeURIComponent(s[0]);

            countUrl += '?t=' + (new Date().getTime()) + '&ip_ck=' + ipCk + '&event=regajax';

            try{
                oScript = document.getElementById('countHit');
                document.body.removeChild(oScript);
            }catch(e){}
            oScript 			= document.createElement("script");
            oScript.src 		= countUrl;
            oScript.language 	= "javascript";
            oScript.type 		= "text/javascript";
            oScript.id			= "countHit";
            document.getElementsByTagName('head')[0].appendChild(oScript)
        },

        getCookie : function(name){
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

            if(arr=document.cookie.match(reg)){
                return unescape(arr[2]);
            }else{
                return '';
            }
        }
    };

    //事件绑定
    oSets.on({
//		
//		//修改
//		'change':function(){
//			var self = $(this);
//			Z_Dom.doInput(self)
//			
//		},

        //键盘按下
        'keydown': function(event){
            var self = $(this);

            Z_Dom.clearNot(self, true);

            Z_Dom.doInput(self, true);

            h.doEnter(event, function(){
                h.enterToTab(self);
                //event.preventDefault();
            })
        },

        //获取焦点
        'focus':function(){
            var self = $(this);
            Z_Dom.clearNot(self, true);
            Z_Dom.doInput(self);
        },

        //失去焦点
        'blur':function(){
            Z_Dom.clearNot($(this), false);
        },

        //输入
        'input': function(){
            var self = $(this);
            Z_Dom.doInput(self, true);

        }
    });

    $('#J_LoginUser, #J_RegistUser, #J_ChangeUser').on({
        'keyup' : function(event){
            var self = $(this),
                sIdName = h.getDom('tippopBox', 'name'),
                keyCode = h.getKeyCode(event),
                iVal = self.val();

            //过滤 上下键
            if(keyCode === 38 || keyCode === 40 || keyCode === 13){
                return false;
            }
            if(iVal.indexOf('@') != -1 && Z_Check.checkPrefixEmail(iVal)){
                var sIdName = h.getDom('tippopBox', 'name');
                Z_Dom.showComplete(sIdName, iVal, self, function(o, newVal){
                    h.getDom('tippopBox').hide();
                    o.val(newVal);
                    clearTimeout(h.completeTimer)
                    h.enterToTab(o);
                });

            }else{
                $('#' + sIdName).hide();
            }

            //记录原始值
            this.srcValue = iVal;
            this.index = -1;
        },

        'blur' : function(){
            h.completeTimer = setTimeout(function(){
                h.getDom('tippopBox').hide();
            }, 150)
        },

        'keydown' : function(event){

            var self = $(this),
                a = {
                    40 : 1,
                    38 : 1,
                    13 : 1
                },
                oBox = h.getDom('tippopBox'),
                keyCode = h.getKeyCode(event);

            if(typeof a[keyCode] != 'undefined' && oBox.length > 0 && oBox.is(":visible")){
                var iMax = 0,
                    index = this.index,
                    aLis = [],
                    sNewVal = false;

                oBox.find('li').each(function(i){
                    ++ iMax;
                    aLis.push($(this));
                })


                typeof aLis[index] != 'undefined' && aLis[index].removeClass('tippopHover')

                if(keyCode === 40){

                    if(index >= iMax - 1){
                        index = -1;
                        sNewVal = this.srcValue;
                    }else{
                        index ++;
                        aLis[index].addClass('tippopHover')
                    }



                }else if(keyCode === 38){

                    index --;

                    if(index < 0){
                        index = -1;
                        sNewVal = this.srcValue;
                    }else{
                        aLis[index].addClass('tippopHover')
                    }

                }else if(keyCode === 13){
                    if(index >= 0){
                        sNewVal = aLis[index].html()
                    }else{
                        sNewVal = this.srcValue;
                    }


                    //重置index
                    index = -1;
                    h.getDom('tippopBox').hide();
                    h.enterToTab(self)
                }

                sNewVal = sNewVal === false ? aLis[index].html() : sNewVal;
                self.val(sNewVal);
                this.index = index;
                return false;
            }
        }
    })

    oRegUser.on({
        'blur' : function(){
            h.checkUser($(this), function(userType){
                var sCodeMsg = '';

                //不同类型不同验证方式
                if(userType == 'phone'){
                    oSendPhone.show();
                    oImgCode.hide();
                    $("#phoneResCode").click();
                    $("#phoneCodeBox").show();
                    sCodeMsg = '手机验证码'

                    //oChangeCode.hide();
                }else{
                    $("#phoneCodeBox").hide();
                    oImgCode.show();
                    oSendPhone.hide();
                    //oChangeCode.hide();
                    sCodeMsg = '验证码';
                }

                oRegCode.prev('label').html(sCodeMsg)
            });

        },

        'clearInput' : function(){
            var self = $(this);
            clearTimeout(this.checkUserTimer)
            Z_Dom.clearNot(self)
            Z_Dom.doInput(self)
        }
    })

    oChangeEmail.on({
        'click': function(){
            var data	 = null,
                that		 = this,
                self 		 = $(that),
                code         = oRegCode.val().replace(/(^\s*)|(\s*$)/,""),
                uid          = $('#uid').val().replace(/(^\s*)|(\s*$)/,""),
                email   	 = oChangeUser.val().replace(/(^\s*)|(\s*$)/,"");

            if(!email){
                oChangeUser.focus();
                Z_Dom.disError(oChangeUser,  '请输入更换的邮箱')
                return false;
            }

            //验证码
            if(!code){
                oRegCode.focus();
                Z_Dom.disError(oRegCode,  '请填写验证码')
                return false;
            }

            data = {
                'uid' 	 : uid,
                'code'	 : code,
                'act'	 : 'change_email',
                'email'	 : email
            };

            $.post('./ajax/login2014/changeEmail.php', data, function(json){
                if(json.info == 'ok'){
                    window.location.href=json.msg;
                }else{
                    var oMsg = null;
                    switch(json.ext){
                        case 'user':
                            oMsg = oRegUser;
                            break;
                        case 'code':
                            oMsg = oRegCode;
                            break;
                    }

                    Z_Dom.disError(oMsg,json.msg)
                }
            }, 'json')

        }

    })
    oRegPwd.on({
        'keyup' : function(){
            var self = $(this),
                that = this,
                iVal = self.val(),
                size = iVal.length;

            that.isError = 0;
            if(size >= 4 && size <= 16){
                Z_Dom.clearNot(self)
                Z_Dom.doInput(self, true)
                Z_Dom.showPwdComplex(self, iVal);
            }else if(size > 16){
                that.isError = 1;
                Z_Dom.disError(self, '密码长度在4-16位之间');
                return false;
            }

        },

        'keydown' : function(event){
            var self = $(this);

            if(!this.isError){
                Z_Dom.clearNot(self)
                Z_Dom.doInput(self, true)
            }
            h.doEnter(event, function(){
                h.enterToTab(self);
            })
        },

        //获取焦点
        'focus':function(){
            if(!this.isError){
                var self = $(this);
                Z_Dom.clearNot(self)
                Z_Dom.doInput(self)
            }
        },

        //失去焦点
        'blur':function(){
            var self = $(this),
                that = this;

            this.blurVerifyTimer = setTimeout(function(){
                var sValue  = self.val();

                if(!that.isError){

                    //var size = sValue.length;

                    Z_Dom.clearNot(self, false);

                    if(!sValue){
                        return false;
                    }

                    if(Z_Check.checkPwdSize(sValue)){
                        if (Z_Check.checkPwdRule(sValue)) {
                            Z_Dom.disSuccess(self, 1);
                        } else {
                            Z_Dom.disError(self, '密码不符合规则')
                        }
                    }else{
                        Z_Dom.disError(self, '密码长度在4-16位之间')
                    }
                }

                $('#pwdComplex').hide();
            }, 100)

        },

        'clearInput':function(){
            var self = $(this);
            Z_Dom.clearNot(self);
            Z_Dom.doInput(self);
            clearTimeout(this.blurVerifyTimer)
        }
    })

    oChangeUser.on({
        'blur' : function(){
            h.checkEmail($(this));
        },

        //获取焦点
        'focus':function(){
            var self = $(this);
            Z_Dom.clearNot(self, true);
            Z_Dom.doInput(self);
        },

        'clearInput' : function(){
            var self = $(this);
            clearTimeout(this.checkUserTimer)
            Z_Dom.clearNot(self)
            Z_Dom.doInput(self)
        }
    })

    //验证框绑定事件
    $('#J_verifyCodeLogin, #J_verifyCode').on('blur', function(){
        var self = $(this),
            sValue  = self.val(),
            userid  = oRegUser.val(),
            codeType= 'Other';

        if(!sValue){
            //Z_Dom.clearNot(self)
            return false;
        }

        if (!userid) {
            userid = oChangeUser.val();
        }

        if(sValue.length > 6){
            Z_Dom.disError(self, '验证码错误');
            return false;
        }

        if (!userid) {
            userid = oLoginUser.val();
            codeType = 'Login';
        }

        $.post('./ajax/login2014/checkCode.php' + '?r=' + (new Date()).getTime(), {value : sValue, userid : userid, codeType : codeType}, function(json){
            if(json.info == 'ok'){
                Z_Dom.disSuccess(self, 1);
                h.vailCode = true;
            }else{
                h.codeErrorNoticeTimer = setTimeout(function(){
                    //alert(json.msg);
                    Z_Dom.disError(self, json.msg);
                }, 150)

            }
        }, 'json')
    })

    //发送手机验证码
    oSendPhone.on('click', function(){
        var self = $(this),
            oPhoneCode = $("#J_phoneCode"),
            sCode = oPhoneCode.val(),
            iPhone = oRegUser.val();

        if(self.hasClass('verifycode-hassend')){
            return false;
        }

        if(!Z_Check.checkPhone(iPhone)){
            Z_Dom.showNotice(oRegForm, '手机格式不正确，请输入11位大陆手机号');
            return false;
        }

        if(!sCode){
            oPhoneCode.focus();
            Z_Dom.disError(oPhoneCode,  '请填写验证码')
            return false;
        }


        var t = $('#regT').val(),
            token = $('#sendCodeToken').val(),
            oData = {phone:iPhone,token:token,t:t,code:sCode};

        $.get("./ajax/login2014/sendMsgCode.php", oData, function(json) {
            if (json.info =='ok') {

                self.addClass('verifycode-hassend').html('验证码已发送 (<span>'+WEB_CONFIG.phoneSendInter+'</span>)');

                self.get(0).t = setInterval(function(){
                    var o = self.find('span'),
                        val = parseInt(o.html(), 10);

                    val = isNaN(val) ? 0 : val;


                    if(val < 1){
                        clearInterval(self.get(0).t);
                        self.removeClass('verifycode-hassend').html('重新发送验证码');
                        return false;
                    }
                    o.html(--val);
                }, 1000)

                $("#phoneResCode").click();
                //$("#phoneCodeBox").hide();

            } else {
                Z_Dom.showNotice(oRegForm, json.msg);
            }
        }, 'json');
    })

    //点击叉号清空输入框文字
    $('.delete-btn').on('click',function(){
        $(this).nextAll('.txt').val("").focus().trigger('clearInput');
        $(this).hide();
        return false;
    });


    //验证码图片更换
    $('#unauth_main').find('.changeCodeBtn, .verifyCodeImg').on('click', function(){
        Z_Dom.refreshImgCode(h.getDom('verifyCodeImg'));
        oLoginCode.val('').focus();
        oRegCode.val('').focus();
        oImgCode.val('').focus();
    })

    $('#phoneResCode').on('click', function(){
        Z_Dom.refreshImgCode($('#phoneCodeImg'))
    })

    $("#phoneCodeImg").on('click', function(){

        $("#J_phoneCode").focus();
    })

    oLoginBtn.on('click', function(){
        h.login();
        return false;
    })

    $('#J_RegButton').on('click', function(){
        h.register();
        return false;
    })

    //登陆提交
    oLoginForm.on('submit', function(){
        return false;
        h.login();

        return false;
    });


    //登录注册版块翻转效果js
    g.on("click",function(){
        h.flip.reg();
    });

    gg.on("click",function(){
        h.flip.login();
    });


    setTimeout(function(){
        oLoginUser.val(oLoginUser.val())
        oLoginUser.focus();
    }, 100 )

    if (lastUserid) {
        //密码获取焦点
        setTimeout(function(){
            oLoginUser.blur();
            oLoginPwd.focus();
        },200);
    }
})($, WEB_CONFIG, Z_Check, Z_Dom);

