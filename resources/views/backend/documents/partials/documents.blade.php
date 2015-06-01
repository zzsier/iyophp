

@if (count($documents))

<ul class="list-group row topic-list center-block">
    @foreach ($documents as $document)
     <li class="list-group-item media" style="margin-top: 0px;">

        <a class="pull-right" href="{{ URL::to('backend/document/destroy').'?id='.$document->id }}" >
            <span class="badge badge-reply-count"> 删除 </span>
        </a>
        <a class="pull-right" href="{{ URL::to('backend/document/edit').'?id='.$document->id }}" >
            <span class="badge badge-reply-count"> 编辑 </span>
        </a>


        <div class="infos">

          <div class="media-heading row">
            <a href="{{ URL::to('backend/document/show').'?id='.$document->id }}" class="mkellipsis col-sm-8" title="{{{ $document->title }}}">
                {{{ $document->title }}}
            </a>
          </div>
          <div class="meta row">
            <span class="timeago col-sm-3 text-right"> {{{ $document->created_at }}} </span>
          </div>
        </div>

    </li>
    @endforeach
</ul>

@else
   <div class="empty-block">当前没有数据</div>
@endif
