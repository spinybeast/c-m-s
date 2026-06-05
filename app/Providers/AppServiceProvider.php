<?php

namespace App\Providers;

use App\Models\Track;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Paginator::useBootstrap();

        $this->app->useLangPath(base_path('lang'));

        Route::bind('portfolio', function (string $value) {
            return Track::findOrFail($value);
        });
    }
}
