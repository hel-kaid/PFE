<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        $games = [
            [
                'name' => 'Snake Game',
                'slug' => 'snake-game',
                'description' => 'A classic snake game to learn programming basics',
                'is_active' => true,
            ],
            [
                'name' => 'Python RPG',
                'slug' => 'python-rpg',
                'description' => 'Learn Python by controlling a hero in an RPG world',
                'is_active' => true,
            ],
            [
                'name' => 'Robozzle',
                'slug' => 'robozzle',
                'description' => 'A puzzle game where you program a robot to collect stars',
                'is_active' => true,
            ]
        ];

        foreach ($games as $game) {
            Game::updateOrCreate(
                ['slug' => $game['slug']],
                $game
            );
        }
    }
}
