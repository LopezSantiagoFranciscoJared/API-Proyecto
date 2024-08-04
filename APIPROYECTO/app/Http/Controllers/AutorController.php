<?php

namespace App\Http\Controllers;

use App\Models\Autor;
use Illuminate\Http\Request;

class AutorController extends Controller
{
    public function index()
    {
        return Autor::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $autor = Autor::create($request->all());

        return response()->json(['message' => 'Autor creado exitosamente', 'autor' => $autor], 201);
    }

    public function show(Autor $autor)
    {
        return $autor;
    }

    public function update(Request $request, Autor $autor)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $autor->update($request->all());

        return response()->json(['message' => 'Autor actualizado exitosamente', 'autor' => $autor]);
    }

    public function destroy(Autor $autor)
    {
        $autor->delete();

        return response()->json(['message' => 'Autor eliminado exitosamente']);
    }
}
