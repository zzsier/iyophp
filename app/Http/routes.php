<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

//Route::get('/', 'WelcomeController@index');

//Route::get('home', 'HomeController@index');

Route::group(['prefix' => 'user'], function()  
{
	Route::post('login', 'UserController@login');
	Route::resource('del', 'UserController@deluser');
	Route::post('register', 'UserController@register');
	Route::post('upload', 'UploadController@uploadPhoto');
	Route::post('sendsms', 'SMSController@sendSMS');
	Route::post('query', 'UserController@queryUser');
	Route::post('validationsms', 'SMSController@validateSMS');
});

Route::group(['prefix' => 'relation','middleware' => 'cksession'], function()  
{
	Route::resource('add', 'RelationController@subscribe');
	Route::resource('delete', 'RelationController@cancel');
	Route::resource('bind', 'UserController@bind');
});

Route::group(['prefix' => 'union','middleware' => 'cksession'], function()  
{
	Route::resource('followlist', 'RelationController@queryFollowUnion');
	Route::resource('query', 'UserController@queryUnion');
	Route::resource('list', 'UnionController@queryAllUnion');
});

Route::group(['prefix' => 'star','middleware' => 'cksession'], function()  
{
	Route::resource('list', 'StarController@queryAllStar');
	Route::resource('search', 'StarController@searchStar');
});


Route::group(['prefix' => 'topic','middleware' => 'cksession'], function()  
{
	Route::resource('hot', 'TopicsController@queryHotTopics');
	Route::resource('new', 'TopicsController@queryUSTopicsByTime');
	Route::resource('alist', 'TopicsController@queryTopicsByUser');
	Route::resource('like', 'TopicsController@like');
	Route::resource('unlike', 'TopicsController@unlike');
	Route::resource('incrForward', 'TopicsController@incrForward');
});

Route::group(['prefix' => 'comment','middleware' => 'cksession'], function()  
{
	Route::resource('add', 'CommentController@addComment');
	Route::resource('delete', 'CommentController@delComment');
	Route::resource('list', 'CommentController@queryComments');
});

Route::group(['prefix' => 'topic'], function()  
{
	Route::post('saveOrUpdate', 'TopicsController@saveOrUpdate');
	Route::get('saveOrUpdate', 'TopicsController@saveOrUpdate');
	Route::resource('show', 'TopicsController@showdetail');
	Route::resource('cleancache', 'TopicsController@cleanCache');
	Route::resource('query', 'TopicsController@query');
});

Route::group(['prefix' => 'moment','middleware' => 'cksession'], function()  
{
	Route::post('create', 'TopicsController@createMoment');
	Route::post('query', 'TopicsController@query');
	Route::post('forward', 'TopicsController@forward');
	Route::post('delete', 'TopicsController@deleteTopic');
	Route::post('timeline', 'TopicsController@querySFTopicsByTime');
	Route::resource('like', 'TopicsController@like');
	Route::resource('unlike', 'TopicsController@unlike');
	Route::resource('history', 'TopicsController@queryHistoryTopics');
});

Route::resource('moment/upload', 'UploadController@uploadMemoryImage');
Route::resource('like/list', 'TopicsController@queryLikeList');


Route::group(['prefix' => 'backend'], function()  
{
	Route::resource('user/create', 'UserController@create');
	Route::resource('user/edit', 'UserController@edit');
	Route::resource('user/list', 'UserController@index');
	Route::resource('user/destroy', 'UserController@destroy');
	Route::resource('user/saveOrUpdate', 'UserController@saveOrUpdate');

	Route::resource('topic/create', 'TopicsController@create');
	Route::resource('topic/edit', 'TopicsController@edit');
	Route::resource('topic/list', 'TopicsController@showlist');
	Route::resource('topic/destroy', 'TopicsController@destroy');

	Route::resource('document/list', 'DocumentController@showlist');
	Route::resource('document/node/create', 'DocumentController@createNode');
	Route::resource('node/save', 'DocumentController@saveNode');
	Route::resource('document/save', 'DocumentController@saveOrUpdate');
	Route::resource('document/edit', 'DocumentController@edit');
	Route::resource('document/create', 'DocumentController@create');
	Route::resource('document/destroy', 'DocumentController@destroy');
	Route::resource('document/show', 'DocumentController@showdetail');

	Route::resource('upload', 'UploadController@uploadBEPhoto');
	Route::resource('uploadUserPhoto', 'UploadController@uploadUserPhoto');
});

Route::get('login', [
	'as' => 'login',
	'uses' => 'AuthController@login',
]);


//Route::post('user/resetpassword', 'UserController@resetPassword');

Route::group(['prefix' => 'user','middleware' => 'cksession'], function()  
{
	Route::post('resetpassword', 'UserController@resetPassword');
});

Route::resource('user/validationEmail', 'UserController@validateEmail');

Route::group(['prefix' => 'topic'], function()  
{
	Route::post('create', 'TopicController@resetPassword');
});


/*Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], function()  
{
	Route::get('/', 'AdminHomeController@index');
});*/
