<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controller as BaseController;

class AuthController extends BaseController {
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'genero' => 'required|string',
            'fechaNacimiento' => 'required|date',
            'correoElectronico' => 'required|email|unique:personas,correoElectronico',
            'idPerfil' => 'required|integer|exists:perfiles,idPerfil',
            'nick' => 'required|string|unique:usuarios,nick',
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

        return response()->json(['message' => 'Registro exitoso', 'usuario' => $usuario, 'success' => 'true'], 201);
    }

     // Método de login
     public function login(Request $request) {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'nick' => 'required|string',
            'contraseña' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }

        // Buscar al usuario por su nick
        $usuario = Usuario::with('persona')->where('nick', $request->nick)->first();


        // Verificar si el usuario existe y si la contraseña es correcta
        if (!$usuario || !Hash::check($request->contraseña, $usuario->contraseña)) {
            return response()->json(['message' => 'Credenciales incorrectas, Intentalo de Nuevo']);
        }

        // Generar un token de acceso para el usuario
        $token = $usuario->createToken('auth_token')->plainTextToken;

        // Devolver una respuesta con el token
        return response()->json([
            'message' => 'Login exitoso',
            'token' => $token,
            'success' => 'true',
            'user' => $usuario
        ], 200);
    }
}
