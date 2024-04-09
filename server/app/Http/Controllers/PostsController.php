<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Like;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
class PostsController extends Controller
{
    public function getPosts()
    {
        $user = Auth::user();
        $followings_id = $user->follower()->where('followers.isAccepted',true)->pluck('following_id');

        if(count($followings_id) > 0){
            $posts = Post::whereIn('user_id', $followings_id)
            ->with('user')
            ->with('images')
            ->get();
            return response()->json(['status'=>'success','posts'=>$posts]);
        }

        return response()->json(['status'=>'failed']);
    }
    public function getPostsByUserId($userId)
    {
        $posts = Post::where('user_id', $userId)->with('images')->get();
        return response()->json($posts);
    } 

    public function createPost(Request $request){
        $request->validate([
            'caption'=>'required|string',
            'images'=> 'required|array',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $post=Post::create([
            'caption'=>$request->caption,
            'user_id'=>Auth::user()->id,
        ]);

        foreach ($request->images as $index =>  $imageFile) {
          
                
                $extension = $imageFile->getClientOriginalExtension();
                $filename = time() . $index.'.' . $extension;
                $imageFile->move(public_path('/post_images'), $filename);
                
            
            Image::create([
                'post_id' => $post->id,
                'image' => $filename,
            ]);
        }
        return response()->json(['message' => 'Post created successfully', 'post' => $post]);
    }

    public function deletePost($post_id){
       $post = Post::find($post_id);
        if(!$post){
            return response()->json(['status'=> 'failed','message'=> 'post not found']);
        }
        else{

            $post->delete();
            return response()->json(['status'=> 'success','message' => 'Post deleted successfully']);
        }
    }

   
}
