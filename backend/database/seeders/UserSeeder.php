<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'username' => 'elnova',
            'email' => 'elnova@example.com',
            'password' => 'Houssam@12',
            'xp' => 0,
            'level' => 1,
            'streak_days' => 0,
            'avatar' => "https://ui-avatars.com/api/?name=elnova",
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
    }
}