<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\SoundCloudController;
use App\Http\Controllers\Api\VideoController;
use Illuminate\Support\Facades\Route;

Route::resource('review', ReviewController::class)->only(['index', 'store']);
Route::get('video', [VideoController::class, 'index']);
Route::get('portfolio', [PortfolioController::class, 'index']);
Route::get('portfolio/{filename}', [PortfolioController::class, 'getTrack'])
    ->where('filename', '[A-Za-z0-9._-]+')
    ->name('portfolio_file');
Route::get('portfolio/cover/{filename}', [PortfolioController::class, 'getCover'])
    ->where('filename', '[A-Za-z0-9._-]+')
    ->name('portfolio_cover');
Route::post('contact', [ContactController::class, 'index']);
Route::get('soundcloud', [SoundCloudController::class, 'index']);
Route::get('soundcloud/track', [SoundCloudController::class, 'getTrackUrl']);
