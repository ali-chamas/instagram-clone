<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Notifications\Notifiable;

class Follower extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'follower_id',
        'following_id',
        'status',
       
        

    ];


    public function followers()
    {
        return $this->hasMany(User::class, 'follower_id');
    }

    public function followings()
    {
        return $this->hasMany(User::class, 'following_id');
    }
    
    
   
}
