<?php

/** Main single-page */
Route::get('/{lang?}', function () {
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
    });
