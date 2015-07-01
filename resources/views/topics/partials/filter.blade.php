<ul class="pull-right list-inline remove-margin-bottom topic-filter">

    <li>
        <a {{ App::make('App\Model\Topic')->topicFilter('recent') }}>
            <i class="glyphicon glyphicon-time"></i> {{ trans('message.Recent') }}
        </a>
        <span class="divider"></span>
    </li>

    <li>
        <a {{ App::make('App\Model\Topic')->topicFilter('excellent') }}>
            <i class="glyphicon glyphicon-ok"> </i> {{ trans('message.Excellent') }}
        </a>
        <span class="divider"></span>
    </li>

    <li>
        <a {{ App::make('App\Model\Topic')->topicFilter('vote') }}>
            <i class="glyphicon glyphicon-thumbs-up"> </i> {{ trans('message.Vote') }}
        </a>
        <span class="divider"></span>
    </li>

    <li>
        <a {{ App::make('App\Model\Topic')->topicFilter('noreply') }}>
            <i class="glyphicon glyphicon-eye-open"></i> {{ trans('message.Noreply') }}
        </a>
    </li>
</ul>
