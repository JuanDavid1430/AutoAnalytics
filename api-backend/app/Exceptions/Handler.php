<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Throwable;
use App\Enums\ErrorCode;
use App\Exceptions\ApiException;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    public function render($request, Throwable $e)
    {
        if ($e instanceof ValidationException) {
            return response()->json([
                'code'    => ErrorCode::VALIDATION_FAILED->value,
                'message' => $e->validator->errors()->first(),
                'errors'  => $e->errors(),
                'success' => false
            ], 400);
        }

        if ($e instanceof ApiException) {
            return response()->json([
                'code'    => $e->codeEnum->value,
                'message' => $e->getMessage(),
                'success' => false
            ], $e->getCode() ?: 400);
        }

        if ($request->expectsJson()) {
            return response()->json([
                'code'    => ErrorCode::DB_ERROR->value,
                'message' => 'Internal server error',
                'success' => false
            ], 500);
        }

        return parent::render($request, $e);
    }
}
