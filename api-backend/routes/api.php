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

Route::post('/login', function (Request $request) {
    $credentials = $request->only('email', 'password');
    
    // Credenciales quemadas (predefinidas)
    $validCredentials = [
        'email' => 'admin@example.com',
        'password' => 'password123'
    ];
    
    if ($credentials['email'] === $validCredentials['email'] && $credentials['password'] === $validCredentials['password']) {
        return response()->json(['message' => 'Login exitoso', 'success' => true]);
    } else {
        return response()->json(['message' => 'Credenciales incorrectas', 'success' => false]);
    }
});

Route::post('/register', [AuthController::class, 'register']);
