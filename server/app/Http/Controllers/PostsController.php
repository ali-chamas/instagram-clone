<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Like;
use Illuminate\Http\Request;
use App\Models\Post;
class PostsController extends Controller
{
    public function getPosts()
    {
        $posts = Post::all();
        return response()->json($posts);
    }
    public function getPostsByUserId($userId)
    {
        $posts = Post::where('user_id', $userId)->with('images','likes','comments')->get();
        return response()->json($posts);
    } 

    public function createPost(Request $request){
        $request->validate([
            'caption'=>'required|string',
            'user_id'=> 'required|integer',
            'images'=> 'required|array',
            'images.*' => 'required|url',
        ]);
        $post=Post::create([
            'caption'=>$request->caption,
            'user_id'=>$request->user_id,
        ]);

        foreach ($request->images as $imageUrl) {
            Image::create([
                'post_id' => $post->id,
                'image' => $imageUrl,
            ]);
        }
        return response()->json(['message' => 'Post created successfully', 'post' => $post]);
    }

   
}
