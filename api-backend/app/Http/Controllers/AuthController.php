<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(private AuthService $service) {}

    public function register(RegisterRequest $request)
    {
        return response()->json(
            $this->service->register($request->toDto()), 201
        );
    }

    public function login(LoginRequest $request)
    {
        return response()->json(
            $this->service->login($request->toDto()), 200
        );
    }
}
