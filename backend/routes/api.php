<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PythonRpgController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SnakeGameController;
use App\Http\Controllers\RobozzleController;
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile/update', [AuthController::class, 'updateProfile']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return response()->json([
            'user' => $request->user()
        ]);
    });

    Route::apiResource('profiles', ProfileController::class);
    Route::apiResource('badges', BadgeController::class);
    Route::apiResource('games', GameController::class);



    Route::get('/snake/{gameId}/stages', [SnakeGameController::class, 'index']);

    Route::get('/snake/stages/{id}', [SnakeGameController::class, 'show']);

    Route::post('/snake/complete', [SnakeGameController::class, 'complete']);

    Route::get( '/python-rpg/{gameId}/stages', [PythonRpgController::class, 'index']);

    Route::get('/python-rpg/stages/{id}',[PythonRpgController::class, 'show']);

    Route::post('/python-rpg/complete',[PythonRpgController::class, 'complete']);

    Route::get('/robozzle/{gameId}/stages', [RobozzleController::class, 'index']);

    Route::get('/robozzle/stages/{id}', [RobozzleController::class, 'show']);

    Route::post('/robozzle/complete', [RobozzleController::class, 'complete']);
});