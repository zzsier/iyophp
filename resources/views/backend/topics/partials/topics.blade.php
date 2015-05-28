

@if (count($topics))

<ul class="list-group row topic-list center-block">
    @foreach ($topics as $topic)
     <li class="list-group-item media" style="margin-top: 0px;">

        <a class="pull-right" href="{{ URL::to('topic/show').'?id='.$topic->id }}" >
            <span class="badge badge-reply-count"> 预览 </span>
        </a>

        <a class="pull-right" href="{{ URL::to('backend/topic/destroy').'?id='.$topic->id }}" >
            <span class="badge badge-reply-count"> 删除 </span>
        </a>

{{--
        <div class="avatar pull-left">
            <a href="{{ URL::to('backend/topic/edit').'?id='.$topic->id }}">
                <img class="media-object img-thumbnail avatar" alt="{{{ $topic->title }}}" src="{{ $topic->image }}"  style="width:48px;height:48px;"/>
            </a>
        </div>
--}}

        <div class="infos">

          <div class="media-heading row">

            @if ($topic->order > 0 && !Input::get('filter') && Route::currentRouteName() != 'home' )
                <span class="label label-warning">{{ lang('Stick') }}</span>
            @elseif ($topic->is_excellent && !Input::get('filter') && Route::currentRouteName() != 'home' )
                <span class="label label-success">{{ lang('Recommended') }}</span>
            @endif

            <a href="{{ URL::to('backend/topic/edit').'?id='.$topic->id }}" class="mkellipsis col-sm-8" title="{{{ $topic->title }}}">
                {{{ $topic->title }}}
            </a>
          </div>
          <div class="meta row">
            <span class="fa fa-thumbs-o-up remove-padding-left col-sm-6 text-left mkellipsis"> 简介: {{{ $topic->abstract }}} </span>
            <span class="col-sm-3 mkellipsis"> 编辑公会： [{{{ $topic->username }}}] </span>
            <span class="timeago col-sm-3 text-right"> {{ $topic->created_at }} </span>
          </div>
        </div>

    </li>
    @endforeach
</ul>

@else
   <div class="empty-block">当前没有数据</div>
@endif
