<?php

use App\Http\Controllers\Posts\PostController;
use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'Users', 'controller' => UserController::class], function () {
    Route::post('/CreateUser', 'createUser');
    Route::post('/Login', 'loginUser');
    Route::get('/GetUserById/{id}', 'getUserById');
    Route::get('/GeAlltUsers', 'getAllUsers');
    Route::post('/UpdateUser/{id}', 'updateUser');
});

Route::group(['prefix' => 'Posts', 'controller' => PostController::class], function () {
    Route::post('/CreatePost', 'createPost');
    Route::get('/AllPosts', 'getAllPosts');
});
