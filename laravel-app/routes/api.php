<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FeelingsController;

Route::post('auth', [AuthController::class, 'auth']);
Route::post('register', [AuthController::class, 'register']);
Route::get('feelings/all', [FeelingsController::class, 'getAllFeelings']);

Route::middleware('auth:sanctum')->group(function () {
	Route::get('user', [AuthController::class, 'getUser']);
	Route::post('logout', [AuthController::class, 'logout']);
	Route::post('feelings/note', [FeelingsController::class, 'saveDailyNote']);
	Route::post('feelings/feeling', [FeelingsController::class, 'saveFeeling']);
});