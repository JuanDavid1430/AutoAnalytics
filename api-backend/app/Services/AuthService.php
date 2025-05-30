<?php

namespace App\Services;

use App\Repositories\Contracts\UserRepositoryInterface;
use App\DTOs\RegisterUserDto;
use App\DTOs\LoginDto;
use App\Exceptions\ApiException;
use App\Enums\{ErrorCode, SuccessCode};
use Illuminate\Support\Facades\{Log, Hash};

class AuthService
{
    public function __construct(private UserRepositoryInterface $repo) {}

    public function register(RegisterUserDto $dto): array
    {
        Log::channel('auth')->info('REG_START', (array)$dto);

        try {
            $usuario = $this->repo->create($dto);
        } catch (\Throwable $e) {
            Log::error('REG_FAIL', ['error'=>$e->getMessage()]);
            throw new ApiException(ErrorCode::DB_ERROR, 'Database error', 500);
        }

        Log::channel('auth')->info('REG_SUCCESS', ['idUsuario'=>$usuario->idUsuario]);

        return [
            'code'    => SuccessCode::USER_REGISTERED->value,
            'message' => 'User created',
            'usuario' => $usuario,
            'success' => true
        ];
    }

    public function login(LoginDto $dto): array
    {
        Log::channel('auth')->info('LOGIN_START', ['nick'=>$dto->nick]);

        $usuario = $this->repo->findByNick($dto->nick)
            ?? throw new ApiException(ErrorCode::USER_NOT_FOUND, 'Usuario no existe', 404);

        if (!Hash::check($dto->password, $usuario->contraseña)) {
            throw new ApiException(ErrorCode::WRONG_CREDENTIALS,'Credenciales incorrectas',401);
        }

        $token = $usuario->createToken('auth_token')->plainTextToken;

        Log::channel('auth')->info('LOGIN_SUCCESS', ['idUsuario'=>$usuario->idUsuario]);

        return [
            'code'    => SuccessCode::USER_LOGGED_IN->value,
            'message' => 'Login ok',
            'token'   => $token,
            'success' => true
        ];
    }
}
