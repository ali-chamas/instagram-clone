<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Notifications\Notifiable;

class Comment extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'comment',
        'user_id',
        'post_id',
       
        

    ];


    public function User(){
        return $this->belongsTo(User::class);
    }
    public function Post(){
        return $this->belongsTo(Post::class);
    }
    
   
}
