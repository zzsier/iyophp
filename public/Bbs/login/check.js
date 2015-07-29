/**
 * 验证类
 */
window.Z_Check = {
		
	//验证手机
	checkPhone : function(phone){
		var rg = /^(?:1\d\d)-?\d{5}(\d{3}|\*{3})$/;
	    return rg.test(phone);
	},

	//验证邮箱前缀
	checkPrefixEmail : function(s){
		var re = /^[0-9a-z][_.0-9a-z-]{0,31}@/;
		return s.search(re) < 0 ? false : true;
	},
	
	//验证邮箱格式
	checkEmail : function(str){  
	    var re = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  

	    return re.test(str) ? true : false;
	},
	
	//验证密码长度
	checkPwdSize : function(str){
		var size = str.length;
		
		return (size >= 4 && size <= 16) || size > 16;
	},
	
	//验证密码规则
	checkPwdRule : function(str){
		var re = /^[\x21-\x7e]+$/;  

	    return re.test(str) ? true : false;
	}	
	
}
