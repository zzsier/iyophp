<div class="panel-footer operate">

  <div class="pull-left" style="font-size:15px;">
    <a class="" href="http://service.weibo.com/share/share.php?url={{ urlencode(Request::url()) }}&type=3&pic=&title={{{ $topic->title }}}" target="_blank" title="{{ trans('message.Share on Weibo') }}">
      <i class="fa fa-weibo"></i>
    </a>
    <a href="https://twitter.com/intent/tweet?url={{ urlencode(Request::url()) }}&text={{{ $topic->title }}}&via=phphub.org" class=""  target="_blank" title="{{ trans('message.Share on Twitter') }}">
      <i class="fa fa-twitter"></i>
    </a>
    <a href="http://www.facebook.com/sharer.php?u={{ urlencode(Request::url()) }}" class=""  target="_blank" title="{{ trans('message.Share on Facebook') }}">
      <i class="fa fa-facebook"></i>
    </a>
    <a href="https://plus.google.com/share?url={{ urlencode(Request::url()) }}" class=""  target="_blank" title="{{ trans('message.Share on Google Plus') }}">
      <i class="fa fa-google-plus"></i>
    </a>
  </div>

  <div class="pull-right">

    @if (Auth::check() && App\Model\Attention::isUserAttentedTopic(Auth::user(), $topic))
      <a data-method="post" id="topic-attent-cancel-button" href="javascript:void(0);" data-url="{{ route('attentions.createOrDelete', $topic->id) }}">
        <i class="glyphicon glyphicon-eye-open" style="color:#ce8a81"></i> <span>{{ trans('message.Cancel') }}</span>
      </a>
    @else
      <a data-method="post" id="topic-attent-button" href="javascript:void(0);" data-url="{{ route('attentions.createOrDelete', $topic->id) }}">
        <i class="glyphicon glyphicon-eye-open"></i> <span>{{ trans('message.Attent') }}</span>
      </a>
    @endif

    @if (Auth::check() && App\Model\Favorite::isUserFavoritedTopic(Auth::user(), $topic))
      <a data-method="post" id="topic-favorite-cancel-button" href="javascript:void(0);" data-url="{{ route('favorites.createOrDelete', $topic->id) }}">
        <i class="glyphicon glyphicon-bookmark" style="color:#ce8a81"></i> <span>{{ trans('message.Cancel') }}</span>
      </a>
    @else
      <a data-method="post" id="topic-favorite-button" href="javascript:void(0);" data-url="{{ route('favorites.createOrDelete', $topic->id) }}">
        <i class="glyphicon glyphicon-bookmark"></i> <span>{{ trans('message.Favorite') }}</span>
      </a>
    @endif

    @if (Auth::user() && Auth::user()->can("manage_topics") )
        <a data-method="post" id="topic-recomend-button" href="javascript:void(0);" data-url="{{ route('topics.recomend', [$topic->id]) }}" class="admin {{ $topic->is_excellent ? 'active' :''}}" title="{{ trans('message.Mark as Excellent') }}">
        <i class="fa fa-trophy"></i>
        </a>

        <a data-method="post" id="topic-wiki-button" href="javascript:void(0);" data-url="{{ route('topics.wiki', [$topic->id]) }}" class="admin {{ $topic->is_wiki ? 'active' : '' }}" title="{{ trans('message.Mark as Community Wiki') }}">
        <i class="fa fa-graduation-cap"></i>
        </a>

        @if ($topic->order >= 0)
          <a data-method="post" id="topic-pin-button" href="javascript:void(0);" data-url="{{ route('topics.pin', [$topic->id]) }}" class="admin {{ $topic->order > 0 ? 'active' : '' }}" title="{{ trans('message.Pin it on Top') }}">
            <i class="fa fa-thumb-tack"></i>
          </a>
        @endif

        @if ($topic->order <= 0)
            <a data-method="post" id="topic-sink-button" href="javascript:void(0);" data-url="{{ route('topics.sink', [$topic->id]) }}" class="admin {{ $topic->order < 0 ? 'active' : '' }}" title="{{ trans('message.Sink This Topic') }}">
                <i class="fa fa-anchor"></i>
            </a>
        @endif

        <a data-method="delete" id="topic-delete-button" href="javascript:void(0);" data-url="{{ route('topics.destroy', [$topic->id]) }}" title="{{ trans('message.Delete') }}" class="admin">
            <i class="fa fa-trash-o"></i>
        </a>
    @endif

    @if ( Auth::user() && (Auth::user()->can("manage_topics") || Auth::user()->id == $topic->user_id) )
      <a id="topic-append-button" href="javascript:void(0);" title="{{ trans('message.Append') }}" class="admin" data-toggle="modal" data-target="#exampleModal">
        <i class="fa fa-plus"></i>
      </a>

      <a id="topic-edit-button" href="{{ route('topics.edit', [$topic->id]) }}" title="{{ trans('message.Edit') }}" class="admin">
        <i class="fa fa-pencil-square-o"></i>
      </a>
    @endif

  </div>
  <div class="clearfix"></div>
</div>


<div class="modal fade" id="exampleModal" tabindex="-1" role="" aria-labelledby="exampleModalLabel" >
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="exampleModalLabel">{{ trans('message.Append Content') }}</h4>
      </div>

     {{ Form::open(['route' => ['topics.append', $topic->id],'method' => 'post']) }}

        <div class="modal-body">

          <div class="alert alert-warning">
              {{ trans('message.append_notice') }}
          </div>

          <div class="form-group">
            {{ Form::textarea('content', null, ['class' => 'form-control',
                                                'style' => 'min-height:20px',
                                          'placeholder' => trans('message.Please using markdown.')]) }}

          </div>

          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">{{ trans('message.Close') }}</button>
            <button type="submit" class="btn btn-primary">{{ trans('message.Submit') }}</button>
          </div>

      {{ Form::close() }}

    </div>
  </div>
</div>
