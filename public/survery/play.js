document.addEventListener("click",function(event){
	var target = event.target;
	tt = target;

	var action = target.getAttribute("data-action");

	var matchStart = false;
	if(action){
		var splited_action = action.split("-");
		console.log(splited_action);
		var action = splited_action[0];
		var aim = splited_action[1];
        var aimIndex = splited_action[2];

		if("new" === action){
			var object = initObject(aim);
			editQuestion(object,true,0);	
		}else if("add" === action){
			if("question" === aim){
				addQuestion();
			}else if("option" === aim){
				addOption();
			}else if( "express" === aim ){
                addExpress();
            }
		}else if("edit" === action){
			var index = Number(aim);
			var question = Page.questions[index];
			editQuestion(question,false,index);
		}else if("del" === action){
            if( "question" === aim ){
                var index = Number( aimIndex );
                Page.questions.splice( aimIndex, 1 );
            }else if( "express" === aim ){
                var index = Number( aimIndex );
                Page.express.splice( aimIndex, 1 );
            }
			//var index = Number(aim);
			//Page.questions.splice(index,1);
			compileAndSet("play_ground",Page,"#play_ground");
//			editQuestion(question,false,index);
		}else if("update" === action){
			var index = Number(aim);
			Page.questions[index] = buildQuestion( index );
			compileAndSet("play_ground",Page,"#play_ground");
		}else if("match_src" === action) {
			matchStart = true;
			if(!target.checked){
				Match.end(aim);
			}else{
				Match.start(aim,target);
			}
			
		}else if("match_dest" === action) {
			Match.finish(aim);
		}else if("add_row" === action){
			console.log("enter add-row");
			addRow();
		}else if("add_column" === action){
			addColumn();
		}else if("submit" === action){
			console.log(Page);
            submitPage( target );
		}
	}
});

function addRow() {
	var ul = document.querySelector("#editor_row");
	var sizeOfLi = ul.querySelector("li").length;
	var inputStr = compile("_input",{i: 1+sizeOfLi,type:"row"});
	var inputDom = parseDom(inputStr)[0];
	ul.appendChild(inputDom);
}

function addColumn(){
	var ul = document.querySelector("#editor_column");
	var sizeOfLi = ul.querySelector("li").length;
	var inputStr = compile("_input",{i: 1+sizeOfLi,type:"column"});
	var inputDom = parseDom(inputStr)[0];
	ul.appendChild(inputDom);
}

function addOption(){
	var container = document.querySelector("#editor ul");
	var sizeOfLi = container.querySelectorAll("li").length;
	var optionStr = compile("_option",{i:1+sizeOfLi});
	var optionDom = parseDom(optionStr)[0];
	container.appendChild(optionDom);
}

function parseDom(str){
	var temp = document.createElement("div");
	temp.innerHTML = str;
	return temp.childNodes;
}

function buildQuestion(id){
	var blank = {};
	blank.id = id;
	var editor = document.querySelector("#editor");
	var data_defs = editor.querySelectorAll("[data-def]");
	var option = null;
	for(var i=0,length=data_defs.length;i<length;i++){
		var data_def = data_defs[i];
		var def_type = data_def.getAttribute("data-def");
		if(!option){
			option = {};
		}
		
		if("option" === def_type){ //normal
			option.title = data_def.value;
			addOptionToQuestion(blank,option);
			option = null;
		}
        else if ("option_row" === def_type){
			option.title = data_def.value;
			addOptionRowToQuestion(blank,option);
			option = null;
		}else if("option_column" === def_type){
			option.title = data_def.value;
			addOptionColumnToQuestion(blank,option);
			option = null;
		}else if("option_text" === def_type && data_def.checked){
			option.extra_type = true;//"text";
		}else if("option_necessory" === def_type && data_def.checked){
			option.extra_necessory = true;
		}else {
			blank[def_type] = data_def.value;	
		}
	}
	return blank;
}

function addOptionRowToQuestion(obj,optionRow){
	if(!obj.rows){
		obj.rows = [];
	}
	obj.rows.push(optionRow);
}
function addOptionColumnToQuestion(obj,optionColumn){
	if(!obj.columns){
		obj.columns = [];
	}
	obj.columns.push(optionColumn);
}
function checkValidation( callback ){
    Page.finishtext = Page.finishtext.LTrim();
    if( Page.finishtext == '' ){
        callback.call(null,{ result : false, msg : '完成文案"为必填项' } );
        return false;
    }
    return true;
}
function submitPage( target ){
    var result = checkValidation(function( res ){
        if( ! res.result ){
            alert( res.msg );
        }
    } );
    if( ! result ) return;
    target.setAttribute( 'disabled', 'disabled' );
    target.innerText = '正在提交...';

    // 处理“填写手机号”类型题目
    // 根据需求，该类题目必须在第一题
    for( var index = 0, len = Page.questions.length;index<len;index++ ){
        var item = Page.questions[ index ];
        if( item.type === 'tel' && index != 0 ){
            var q = item;
            for( var i = index - 1; i>=0;i-- ){
                Page.questions[ i + 1 ] = Page.questions[ i ];
                Page.questions[ i + 1 ].id = i + 1;
            }
            Page.questions[ 0 ] = q;
            Page.questions[ 0 ].id = 0;
            break;
        }
    }
    console.log(JSON.stringify( Page ));
    $.post(api.submit,

        {
            id : urlParam.id,
            content : JSON.stringify( Page )
        }
    ).done(function(){
        target.innerHTML = ''
            +'<i class="glyphicon glyphicon-ok" style="margin-right:5px;"></i>'
            + '提交成功';
        setTimeout( function(){
            target.removeAttribute( 'disabled' );
            target.innerText = '提交调查页面';
            window.location.href = api.listPage;
        }, 1000 );

    });
}

document.addEventListener("input",function(event) {
	var target = event.target;
	var action = target.getAttribute("data-action");
	if(action){
		var splited_action = action.split("-");
		var action = splited_action[0];
		if("sync" === action){
			var aim = splited_action[1];

			var tree = aim.split(".");
			var dest = window[tree.shift()];
			if(tree.length>1){
				dest = dest[tree.shift()];
			}
			dest[tree.shift()] = target.value;
			compileAndSet("play_ground",Page,"#play_ground");			
		}
	}
});

document.addEventListener("mouseover",function(event){
	ElementUtils.tip(event,true);
});
document.addEventListener("mouseout",function(event){
	ElementUtils.tip(event,false);
});



var Match = {
	src:"",

	start: function(src,target){
		Match.src = src;
			var dest = ElementUtils.findAllDest();
			ElementUtils.tag(dest,true,"matchActive");	
	},
	end: function(aim){
		Match.src = aim;
		var srcElement = ElementUtils.findOption(Match.src);
		srcElement.checked = false;
		var src = PageUtils.findOptionByAim(Match.src);
		var dest = document.querySelector("#title_"+src.next);
		ElementUtils.tag([srcElement.parentElement,dest],false,"matchTip");
		PageUtils.unlink(src);	
	},
	finish: function(dest){
		if(dest && Match.src){
			var src = PageUtils.findOptionByAim(Match.src);
			PageUtils.link(src,dest);
		}
		var dest = ElementUtils.findAllDest();
		ElementUtils.tag(dest,false,"matchActive");

	}
};

var ElementUtils = {
	findAllDest: function(){
		var matchDest = document.querySelectorAll(".matchDest");
		return Array.prototype.slice.call(matchDest,0);
	},
	findOption: function(aim){
		var selector = "#option_"+aim;
		var srcElement = document.querySelector(selector);
		return srcElement;
	},
	tag: function(obj,add,claz){
		if(obj instanceof Array){
			[].forEach.call(obj,function(dest){
				if(dest){
					if(add){
						dest.classList.add(claz);
					}else{
						dest.classList.remove(claz);
					}				
				}

			});	
		}else{
			if(add){
				obj.classList.add(claz);
			}else{
				if(obj.classList){
					obj.classList.remove(claz)
				}
			}
		}
	},
	tip: function(event,movein){
		var target = event.target;
		var action = target.getAttribute("data-action");
		if(action){
			var splited_action = action.split("-");
			var action = splited_action[0];
			var aim = splited_action[1];
			if(action === "match_src"){
				var srcElement = target.parentElement;
				var src = PageUtils.findOptionByAim(aim);
				if(src.next){
					var destElement = ElementUtils.findTitle(src.next);
					ElementUtils.tag([srcElement,destElement],movein,"matchTip");	
				}
			}else if(action === "match_dest"){
				var destElement = target;

				var srcAim = PageUtils.findOptionByDest(Number(aim));
				var optionElement = ElementUtils.findOption(srcAim);

				if(optionElement){
					ElementUtils.tag([optionElement.parentElement,destElement],movein,"matchTip");
				}
			}
		}	
	},
	findTitle: function(id){
		return document.querySelector("#title_"+id);
	}
};

var PageUtils = {
	findOptionByAim: function(aim) {
		var srcArray = aim.split("_");
		var questionIndex = Number(srcArray[0]);
		var optionIndex = Number(srcArray[1]);
		var question = Page.questions[questionIndex];
		if("matrix" === question.type){
			if(!question.data){
				question.data = [];
			}
			if(!question.data[optionIndex]){
                for( var i=0;i<=optionIndex;i++ ){
                    question.data[i] = [];
                }
			}
            if(!question.data[optionIndex][srcArray[2]]){
                for( var i=0;i<=srcArray[2];i++ ){
                    question.data[optionIndex][i] = {};
                }
            }
			
			return question.data[optionIndex][srcArray[2]];
		}else{
			return question.data[optionIndex];	
		}
		
	},
	link: function(option,question) {
		option.next = question;
	},
	unlink: function(option){
		delete option.next;
	},
	findQuestion: function(index) {
		return Page.questions[index];
	},
	findOptionByDest: function( id ){
		var questions = Page.questions;
		for(var i=0,l=questions.length; i<l ;i++) {
			var question = questions[i];
			var data = question.data;
			if(data){
				if("matrix" === question.type){
					for(var j=0,jLength = data.length; j < jLength; j++){
						for(var column=0,cl = data[j].length;column<cl;column++){
							if(data[j] && data[j][column] && ""+id === ""+data[j][column].next){
								return ""+i+"_"+j+"_"+column;
							}	
						}
					}
				}else{
					for(var j=0,jLength = data.length; j < jLength; j++){
						if(""+id === ""+data[j].next){
							return ""+i+"_"+j;
						}
					}					
				}

			}
		}
		return null;
	}
};

String.prototype.LTrim = function()
{
    return this.replace(/(^\s*)/g, "");
}

function compileAndSet(template,data,dest){
	var play_ground_content = compile(template,data);
	var play_ground = document.querySelector(dest);
	play_ground.innerHTML = play_ground_content;
}

function compile(template,data){
	return new EJS({url:"../survery/templates/"+template}).render(data);
}

function setPageInfo(){
    Array.prototype.slice.call( document.querySelectorAll( "[name^='page']" ) )
        .forEach(function( item, index, arr ){
            item.value = Page[ item.getAttribute( 'name').substring( 4 ).toLowerCase() ]
        } );
}


function addQuestion(){
    var id = 0;
    if( Page.questions.length == 0 ){
        id = 0;
    }else{
        Page.questions.forEach( function( q, index, arr ){
            if( q.id > id ){
                id = q.id;
            }
        } );
    }
	var blank = buildQuestion(id + 1);
	Page.questions.push(blank);

	compileAndSet("play_ground",Page,"#play_ground");
}

function addOptionToQuestion(obj,option){
	if(!obj.data){
		obj.data = [];
	}
	obj.data.push(option);
}

function editQuestion(question,brandnew,index){
	var data = {
			config: { 
						brandnew : brandnew,
						index : index
				   	},
			question:
				question
		};
	compileAndSet(question.type,data,"#editor")
}

function addExpress(){
    Page.express.push( '' );
    compileAndSet("play_ground",Page,"#play_ground");
}

document.addEventListener( 'input', function( e ){
    var target = e.target,
        action = target.getAttribute( 'data-action' );

    if( action ){
        var splitAction = action.split( '-' );
        var act = splitAction[ 0 ],
            aim = splitAction[ 1 ],
            aimIndex = splitAction[ 2 ];

        if( 'input' === act ){
            if( 'express' === aim ){
                Page.express[ aimIndex ] = target.value;
            }
        }
    }
} );


var PageType = {
	t1:"单步",
	t2:"单页"
};
//
var Page = {
	title:"请在左侧修改调查页的title和类型",
	type: 1,
	description: "在右方修改页面的描述",
    express : [ ],
    finishtext : "",
    logo : "http://static.koudai.com/data/upload/hd/1432549548496_949.png",
	questions:[
	 ]
};





function initObject(type){
	var init_object = {
		tel:{
			
		},
		text:{

		},
		radio:{
			data:[
			{}

			]
		},
		checkbox:{
			data:[
			{}

			]
		},
		vote:{
			data:[
			{}

			]
		},
		matrix:{
        data : [
        ],
		columns: [
				{
				  title: "",
				  id: 1
				}
			],
		rows: [
				{
					title: "",
					id:3
				}
			]
		}

	};

	var object = init_object[type];
	object.type = type;
	object.title = "";
	return object;
}





var urlParam = (function(){
    var result = {},
        pairs = [],
        pos = -1,
        querys = window.location.search.substring(1);
    pairs = querys.split( '&' );
    pairs.forEach( function( pair ){
        pos = pair.indexOf( '=' );
        var name = pair.substring( 0, pos ),
            value = decodeURIComponent( pair.substring( pos + 1 ) );
        //  value = pair.substring( pos + 1 );
        result[ name ] = value;
    } );
    return result;
} )();

var configs = {
    host : 'http://' + window.location.host
}

var api = {
    get : configs.host + '/question/edit',
    submit : configs.host + '/question/save',
    listPage : configs.host + '/question/listquestion'
}

;(function init(){

    if( urlParam.id == 0 ){
        // 新建问卷
        Page = {
            title: "",
            type: 1,
            description: "",
            express : [  ],
            finishtext : "",
            logo : "http://static.koudai.com/data/upload/hd/1432549548496_949.png",
            questions:[ ]
        };
    }else{
        // 编辑问卷
        $.get( api.get + "?id=" + urlParam.id, function( data ){
            //data.description = 'tes';
			Page = eval('(' + data.content + ')');
            compileAndSet("play_ground",Page,"#play_ground");
            setPageInfo();
        } );
    }

})();

var express_count=1;
;(function($){
    $("#addExpress").bind('click',function(event){
        $(".express").append('<br/><br/><lable>结束表达式:</lable>&nbsp;<input type="text" placeholder="如: 1,2,3,4" maxlength="50" id="express_'+express_count+'" value=""/>');
        express_count++;
    });
    $(document).on("change",".pic_file", function () {
        var data = new FormData();
        $.each($('#pic_file')[0].files, function(i, file) {
        data.append('uploadedfile', file);
        });
        $.ajax({
            url:'http://123.59.53.158/moment/upload',
            type:'POST',
            data:data,
            cache: false,
            contentType: false,    //不可缺
            processData: false,    //不可缺
            success:function(data){
                var url='http://123.59.53.158/'+data.result;
                $('.prev').attr('src',url);
                $('#pic_url').val(url);
            }
       });
    });

})($);



