<?php

namespace App\Http\Controllers;

use App\Models\Libro;
use App\Models\Autor;
use Illuminate\Http\Request;

class LibroController extends Controller
{
    public function index()
    {
        return Libro::with('autor')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'genero' => 'required|string|max:255',
            'aniopublicacion' => 'required|integer',
            'portada' => 'nullable|string|max:255',
            'contraportada' => 'nullable|string|max:255',
            'ISBN' => 'required|string|max:255',
            'autor_id' => 'required|exists:autors,id',
        ]);

        $libro = new Libro;
        $libro->titulo = $request->titulo;
        $libro->genero = $request->genero;
        $libro->aniopublicacion = $request->aniopublicacion;
        $libro->portada = $request->portada;
        $libro->contraportada = $request->contraportada;
        $libro->ISBN = $request->ISBN;
        $libro->autor_id = $request->autor_id;
        $libro->save();

        return response()->json(['message' => 'Libro creado exitosamente', 'libro' => $libro], 201);
    }

    public function show(Libro $libro)
    {
        return $libro->load('autor');
    }

    public function update(Request $request, Libro $libro)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'genero' => 'required|string|max:255',
            'aniopublicacion' => 'required|integer',
            'portada' => 'nullable|string|max:255',
            'contraportada' => 'nullable|string|max:255',
            'ISBN' => 'required|string|max:255',
            'autor_id' => 'required|exists:autors,id',
        ]);

        $libro->titulo = $request->titulo;
        $libro->genero = $request->genero;
        $libro->aniopublicacion = $request->aniopublicacion;
        $libro->portada = $request->portada;
        $libro->contraportada = $request->contraportada;
        $libro->ISBN = $request->ISBN;
        $libro->autor_id = $request->autor_id;
        $libro->save();

        return response()->json(['message' => 'Libro actualizado exitosamente', 'libro' => $libro]);
    }

    public function destroy(Libro $libro)
    {
        $libro->delete();
        return response()->json(['message' => 'Libro eliminado exitosamente']);
    }
}
