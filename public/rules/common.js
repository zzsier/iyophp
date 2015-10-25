//多选框
function selectAction(id,name) {
	if (document.getElementById(id).checked) {
		checkAll(name);
	} else {
		checkUnAll(name);
	}
}

function checkAll(name) {
	var chks = document.getElementsByName(name);
	for ( var i = 0; i < chks.length; i++) {
		if (chks[i].type == "checkbox" &&chks[i].disabled == false) {
			chks[i].checked = 'true';
		}
	}
}
function checkUnAll(name) {
	var chks = document.getElementsByName(name);
	for ( var i = 0; i < chks.length; i++) {
		if (chks[i].type == "checkbox") {
			chks[i].checked = '';
		}
	}
}
function getChecked(name){
	var ids = new Array();
	var id = document.getElementsByName(name);
	var n=0;
	for(var i = 0;i<id.length;i++){
		if(id[i].checked){				
			ids[n++]=id[i].value;
		}
	}
	return ids;
}

//头部鼠标放上去显示二级菜单
$(document).ready(function(){
	$('.dropdown').mouseover(function(){
		$(this).find('ul.dropdown-menu').eq(0).show();
		$(this).addClass('open');
		$('#indtitle').hide();
		$('#indtitle2').show();
	});
	$('.dropdown').mouseout(function(){
		$(this).find('ul.dropdown-menu').eq(0).hide();
		$(this).removeClass('open');
		$('#indtitle').show();
		$('#indtitle2').hide();
	});
	
	$('.dropdown-submenu').mouseover(function(){
		$(this).find('ul.dropdown-menu').show();
	});
	$('.dropdown-submenu').mouseout(function(){
		$(this).find('ul.dropdown-menu').hide();
		
	});
	
});
