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

        $followers = Follower::with('follower')->where('following_id',$user->id)->where('isAccepted',true)->get();

        $followings = Follower::with('following')->where('follower_id',$user->id)->where('isAccepted',true)->get();

        return response()->json(['success'=>"success",'followers'=>$followers,'followings'=>$followings]);
    }
    public function getFollowRequests(){
        $user=Auth::user();

        $request = Follower::with('follower')->where('following_id',$user->id)->where('isAccepted',false)->get();

        return response()->json(['success'=>"success",'requests'=>$request]);
    }


    


}
