<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\LibroController;
use App\Http\Controllers\AutorController;
use App\Http\Controllers\AuthController;

Route::apiResource('clientes', ClienteController::class);
Route::apiResource('libros', LibroController::class);
Route::apiResource('autores', AutorController::class);
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::put('clientes/{id}', [ClienteController::class, 'update']);
Route::put('libros/{id}', [LibroController::class, 'update']);
