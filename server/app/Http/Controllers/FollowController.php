<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use App\Models\User;
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
    public function rejectFollowRequest($req_id){
        $follow=Follower::find($req_id)->delete();
        return response()->json(['status'=>'success','message'=>'request rejected']);
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

    public function getFollowRecommendations()
    {
        $user = Auth::user();
        $recommendations = null;
    
        // Get all followers of the authenticated user who have accepted the request
        $followers = Follower::where('follower_id', $user->id)
            ->where('isAccepted', true)
            ->pluck('following_id') // Pluck only the following_id from the followers
            ->toArray(); // Convert the plucked data to an array
    
        // Check if the user has any followers
        if (empty($followers)) {
            $message = "Follow users to get recommendations";
        } else {
            // Get up to 2 random followers who are not followed back by the authenticated user
            $randomFollowers = Follower::whereNotIn('follower_id', $followers)
                ->where('following_id', '!=', $user->id) // Exclude the authenticated user
                ->where('isAccepted', true)
                ->inRandomOrder()
                ->take(2)
                ->get();
    
            // Check if there are any recommendations
            if ($randomFollowers->isNotEmpty()) {
                // Get the following IDs of the random followers
                $followingIds = $randomFollowers->pluck('following_id')->toArray();
    
                // Get the followings of the random followers
                $recommendations = Follower::whereIn('follower_id', $followingIds)
                    ->where('isAccepted', true)
                    ->with('following')
                    ->get()
                    ->pluck('following')
                    ->unique('id'); // Ensure uniqueness based on user ID
    
                // Exclude the authenticated user from the recommendations
                $recommendations = $recommendations->where('id', '!=', $user->id);
            } else {
                return response()->json(['success' => false, 'message' =>'no followers found' ]);
            }
        }
    
        return response()->json(['success' => true, 'recommendations' => $recommendations]);
    }




    


}
