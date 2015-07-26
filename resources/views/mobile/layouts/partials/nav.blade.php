
<header id="top">
	<div class="logo">
	</div>
	<nav>
		<ul>
			@foreach ($nodes['top'] as $index => $top_node)
				<li class="mtu"><a href={{ URL::to("nodes/$top_node->id") }}>{{{ $top_node->name }}}</a></li>
			@endforeach
		</ul>
	</nav>
</header>

