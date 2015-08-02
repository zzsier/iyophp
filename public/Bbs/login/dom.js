/**
 * 验证类
 */
window.Z_Dom = {
		
	lockNotice : 0,
		
	//显示密码复杂度 1 简单 2中度 3复杂
	showPwdComplex : function(o, val){
		
		var oBox,
			lv = 0,
			self = this,
			setting = {
				1 : {'name' : '弱', 'className' : ''},
				2 : {'name' : '中', 'className' : 'middle'},
				3 : {'name' : '强', 'className' : 'strong'}
			}
			oParDiv = o.closest('.user-pwd');
		
		oBox = self.createPwdComplexBox(oParDiv);
		//计算密码复杂度
		lv = val.length >= 11 ? 1 : lv;
		val.match(/[a-z]/i) && lv++;
		val.match(/[0-9]/) && lv++;
		val.match(/(.[^a-z0-9])/) && lv++;

		if(typeof oBox == 'undefined' || oBox.length < 1 || lv < 1){
			return false;
		}
		
		lv = lv > 3 ? 3 : lv;

		oBox.attr('class', 'pwd-strength ' + setting[lv].className);
		oBox.find('.pwd-strength-title').html(setting[lv].name)
		
	},
	
	//创建密码复杂度box
	createPwdComplexBox : function(o){
		var oNew = $('#pwdComplex'),
			str = '';
		
		if(oNew.length > 0){
			oNew.show();
			return oNew;
		}
		
		str = '<div class="pwd-strength" id="pwdComplex">'
			+ '<span class="pwd-strength-bg">&nbsp;</span>'
			+ '<span class="pwd-strength-sco">&nbsp;</span>'
			+ '<span class="pwd-strength-title">弱</span>'
			+ '</div>';
		oNew = $(str);
		o.after(oNew);
		oNew.show();
		
		return oNew;
	},
	

	
	//错误提示
	disError : function(o, msg, getFocus, extHtml){
		var self = this;
		
		if(typeof o != 'object' || o === null){
			return false;
		}
		
		oItem = o.closest('.item');
		self.errorObj = o;
		getFocus && o.focus();
		oItem.addClass('item-wrong');
		self.showNotice(oItem.closest('.formBox'), msg, extHtml);
	},
	
	//清除错误提示
	clearNot : function(o, closeNot){
		
		closeNot = closeNot === undefined ?  1 : closeNot;
		o.parent().removeClass('item-focus');
		this.disSuccess(o, 0);
		
		if(!o.val()){
			o.siblings('label[for="'+o.attr('id')+'"]').show();
		}
		
		if(closeNot){
			var oError = this.errorObj;
//			if(oError!=null){
//				console.log(o.attr('id'));
//				console.log('error' + oError.attr('id'));
//			}
	
			if(oError != null && o.attr('id') === oError.attr('id')){
				
				$('#noticeTip').hide();
				this.errorObj = null;
			}
			
		}
		
	},
	
	//数据正确提示
	disSuccess : function(o, way){
		var oIco = o.closest('.itembox').find('.right-ico');
		way ? oIco.show() : oIco.hide();
	},
	
	//创建提示框
	showNotice : function(oBox, msg, extHtml){
		var self = this,
			o = $('#noticeTip');
		
		if(o.length > 0){
			o.off('click').remove();
		}
		
		
		var extHtml = extHtml || '',
			str = '<div id="noticeTip" class="wrong-tips" style="display:block">'
				+ '<i class="wrong-ico"></i>'+ msg + '&nbsp;&nbsp;'
				+ extHtml + '</div>';
		
		o = $(str);
		oBox.before(o);

		
		oBox.show();
	},
	
	//创建信息补全框
	showComplete : function(sIdName, sVaule, o, callback){
		var sNew 	= '',
			self    = this,
			oLis	= [],
			oBox 	= $('#' + sIdName),
			oSupp 	= WEB_CONFIG.supportMail,
			str 	= '';
		
		for(var i = 0, total = oSupp.length; i < total; i ++){
			sNew = sVaule.substr(0, sVaule.indexOf('@')) + oSupp[i];
			str  += sNew.indexOf(sVaule) > -1 ? '<li>' + sNew + '</li>' : '';
		}
		
		if(oBox.length < 1){
			str  = '<ul id="'+sIdName+'" class="item-tippop">' + str + '</ul>';
			oBox = $(str);
			o.after(oBox);
			
			//绑定选中事件
			oBox.on('click', 'li', function(){
				callback(o, $(this).text());
			})
			
		}else{
			oBox.html(str)
		}
		
		
		oBox.show();
		
		return oBox;
	},
	

	
	//获取焦点处理
	doInput : function(o, always, noEditClass){
		var val 	= o.val(),
			id 		= o.attr('id'),
			oLabel  = o.siblings('label[for="'+id+'"]'),
			oDel	= o.parent().find('.delete-btn');
		o.closest('.item').attr('class', 'item item-focus');
		if(always){
			//总是显示删除按钮, keypress获取不到第一次键盘按下的值
			oLabel.hide() && oDel.show();
		}else{
			val ? (oLabel.hide(), oDel.show()) : (oLabel.show(), oDel.hide());
		}
	},
	
	refreshImgCode : function(o, src){
		o = o.get(0);
		src = src ? src : o.src;
		o.src = src + '&' + (new Date()).getTime(); 	
	}
}