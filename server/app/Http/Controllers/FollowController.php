<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function sendFollowRequest(Request $request){
        $follower = Auth::user();
        $request->validate([
            'following_id'=>'required|integer'
        ]);

        Follower::create([
            'follower_id'=>$follower->id,
            'following_id'=>$request->following_id

        ]);
        return response()->json(['status'=>'success','message'=>'request sent']);
        
    }

    public function acceptFollowRequest($req_id){
        $follow = Follower::find($req_id);
        $follow->isAccepted=true;
        $follow->save();
        return response()->json(['status'=>'success','message'=>'request accepted']);
    }
    public function cancelFollow($req_id){
        $follow = Follower::find($req_id);
        $follow->delete();
       
        return response()->json(['status'=>'success','message'=>'request deleted']);
    }

    public function getFollow(){
        $user=Auth::user();

        $follow = $user->followers()->where('followers.isAccepted',true)->where('followers.follower_id',$user->id)->orWhere('followers.following_id',$user->id)->get();

        return response()->json(['success'=>"success",'followings'=>$follow]);
    }
    public function getFollowRequests(){
        $user=Auth::user();

        $follow = $user->followers()->where('followers.isAccepted',false)->where('followers.following_id',$user->id)->get();

        return response()->json(['success'=>"success",'followings'=>$follow]);
    }


    


}
