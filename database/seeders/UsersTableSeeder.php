<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        if (env('APP_ENV') !== 'production') {
            User::create([
                'name' => 'spiny.beast',
                'email' => 'spiny.beast@gmail.com',
                'password' => Hash::make('rherbrerb'),
            ]);
        }
    }
}
