<?php

/** Main single-page */
Route::get('/', function () {
    return view('index');
});

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
