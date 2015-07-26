@extends('layouts.default')

@section('content')

    <div class="wrapper">
        <div class="focus-box">
            <div class="focus-date">
                <div style="max-width: 100%;" class="bx-wrapper">
					<div style="width: 100%; overflow: hidden; position: relative; height: 405px;" class="bx-viewport">
						<ul style="width: 515%; position: relative; transition-duration: 0s; transform: translate3d(-3000px, 0px, 0px);" class="focus-list">
							@foreach ($topics as $index => $subtopics)
							<li style="float: left; list-style: outside none none; position: relative; width: 1000px;" 
								class="focus-item  bx-clone" data-role={{{ $index }}}>
								@foreach ($subtopics as $index => $topic)
                                <div class="item item-{{ $index+1 }}">
                                    <a href={{{ URL::to("topics/$topic->id") }}} target="_blank" class="pic">
										@if( $index == 0 )
                                        <img src={{{ $topic->image }}} alt={{{ $topic->title }}} height="405" width="285">
										@elseif( $index == 1 )
                                        <img src={{{ $topic->image }}} alt={{{ $topic->title }}} height="200" width="400">
										@elseif( $index == 2 )
                                        <img src={{{ $topic->image }}} alt={{{ $topic->title }}} height="200" width="305">
										@elseif( $index == 3 )
                                        <img src={{{ $topic->image }}} alt={{{ $topic->title }}} height="200" width="305">
										@elseif( $index == 4 )
                                        <img src={{{ $topic->image }}} alt={{{ $topic->title }}} height="200" width="400">
										@endif
										<span class="pic-intro">
											<span class="pic-intro-head">
												<span class="pic-intro-title"><em>{{{ $topic->title }}}</em></span>
												<span>{{{ date("Y-m-d H:i:s", strtotime($topic->created_at)) }}} </span>
											</span>
											<span class="pic-intro-body">{{{ $topic->title }}}</span>
										</span>
                                    </a>
                                </div>
								@endforeach
                            </li>
							@endforeach
                            </ul>
						</div>
						<div class="bx-controls bx-has-pager bx-has-controls-direction">
							<!--<div class="bx-pager bx-default-pager">
								<div class="bx-pager-item"><a href="" data-slide-index="0" class="bx-pager-link">1</a></div>
								<div class="bx-pager-item"><a href="" data-slide-index="1" class="bx-pager-link">2</a></div>
								<div class="bx-pager-item"><a href="" data-slide-index="2" class="bx-pager-link active">3</a></div>
							</div>-->
							<div class="bx-controls-direction">
								<a class="bx-prev" href="javascript:;">Prev</a><a class="bx-next" href="javascript:;">Next</a>
							</div>
						</div>
					</div>
            </div>
        </div>

		<script>

			var currentleft = 0;

			var newcss = "translate3d("+currentleft+"px, 0px, 0px)";
			$(".focus-list").css({
				"transform": newcss
			});

	        $(".bx-prev").click(function() {
				currentleft = currentleft - 1000;
				if( currentleft == -4000 ) currentleft = 0;
				var newcss = "translate3d("+currentleft+"px, 0px, 0px)";
				$(".focus-list").css({
					"transform": newcss
				});
            });

 	        $(".bx-next").click(function() {
				currentleft = currentleft + 1000;
				if( currentleft == 1000 ) currentleft = -3000;
				var newcss = "translate3d("+currentleft+"px, 0px, 0px)";
				$(".focus-list").css({
					"transform": newcss
				});
            });
 		

		</script>

        <div class="bbs-content clearfix">
            <div class="aside">
                <div class="aside-module box-shadow">
                    <div class="aside-header border-radius-top">
                        <h3><i class="ico-hotrank"></i>热帖排行</h3>
                    </div>
                    <div class="aside-body rank-box" id="hotBookList">
                        <ul class="hotBookTab rank-tab clearfix">
                            @foreach ($nodes['top'] as $index => $top_node)
								@if( $index == 0 )
								<li data-role={{{ $index+1 }}} class="current">{{{ $top_node->name }}}</li>
								@elseif( $index == 1 )
								<li data-role={{{ $index+1 }}}>{{{ $top_node->name }}}</li>
								@elseif( $index == 2 )
								<li data-role={{{ $index+1 }}}>{{{ $top_node->name }}}</li>
								@elseif( $index == 3 )
								<li data-role={{{ $index+1 }}}>{{{ $top_node->name }}}</li>
								@elseif( $index == 4 )
								<li data-role={{{ $index+1 }}}>{{{ $top_node->name }}}</li>
								@endif
                            @endforeach
                        </ul>
						@foreach ($topics as $index => $subtopics)
						@if( $index == 0 )
						<ul class="hotBookDiv_{{{ $index+1 }}} rank-list">
						@else
						<ul class="hotBookDiv_{{{ $index+1 }}} rank-list" style="display: none;">
						@endif
							@foreach ($subtopics as $index => $topic)
							@if( $index == 0 )
                            <li class="first current">
							@else
                            <li class="">
							@endif
                                <div class="rank-inner">
                                    <span class="n2">{{{ $index+1 }}}</span>
                                    <a class="title" href={{{ URL::to("topics/$topic->id") }}} title={{{ $topic->title }}} target="_blank">
									{{{ $topic->title }}}</a>
                                </div>
                            </li>
							@endforeach
                        </ul>
						@endforeach
                    </div>
                </div>
            </div>

            <div class="bbs-body">
                <div class="bbs-main">
					@foreach ($topics as $index => $subtopics)
                    <div class="section sec-sjbbs box-shadow">
                        <div class="section-header">
                            <h2><i class="line"></i>
							<a href="http://123.59.53.158/nodes/{{{ $nodes['top'][$index]->id }}}" target="_blank" title={{{ $nodes['top'][$index]->name }}}>
							&nbsp; {{{ $nodes["top"][$index]->name }}}</a>
                            <span style="display: inline-block">
							<!--<script>write_group_ad('forums_user_textlink','forums_user_textlink.inc.inc');</script>-->
							</span>
                            </h2>
                        </div>

                        <ul class="section-pics clearfix">
							@foreach ($subtopics as $index => $topic)
							@if( $index == 0 )
                            <li class="first">
							@else
                            <li>
							@endif
                                <a href={{{ URL::to("topics/$topic->id") }}} target="_blank" class="pic">
								@if( $index == 0 )
                                <img src={{{ $topic->image }}} alt={{{ $topic->title }}} height="245" width="340">
								@elseif( $index == 1 )
                                <img src={{{ $topic->image }}} alt={{{ $topic->title }}} height="120" width="160">
								@elseif( $index == 2 )
                                <img src={{{ $topic->image }}} alt={{{ $topic->title }}} height="120" width="160">
								@elseif( $index == 3 )
                                <img src={{{ $topic->image }}} alt={{{ $topic->title }}} height="120" width="160">
								@elseif( $index == 4 )
                                <img src={{{ $topic->image }}} alt={{{ $topic->title }}} height="120" width="160">
								@endif

								<span class="pic-intro border-radius-bottom">
								<span class="pic-intro-head">
									<span class="pic-title">{{{ $topic->title }}}</span>
									<span class="pic-nums"></span>
									<span class="pic-intro-time">{{{ date("Y-m-d H:i:s", strtotime($topic->created_at)) }}}</span>
								</span>
								<span class="pic-intro-body">{{{ $topic->title }}}</span>
								</span>
                                </a>
                            </li>
							@endforeach
                        </ul>
                    </div>
					@endforeach
                </div>
            </div>
        </div>
    </div>


    <script src="demo/search.js"></script>
    <script src="demo/login.js"></script>
    <script src="demo/bbs_task_guide.js"></script>
   </div>

</div>

@stop
