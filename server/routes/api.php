<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\UsersController;
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

Route::controller(LikesController::class)->group(function () {
    Route::post('like-post/{post_id}','toggleLikePost');
    Route::get('get-likes/{post_id}','getLikes');
});

Route::controller(CommentsController::class)->group(function () {
    Route::post('add-comment/{post_id}','addComment');
    Route::get('get-comments/{post_id}','getComments');
    Route::delete('delete-comment/{post_id}/{comment_id}','deleteComment');
});

Route::controller(UsersController::class)->group(function () {
    Route::post('update-profile','updateUser');
});