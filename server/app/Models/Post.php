<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'caption',
        'nbr_comments',
        'nbr_likes',
        'user_id'
        

    ];

    protected $appends=[
        'total_likes',
        'total_comments',
        'is_liked_by_user'
    ];

    public function users(){
        return $this->belongsTo(User::class);
    }
    public function likes(){
        return $this->belongsToMany(User::class, 'likes', 'post_id','user_id');
    }
    public function comments(){
        return $this->belongsToMany(User::class, 'comments', 'post_id','user_id')->withPivot('comment');
    }
    public function images(){
        return $this->hasMany(Image::class);
    }

    // Accessors

    public function getTotalLikesAttribute(){
        return $this->likes()->count();
    }
    public function getTotalCommentsAttribute(){
        return $this->comments()->count();
    }

    public function getIsLikedByUserAttribute(){
        $user = Auth::user();
        return $this->likes()->where('likes.user_id', $user->id)->exists();
    }
}
