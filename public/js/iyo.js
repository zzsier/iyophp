
function render(topic, edit) {

	username = "";
	title = "";
	from = "";

	var innerHTML = '<div class="bs-docs-section" style="padding-top:25px;">';

	if( topic['title'] ) {
		title = topic['title'];
	}
	if( topic['from'] ) {
		from = topic['from'];
	}
	if( topic['username'] ) {
		username = topic['username'];
	}

	innerHTML += '<div class="row"><div class="col-sm-12"><p class="text-center mkwarp" style="font-size:28px">'+title+'</p></div></div>';
	innerHTML += '<div class="row" style="padding-top:10px;padding-bottom:18px;">'+
			'<div class="text-right col-sm-6 col-xs-6" style="color:grey;">'+
			" 来源： "+from+' </div> <div class="text-left col-sm-6 col-xs-6" style="color:grey;"> 作者： '+
			username+'</div></div>';

    innerHTML += '<div class="col-sm-12">';
	innerHTML += '<ul class="list-unstyled">';
	for( var i = 0; i < topic["body"].length; i++ ) {
		contentvalue = topic["body"][i];
		if( contentvalue["type"] == "image" ) {
			innerHTML += '<li style="padding-top:10px;padding-bottom:10px;">';
			if( edit == true ) {
				//innerHTML += '<a class="anchorjs-link" href="#within-a-navbar"><span class="anchorjs-icon">::before</span></a>';
    			innerHTML += '<button type="button" id="closebutton_'+i+'" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
			}
			innerHTML += '<img src="http://'+window.location.host+'/'+ contentvalue["value"]+'" style="width: 100%" class="img-responsive"/>';
			innerHTML += '</li>';
		} else {
			innerHTML += '<li style="padding-top:10px;padding-bottom:10px;">';
			if( edit == true ) {
				//innerHTML += '<a class="anchorjs-link" href="#within-a-navbar"><span class="anchorjs-icon">::before</span></a>';
    			innerHTML += '<button type="button" id="closebutton_'+i+'" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
			}
			var temp_value = contentvalue["value"];
			temp_value = temp_value.replace(/\n/g, '<br/>');
			innerHTML += '<p style="font-size:18px;">'+temp_value+'</p>';
			innerHTML += '</li>';
		}
	}
	innerHTML += "</ul>";
	innerHTML += "</div>";

    innerHTML += '<div class="col-sm-12 btn-group btn-group-justified" style="padding-top:20px;padding-bottom:25px;" role="group" aria-label="...">';

    innerHTML += '<div class="col-sm-2 col-sm-offset-3 col-xs-4" role="group" data-toggle="modal" data-target=".bs-example-modal-sm">';
    innerHTML += '<div class="panel panel-default text-center" style="padding-top:5px;padding-bottom:5px;">';
    innerHTML += '<img  class="avatar"  style="width:26px;height:26px;" src="http://123.59.53.158/images/zhuanfa.png">';
    innerHTML += '<span> 转发</span>';
    innerHTML += '</div></div>';
    innerHTML += '<div class="col-sm-2 col-xs-4" role="group" data-toggle="modal" data-target=".bs-example-modal-sm">';
    innerHTML += '<div class="panel panel-default text-center" style="padding-top:5px;padding-bottom:5px;">';
    innerHTML += '<img  class="avatar"  style="width:26px;height:26px;" src="http://123.59.53.158/images/comment.png">';
    innerHTML += '<span> 评论</span>';
    innerHTML += '</div></div>';
    innerHTML += '<div class="col-sm-2 col-xs-4" role="group" data-toggle="modal" data-target=".bs-example-modal-sm">';
    innerHTML += '<div class="panel panel-default text-center" style="padding-top:5px;padding-bottom:5px;">';
    innerHTML += '<img  class="avatar"  style="width:26px;height:26px;" src="http://123.59.53.158/images/like.png">';
    innerHTML += '<span> 点赞</span>';
    innerHTML += '</div></div>';


//<button data-toggle="modal" data-target=".bs-example-modal-sm" type="button" class="btn btn-default" style="height:50px;background-image: url(http://123.59.53.158/images/zhuanfa.png);background-repeat:no-repeat;background-position: center center;"></button></div>';
//    innerHTML += '<div class="btn-group col-sm-2" role="group">
//<button data-toggle="modal" data-target=".bs-example-modal-sm" type="button" class="btn btn-default" style="height:50px;background-image: url(http://123.59.53.158/images/comment.png);background-repeat:no-repeat;background-position: center center;"></button></div>';
//    innerHTML += '<div class="btn-group col-sm-2" role="group">
//<button data-toggle="modal" data-target=".bs-example-modal-sm" type="button" class="btn btn-default" style="height:50px;background-image: url(http://123.59.53.158/images/like.png);background-repeat:no-repeat;background-position: center center;"></button></div>';
	innerHTML += "</div>";

    innerHTML += '<div class="modal fade bs-example-modal-sm" tabindex="-1" style="margin-top:'+$(this).height()/3+'" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">';
    innerHTML += '<div class="modal-dialog modal-sm"><div class="modal-content">';

    innerHTML += '<div class="panel panel-default corner-radius">';
    innerHTML += '<div class="panel-heading text-center"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h3 class="panel-title">下载软件</h3></div>';
    innerHTML += '<div class="panel-body text-center"><div class="btn-group"><a href="#" class="btn btn-success btn-lg">';
    innerHTML += '<i class="glyphicon glyphicon-pencil"> </i> 下载 </a></div></div></div>';

    innerHTML += '</div></div></div>';

	innerHTML += "</div>";

	$("#generateHTML").html(innerHTML);

	if( edit == true ) {
		for( var i = 0; i < topic["body"].length; i++ ) {
	    	$('#closebutton_'+i).click(function (e) {
				closebuttonid = e.currentTarget.id;
				id = closebuttonid.split("_")[1];
				deletecontent(id);
	        });
		}
	}
}


