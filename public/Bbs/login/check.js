/**
 * ��֤��
 */
window.Z_Check = {
		
	//��֤�ֻ�
	checkPhone : function(phone){
		var rg = /^(?:1\d\d)-?\d{5}(\d{3}|\*{3})$/;
	    return rg.test(phone);
	},

	//��֤����ǰ׺
	checkPrefixEmail : function(s){
		var re = /^[0-9a-z][_.0-9a-z-]{0,31}@/;
		return s.search(re) < 0 ? false : true;
	},
	
	//��֤�����ʽ
	checkEmail : function(str){  
	    var re = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  

	    return re.test(str) ? true : false;
	},
	
	//��֤���볤��
	checkPwdSize : function(str){
		var size = str.length;
		
		return (size >= 4 && size <= 16) || size > 16;
	},
	
	//��֤�������
	checkPwdRule : function(str){
		var re = /^[\x21-\x7e]+$/;  

	    return re.test(str) ? true : false;
	}	
	
}
