<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FeelingsController;

Route::post('auth', [AuthController::class, 'auth']);
Route::post('register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
	Route::get('user', [AuthController::class, 'getUser']);
	Route::post('logout', [AuthController::class, 'logout']);
	Route::get('feelings/all', [FeelingsController::class, 'getAllFeelings']);
	Route::post('feelings/note', [FeelingsController::class, 'saveNote']);
	Route::post('feelings/feeling', [FeelingsController::class, 'saveFeeling']);
});