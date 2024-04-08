<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{


    public function addComment(Request $request,$post_id){
        $user=Auth::user();
        $post = Post::find($post_id);

        $request->validate([
            "comment"=> "required|string",
        ]);

        $post->comments()->attach($user->id, ['comment' => $request->comment]);
        return response()->json(['status'=>'success','message'=>'added a new comment']);
    }
    public function getComments($post_id){
        $post=Post::find($post_id);

        $comments =$post->comments()->select('users.name','users.username','users.image')->get();

        

        return response()->json(['status'=>'success','comments'=>$comments]);
    }
}
