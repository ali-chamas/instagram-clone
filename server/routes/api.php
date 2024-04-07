<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostsController;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/hello',function(){
    $users = User::all();
    return response()->json($users);

});


Route::controller(AuthController::class)->group(function () {

Route::post('register','register');
Route::post('login','login');
Route::get('logout','logout');
Route::get('refresh','refresh');
});

Route::controller(PostsController::class)->group(function () {
    Route::post('create-post','createPost');
    Route::get('get-posts','getPosts');
    Route::get('get-posts/{user_id}','getPostsByUserId');
});