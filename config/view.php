<?php
use Jenssegers\Agent\Agent as Agent;
use Log;

$agent = new Agent();

$viewPath = 'resources/views';
$stoPath = '/framework/views';

if ($agent->isMobile()) {
	$viewPath = 'resources/views';
	$stoPath = '/framework/views';
} else {
	$viewPath = 'resources/views/mobile';
	$stoPath = '/framework/views/mobile';
}

//Log::info("view path ".$viewPath." stoPath ".$stoPath);

return [

	/*
	|--------------------------------------------------------------------------
	| View Storage Paths
	|--------------------------------------------------------------------------
	|
	| Most templating systems load templates from disk. Here you may specify
	| an array of paths that should be checked for your views. Of course
	| the usual Laravel view path has already been registered for you.
	|
	*/

	'paths' => [
		//realpath(base_path($viewPath))
		realpath(base_path('resources/views'))
	],

	/*
	|--------------------------------------------------------------------------
	| Compiled View Path
	|--------------------------------------------------------------------------
	|
	| This option determines where all the compiled Blade templates will be
	| stored for your application. Typically, this is within the storage
	| directory. However, as usual, you are free to change this value.
	|
	*/

	'compiled' => realpath(storage_path().'/framework/views'),
	'mobile_path' => realpath(base_path('resources/views/mobile')),
];
