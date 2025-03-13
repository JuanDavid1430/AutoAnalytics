<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(['message' => '¡Hola desde Laravel QUE PROO!']);
});

Route::post('/login', [AuthController::class, 'login']);


Route::post('/register', [AuthController::class, 'register']);
