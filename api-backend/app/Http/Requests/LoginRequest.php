<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\DTOs\LoginDto;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nick'     => ['required','string'],
            'password' => ['required','string'],
        ];
    }

    public function messages(): array
    {
        return [
            'nick.required'     => 'El nick es obligatorio.',
            'password.required' => 'La contraseña es obligatoria.',
        ];
    }

    public function toDto(): LoginDto
    {
        return new LoginDto(...$this->validated());
    }
}
