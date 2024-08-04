<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Cliente::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'edad' => 'required|integer',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8'
        ]);

        // Crear un nuevo cliente
        $cliente = new Cliente;
        $cliente->nombre = $request->input('nombre');
        $cliente->apellidos = $request->input('apellidos');
        $cliente->edad = $request->input('edad');
        $cliente->email = $request->input('email');
        $cliente->password = $request->input('password');
        $cliente->save();

        return $cliente;
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        return $cliente;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validar los datos
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'edad' => 'required|integer',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8'
        ]);

        // Encontrar el cliente y actualizar sus datos
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cliente = Cliente::find($id);

        if (is_null($cliente)) {
            return response()->json('No se pudo realizar correctamente la operación', 404);
        }

        $cliente->delete();
        return response()->noContent();
    }
}
