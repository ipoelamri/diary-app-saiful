<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiaryController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);




Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/diaries', [DiaryController::class, 'index']);
    Route::post('/diaries', [DiaryController::class, 'store']);
    Route::get('/diaries/{diary}', [DiaryController::class, 'show']);
    Route::put('/diaries/{diary}', [DiaryController::class, 'update']);
    Route::delete('/diaries/{diary}', [DiaryController::class, 'destroy']);
});
