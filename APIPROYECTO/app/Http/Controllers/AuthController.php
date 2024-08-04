<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $cliente = Cliente::where('email', $request->email)->first();

        if (!$cliente || $cliente->password !== $request->password) {
            return response()->json(['message' => 'Las credenciales son incorrectas'], 401);
        }

        return response()->json(['message' => 'Inicio de sesión exitoso', 'cliente' => $cliente]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'edad' => 'required|integer',
            'email' => 'required|string|email|max:255|unique:clientes',
            'password' => 'required|string|min:6',
        ]);

        $cliente = Cliente::create([
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'edad' => $request->edad,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return response()->json(['message' => 'Usuario registrado exitosamente', 'cliente' => $cliente]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'edad' => 'required|integer',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8'
        ]);

        $cliente = Cliente::findOrFail($id);
        $cliente->nombre = $request->input('nombre');
        $cliente->apellidos = $request->input('apellidos');
        $cliente->edad = $request->input('edad');
        $cliente->email = $request->input('email');
        $cliente->password = $request->input('password');
        $cliente->save();

        return response()->json([
            'message' => 'Cliente actualizado exitosamente',
            'cliente' => $cliente
        ]);
    }
}
