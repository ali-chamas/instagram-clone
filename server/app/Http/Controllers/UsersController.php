<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function updateUser(Request $request){

        $user = Auth::user();

        if(!$user){
            return response()->json(['status' => 'failed', 'message' => 'Not authenticated']);
        }

        $request->validate([
            'name'=>'nullable|string',
            'username'=> 'nullable|string|unique:users',
            'bio'=>'nullable|string',
            'image'=>'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'

        ]);

        if($request->has('name')){
            $user->name = $request->name;
        }
        if($request->has('username')){
            $user->username = $request->username;
        }

        if($request->has('bio')){
            $user->bio=$request->bio;
        }
        if($request->hasFile('image')){
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move(public_path('/profile_pictures/'), $filename);
            $user->image = $filename;
        }
        
        $user->save();
        
    return response()->json(['status' => 'success', 'message' => 'Profile updated successfully']);
    }

    public function deleteUser(){
        $user = Auth::user();
        if(!$user){
            return response()->json(['status'=> 'failed','message'=> 'not authenticated']);
        }
        else{

            $user->delete();
            return response()->json(['status'=> 'success','message' => 'User deleted successfully']);
        }
    }
}