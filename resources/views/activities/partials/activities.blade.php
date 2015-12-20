

@if (count($activities))

<ul class="list-group row topic-list">
    @foreach ($activities as $activity)
     <li class="list-group-item media {{ !$column ?:'col-sm-6' }}" style="margin-top: 0px;">

        <a class="pull-right" href="{{ route('activities.edit', [$activity->id]) }}" >
            <span class="badge badge-reply-count"> {{ $activity->reply_count }} </span>
        </a>

        <div class="avatar pull-left">
            <a href="{{ route('users.show', [$activity->user_id]) }}">
                <img class="media-object img-thumbnail avatar" alt="{{{ $activity->user->name }}}" src="{{ $activity->user->imageUrl }}"  style="width:48px;height:48px;"/>
            </a>
        </div>

        <div class="infos">

          <div class="media-heading">

            <a href="{{ route('activities.show', [$activity->id]) }}" title="{{{ $activity->title }}}">
                {{{ $activity->title }}}
            </a>
          </div>
          <div class="media-body meta">
          </div>

        </div>

    </li>
    @endforeach
</ul>

@else
   <div class="empty-block">{{ trans('message.Dont have any data Yet') }}~~</div>
@endif
