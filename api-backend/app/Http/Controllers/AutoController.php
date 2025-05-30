<?php

namespace App\Http\Controllers;

use App\Models\Auto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controller as BaseController;

class AutoController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $autos = Auto::all();
        return response()->json(['autos' => $autos], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'placa' => 'required|string|max:10|unique:autos,placa',
            'marca' => 'required|string|max:50',
            'modelo' => 'required|string|max:50',
            'capacidad' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $auto = Auto::create($request->all());
        return response()->json(['auto' => $auto, 'message' => 'Auto registrado exitosamente'], 201);
    }

    public function show($id)
    {
        $auto = Auto::find($id);
        if (!$auto) {
            return response()->json(['message' => 'Auto no encontrado'], 404);
        }
        return response()->json(['auto' => $auto], 200);
    }

    public function update(Request $request, $id)
    {
        $auto = Auto::find($id);
        if (!$auto) {
            return response()->json(['message' => 'Auto no encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'placa' => 'required|string|max:10|unique:autos,placa,' . $id,
            'marca' => 'required|string|max:50',
            'modelo' => 'required|string|max:50',
            'capacidad' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $auto->update($request->all());
        return response()->json(['auto' => $auto, 'message' => 'Auto actualizado exitosamente'], 200);
    }

    public function destroy($id)
    {
        $auto = Auto::find($id);
        if (!$auto) {
            return response()->json(['message' => 'Auto no encontrado'], 404);
        }

        $auto->delete();
        return response()->json(['message' => 'Auto eliminado exitosamente'], 200);
    }
} 