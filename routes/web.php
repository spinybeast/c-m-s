<?php

use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\VideoController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/{lang?}', function ($lang = 'en') {
    App::setLocale($lang);

    return view('index');
})->where('lang', '(ru|en)');

Route::prefix('admin')->group(function () {
    Auth::routes(['register' => false]);

    Route::middleware('auth')->group(function () {
        Route::get('/', function () {
            return view('admin.index');
        });

        Route::resource('reviews', ReviewController::class);
        Route::resource('portfolio', PortfolioController::class);
        Route::resource('video', VideoController::class);
    });
});
