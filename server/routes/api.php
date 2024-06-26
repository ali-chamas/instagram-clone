<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\FollowController;
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
    Route::get('get-post/{user_id}','getPost');
    Route::delete('delete-post/{post_id}','deletePost');
    
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
    Route::post('delete-user','deleteUser');
    Route::get('get-user/{user_id}','getUser');
    Route::get('get-user','loggedInUser');
});

Route::controller(FollowController::class)->group(function () {
    Route::post('send-request','sendFollowRequest');
    Route::get('accept-request/{req_id}','acceptFollowRequest');
    Route::delete('reject-request/{req_id}','rejectFollowRequest');
    Route::delete('cancel-follow/{req_id}','cancelFollow');
    Route::get('get-follow','getFollow');
    Route::get('get-requests','getFollowRequests');
    Route::get('get-recommendations','getFollowRecommendations');
});