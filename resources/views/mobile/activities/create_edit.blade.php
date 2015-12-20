@extends('layouts.default')

@section('title')
{{ trans('message.Topic List') }} @parent
@stop

@section('content')

    <link href={{{URL::asset('Bbs/Bbs_publish.css')}}} type="text/css" rel="stylesheet">
	<script src={{{URL::asset('Bbs/Bbs_publish.js')}}} charset="gbk"></script>
    <script>
        var boardid = '598'; //全局变量统一写到Publish_Config 里防止被污染
        Publish_Config = {
            cateid  : '1',
            boardid : '598',
            bbsid	: '6',
            productid : '0',
            manuid    : '0',
            subid     : '0',
            pageType  : '',
            book_type  : ''
        },WEB_CONFIG = {
            boardid : '598',
            attachFilesize : '5MB'
        };
    </script>
	<script src={{{URL::asset('Bbs/zh-cn.js')}}} charset="gbk"></script>
    <link href={{{URL::asset('Bbs/ueditor.css')}}} type="text/css" rel="stylesheet">
    <style id="edui-customize-zolemotion-style">.edui-default  .edui-for-zolemotion .edui-icon {undefined}</style>
    <style id="edui-customize-zolattachment-style">.edui-default  .edui-for-zolattachment .edui-icon {undefined}</style>
    <style id="edui-customize-zolinsertvideo-style">.edui-default  .edui-for-zolinsertvideo .edui-icon {undefined}</style>
    <style id="edui-customize-inserthidden-style">.edui-default  .edui-for-inserthidden .edui-icon {undefined}</style>
    <style id="edui-customize-zolblockquote-style">.edui-default  .edui-for-zolblockquote .edui-icon {undefined}</style>
    <style id="edui-customize-zolinsertcode-style">.edui-default  .edui-for-zolinsertcode .edui-icon {undefined}</style>
    <style id="edui-customize-atuser-style">.edui-default  .edui-for-atuser .edui-icon {undefined}</style>
	<script src={{{URL::asset('Bbs/codemirror.js')}}} charset="gbk"></script>
    <link href={{{URL::asset('Bbs/codemirror.css')}}} type="text/css" rel="stylesheet">

    @if (isset($topic))
        {!! Form::model($topic, ['route' => ['topics.update', $topic->id], 'id' => 'topic-create-form', 'method' => 'patch']) !!}
    @else
        {!! Form::open(['route' => 'topics.store','id' => 'topic-create-form', 'method' => 'post']) !!}
    @endif

    <div class="wrapper">
        <input type="hidden" value="150" id="userScore">
        <input type="hidden" value="6" id="bbsID">
        <input type="hidden" value="" id="fenLouArr">
        <!-- 面包屑 -->
        <div class="crumb">
            <a href={{{ URL::to('/') }}} target="_blank">IYO论坛</a> &gt; 
			<a href={{{ URL::to("nodes/$node->id") }}} target="_blank">{{{ $node->name }}}</a> &gt; <a href="">发表新帖</a>
		</div>
		<div class="section border-radius">
            <div class="section-header"><h3><i class="line"></i>发表新帖</h3></div>
            <div class="filter-area clearfix">
                <span class="star-txt">*</span>
                <div class="selectbox2" id="bookBrand">
                    <span class="select-label border-radius" title="选择版块" alt="选择版块"><i class="trangle border-radius"></i>选择版块</span>
                    <ul class="border-radius">
					@if ( $node )
                        <li data-id={{ $node->id }} data-type="subcate" data-subbbsid="" title={{ $node->name }} alt={{ $node->name }}>{{ $node->name }}</li>
					@endif
                    </ul>
                </div>

                <div class="selectbox2" id="bookModel">
                    <span class="select-label border-radius" title="选择子版" alt="选择子版"><i class="trangle border-radius"></i>选择子版</span>
                    <ul class="border-radius">
					@foreach ($subnodes as $index => $subnode)
                        <li data-id={{ $subnode->id }} data-type="subcate" data-subbbsid="" title={{ $subnode->name }} alt={{ $subnode->name }} > {{ $subnode->name }}</li>
					@endforeach
                    </ul>
                </div>

                <div class="tp-text border-radius">
                    <span class="tp-tip">0/40</span>
                    {!! Form::text('titleInput', null, ['class' => 'txt', 'id' => 'titleInput', 'placeholder' =>  '请输入标题']) !!}
                </div>

            </div>


            <div class="edit-post clearfix">
                <div class="content editor-simple">
                    <span class="edit-control-level" id="switchSeniorBtn">常用</span>
                    <!-- 加载编辑器的容器 -->
                    <div id="container" class="edui-default" style="">
                        <div id="edui1" class="edui-editor  edui-default" style="width: auto; z-index: 999;">
                            <div id="edui1_toolbarbox" class="edui-editor-toolbarbox edui-default">
                                <div id="edui1_toolbarboxouter" class="edui-editor-toolbarboxouter edui-default">
                                    <div class="edui-editor-toolbarboxinner edui-default">
                                        <div id="edui2" class="edui-toolbar   edui-default" onselectstart="return false;" onmousedown="return $EDITORUI[&quot;edui2&quot;]._onMouseDown(event, this);" style="-webkit-user-select: none;"><div id="edui44" class="edui-box edui-button edui-for-fullscreen edui-default">
                                                <div id="edui44_state" onmousedown="$EDITORUI[&quot;edui44&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui44&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui44&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui44&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui44_body" unselectable="on" title="全屏" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui44&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui44&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui3" class="edui-box edui-combox edui-for-fontfamily edui-default"><div title="字体" id="edui3_state" onmousedown="$EDITORUI[&quot;edui3&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui3&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui3&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui3&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-combox-body edui-default"><div id="edui3_button_body" class="edui-box edui-button-body edui-default" onclick="$EDITORUI[&quot;edui3&quot;]._onArrowClick();">微软雅黑</div><div class="edui-box edui-splitborder edui-default"></div><div class="edui-box edui-arrow edui-default" onclick="$EDITORUI[&quot;edui3&quot;]._onArrowClick();"></div></div></div></div><div id="edui16" class="edui-box edui-combox edui-for-fontsize edui-default"><div title="字号" id="edui16_state" onmousedown="$EDITORUI[&quot;edui16&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui16&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui16&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui16&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-combox-body edui-default"><div id="edui16_button_body" class="edui-box edui-button-body edui-default" onclick="$EDITORUI[&quot;edui16&quot;]._onArrowClick();">14px</div><div class="edui-box edui-splitborder edui-default"></div><div class="edui-box edui-arrow edui-default" onclick="$EDITORUI[&quot;edui16&quot;]._onArrowClick();"></div></div></div></div><div id="edui27" class="edui-box edui-button edui-for-horizontal edui-default"><div id="edui27_state" onmousedown="$EDITORUI[&quot;edui27&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui27&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui27&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui27&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui27_body" unselectable="on" title="分隔线" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui27&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui27&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div></div></div></div></div><div id="edui28" class="edui-box edui-splitbutton edui-for-inserttable edui-default"><div title="插入表格" id="edui28_state" onmousedown="$EDITORUI[&quot;edui28&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui28&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui28&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui28&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-splitbutton-body edui-default"><div id="edui28_button_body" class="edui-box edui-button-body edui-default" onclick="$EDITORUI[&quot;edui28&quot;]._onArrowClick();"><div class="edui-box edui-icon edui-default"></div></div><div class="edui-box edui-splitborder edui-default"></div><div class="edui-box edui-arrow edui-default" onclick="$EDITORUI[&quot;edui28&quot;]._onArrowClick();"></div></div></div></div><div id="edui31" class="edui-box edui-button edui-for-indent edui-default"><div id="edui31_state" onmousedown="$EDITORUI[&quot;edui31&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui31&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui31&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui31&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui31_body" unselectable="on" title="首行缩进" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui31&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui31&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div></div></div></div></div><div id="edui32" class="edui-box edui-button edui-for-justifyleft edui-default"><div id="edui32_state" onmousedown="$EDITORUI[&quot;edui32&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui32&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui32&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui32&quot;].Stateful_onMouseOut(event, this);" class="edui-default edui-state-checked"><div class="edui-button-wrap edui-default"><div id="edui32_body" unselectable="on" title="居左对齐" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui32&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui32&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui33" class="edui-box edui-button edui-for-justifycenter edui-default"><div id="edui33_state" onmousedown="$EDITORUI[&quot;edui33&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui33&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui33&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui33&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui33_body" unselectable="on" title="居中对齐" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui33&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui33&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui34" class="edui-box edui-button edui-for-justifyright edui-default"><div id="edui34_state" onmousedown="$EDITORUI[&quot;edui34&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui34&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui34&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui34&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui34_body" unselectable="on" title="居右对齐" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui34&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui34&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui93" class="edui-box edui-button edui-for-zolemotion edui-default"><div id="edui93_state" onmousedown="$EDITORUI[&quot;edui93&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui93&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui93&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui93&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui93_body" unselectable="on" title="插入表情" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui93&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui93&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui94" class="edui-box edui-button edui-for-zolattachment edui-default"><div id="edui94_state" onmousedown="$EDITORUI[&quot;edui94&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui94&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui94&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui94&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui94_body" unselectable="on" title="上传附件" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui94&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui94&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui95" class="edui-box edui-button edui-for-zolinsertvideo edui-default"><div id="edui95_state" onmousedown="$EDITORUI[&quot;edui95&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui95&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui95&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui95&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui95_body" unselectable="on" title="插入视频" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui95&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui95&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui96" class="edui-box edui-button edui-for-inserthidden edui-default"><div id="edui96_state" onmousedown="$EDITORUI[&quot;edui96&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui96&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui96&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui96&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui96_body" unselectable="on" title="回复可见" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui96&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui96&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui41" class="edui-box edui-button edui-for-background edui-default"><div id="edui41_state" onmousedown="$EDITORUI[&quot;edui41&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui41&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui41&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui41&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui41_body" unselectable="on" title="背景" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui41&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui41&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui42" class="edui-box edui-separator  edui-default"></div><div id="edui43" class="edui-box edui-button edui-for-undo edui-default"><div id="edui43_state" onmousedown="$EDITORUI[&quot;edui43&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui43&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui43&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui43&quot;].Stateful_onMouseOut(event, this);" class="edui-default edui-state-disabled"><div class="edui-button-wrap edui-default"><div id="edui43_body" unselectable="on" title="撤销" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui43&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui43&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div></div></div></div></div></div><div id="edui45" class="edui-toolbar   edui-default" onselectstart="return false;" onmousedown="return $EDITORUI[&quot;edui45&quot;]._onMouseDown(event, this);" style="-webkit-user-select: none;"><div id="edui46" class="edui-box edui-button edui-for-bold edui-default"><div id="edui46_state" onmousedown="$EDITORUI[&quot;edui46&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui46&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui46&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui46&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui46_body" unselectable="on" title="加粗" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui46&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui46&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div></div></div></div></div><div id="edui47" class="edui-box edui-button edui-for-italic edui-default"><div id="edui47_state" onmousedown="$EDITORUI[&quot;edui47&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui47&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui47&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui47&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui47_body" unselectable="on" title="斜体" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui47&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui47&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div></div></div></div></div><div id="edui48" class="edui-box edui-button edui-for-underline edui-default"><div id="edui48_state" onmousedown="$EDITORUI[&quot;edui48&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui48&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui48&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui48&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui48_body" unselectable="on" title="下划线" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui48&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui48&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div></div></div></div></div><div id="edui49" class="edui-box edui-button edui-for-strikethrough edui-default"><div id="edui49_state" onmousedown="$EDITORUI[&quot;edui49&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui49&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui49&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui49&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui49_body" unselectable="on" title="删除线" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui49&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui49&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div></div></div></div></div><div id="edui50" class="edui-box edui-splitbutton edui-for-forecolor edui-default edui-colorbutton"><div title="字体颜色" id="edui50_state" onmousedown="$EDITORUI[&quot;edui50&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui50&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui50&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui50&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-splitbutton-body edui-default"><div id="edui50_button_body" class="edui-box edui-button-body edui-default" onclick="$EDITORUI[&quot;edui50&quot;]._onArrowClick();"><div class="edui-box edui-icon edui-default"></div><div id="edui50_colorlump" class="edui-colorlump"></div></div><div class="edui-box edui-splitborder edui-default"></div><div class="edui-box edui-arrow edui-default" onclick="$EDITORUI[&quot;edui50&quot;]._onArrowClick();"></div></div></div></div><div id="edui53" class="edui-box edui-splitbutton edui-for-backcolor edui-default edui-colorbutton"><div title="背景色" id="edui53_state" onmousedown="$EDITORUI[&quot;edui53&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui53&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui53&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui53&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-splitbutton-body edui-default"><div id="edui53_button_body" class="edui-box edui-button-body edui-default" onclick="$EDITORUI[&quot;edui53&quot;]._onArrowClick();"><div class="edui-box edui-icon edui-default"></div><div id="edui53_colorlump" class="edui-colorlump"></div></div><div class="edui-box edui-splitborder edui-default"></div><div class="edui-box edui-arrow edui-default" onclick="$EDITORUI[&quot;edui53&quot;]._onArrowClick();"></div></div></div></div><div id="edui60" class="edui-box edui-button edui-for-link edui-default"><div id="edui60_state" onmousedown="$EDITORUI[&quot;edui60&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui60&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui60&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui60&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui60_body" unselectable="on" title="超链接" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui60&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui60&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui61" class="edui-box edui-button edui-for-unlink edui-default"><div id="edui61_state" onmousedown="$EDITORUI[&quot;edui61&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui61&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui61&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui61&quot;].Stateful_onMouseOut(event, this);" class="edui-default edui-state-disabled"><div class="edui-button-wrap edui-default"><div id="edui61_body" unselectable="on" title="取消链接" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui61&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui61&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div></div></div></div></div><div id="edui62" class="edui-box edui-button edui-for-imageleft edui-default"><div id="edui62_state" onmousedown="$EDITORUI[&quot;edui62&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui62&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui62&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui62&quot;].Stateful_onMouseOut(event, this);" class="edui-default edui-state-disabled"><div class="edui-button-wrap edui-default"><div id="edui62_body" unselectable="on" title="左浮动" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui62&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui62&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui63" class="edui-box edui-button edui-for-imageright edui-default"><div id="edui63_state" onmousedown="$EDITORUI[&quot;edui63&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui63&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui63&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui63&quot;].Stateful_onMouseOut(event, this);" class="edui-default edui-state-disabled"><div class="edui-button-wrap edui-default"><div id="edui63_body" unselectable="on" title="右浮动" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui63&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui63&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui64" class="edui-box edui-menubutton edui-for-insertorderedlist edui-default"><div title="有序列表" id="edui64_state" onmousedown="$EDITORUI[&quot;edui64&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui64&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui64&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui64&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-menubutton-body edui-default"><div id="edui64_button_body" class="edui-box edui-button-body edui-default" onclick="$EDITORUI[&quot;edui64&quot;]._onArrowClick();"><div class="edui-box edui-icon edui-default"></div></div><div class="edui-box edui-splitborder edui-default"></div><div class="edui-box edui-arrow edui-default" onclick="$EDITORUI[&quot;edui64&quot;]._onArrowClick();"></div></div></div></div><div id="edui77" class="edui-box edui-menubutton edui-for-insertunorderedlist edui-default"><div title="无序列表" id="edui77_state" onmousedown="$EDITORUI[&quot;edui77&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui77&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui77&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui77&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-menubutton-body edui-default"><div id="edui77_button_body" class="edui-box edui-button-body edui-default" onclick="$EDITORUI[&quot;edui77&quot;]._onArrowClick();"><div class="edui-box edui-icon edui-default"></div></div><div class="edui-box edui-splitborder edui-default"></div><div class="edui-box edui-arrow edui-default" onclick="$EDITORUI[&quot;edui77&quot;]._onArrowClick();"></div></div></div></div><div id="edui97" class="edui-box edui-button edui-for-zolblockquote edui-default"><div id="edui97_state" onmousedown="$EDITORUI[&quot;edui97&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui97&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui97&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui97&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui97_body" unselectable="on" title="插入引用" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui97&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui97&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui98" class="edui-box edui-button edui-for-zolinsertcode edui-default"><div id="edui98_state" onmousedown="$EDITORUI[&quot;edui98&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui98&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui98&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui98&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui98_body" unselectable="on" title="插入代码" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui98&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui98&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui88" class="edui-box edui-button edui-for-scrawl edui-default"><div id="edui88_state" onmousedown="$EDITORUI[&quot;edui88&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui88&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui88&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui88&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui88_body" unselectable="on" title="涂鸦" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui88&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui88&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui89" class="edui-box edui-button edui-for-removeformat edui-default"><div id="edui89_state" onmousedown="$EDITORUI[&quot;edui89&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui89&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui89&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui89&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui89_body" unselectable="on" title="清除格式" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui89&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui89&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div></div></div></div></div><div id="edui99" class="edui-box edui-button edui-for-atuser edui-default"><div id="edui99_state" onmousedown="$EDITORUI[&quot;edui99&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui99&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui99&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui99&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui99_body" unselectable="on" title="@朋友" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui99&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui99&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div><div class="edui-box edui-label edui-default"></div></div></div></div></div><div id="edui90" class="edui-box edui-separator  edui-default"></div><div id="edui91" class="edui-box edui-button edui-for-redo edui-default"><div id="edui91_state" onmousedown="$EDITORUI[&quot;edui91&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui91&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui91&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui91&quot;].Stateful_onMouseOut(event, this);" class="edui-default edui-state-disabled"><div class="edui-button-wrap edui-default"><div id="edui91_body" unselectable="on" title="重做" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui91&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui91&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div></div></div></div></div><div id="edui92" class="edui-box edui-button edui-for-pasteplain edui-default"><div id="edui92_state" onmousedown="$EDITORUI[&quot;edui92&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui92&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui92&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui92&quot;].Stateful_onMouseOut(event, this);" class="edui-default"><div class="edui-button-wrap edui-default"><div id="edui92_body" unselectable="on" title="纯文本粘贴模式" class="edui-button-body edui-default" onmousedown="return $EDITORUI[&quot;edui92&quot;]._onMouseDown(event, this);" onclick="return $EDITORUI[&quot;edui92&quot;]._onClick(event, this);"><div class="edui-box edui-icon edui-default"></div></div></div></div></div></div></div></div><div id="edui1_toolbarmsg" class="edui-editor-toolbarmsg edui-default" style="display:none;"><div id="edui1_upload_dialog" class="edui-editor-toolbarmsg-upload edui-default" onclick="$EDITORUI[&quot;edui1&quot;].showWordImageDialog();">点击上传</div><div class="edui-editor-toolbarmsg-close edui-default" onclick="$EDITORUI[&quot;edui1&quot;].hideToolbarMsg();">x</div><div id="edui1_toolbarmsg_label" class="edui-editor-toolbarmsg-label edui-default"></div><div style="height:0;overflow:hidden;clear:both;" class="edui-default"></div></div></div><div id="edui1_iframeholder" class="edui-editor-iframeholder edui-default" style="width: 818px; height: 455px; z-index: 999; overflow: hidden;"><iframe id="ueditor_0" width="100%" height="100%" frameborder="0" src="javascript:void(function(){document.open();document.write("<!DOCTYPE html><html xmlns='http://www.w3.org/1999/xhtml' class='view' ><head><style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}
                                        body{margin:8px;font-family:sans-serif;font-size:16px;}p{margin:5px 0;}</style>
										<link rel='stylesheet' type='text/css' href='http://bbs.zol.com.cn/Ueditor/themes/iframe.css'/>
										<style>p{font-size:14px;font-family:Microsoft YaHei}</style>
										</head>
										<body class='view' ></body>
										<script type='text/javascript'  id='_initialScript'>setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant0'];editor._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);</script></html>");document.close();}())"></iframe></div>
										<div id="edui1_scalelayer" class="edui-default"></div></div></div>
                    <!-- 配置文件 -->
                    <script type="text/javascript" src={{{URL::asset('Bbs/ueditor.config.js')}}}></script>
                    <!-- 编辑器源码文件 -->
                    <script type="text/javascript" src={{{URL::asset('Bbs/ueditor.all.js')}}}></script>
                    <!--添加按钮 -->
                    <script type="text/javascript" src={{{URL::asset('Bbs/addCustomize.js')}}}></script>
                    <!-- 实例化编辑器 -->
                    <script type="text/javascript">
                        var ue = UE.getEditor('container');
                    </script>
                </div>


                <script>
                    var swfu,swfu2,swfa;
                    Reload = function() {
                        var settings = {
                            flash_url : "/js/swfupload/swfupload.swf",
                            upload_url: "/index.php?c=Ajax_Upload&a=uploadImage",
                            file_size_limit : "100 MB",
                            file_types : "*.jpg;*.gif;*.png;*.bmp;",
                            file_types_description : "Image Files",
                            file_upload_limit : 1000,  //配置上传个数
                            file_queue_limit : 0,
                            button_cursor:'-2',
                            debug: false,
                            progressWraper: 0,
                            // Button settings
                            button_image_url: "http://icon.zol.com.cn/community/publish/upload-bg.png",
                            button_width: "120",
                            button_height: "40",
                            button_placeholder_id: "uploadImgBtn",
                            button_text: '',
                            button_text_style: "",
                            button_text_left_padding: 0,
                            button_text_top_padding: 3,

                            file_queued_handler : swfUpload.fileQueued,
                            file_queue_error_handler : swfUpload.fileQueueError,
                            file_dialog_complete_handler : swfUpload.fileDialogComplete,
                            upload_start_handler : swfUpload.uploadStart,
                            upload_progress_handler : swfUpload.uploadProgress,
                            upload_error_handler : swfUpload.uploadError,
                            upload_success_handler : swfUpload.uploadSuccess,
                            upload_complete_handler : swfUpload.uploadComplete,
                            queue_complete_handler : swfUpload.queueComplete
                        };

                        var settings2 = {
                            flash_url : "/js/swfupload/swfupload.swf",
                            upload_url: "/index.php?c=Ajax_Upload&a=uploadImage",
                            //post_params: {"PHPSESSID" : "fb"},
                            file_size_limit : "100 MB",
                            file_types : "*.jpg;*.gif;*.png;*.bmp;",
                            file_types_description : "Image Files",
                            file_upload_limit : 1000,  //配置上传个数
                            file_queue_limit : 0,
                            //custom_settings : {
                            //progressTarget : "fsUploadProgress",
                            //cancelButtonId : "btnCancel"
                            //},
                            button_cursor:'-2',
                            debug: false,
                            progressWraper: 0,
                            // Button settings
                            button_image_url: "http://icon.zol.com.cn/community/publish/upload-goon-bg.png",
                            button_width: "54",
                            button_height: "24",
                            button_placeholder_id: "uploadImgBtn2",
                            button_text: '',
                            button_text_style: "",
                            button_text_left_padding: 0,
                            button_text_top_padding: 0,

                            file_queued_handler : swfUpload.fileQueued,
                            file_queue_error_handler : swfUpload.fileQueueError,
                            file_dialog_complete_handler : swfUpload.fileDialogComplete,
                            upload_start_handler : swfUpload.uploadStart,
                            upload_progress_handler : swfUpload.uploadProgress,
                            upload_error_handler : swfUpload.uploadError,
                            upload_success_handler : swfUpload.uploadSuccess,
                            upload_complete_handler : swfUpload.uploadComplete,
                            queue_complete_handler : swfUpload.queueComplete
                        };
                        swfu = new SWFUpload(settings);
                        swfu2 = new SWFUpload(settings2);
                    };
                </script>

                <div class="sidebar illustration" id="illustration">
                    <div class="preview" id="preview" style="display: none;">
                        <img width="210" height="223" alt="" src="">
                    </div>
                    <div class="sidebar-head"><h3>快速插图</h3></div>
                    <div class="illustration-outer">
                        <div class="pic-upload">
                            <object id="SWFUpload_0" type="application/x-shockwave-flash" data="http://bbs.zol.com.cn/js/swfupload/swfupload.swf?swfuploadrnd=827889951" width="120" height="40" class="swfupload"><param name="wmode" value="window"><param name="movie" value="/js/swfupload/swfupload.swf?swfuploadrnd=827889951"><param name="quality" value="high"><param name="allowScriptAccess" value="always"><param name="flashvars" value="movieName=SWFUpload_0&amp;uploadURL=%2Findex.php%3Fc%3DAjax_Upload%26a%3DuploadImage&amp;useQueryString=false&amp;requeueOnError=false&amp;httpSuccess=&amp;params=&amp;filePostName=Filedata&amp;fileTypes=*.jpg%3B*.gif%3B*.png%3B*.bmp%3B&amp;fileTypesDescription=Image%20Files&amp;fileSizeLimit=100%20MB&amp;fileUploadLimit=1000&amp;fileQueueLimit=0&amp;debugEnabled=false&amp;buttonImageURL=http%3A%2F%2Ficon.zol.com.cn%2Fcommunity%2Fpublish%2Fupload-bg.png&amp;buttonWidth=120&amp;buttonHeight=40&amp;buttonText=&amp;buttonTextTopPadding=3&amp;buttonTextLeftPadding=0&amp;buttonTextStyle=&amp;buttonAction=-110&amp;buttonDisabled=false&amp;buttonCursor=-2"></object>
                            <p class="btn-box"><label for="isWaterMark"><input id="isWaterMark" type="checkbox" checked="checked"><span>图片加水印logo</span></label></p>
                            <p>按 Ctrl 可多选</p>
                            <p>单次最多可选50张</p>
                            <p>支持jpg、gif、bmp格式</p>
                            <p>建议单张不超过1MB</p>
                        </div>
                        <!-- //pic-upload -->

                        <div class="illustrated" style="display:none;">
                            <div class="illustrated-curmb" id="cancelPicUpload" style="display:none;">
                                <a href="javascript:;" onclick="javascript:swfUpload.cancel();">取消上传</a>
                            </div>
                            <div class="illustrated-curmb" id="managePicList" style="display:none;">
                                <a href="javascript:;" class="sort" onclick="FB.reSortPic();">排序</a>
                                <a href="javascript:;" onclick="javascript:FB.delUploadPic();">全部清除</a>
                                <object id="SWFUpload_1" type="application/x-shockwave-flash" data="http://bbs.zol.com.cn/js/swfupload/swfupload.swf?swfuploadrnd=852866146" width="54" height="24" class="swfupload"><param name="wmode" value="window"><param name="movie" value="/js/swfupload/swfupload.swf?swfuploadrnd=852866146"><param name="quality" value="high"><param name="allowScriptAccess" value="always"><param name="flashvars" value="movieName=SWFUpload_1&amp;uploadURL=%2Findex.php%3Fc%3DAjax_Upload%26a%3DuploadImage&amp;useQueryString=false&amp;requeueOnError=false&amp;httpSuccess=&amp;params=&amp;filePostName=Filedata&amp;fileTypes=*.jpg%3B*.gif%3B*.png%3B*.bmp%3B&amp;fileTypesDescription=Image%20Files&amp;fileSizeLimit=100%20MB&amp;fileUploadLimit=1000&amp;fileQueueLimit=0&amp;debugEnabled=false&amp;buttonImageURL=http%3A%2F%2Ficon.zol.com.cn%2Fcommunity%2Fpublish%2Fupload-goon-bg.png&amp;buttonWidth=54&amp;buttonHeight=24&amp;buttonText=&amp;buttonTextTopPadding=0&amp;buttonTextLeftPadding=0&amp;buttonTextStyle=&amp;buttonAction=-110&amp;buttonDisabled=false&amp;buttonCursor=-2"></object>
                            </div>
                            <span class="turn-up" style="visibility: hidden;"><em></em></span>
                            <div class="pic-list-box">
                                <ul class="pic-list clearfix" id="picUploadArea"></ul>
                            </div>
                            <span class="turn-down" style="visibility: hidden;"><em></em></span>

                            <div class="illustrated-bottom">
                                <div class="illustrated-size">
                                    <span class="size">图片尺寸：</span>
                                    <div class="selectbox" id="picSize">
                                        <span class="select-label border-radius"><i class="trangle"></i>800px</span>
                                        <ul class="border-radius" style="display:none;">
                                            <li>240PX</li>
                                            <li>500PX</li>
                                            <li>800PX</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="exifbox clearfix"><label class="release"><input type="checkbox" id="isExif" name="is_exif" value="1">插入exif信息</label></div>
                                <div class="bottom-mod clearfix">
                                    <span class="btn-blue border-radius" onclick="FB.insertAllPic();">全部插入</span>
                                    <label class="release">
                                        <input type="checkbox" id="isFenLou">
                                        分楼层发布
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- //section -->
        <script>
            Reload();
        </script>

        <!-- 发帖分类 add jialp at 20141212 -->

        <div class="rewardbox">
            <!--<div class="filter-else-area clearfix">
                <div class="color-set clearfix">
                    <label for="titleColorSet"><input id="titleColorSet" type="checkbox">标题高亮</label>
                    <div class="selectbox3" id="titleColor">
                        <span class="select-label border-radius" style="background-color:#078cfd;"><i class="trangle"></i></span>
                        <ul class="border-radius">
                            <li><span class="blue border-radius"></span></li>
                            <li><span class="green border-radius"></span></li>
                        </ul>
                    </div>
                    <span class="color-set-tip">！需要消耗50Z金豆</span>
                </div>
                <div class="color-set post-set-top clearfix">
                    <label for="postSetTop"><input id="postSetTop" type="checkbox">置顶此贴</label>
                    <span class="color-set-tip">！需要消耗100Z金豆</span>
                </div>
            </div>

            <div id="jindouTips" style="display:none;">
                <span>提示：</span>
                <p></p>
            </div>-->

            <div class="post-publish clearfix">
                <span class="btn-gray border-radius" id="previewBook">预览</span>
                <span class="btn-blue border-radius" id="publishBookBtn">发表</span>
                <!-- 分享 -->

            </div>
        </div>
    </div>

    {!! Form::close() !!}

    <div class="wrap-foot"></div>

    <div id="xiuxiuContainer" style="display: none;"><div id="xiuxiuFlash"></div></div>
    <!-- 公共尾部 -->
    <!-- <a class="fixed-call-survey" href="http://survey.zol.com.cn/front/1/734.html" target="_blank">意见反馈</a> -->
    <div class="wrapper foot">
        <script>
            if (typeof WEB_CONFIG != 'undefined' && WEB_CONFIG.bbsid==1 && WEB_CONFIG.bookid) {
                var __publicNavWidth=$(".wrapper").width();
            } else {
                var __publicNavWidth=1000;
            }
        </script>
        <script language="JavaScript" type="text/javascript" src={{{URL::asset('Bbs/web_footc.js')}}}></script>
        <script language="JavaScript" type="text/javascript" src={{{URL::asset('Bbs/web_foot.js')}}}></script>

    </div>
    <script src={{{URL::asset('Bbs/msg.json')}}}></script>
    <script type="text/javascript">
        $(function() {
            MSG.get(function(json) {
                msgStatus(json);
            }, '', 1)
        });
        function msgClear()
        {
            setTimeout(function() {
                MSG.get(function(json) {
                    msgStatus(json);
                }, '', 1);
                if (document.getElementById('zol-follow-api')) {
                    document.getElementById('zol-follow-api').parentNode.removeChild(document.getElementById('zol-follow-api'))
                }
            }, 10000);
        }
        function msgStatus(json) {
            if (json.unreadMsg) {
                document.getElementById('messageSpanA').className = 'msg-ico';
                if (document.getElementById('messageMsgNum')) {
                    document.getElementById('messageMsgNum').innerHTML = json.unreadMsg;
                } else {
                    var obj = document.createElement("span");
                    obj.className = "msg-num";
                    obj.setAttribute('id', 'messageMsgNum');
                    obj.innerHTML = json.unreadMsg;
                    document.getElementById("pubMessageDetailNotice").parentNode.insertBefore(obj, document.getElementById("pubMessageDetailNotice")); //更新创建
                }
            } else {
                document.getElementById('messageSpanA').className = 'msg-ico msg-null';
                if (document.getElementById('messageMsgNum')) {
                    document.getElementById('messageMsgNum').parentNode.removeChild(document.getElementById('messageMsgNum'))
                }
            }

            var msgNoticeStr = '';
            msgNoticeStr += '<a href="http://my.zol.com.cn/index.php?c=Message_Private" target="_blank" onclick="msgClear();">私信';
            if (json['1'] > 0) {
                msgNoticeStr += '<span>(<b>' + json['1'] + '</b>)</span>';
            }
            msgNoticeStr += '</a><a href="http://my.zol.com.cn/index.php?c=Message_Reply" target="_blank" onclick="msgClear();">回复';
            if (json['2']  > 0) {
                msgNoticeStr += '<span>(<b>' + json['2'] + '</b>)</span>';
            }
            msgNoticeStr += '</a><a href="http://my.zol.com.cn/index.php?c=Message_At" target="_blank" onclick="msgClear();">@我';
            if (json['3'] > 0) {
                msgNoticeStr += '<span>(<b>' + json['3'] + '</b>)</span>';
            }
            msgNoticeStr += '</a><a href="http://my.zol.com.cn/index.php?c=Message_Remind" target="_blank" onclick="msgClear();">提醒';
            if (json['5'] > 0) {
                msgNoticeStr += '<span>(<b>' + json['5'] + '</b>)</span>';
            }
            msgNoticeStr += '</a><a href="http://my.zol.com.cn/index.php?c=Message_Notice" target="_blank" onclick="msgClear();">系统通知';
            if (json['4'] > 0) {
                msgNoticeStr += '<span>(<b>' + json['4'] + '</b>)</span>';
            }
            msgNoticeStr += '</a>';
            document.getElementById("pubMessageDetailNotice").innerHTML = msgNoticeStr;
            if (json.unreadFeed) {
                if (document.getElementById('feedMsgNum')) {
                    document.getElementById('feedMsgNum').innerHTML = json.unreadFeed;
                } else {
                    var obj = document.createElement("span");
                    obj.className = "msg-num";
                    obj.setAttribute('id', 'feedMsgNum');
                    obj.innerHTML = json.unreadFeed;
                    document.getElementById("pubFeedDetailNotice").parentNode.insertBefore(obj, document.getElementById("pubFeedDetailNotice")); //更新创建
                }
            } else {
                if (document.getElementById('feedMsgNum')) {
                    document.getElementById('feedMsgNum').parentNode.removeChild(document.getElementById('feedMsgNum'))
                }
            }
            var feedNoticeStr = '';
            feedNoticeStr += '<a href="http://my.zol.com.cn/index.php?c=me&a=default&userid=0kxo0w" target="_blank" onclick="msgClear();">新动态';
            if (json.feed > 0) {
                feedNoticeStr += '<span>(<b>' + json.feed + '</b>)</span>';
            }
            feedNoticeStr += '<a href="http://my.zol.com.cn/follower/" target="_blank" onclick="msgClear();">新粉丝';
            if (json.follower > 0) {
                feedNoticeStr += '<span>(<b>' + json.follower + '</b>)</span>';
            }
            feedNoticeStr += '</a>';
            document.getElementById("pubFeedDetailNotice").innerHTML = feedNoticeStr;
        }

        //未完成任务提示
        $(function(){
            (function(){
                var target = $('#pubMyBbs'),s = '<i class="news-ico"></i>';

                //请求有没有未完成的任务,显示红点
                $.get('/index.php?c=Ajax_Task&a=initDot',{},function(json){
                    if (json.info == 'ok') {
                        target && target.find('span.ismore').append(s) &&
                        target.find('#pubMyBbsDetailNotice').find('a:last').addClass('my-task').append(s);
                    }
                },'json');
            })();
        });
    </script>



    <script src={{{URL::asset('Bbs/xiuxiu.js')}}} type="text/javascript"></script>

    <div id="edui_fixedlayer" class="edui-default" style="position: fixed; left: 0px; top: 0px; width: 0px; height: 0px;">
        <div id="edui100" class="edui-popup  edui-bubble edui-default" onmousedown="return false;" style="display: none;">
            <div id="edui100_body" class="edui-popup-body edui-default">
                <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank" class="edui-default"></iframe> <div class="edui-shadow edui-default"></div> <div id="edui100_content" class="edui-popup-content edui-default">
                </div>
            </div>
        </div>
    </div>

    <style type="text/css">.zol-global-footer{min-width:1000px; margin: 20px auto 0; background: #333; clear:both;}.zol-global-footer,.zol-global-footer *{float: none;}.zol-footer {float: none; height: 40px; min-width: 960px; overflow: hidden; float: none; clear: both; padding: 0 10px; background: #333; color: #ccc; text-align: left; font-size: 12px; font-family: arial; line-height: 40px;}.zol-footer *{float: none;}.zol-footer span {_display: inline; float:right; margin: 0 -7px 0 0; color:#666; font-family:"宋体"; font-size:10px; -webkit-text-size-adjust:none;}.zol-footer a{padding: 0 6px 0 7px; color:#ccc; text-decoration:none; font-family:Arial; font-size:12px;}.zol-footer a:hover{color:#ccc; text-decoration: underline;} .zol-footer i {display: none;}.zol-footer .footerw-2015{float: none; height: 40px; width:1000px; margin: 0 auto; line-height: 40px;}.zol-global-footer-fixed{position: fixed; bottom: 0; left: 0; width: 100%;}</style>
    <div class="popbox" style="display:none;" id="zolAttachLayer">        <div class="popbox-inner">            <div class="popbox-head">                <span class="popbox-close border-radius" onclick="javascript:$(&#39;#zolAttachLayer&#39;).hide();">关闭</span>                <h3><i class="line"></i>上传附件</h3>            </div>            <div class="popbox-main">                <div class="upload-attach">                    <div class="attach-func clearfix">                        <div class="color-set">                            <label for="postSetTopAttach">                                <input id="postSetTopAttach" type="checkbox">                                <span class="color-title">发布收费附件</span>                            </label>                            <span class="color-set-tip">！需消耗5Z金豆</span>                        </div>                        <object id="SWFUpload_2" type="application/x-shockwave-flash" data="http://bbs.zol.com.cn/js/swfupload/swfupload.swf?swfuploadrnd=451021068" width="117" height="33" class="swfupload"><param name="wmode" value="window"><param name="movie" value="/js/swfupload/swfupload.swf?swfuploadrnd=451021068"><param name="quality" value="high"><param name="allowScriptAccess" value="always"><param name="flashvars" value="movieName=SWFUpload_2&amp;uploadURL=%2Findex.php%3Fc%3DAjax_Upload%26a%3DuploadAttachment&amp;useQueryString=false&amp;requeueOnError=false&amp;httpSuccess=&amp;params=&amp;filePostName=Filedata&amp;fileTypes=*.chm%3B*.zip%3B*.rar%3B*.jpg%3B*.gif%3B*.png%3B&amp;fileTypesDescription=Attach%20Files&amp;fileSizeLimit=5MB&amp;fileUploadLimit=5&amp;fileQueueLimit=5&amp;debugEnabled=false&amp;buttonImageURL=http%3A%2F%2Ficon.zol.com.cn%2Fcommunity%2Fpublish%2Fselect-file-bg.png&amp;buttonWidth=117&amp;buttonHeight=33&amp;buttonText=&amp;buttonTextTopPadding=0&amp;buttonTextLeftPadding=0&amp;buttonTextStyle=&amp;buttonAction=-110&amp;buttonDisabled=false&amp;buttonCursor=-2"></object>                    </div>                    <div class="attach-listbox">                        <div class="attach-list-head">                            <span class="file-name">文件名（<a href="javascript:;" onclick="FB.insertAttachment(0);">插入全部附件</a>）</span>                            <span class="file-describe">描述</span>                            <span class="file-price">售价</span>                        </div>                        <form id="attachForm"><ul class="attach-list" id="attachUploadArea"></ul></form>                        <div class="attach-tip">                            <i class="ico"></i>                            <p>点击附件文件名添加到帖子内容中</p>							<p>每帖最多上传5个附件，单个附件尺寸小于<em>5MB</em>,， 可用扩展名：<em> chm,zip,rar,tar,gif,jpg,png</em></p>                            <p>单个附件出售最高收入上限为 20 个Z金豆</p>                        </div>                    </div>                    <div class="popbox-btns">                       <span class="btn-blue border-radius" onclick="javascript:FB.insertAttachment(0);">确定</span>                       <span class="btn-gray border-radius" onclick="javascript:$(&#39;#zolAttachLayer&#39;).hide();">取消</span></div>                </div>            </div>        </div>    </div></body></html>


@stop
