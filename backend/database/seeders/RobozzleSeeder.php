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

            // 01
            [
                'name' => '01 - Forward',
                'game_id' => 3,
                'description' => 'Learn the forward command.',
                'order' => 1,
                'xp_reward' => 5,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [['blue', 'blue', 'blue']],
                    'stars' => [['x' => 2, 'y' => 0]],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [['slots' => 3]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 02
            [
                'name' => '02 - Many Forward',
                'game_id' => 3,
                'description' => 'Use many forward commands.',
                'order' => 2,
                'xp_reward' => 5,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [['blue', 'blue', 'blue', 'blue']],
                    'stars' => [
                        ['x' => 1, 'y' => 0],
                        ['x' => 2, 'y' => 0],
                        ['x' => 3, 'y' => 0],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [['slots' => 4]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 03
            [
                'name' => '03 - Turn Right',
                'game_id' => 3,
                'description' => 'Learn the right turn command.',
                'order' => 3,
                'xp_reward' => 10,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue'],
                        [null, 'blue'],
                    ],
                    'stars' => [['x' => 1, 'y' => 1]],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [['slots' => 4]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 04
            [
                'name' => '04 - Turn Left',
                'game_id' => 3,
                'description' => 'Learn the left turn command.',
                'order' => 4,
                'xp_reward' => 10,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', null],
                        ['blue', 'blue'],
                    ],
                    'stars' => [['x' => 1, 'y' => 1]],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'DOWN'],
                    'functions' => [['slots' => 4]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 05
            [
                'name' => '05 - Two Turns',
                'game_id' => 3,
                'description' => 'Use forward, right, and left.',
                'order' => 5,
                'xp_reward' => 15,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', null],
                        [null, 'blue', null],
                        [null, 'blue', 'blue'],
                    ],
                    'stars' => [['x' => 2, 'y' => 2]],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [['slots' => 6]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 06
            [
                'name' => '06 - Small Maze',
                'game_id' => 3,
                'description' => 'Use all basic commands.',
                'order' => 6,
                'xp_reward' => 20,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'blue'],
                        [null, null, 'blue'],
                        ['blue', 'blue', 'blue'],
                    ],
                    'stars' => [
                        ['x' => 2, 'y' => 1],
                        ['x' => 0, 'y' => 2],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [['slots' => 8]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 07
            [
                'name' => '07 - First Color',
                'game_id' => 3,
                'description' => 'Learn commands with blue color.',
                'order' => 7,
                'xp_reward' => 25,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [['blue', 'blue', 'blue', 'blue']],
                    'stars' => [['x' => 3, 'y' => 0]],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [['slots' => 4]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 08
            [
                'name' => '08 - Blue And Green',
                'game_id' => 3,
                'description' => 'Discover two colors.',
                'order' => 8,
                'xp_reward' => 30,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [['blue', 'blue', 'green', 'green']],
                    'stars' => [
                        ['x' => 2, 'y' => 0],
                        ['x' => 3, 'y' => 0],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [['slots' => 5]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 09
            [
                'name' => '09 - Change Color Path',
                'game_id' => 3,
                'description' => 'Move from blue to green path.',
                'order' => 9,
                'xp_reward' => 35,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'green'],
                        [null, null, 'green'],
                    ],
                    'stars' => [['x' => 2, 'y' => 1]],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [['slots' => 6]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 10
            [
                'name' => '10 - Three Colors',
                'game_id' => 3,
                'description' => 'Use blue, green, and orange.',
                'order' => 10,
                'xp_reward' => 40,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [['blue', 'blue', 'green', 'green', 'orange']],
                    'stars' => [
                        ['x' => 2, 'y' => 0],
                        ['x' => 4, 'y' => 0],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [['slots' => 6]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 11
            [
                'name' => '11 - Color Turns',
                'game_id' => 3,
                'description' => 'Use colors with turns.',
                'order' => 11,
                'xp_reward' => 45,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'green'],
                        [null, null, 'green'],
                        [null, null, 'orange'],
                    ],
                    'stars' => [
                        ['x' => 2, 'y' => 1],
                        ['x' => 2, 'y' => 2],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [['slots' => 7]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 12
            [
                'name' => '12 - Color Challenge',
                'game_id' => 3,
                'description' => 'A first real color puzzle.',
                'order' => 12,
                'xp_reward' => 50,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'green'],
                        [null, null, 'green'],
                        ['orange', 'orange', 'green'],
                    ],
                    'stars' => [
                        ['x' => 2, 'y' => 0],
                        ['x' => 2, 'y' => 2],
                        ['x' => 0, 'y' => 2],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [['slots' => 9]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 13
            [
                'name' => '13 - First Function',
                'game_id' => 3,
                'description' => 'Use F1 to repeat commands.',
                'order' => 13,
                'xp_reward' => 60,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [['blue', 'blue', 'blue', 'blue', 'blue']],
                    'stars' => [['x' => 4, 'y' => 0]],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 3],
                        ['slots' => 2],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 14
            [
                'name' => '14 - First Recursion',
                'game_id' => 3,
                'description' => 'Make F1 call itself.',
                'order' => 14,
                'xp_reward' => 70,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [['blue', 'blue', 'blue', 'blue', 'blue', 'blue']],
                    'stars' => [['x' => 5, 'y' => 0]],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [['slots' => 2]],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 15
            [
                'name' => '15 - Two Functions',
                'game_id' => 3,
                'description' => 'Use F1 and F2 together.',
                'order' => 15,
                'xp_reward' => 80,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'blue'],
                        [null, null, 'green'],
                        [null, null, 'green'],
                    ],
                    'stars' => [['x' => 2, 'y' => 2]],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 4],
                        ['slots' => 3],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 16
            [
                'name' => '16 - Functions And Colors',
                'game_id' => 3,
                'description' => 'Use functions with colored paths.',
                'order' => 16,
                'xp_reward' => 90,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'green', 'green'],
                        [null, null, null, 'orange'],
                        [null, null, null, 'orange'],
                    ],
                    'stars' => [
                        ['x' => 2, 'y' => 0],
                        ['x' => 3, 'y' => 2],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 5],
                        ['slots' => 4],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 17
            [
                'name' => '17 - Long Path',
                'game_id' => 3,
                'description' => 'Optimize your commands.',
                'order' => 17,
                'xp_reward' => 100,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'blue', 'green'],
                        [null, null, null, 'green'],
                        ['orange', 'orange', 'orange', 'green'],
                    ],
                    'stars' => [
                        ['x' => 3, 'y' => 0],
                        ['x' => 3, 'y' => 2],
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

            // 18
            [
                'name' => '18 - Advanced Recursion',
                'game_id' => 3,
                'description' => 'Use recursion with turns.',
                'order' => 18,
                'xp_reward' => 110,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'green', null],
                        [null, null, 'green', null],
                        [null, null, 'orange', 'orange'],
                        [null, null, null, 'orange'],
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

            // 19
            [
                'name' => '19 - Full Maze',
                'game_id' => 3,
                'description' => 'Use colors, functions, and turns.',
                'order' => 19,
                'xp_reward' => 120,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'green', 'green'],
                        [null, null, null, 'orange'],
                        ['green', 'green', 'orange', 'orange'],
                        ['blue', null, null, null],
                    ],
                    'stars' => [
                        ['x' => 3, 'y' => 0],
                        ['x' => 3, 'y' => 2],
                        ['x' => 0, 'y' => 3],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 6],
                        ['slots' => 5],
                        ['slots' => 4],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // 20
            [
                'name' => '20 - Final Boss',
                'game_id' => 3,
                'description' => 'Final advanced level with everything learned.',
                'order' => 20,
                'xp_reward' => 150,
                'is_active' => true,
                'config' => json_encode([
                    'board' => [
                        ['blue', 'blue', 'green', 'green', null],
                        [null, null, null, 'orange', null],
                        ['blue', 'blue', 'orange', 'orange', 'green'],
                        ['blue', null, null, null, 'green'],
                        ['blue', 'green', 'green', 'green', 'green'],
                    ],
                    'stars' => [
                        ['x' => 3, 'y' => 0],
                        ['x' => 3, 'y' => 2],
                        ['x' => 4, 'y' => 4],
                        ['x' => 0, 'y' => 4],
                    ],
                    'robot' => ['x' => 0, 'y' => 0, 'direction' => 'RIGHT'],
                    'functions' => [
                        ['slots' => 7],
                        ['slots' => 5],
                        ['slots' => 4],
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ]);
    }
}