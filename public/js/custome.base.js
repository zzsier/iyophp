function addTab(title, href) {
	var content = '未实现';
	// 如果该窗口存在，显示到前面，不存在，创建新的窗口
	if ($('#tabs').tabs('exists', title)) {
		$('#tabs').tabs('select', title);
	} else {
		if (href) {
			content = '<iframe scrolling="yes" frameborder="0"  src="' + href + '" style="width:100%;height:100%;"></iframe>';
		}
		if(content!='未实现'){
		$('#tabs').tabs('add', {
			title : title,
			content : content,
			closable : true
		});}
	}
}
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
$.fn.datebox.defaults.formatter = function(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d);
}