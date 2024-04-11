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
        $user = Auth::user();
        $follow = Follower::where('follower_id',$user->id)->where('following_id',$req_id)->delete();
        
       
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

    public function getFollowRecommendations(){
        
        $user=Auth::user();
        $recommendations=null;

        $followers = Follower::where('follower_id',$user->id)->where('isAccepted',true)->get();


        $random_number=null;
        $previous_number=null;

        foreach($followers as $index => $follower){

            
  
            if($index <2){
                if(count($followers) ==1){
                    $random_number=1;
                }else{

                    $random_number=mt_rand(0,count($followers)-1);
                }

                if($random_number == $previous_number){
                    $index-=1;
                    break;
                    
                }else{
                    $previous_number=$random_number;
                    $recommendations=Follower::where('follower_id',$followers[$random_number-1]->following_id)->where('isAccepted',true)->with('following')->get();
                }
            }
                
        }
        if($recommendations){
            $message=$recommendations;
        }else{
            $message="Follow users to get recommendations";
        }


        return response()->json(['success'=> 'success','recommendations'=>$message]);
        
    }


    


}
