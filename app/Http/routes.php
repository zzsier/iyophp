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
	Route::post('validationsms', 'SMSController@validateSMS');
	Route::resource('searchByHX', 'UserController@searchByHXName');
});

Route::group(['prefix' => 'user','middleware' => 'cksession'], function()  
{
	Route::post('query', 'UserController@queryUser');
	Route::resource('search', 'UserController@search');
});

Route::group(['prefix' => 'black','middleware' => 'cksession'], function()  
{
	Route::post('add', 'BlackController@add');
	Route::post('del', 'BlackController@del');
	Route::post('list', 'BlackController@queryBlackList');
	Route::post('report', 'BlackController@createReport');
});


Route::group(['prefix' => 'relation','middleware' => 'cksession'], function()  
{
	Route::resource('add', 'RelationController@subscribe');
	Route::resource('delete', 'RelationController@cancel');
	Route::resource('bind', 'UserController@bind');
	Route::resource('fans', 'RelationController@queryFollowerList');
	Route::resource('follow', 'RelationController@queryFollowList');
	Route::resource('friend', 'RelationController@queryFriendList');
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
	Route::resource('tantan', 'TopicsController@queryRandMomentList');
	Route::resource('new', 'TopicsController@queryUSTopicsByTime');
	Route::resource('alist', 'TopicsController@queryTopicsByUser');
	Route::resource('like', 'TopicsController@like');
	Route::resource('drop', 'TopicsController@drop');
	Route::resource('unlike', 'TopicsController@unlike');
	Route::resource('incrForward', 'TopicsController@incrForward');
});

Route::group(['prefix' => 'comment','middleware' => 'cksession'], function()  
{
	Route::resource('add', 'CommentController@addComment');
	Route::resource('delete', 'CommentController@delComment');
	Route::resource('list', 'CommentController@queryComments');
	Route::resource('latest', 'TopicsController@queryLatestComments');
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
	Route::resource('alist', 'TopicsController@queryTopicsByUser');
});

Route::group(['prefix' => 'suggestion','middleware' => 'cksession'], function()  
{
	Route::resource('save', 'TopicsController@createSuggestion');
});


Route::group(['prefix' => 'question','middleware' => 'htmlsession'], function()  
{
	Route::resource('show', 'QuestionController@showquestion');
	Route::resource('answer', 'QuestionController@answer');
	Route::resource('new', 'QuestionController@latestquestion');
});

Route::group(['prefix' => 'question'], function()  
{
	Route::post('save', 'QuestionController@saveOrUpdate');
	Route::post('delete', 'QuestionController@deleteQuestion');
	Route::resource('query', 'QuestionController@query');
	Route::resource('chanageQuestionStatus', 'QuestionController@changestatus');
	Route::post('list', 'QuestionController@showlist');
	Route::resource('edit', 'QuestionController@qedit');
	Route::resource('create', 'QuestionController@createquestion');
	Route::resource('listquestion', 'QuestionController@listquestion');
});



Route::resource('moment/upload', 'UploadController@uploadMemoryImage');

Route::resource('like/list', 'TopicsController@queryLikeList');
	
Route::group(['middleware' => 'backendcheck'], function()
{
	Route::resource('backends', 'TopicsController@showlist');
		
	Route::get('/', [
	    'as' => 'backends',
	    'uses' => 'TopicsController@showlist',
	]);
});

Route::group(['prefix' => 'report', 'middleware' => 'backendcheck'], function()  
{
	Route::resource('list', 'BlackController@reportlist');
});

Route::group(['prefix' => 'backend', 'middleware' => 'backendcheck'], function()  
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

	Route::resource('nodes/list', 'NodesController@showlist');
	Route::resource('nodes/save', 'NodesController@saveOrUpdate');
	Route::resource('nodes/edit', 'NodesController@edit');
	Route::resource('nodes/create', 'NodesController@create');
	Route::resource('nodes/destroy', 'NodesController@destroy');


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

//Route::get('login', [
//	'as' => 'login',
//	'uses' => 'AuthController@login',
//]);


//Route::post('user/resetpassword', 'UserController@resetPassword');

Route::group(['prefix' => 'user','middleware' => 'cksession'], function()  
{
	Route::post('resetpassword', 'UserController@resetPassword');
	Route::post('setlocation', 'UserController@location');
	Route::post('nearby', 'UserController@nearby');
	Route::post('serverby', 'UserController@serverby');
	Route::resource('update', 'UserController@updateUser');
	Route::resource('sendvmail', 'UserController@sendValidationEmail');
	Route::resource('sendCodeMail', 'UserController@sendCodeEmail');
	Route::resource('love', 'MeetController@meet');
	Route::resource('drop', 'MeetController@drop');
	Route::resource('testlove', 'MeetController@test');
	Route::resource('lovelist', 'MeetController@queryRandMeetList');
});

Route::group(['prefix' => 'game','middleware' => 'cksession'], function()  
{
	Route::post('list', 'GameController@queryGameList');
	Route::resource('update', 'UserController@updateUser');
	Route::resource('page/firstpage', 'PagesController@firstpage');
});

Route::group(['prefix' => 'interest','middleware' => 'cksession'], function()  
{
	Route::resource('add', 'InterestController@saveInterest');
	Route::resource('adds', 'InterestController@saveInterests');
	Route::resource('dels', 'InterestController@deleteInterests');
	Route::resource('del', 'InterestController@deleteInterest');
	Route::resource('list', 'InterestController@queryInterestsByUser');
	Route::resource('all', 'InterestController@getFullInterest');
	Route::resource('change', 'InterestController@changeInterests');
});


Route::group(['prefix' => 'page','middleware' => 'cksession'], function()  
{
	Route::resource('firstpage', 'PagesController@firstpage');
});

Route::group(['prefix' => 'player','middleware' => 'cksession'], function()  
{
	Route::post('save', 'GameController@savePlayer');
	Route::post('update', 'GameController@savePlayer');
	Route::post('delete', 'GameController@deletePlayer');
	Route::resource('list', 'GameController@queryPlayersByUser');
});


Route::post('server/list', 'GameController@queryServerList');

Route::resource('user/validationEmail', 'UserController@validateEmail');

Route::group(['prefix' => 'topic'], function()  
{
	Route::post('create', 'TopicController@resetPassword');
});

Route::group(['middleware' => 'bbscheck'], function()  
{

	Route::get('/nodes/{id}', [
	    'as' => 'nodes.topics',
	    'uses' => 'BBSTopicsController@showtopics',
	]);
	
	Route::resource('topics', 'BBSTopicsController');
	
	Route::resource('bbs/report', 'BBSTopicsController@createReport');
	//Route::resource('activity/save', 'BBSTopicsController@saveActivity');
	//Route::resource('activity/agree', 'BBSTopicsController@agreeActivity');
	//Route::resource('activity/deny', 'BBSTopicsController@denyActivity');

	Route::resource('activity/join', 'ActivityController@joinActivity');
	Route::resource('activity/agree', 'ActivityController@agree');
	Route::resource('activity/deny', 'ActivityController@deny');
	Route::resource('activity/removeorder', 'ActivityController@removeorder');
	Route::resource('activity/orders', 'ActivityController@orders');

	Route::resource('activities', 'ActivityController');

	Route::resource('page/video', 'PagesController@video');
	# ------------------------------------------------------
	#
	#
	#	BBS Route
	# 
	# ------------------ Route patterns---------------------
	
	Route::pattern('id', '[0-9]+');
	
	# ------------------ Page Route ------------------------
	
	Route::get('/', [
	    'as' => 'home',
	    'uses' => 'PagesController@home',
	]);
	
	Route::get('/about', [
	    'as' => 'about',
	    'uses' => 'PagesController@about',
	]);
	
	Route::get('/wiki', [
	    'as' => 'wiki',
	    'uses' => 'PagesController@wiki',
	]);
	
	Route::get('/search', [
	    'as' => 'search',
	    'uses' => 'PagesController@search',
	]);
	
	Route::get('/feed', [
	    'as' => 'feed',
	    'uses' => 'PagesController@feed',
	]);
	
	Route::get('/sitemap', 'PagesController@sitemap');
	Route::get('/sitemap.xml', 'PagesController@sitemap');
	
	# ------------------ User stuff ------------------------
	
	Route::get('/users/{id}/replies', [
	    'as' => 'users.replies',
	    'uses' => 'UsersController@replies',
	]);
	
	Route::get('/users/{id}/topics', [
	    'as' => 'users.topics',
	    'uses' => 'UsersController@topics',
	]);
	
	Route::get('/users/{id}/favorites', [
	    'as' => 'users.favorites',
	    'uses' => 'UsersController@favorites',
	]);
	
	Route::get('/users/{id}/refresh_cache', [
	    'as' => 'users.refresh_cache',
	    'uses' => 'UsersController@refreshCache',
	]);
	
	Route::post('/favorites/{id}', [
	    'as' => 'favorites.createOrDelete',
	    'uses' => 'FavoritesController@createOrDelete',
	    'before' => 'auth',
	]);
	
	Route::get('/notifications', [
	    'as' => 'notifications.index',
	    'uses' => 'NotificationsController@index',
	    'before' => 'auth',
	]);
	
	Route::get('/notifications/count', [
	    'as' => 'notifications.count',
	    'uses' => 'NotificationsController@count',
	    'before' => 'auth',
	]);
	
	Route::post('/attentions/{id}', [
	    'as' => 'attentions.createOrDelete',
	    'uses' => 'AttentionsController@createOrDelete',
	    'before' => 'auth',
	]);

	# ------------------ Replies ------------------------
	
	Route::resource('replies', 'RepliesController');
	Route::delete('replies/delete/{id}',  [
	    'as' => 'replies.destroy',
	    'uses' => 'RepliesController@destroy',
	    'before' => 'auth',
	]);

});
# ------------------ Authentication ------------------------

Route::get('login', [
    'as' => 'login',
    'uses' => 'AuthController@login',
]);

Route::resource('auth/login', 'AuthController@loginReq');
Route::resource('bbs/list', 'BBSTopicsController@queryForApp');

//Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], function()  
//{
//	Route::get('/', 'AdminHomeController@index');
//});
//
//Route::controllers([
//	'auth' => 'Auth\AuthController',
//	'password' => 'Auth\PasswordController',
//]);

Route::get('login-required', [
    'as' => 'login-required',
    'uses' => 'AuthController@loginRequired',
]);

Route::get('admin-required', [
    'as' => 'admin-required',
    'uses' => 'AuthController@adminRequired',
]);

Route::get('user-banned', [
    'as' => 'user-banned',
    'uses' => 'AuthController@userBanned',
]);

Route::get('signup', [
    'as' => 'signup',
    'uses' => 'AuthController@create',
]);

Route::post('signup',  [
    'as' => 'signup',
    'uses' => 'AuthController@store',
]);

Route::get('logout', [
    'as' => 'logout',
    'uses' => 'AuthController@logout',
]);

Route::get('backendlogout', [
    'uses' => 'AuthController@backendLogout',
]);

Route::get('backendlogin', [
    'uses' => 'AuthController@backendLogin',
]);

Route::resource('backend/auth/login', 'AuthController@backendLoginReq');


Route::get('oauth', 'AuthController@getOauth');

# ------------------ Resource Route ------------------------

Route::resource('votes', 'VotesController');
Route::resource('users', 'UsersController');

# ------------------ Votes ------------------------

Route::group(['before' => 'auth'], function () {
    Route::post('/topics/{id}/upvote', [
        'as' => 'topics.upvote',
        'uses' => 'BBSTopicsController@upvote',
    ]);

    Route::post('/topics/{id}/downvote', [
        'as' => 'topics.downvote',
        'uses' => 'BBSTopicsController@downvote',
    ]);

    Route::post('/replies/{id}/vote', [
        'as' => 'replies.vote',
        'uses' => 'RepliesController@vote',
    ]);

    Route::post('/topics/{id}/append', [
        'as' => 'topics.append',
        'uses' => 'BBSTopicsController@append',
    ]);
});

# ------------------ Admin Route ------------------------

Route::group(['before' => 'manage_topics'], function () {
    Route::post('topics/recomend/{id}',  [
        'as' => 'topics.recomend',
        'uses' => 'BBSTopicsController@recomend',
    ]);

    Route::post('topics/wiki/{id}',  [
        'as' => 'topics.wiki',
        'uses' => 'BBSTopicsController@wiki',
    ]);

    Route::post('topics/pin/{id}',  [
        'as' => 'topics.pin',
        'uses' => 'BBSTopicsController@pin',
    ]);

    Route::delete('topics/delete/{id}',  [
        'as' => 'topics.destroy',
        'uses' => 'BBSTopicsController@destroy',
    ]);

    Route::post('topics/sink/{id}',  [
        'as' => 'topics.sink',
        'uses' => 'BBSTopicsController@sink',
    ]);
});

Route::group(['before' => 'manage_users'], function () {
    Route::post('users/blocking/{id}',  [
        'as' => 'users.blocking',
        'uses' => 'UsersController@blocking',
    ]);
});

Route::post('upload_image', [
    'as' => 'upload_image',
    'uses' => 'BBSTopicsController@uploadImage',
    'before' => 'auth',
]);

// Health Checking
Route::get('heartbeat', function () {
    return Node::first();
});

Route::get('/github-api-proxy/users/{username}', [
    'as' => 'users.github-api-proxy',
    'uses' => 'UsersController@githubApiProxy',
]);

Route::get('/github-card', [
    'as' => 'users.github-card',
    'uses' => 'UsersController@githubCard',
]);
