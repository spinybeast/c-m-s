<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('review', 'Api\ReviewController');
Route::get('video', 'Api\VideoController@index');
Route::get('portfolio', 'Api\PortfolioController@index');
Route::get('portfolio/{filename}', 'Api\PortfolioController@getTrack')->name('portfolio_file');
Route::get('portfolio/cover/{filename}', 'Api\PortfolioController@getCover')->name('portfolio_cover');
Route::post('contact', 'Api\ContactController@index');
Route::get('soundcloud', 'Api\SoundCloudController@index');
Route::get('soundcloud/track', 'Api\SoundCloudController@getTrackUrl');
