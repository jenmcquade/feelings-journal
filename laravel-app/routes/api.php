<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('auth', [AuthController::class, 'auth']);
Route::post('register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
	Route::get('user', [AuthController::class, 'getUser']);
	Route::post('logout', [AuthController::class, 'logout']);
});