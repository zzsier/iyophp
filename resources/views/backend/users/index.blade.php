@extends('backend.layouts.default')

@section('title')
{{ '用户列表' }}_@parent
@stop

@section('content')

<div class="col-md-9 users-index main-col">
    <ul class="list-group row topic-list">
		 <li class="list-group-item media col-sm-12" style="margin-top: 0px;">
            <div class="infos">
                <div class="col-sm-2 remove-padding-right"> 头像 </div>
                <div class="meta col-sm-4"> 用户名 </div>
                <div class="meta col-sm-3"> 手机 </div>
                <div class="meta col-sm-2"> 用户类别 </div>
            </div>
        </li>

	@foreach ($users as $user) 
         <li class="list-group-item media col-sm-12" style="margin-top: 0px;">
            <div class="infos">
                <div class="col-sm-2 remove-padding-right"> 
                    <div class="avatar"> 
                     <a href="{{ URL::to('backend/user/edit').'?id='.$user->id }}" id="pin-{{ $user->id }}">
                        <img src="{{ URL::to('/').'/'.$user->imageUrl }}" class="img-thumbnail avatar"  style="width:48px;height:48px;margin-bottom: 20px;"/> 
                      </a> 
                    </div> 
                </div> 

                <div class="meta col-sm-4">
                  <a href="{{ URL::to('backend/user/edit').'?id='.$user->id }}" class="remove-padding-left" id="pin-{{ $user->id }}">
                      <span class="fa fa-thumbs-o-up"> {{ $user->username}} </span>
                  </a>
	            </div>
                <div class="meta col-sm-3">
                  <span> {{ $user->phone }}  </span>
				</div>
                <div class="meta col-sm-2"> 
                  <span> {{ $user->type }}  </span>
				</div>

                <div class="meta col-sm-1">
                  <a class="pull-right" href="{{ URL::to('backend/user/destroy').'?id='.$user->id }}" >
                      <span class="badge badge-reply-count"> 删除 </span>
                  </a>
                </div>

            </div>
        </li>
        @endforeach
    </ul>
</div>

@include('backend.users.partials.sidebar')

@stop
