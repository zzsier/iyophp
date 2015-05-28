<div class="col-md-3 side-bar">


  <div class="panel panel-default corner-radius">

    @if (isset($node))
      <div class="panel-heading text-center">
        <h3 class="panel-title">{{{ $node->name }}}</h3>
      </div>
    @endif

    <div class="panel-body text-center">
      <div class="btn-group">
        <a href="
          {{ URL::to('backend/user/create') }}
          " class="btn btn-success btn-lg">
          <i class="glyphicon glyphicon-pencil"> </i> {{ '创建新用户' }}
        </a>
      </div>
    </div>
  </div>

  <div class="panel panel-default corner-radius">
    <div class="panel-heading text-center">
      <h3 class="panel-title">{{ '用户搜索' }}</h3>
    </div>
    <div class="panel-body">
    </div>
  </div>


  <div class="panel panel-default corner-radius">
    <div class="panel-heading text-center">
      <h3 class="panel-title">{{ '用户统计' }}</h3>
    </div>
    <div class="panel-body">
      <ul>
        <li>{{ '用户总数' }}: </li>
      </ul>
    </div>
  </div>

</div>
<div class="clearfix"></div>
