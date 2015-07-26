<div class="meta inline-block" >

  <a href="{{ route('nodes.show', $topic->node->id) }}" class="remove-padding-left">
    {{{ $topic->node->name }}}
  </a>
  •
  <a href="{{ route('users.show', $topic->user->id) }}">
    {{{ $topic->user->name }}}
  </a>
  •
  {{ trans('message.at') }} <abbr title="{{ $topic->created_at }}" class="timeago">{{ $topic->created_at }}</abbr>
  •

  @if (count($topic->lastReplyUser))
    {{ trans('message.Last Reply by') }}
      <a href="{{{ URL::route('users.show', [$topic->lastReplyUser->id]) }}}">
        {{{ $topic->lastReplyUser->name }}}
      </a>
     {{ trans('message.at') }} <abbr title="{{ $topic->updated_at }}" class="timeago">{{ $topic->updated_at }}</abbr>
    •
  @endif

  {{ $topic->view_count }} {{ trans('message.Reads') }}
</div>
<div class="clearfix"></div>
