var grid;
var win;
var form;
var win1;

$(function() {
	grid = $('#tt')
			.datagrid(
					{
						iconCls : 'icon-save',
						loadMsg : '数据加载中，请稍后......',
						nowrap : false,
						striped : true,
						rownumbers : false,
						singleSelect : true,
						pagination : true,
						pageList : [ 10, 20, 30 ],
						url : './list',
						idField : 'id',
						columns : [ [ {
							field : 'ck',
						}, {
							title : '问卷ID',
							field : 'id',
							width : 50,
							formatter:function(val,row){
								return row.id;
							}
						}, {
							title : '调查主题',
							field : 'name',
							width : 100,
							formatter:function(val,row){
								var content = eval('(' + row.content + ')');
								return content.title;
							}
						},{
							title:'图片LOG',
							field:'logo',
							width:80,
							formatter:function(val,row){
								var content = eval('(' + row.content + ')');
								return '<img width="70px" height="70px" src="'+content.logo+'"/>';
							}
						},{
							title : '调查问卷链接',
							field : 'generatedURL',
							width : 400,
							formatter:function(val,row){
                                return 'http://123.59.53.158/question/show?id='+row.id;
							}
						},{
                            title:'导出Excel',
                            field:'导出Excel',
                            width:100,
                            formatter:function(val,row){
                                return '<a href="javascript:exportExcel('+row.id+')">数据导出Excel</a>';
                            }
                        }, {
							title : '题库列表',
							field : 'showQuestion',
							width : 400,
							formatter:function(val,row){
								var str='';
								//for(var i=0;i<val.length;i++){
								//	str+=val[i].id+":"+val[i].title+"<br/>";
								//}
								return str;
							}
						},{
							title:'状态',
							field:'status',
							width:100,
							formatter:function(val,row){
								if(row.qstatus==0){
                                    return '<span class="btn" onclick="chanageQuestionStatus('+row.id+',false)">进行中</span>';
								}else{
                                    return '<span class="btn" style="color:#808080" onclick="chanageQuestionStatus('+row.id+',true)">已结束</span>';
								}
							}
						} ] ],
						toolbar : [
								{
									text : '添加',
									iconCls : 'icon-add',
									handler : function() {
										window.location.href = "create";
									}
								},
								'-',
								{
									text : '修改',
									iconCls : 'icon-edit',
									handler : function() {
										var row = grid.datagrid('getSelected');
										if (row) {
											window.location.href = "create?id="
													+ row.id;
										} else {
											$.messager.show({
												title : '警告',
												msg : '请选择!',
												timeout : 5000,
												showType : 'slide'
											});
										}
									}
								}, '-', {
                                text : '删除',
                                iconCls : 'icon-remove',
                                handler : function(){
                                    var row = grid.datagrid('getSelected');
                                    if (row) {
                                        $.messager.confirm('警告', '[ID: ' + row.id+']你确认删除问卷及问卷结果吗?', function(r) {
                                            if (r) {
                                                jQuery.ajax( {
                                                    type : 'POST',
                                                    contentType : 'application/json',
                                                    url :  './deleteById.do?id='+ row.id,
                                                    data : "",
                                                    dataType : 'json',
                                                    success : function(data) {
                                                        grid.datagrid('reload');
                                                        grid.datagrid('clearSelections');
                                                    },
                                                    error : function() {
                                                        alert('错误');
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        $.messager.show( {
                                            title : '警告',
                                            msg : '请选择!',
                                            timeout : 5000,
                                            showType : 'slide'
                                        });
                                    }
                                }
                            } ]
					});

});
function chanageQuestionStatus(id,status){
	if(confirm('您确认要'+(status?'开放':'关闭')+'调查问卷吗?')){
        jQuery.ajax( {
            type : 'POST',
            contentType : 'application/json',
            url :  './chanageQuestionStatus?id='+ id+"&status="+status,
            data : "",
            dataType : 'json',
            success : function(data) {
                if(data.status){
                    $.messager.show( {
                        title : '提示',
                        msg : '操作成功!',
                        timeout : 3000,
                        showType : 'slide'
                    });
                }else{
                    alert('操作失败');
                }
                grid.datagrid('clearSelections');
                grid.datagrid('reload');
            },
            error : function() {
                alert('错误');
            }
        });
    }

}
function exportExcel(id){
    window.location.href="exportExcel.html?downloadFileName=question_"+id+".xls&id="+id;
}
