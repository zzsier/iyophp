<div class="meta inline-block" >

  <a href="{{ route('backend.topic.show', $topic->id) }}" class="remove-padding-left">
    {{{ $topic->title }}}
  </a>
  •
  <a href="{{ route('backend.topic.show', $topic->id) }}">
    {{{ $topic->title }}}
  </a>
  •
  {{ 'at' }} <abbr title="{{ $topic->created_at }}" class="timeago">{{ $topic->created_at }}</abbr>
  •

  @if (count($topic->id))
    {{ 'Last Reply by' }}
      <a href="{{{ URL::route('backend.user.show', [$topic->id]) }}}">
        {{{ $topic->title }}}
      </a>
     {{ 'at' }} <abbr title="{{ $topic->updated_at }}" class="timeago">{{ $topic->updated_at }}</abbr>
    •
  @endif

  {{ $topic->view_count }} {{ 'Reads' }}
</div>
<div class="clearfix"></div>
