<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /** La ruta a la que redirigir después de login (opcional) */
    public const HOME = '/';

    public function boot(): void
    {
        /*
        |------------------------------------------------------------------
        |  Rutas API  →  http://…/api/…
        |------------------------------------------------------------------
        */
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

        /*
        |------------------------------------------------------------------
        |  Rutas WEB  →  http://…/
        |------------------------------------------------------------------
        */
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }
}