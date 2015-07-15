<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>survey</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body{
            padding:20px;
        }
        ul {
            list-style: none;
            padding:0;
        }
        .left {
            float: left;
        }
        .dragable {
            background-color: blue;
        }
        .matchActive {
            background-color: #66CC00;
            border-radius: 4px;
            padding: 0 5px;
            color:#fff;
        }
        .matchTip {
            background-color: #663399;
            border-radius: 4px;
            padding: 0 5px;
            color:#fff;
        }
        .sidebar{
            position: fixed;
            top: 0px;
            bottom: 0;
            left: 0;
            z-index: 1000;
            display: block;
            padding: 20px;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: #f5f5f5;
            border-right: 1px solid #eee;
        }
        .main{
            margin-left: 223px;
            overflow: hidden;
        }
        .list-group-item{
            overflow:hidden;
        }
        .table{
            margin-bottom: 0;
        }
        #option li{
           margin-bottom:15px;
        }
        #option li i{
            color:#999;
            margin-right:4px;
        }

        #play_ground .list-group-item:nth-child(odd){
            background: #FAFAFA;
        }

        #play_ground label{
            border-radius: 4px;
            padding: 0 5px;
        }

        #editor{
            overflow:hidden;
        }
        #editor label{
            margin: 20px 0 5px;
        }
        #editor .update,
        #editor .add{
            margin-top:30px;
            float:right;
        }
        .express{
            border: 1px solid #ddd;
            padding: 5px 20px;
            line-height: 15px;
            border-radius: 5px 5px;
        }
        .express-list .input-group{
            margin-bottom:15px;
        }
        .sidebar section{
            margin-bottom:20px;
        }

        .QandA{
            margin-bottom:30px;
        }
        .QandA .q{
            font-weight:bold;
            margin-bottom:10px;
        }
        .QandA .a{
            color: #999;
            line-height: 20px;
            font-size: 13px;
            padding-left: 30px;
        }
        .QandA .a .r{
            margin-bottom:8px;
        }

    </style>
    <script type="text/javascript">



    </script>
    <script src="/ejs/ejs_production.js"></script>
  </head>
  <body>
    <div class="container-fluid">
        <div class="row">
            <div class="sidebar">
                <a href="javascript:void(0)" data-toggle="modal" data-target="#modalHelper"><i class="glyphicon glyphicon-question-sign"></i>使用必读</a>
                    <div class="form-group">
                        <label for="pageTitle" class="control-label">调查页页面标题</label>
                        <input type="text" name="pageTitle" data-action="sync-Page.title" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="pageType" class="control-label">调查页显示类型</label>
                        <select name="pageType" data-action="sync-Page.type" class="form-control">
                            <option value="1">单步</option>
                            <option value="2">单页</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="pageDescription" class="control-label">页面描述</label>
                        <textarea name="pageDescription" data-action="sync-Page.description" class="form-control"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="pageFinishtext" class="control-label">完成文案</label>
                        <textarea name="pageFinishtext" data-action="sync-Page.finishtext" class="form-control" placeholder="必填"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="pageLogo" class="control-label">Logo</label>
                        <select name="pageLogo" data-action="sync-Page.logo" class="form-control">
                            <option value="http://static.koudai.com/data/upload/hd/1432549548496_949.png" selected>微店</option>
                            <option value="http://static.koudai.com/glmi/resources/v3/img/logo.png">口袋</option>
                            <option value="http://static.weidian.com/m/questionnaire/resources/static/maijia.png">买家版</option>
                            <option value="http://static.weidian.com/m/questionnaire/resources/static/banjia.png">半价</option>
                            <option value="http://static.weidian.com/m/questionnaire/resources/static/daigou.png">全球购</option>
                        </select>
                    </div>

                    <ul id="option">
                        <li class="form-tel">
                            <button class="btn btn-default btn-sm" data-action="new-tel" data-toggle="modal" data-target="#myModal"><i class="glyphicon glyphicon-plus"></i>必须输入手机号</button>
                        </li>
                        <li class="form-inline">
                            <button class="btn btn-default btn-sm" data-action="new-text" data-toggle="modal" data-target="#myModal"><i class="glyphicon glyphicon-plus"></i>添加填空题</button>
                        </li>
                        <li>
                            <button class="btn btn-default btn-sm" data-action="new-radio" data-toggle="modal" data-target="#myModal"><i class="glyphicon glyphicon-plus"></i>添加单选题</button>
                        </li>
                        <li>
                            <button class="btn btn-default btn-sm" data-action="new-checkbox" data-toggle="modal" data-target="#myModal"><i class="glyphicon glyphicon-plus"></i>添加多选题</button>
                        </li>
                        <li>
                            <button class="btn btn-default btn-sm" data-action="new-matrix" data-toggle="modal" data-target="#myModal"><i class="glyphicon glyphicon-plus"></i>添加矩阵题</button>
                        </li>
                        <li>
                            <button class="btn btn-default btn-sm" data-action="new-vote" data-toggle="modal" data-target="#myModal"><i class="glyphicon glyphicon-plus"></i>添加投票题</button>
                        </li>
                    </ul>
            </div>

            <div class="main">
                <div class="">
                    <ul id="play_ground">

                    </ul>

                </div>
            </div>

            <div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">编辑题目</h4>
                        </div>
                        <div class="modal-body">

                            <div id="editor">

                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div class="modal" id="modalHelper" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="modalHelperLabel">编辑题目</h4>
                        </div>
                        <div class="modal-body">

                           <div class="QandA">
                               <div class="q">Q: 如何设置题目的跳转关系？</div>
                               <div class="a">
                                    <div class="r">[step1]点击任意题目选项(如：题目A的选项c)，此时所有题目呈现绿色高亮显示。</div>
                                    <div class="r">[step2]点击其中一道题目的标题(如题目E)，此时就完成了题目A的c选项与题目E的跳转关联。</div>
                               </div>
                           </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>



    <script src="/js/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="/survery/play.js"></script>
</body>
</html>
