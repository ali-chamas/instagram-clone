<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class usersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'=>'Ali Chamas',
            'email'=> 'alichamas.22@hotmail.com',
            'password'=> bcrypt('123456'),
            'username'=> 'alich22',
        ]);
      
        User::create([
            'name'=>'user 1',
            'email'=> 'user1@gmail.com',
            'password'=> bcrypt('123456'),
            'username'=> 'user1',
        ]);
        User::create([
            'name'=>'user 2',
            'email'=> 'user2@gmail.com',
            'password'=> bcrypt('123456'),
            'username'=> 'user2',
        ]);
        User::create([
            'name'=>'user 3',
            'email'=> 'user3@gmail.com',
            'password'=> bcrypt('123456'),
            'username'=> 'user3',
        ]);
        User::create([
            'name'=>'user 4',
            'email'=> 'user4@gmail.com',
            'password'=> bcrypt('123456'),
            'username'=> 'user4',
        ]);
       
    }
}
