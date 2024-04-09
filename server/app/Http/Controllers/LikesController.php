<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikesController extends Controller
{
    
   
        public function toggleLikePost($post_id){
            $user = Auth::user();
            $post = Post::find($post_id);
        
            $toggleLike= $post->likes()->toggle($user->id);

            if(empty($toggleLike['attached'])){
                $message='liked post succesfully';
            }else{
                $message='unliked post succesfully';
            }
            
            return response()->json(['status' => 'success','message' => $message ]);
        }

        public function getLikes($post_id){

            $post=Post::find($post_id);

            $likes = $post->likes()->select('users.name','users.username','users.image')->get();

           
            return response()->json(['status'=>'success','likes'=>$likes]);
        }
}
