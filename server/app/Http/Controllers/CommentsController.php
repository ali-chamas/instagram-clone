<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentsController extends Controller
{


    public function addComment(Request $request,$post_id){
        $user=Auth::user();
        $post = Post::find($post_id);

        $request->validate([
            "comment"=> "required|string",
        ]);

        $post->comments()->attach($user->id, ['comment' => $request->comment, 'created_at' => Carbon::now(), // 
        'updated_at' => Carbon::now(), ]);
        return response()->json(['status'=>'success','message'=>'added a new comment']);
    }
    public function getComments($post_id){
        $post=Post::find($post_id);

        $comments =$post->comments()->select('users.name','users.username','users.image','comments.comment')->get();

        
        return response()->json(['status'=>'success','comments'=>$comments]);
    }

    public function deleteComment($post_id,$comment_id){
        $post=Post::find($post_id);

        $post->comments()->detach($comment_id);
        DB::table('comments')->where('id',$comment_id)->delete();
        
        return response()->json(['status'=> 'success','message'=> 'comment deleted']);
    }
}
