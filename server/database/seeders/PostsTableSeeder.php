<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $posts=Post::factory()->count(10)->create();

        // Attach images to each post
        foreach ($posts as $post) {
            Image::factory()->count(3)->create(['post_id' => $post->id]);
        }
    }
}
