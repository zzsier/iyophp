

@if (count($nodes))

<ul class="list-group row topic-list center-block">
    @foreach ($nodes as $node)
     <li class="list-group-item media" style="margin-top: 0px;">

        <a class="pull-right" href="{{ URL::to('backend/nodes/destroy').'?id='.$node->id }}" >
            <span class="badge badge-reply-count"> 删除 </span>
        </a>
        <a class="pull-right" href="{{ URL::to('backend/nodes/edit').'?id='.$node->id }}" >
            <span class="badge badge-reply-count"> 编辑 </span>
        </a>


        <div class="infos">

          <div class="media-heading row">
				{{{ $node->id }}}) &nbsp;&nbsp;&nbsp;{{{ $node->name }}}
          </div>
          <div class="meta row">
            <span class="timeago col-sm-3 text-right">父节点： {{{ $node->parent_node }}} </span>
          </div>
        </div>

    </li>
    @endforeach
</ul>

@else
   <div class="empty-block">当前没有数据</div>
@endif
