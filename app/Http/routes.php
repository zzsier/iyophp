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
	Route::post('del', 'UserController@deluser');
	Route::post('register', 'UserController@register');
	Route::post('upload', 'UploadController@uploadPhoto');
	Route::post('sendsms', 'SMSController@sendSMS');
	Route::post('validationsms', 'SMSController@validateSMS');
});


//Route::post('user/resetpassword', 'UserController@resetPassword');

Route::group(['prefix' => 'user','middleware' => 'cksession'], function()  
{
	Route::post('resetpassword', 'UserController@resetPassword');
});

Route::resource('user/validationEmail', 'UserController@validateEmail');

/*Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], function()  
{
	Route::get('/', 'AdminHomeController@index');
});*/
