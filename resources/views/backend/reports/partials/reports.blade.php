

@if (count($reports))

<ul class="list-group row topic-list center-block">
    @foreach ($reports as $report)
     <li class="list-group-item media" style="margin-top: 0px;">

 <!--       <a class="pull-right" href="{{ URL::to('report/show').'?id='.$report->id }}" >
            <span class="badge badge-reply-count"> 预览 </span>
        </a>

        <a class="pull-right" href="{{ URL::to('backend/report/destroy').'?id='.$report->id }}" >
            <span class="badge badge-reply-count"> 删除 </span>
        </a>
		-->

        <div class="infos">

          <div class="media-heading row">
            <a href="{{ URL::to('backend/topic/edit').'?id='.$report->id }}" class="mkellipsis col-sm-8" title="{{{ $report->body }}}">
                {{{ $report->body }}}
            </a>
          </div>
          <div class="meta row">
            <span class="fa fa-thumbs-o-up remove-padding-left col-sm-6 text-left mkellipsis"> 文章id: 
			<a href="{{ URL::to('backend/moment/edit').'?id='.$report->topic_id }}"> {{{ $report->topic_id }}} </a>
			</span>
            <span class="col-sm-3 mkellipsis"> 编辑： [{{{ $report->user_id }}}] </span>
            <span class="timeago col-sm-3 text-right"> {{ $report->created_at }} </span>
          </div>
        </div>

    </li>
    @endforeach
</ul>

@else
   <div class="empty-block">当前没有数据</div>
@endif
