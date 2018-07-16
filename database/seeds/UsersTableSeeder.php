<?php

use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run() {

        if(env('APP_ENV') != 'production')
        {
            $user = new App\User();
            $user->name = 'spiny.beast';
            $user->password = Hash::make('rherbrerb');
            $user->email = 'spiny.beast@gmail.com';
            $user->save();
        }
    }
}