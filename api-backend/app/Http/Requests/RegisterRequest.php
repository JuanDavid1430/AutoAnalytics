<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use App\DTOs\RegisterUserDto;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre'            => ['required','string'],
            'apellido'          => ['required','string'],
            'genero'            => ['required','string'],
            'fechaNacimiento'   => ['required','date'],
            'correoElectronico' => [
                'required','email',
                Rule::unique('personas','correo_electronico')
            ],
            'idPerfil'          => ['required','integer','exists:perfiles,id_perfil'],
            'nick'              => ['required','string', Rule::unique('usuarios','nick')],
            'password'          => ['required', Password::min(6)],
        ];
    }

    public function messages(): array
    {
        return [
            'correoElectronico.unique' => 'Ese correo ya está registrado.',
            'nick.unique'              => 'El nick ya está en uso.',
        ];
    }

    public function toDto(): RegisterUserDto
    {
        return new RegisterUserDto(...$this->validated());
    }
}