<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable,HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'email',
        'username',
        'password',
        'image',
        'bio',
        'nbr_followers',
        'nbr_followings',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $appends=[
        'total followers',
        'total followings',
        'is_followed_by_user',
        'is_requested_by_user'
    ];
   


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

   
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function post(){
        return $this->hasMany(Post::class);
    }
    public function likes(){
        return $this->belongsToMany(Post::class, 'likes', 'user_id','post_id');
    }
    public function comments(){
        return $this->belongsToMany(Post::class, 'comments', 'user_id','post_id')->withPivot('comment');
    }
    public function follower(){
        return $this->hasMany(Follower::class,'follower_id');
    }
    public function following()
    {
        return $this->hasMany(Follower::class, 'following_id');
    }
  
   public function getTotalFollowersAttribute(){
    return $this->following()->count();
   }
   public function getTotalFollowingsAttribute(){
    return $this->follower()->count();
   }

   public function getIsFollowedByUserAttribute(){
    $user = Auth::user();
    return Follower::where('following_id', $this->id)->where('follower_id',$user->id)->where('isAccepted',true)
    ->exists();
}
public function getIsRequestedByUserAttribute(){
    $user = Auth::user();
    return Follower::where('following_id', $this->id)->where('follower_id',$user->id)->where('isAccepted',false)
    ->exists();
}
}