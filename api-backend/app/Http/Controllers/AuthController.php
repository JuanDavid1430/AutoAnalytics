<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'genero' => 'required|string',
            'fechaNacimiento' => 'required|date',
            'correoElectronico' => 'required|email|unique:personas,correoElectronico',
            'idPerfil' => 'required|integer|exists:perfiles,idPerfil',
            'nick' => 'required|string|unique:personas,nick',
            'contraseña' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $persona = Persona::create($request->only(['nombre', 'apellido', 'genero', 'fechaNacimiento', 'correoElectronico']));
        
        $usuario = Usuario::create([
            'idPersona' => $persona->idPersona,
            'idPerfil' => $request->idPerfil,
            'contraseña' => Hash::make($request->contraseña),
            'fechaCreacion' => now(),
            'nick' => $request->nick,
        ]);

        return response()->json(['message' => 'Registro exitoso', 'usuario' => $usuario], 201);
    }
}
