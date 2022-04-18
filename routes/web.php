<?php

/** Main single-page */

use App\Track;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

Route::get('/{lang?}', function ($lang = 'en') {
    App::setLocale($lang);
    return view('index');
})->where('lang', '(ru|en)');

/** Admin panel */
Route::prefix('admin')
    ->group(function () {
        Auth::routes();
        Route::get('/', function () {
            return view('admin.index');
        })->middleware('auth');
        Route::resource('reviews', 'Admin\ReviewController')
            ->middleware('auth');
        Route::resource('portfolio', 'Admin\PortfolioController')
            ->middleware('auth');
    });
