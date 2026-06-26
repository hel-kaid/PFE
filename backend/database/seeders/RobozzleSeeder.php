<?php

namespace Database\Seeders;

use App\Models\RobozzleStage;
use Illuminate\Database\Seeder;

class RobozzleSeeder extends Seeder
{
    public function run(): void
    {
        RobozzleStage::truncate();

        RobozzleStage::insert([

            [
                'name' => '01 - Forward',
                'game_id' => 3,
                'description' => 'Learn the forward command.',
                'order' => 1,
                'xp_reward' => 5,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'blue'],
                    ],
                    'stars' => [
                        ['x' => 2, 'y' => 0],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 3],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '02 - Turn Right',
                'game_id' => 3,
                'description' => 'Use right turn to follow the path.',
                'order' => 2,
                'xp_reward' => 10,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue'],
                        [null, 'blue'],
                    ],
                    'stars' => [
                        ['x' => 1, 'y' => 1],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 4],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '03 - Turn Left',
                'game_id' => 3,
                'description' => 'Use left turn to reach the star.',
                'order' => 3,
                'xp_reward' => 10,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', null],
                        ['blue', 'blue'],
                    ],
                    'stars' => [
                        ['x' => 1, 'y' => 1],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'DOWN'],
                    'functions' => [
                        ['slots' => 4],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '04 - Many Stars',
                'game_id' => 3,
                'description' => 'Collect more than one star.',
                'order' => 4,
                'xp_reward' => 15,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['green', 'green', 'green', 'green'],
                    ],
                    'stars' => [
                        ['x' => 1, 'y' => 0],
                        ['x' => 2, 'y' => 0],
                        ['x' => 3, 'y' => 0],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 4],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '05 - First Recursion',
                'game_id' => 3,
                'description' => 'Make F1 call itself.',
                'order' => 5,
                'xp_reward' => 20,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'blue', 'blue', 'blue'],
                    ],
                    'stars' => [
                        ['x' => 4, 'y' => 0],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 2],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '06 - Color Filter',
                'game_id' => 3,
                'description' => 'Commands can run only on selected colors.',
                'order' => 6,
                'xp_reward' => 25,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'orange', 'orange'],
                    ],
                    'stars' => [
                        ['x' => 3, 'y' => 0],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 4],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '07 - Color Recursion',
                'game_id' => 3,
                'description' => 'Use recursion with color filters.',
                'order' => 7,
                'xp_reward' => 35,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'blue', 'green', 'green'],
                    ],
                    'stars' => [
                        ['x' => 3, 'y' => 0],
                        ['x' => 4, 'y' => 0],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 4],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '08 - Two Functions',
                'game_id' => 3,
                'description' => 'Use F1 and F2 together.',
                'order' => 8,
                'xp_reward' => 40,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'blue'],
                        [null, null, 'green'],
                        [null, null, 'green'],
                    ],
                    'stars' => [
                        ['x' => 2, 'y' => 2],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 4],
                        ['slots' => 3],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '09 - Loop Path',
                'game_id' => 3,
                'description' => 'Use commands carefully on a longer path.',
                'order' => 9,
                'xp_reward' => 50,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'orange'],
                        [null, null, 'orange'],
                        ['green', 'green', 'orange'],
                    ],
                    'stars' => [
                        ['x' => 2, 'y' => 1],
                        ['x' => 2, 'y' => 2],
                        ['x' => 1, 'y' => 2],
                        ['x' => 0, 'y' => 2],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 6],
                        ['slots' => 4],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '10 - Three Functions',
                'game_id' => 3,
                'description' => 'Use F1, F2, and F3.',
                'order' => 10,
                'xp_reward' => 60,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'blue', null],
                        [null, null, 'orange', null],
                        [null, null, 'orange', 'green'],
                        [null, null, null, 'green'],
                    ],
                    'stars' => [
                        ['x' => 2, 'y' => 0],
                        ['x' => 2, 'y' => 2],
                        ['x' => 3, 'y' => 3],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 5],
                        ['slots' => 4],
                        ['slots' => 3],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '11 - 1337 Intro',
                'game_id' => 3,
                'description' => 'A 1337-style diagonal staircase.',
                'order' => 11,
                'xp_reward' => 80,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        [null, null, null, null, null, 'green'],
                        [null, null, null, null, 'green', 'green'],
                        [null, null, null, 'green', 'green', null],
                        [null, null, 'green', 'green', null, null],
                        [null, 'green', 'green', null, null, null],
                    ],
                    'stars' => [
                        ['x' => 5, 'y' => 0],
                    ],
                    'robot' => ['x' => 1, 'y' => 4, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 5],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '12 - Final 1337',
                'game_id' => 3,
                'description' => 'Hard final stage with recursion and turns.',
                'order' => 12,
                'xp_reward' => 120,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        [null, null, null, null, null, null, null, 'green'],
                        [null, null, null, null, null, null, 'green', 'green'],
                        [null, null, null, null, null, 'green', 'green', null],
                        [null, null, null, null, 'green', 'green', null, null],
                        ['green', 'green', 'green', 'orange', 'green', null, null, null],
                    ],
                    'stars' => [
                        ['x' => 7, 'y' => 0],
                    ],
                    'robot' => ['x' => 0, 'y' => 4, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 6],
                        ['slots' => 4],
                        ['slots' => 3],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ]);
    }
}