<?php

namespace Database\Seeders;

use App\Models\SnakeGameStage;
use Illuminate\Database\Seeder;

class SnakeGameSeeder extends Seeder
{
    public function run(): void
    {
        SnakeGameStage::truncate();

        SnakeGameStage::insert([
            [
                'name' => 'Basics',
                'game_id' => 1,
                'description' => 'Learn move_right()',
                'order' => 1,
                'xp_reward' => 5,
                'is_active' => true,
                'config' => json_encode([
                    'gridSize' => 5,
                    'snakeStart' => ['x' => 0, 'y' => 0],
                    'treasure' => ['x' => 2, 'y' => 0],
                    'obstacles' => [],
                    'defaultCode' => "move_right()\nmove_right()",
                    'requiresLoop' => false,
                    'allowedCommands' => [
                        'move_right()',
                        'move_down()',
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Vertical Movement',
                'game_id' => 1,
                'description' => 'Learn move_down()',
                'order' => 2,
                'xp_reward' => 10,
                'is_active' => true,
                'config' => json_encode([
                    'gridSize' => 5,
                    'snakeStart' => ['x' => 0, 'y' => 0],
                    'treasure' => ['x' => 0, 'y' => 3],
                    'obstacles' => [],
                    'defaultCode' => "move_down()\nmove_down()\nmove_down()",
                    'requiresLoop' => false,
                    'allowedCommands' => [
                        'move_right()',
                        'move_left()',
                        'move_down()',
                        'move_up()',
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],


            [
                'name' => 'Simple Path',
                'game_id' => 1,
                'description' => 'Combine horizontal and vertical movement',
                'order' => 3,
                'xp_reward' => 15,
                'is_active' => true,
                'config' => json_encode([
                    'gridSize' => 6,
                    'snakeStart' => ['x' => 0, 'y' => 0],
                    'treasure' => ['x' => 3, 'y' => 2],
                    'obstacles' => [],
                    'defaultCode' => "move_right()\nmove_right()\nmove_right()\nmove_down()\nmove_down()",
                    'requiresLoop' => false,
                    'allowedCommands' => [
                        'move_right()',
                        'move_left()',
                        'move_down()',
                        'move_up()',
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // =====================
            // STAGE 4 - FIRST LOOP
            // =====================
            [
                'name' => 'First Loop',
                'game_id' => 1,
                'description' => 'Use loops to move efficiently',
                'order' => 4,
                'xp_reward' => 20,
                'is_active' => true,
                'config' => json_encode([
                    'gridSize' => 5,
                    'snakeStart' => ['x' => 0, 'y' => 0],
                    'treasure' => ['x' => 4, 'y' => 0],
                    'obstacles' => [],
                    'defaultCode' => "for i in range(4):\n    move_right()",
                    'requiresLoop' => true,
                    'allowedCommands' => [
                        'move_right()',
                        'move_left()',
                        'move_down()',
                        'move_up()',
                        'for i in range(n):',
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // =====================
            // STAGE 5 - OBSTACLES
            // =====================
            [
                'name' => 'Obstacles',
                'game_id' => 1,
                'description' => 'Avoid a simple obstacle',
                'order' => 5,
                'xp_reward' => 25,
                'is_active' => true,
                'config' => json_encode([
                    'gridSize' => 6,
                    'snakeStart' => ['x' => 0, 'y' => 0],
                    'treasure' => ['x' => 5, 'y' => 0],
                    'obstacles' => [
                        ['x' => 2, 'y' => 0]
                    ],
                    'defaultCode' => "move_right()\nmove_down()\nmove_right()\nmove_right()\nmove_right()\nmove_up()\nmove_right()",
                    'requiresLoop' => false,
                    'allowedCommands' => [
                        'move_right()',
                        'move_left()',
                        'move_down()',
                        'move_up()',
                        'for i in range(n):',
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // =====================
            // STAGE 6 - STRATEGY
            // =====================
            [
                'name' => 'Loops & Strategy',
                'game_id' => 1,
                'description' => 'Use loops and avoid obstacles',
                'order' => 6,
                'xp_reward' => 30,
                'is_active' => true,
                'config' => json_encode([
                    'gridSize' => 7,
                    'snakeStart' => ['x' => 0, 'y' => 0],
                    'treasure' => ['x' => 6, 'y' => 6],
                    'obstacles' => [
                        ['x' => 3, 'y' => 3],
                        ['x' => 3, 'y' => 4],
                        ['x' => 4, 'y' => 3],
                    ],
                    'defaultCode' => "for i in range(6):\n    move_right()\nfor i in range(6):\n    move_down()",
                    'requiresLoop' => true,
                    'allowedCommands' => [
                        'move_right()',
                        'move_left()',
                        'move_down()',
                        'move_up()',
                        'for i in range(n):',
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // =====================
            // STAGE 7 - ADVANCED
            // =====================
            [
                'name' => 'Advanced Challenge',
                'game_id' => 1,
                'description' => 'Complex maze with multiple obstacles',
                'order' => 7,
                'xp_reward' => 35,
                'is_active' => true,
                'config' => json_encode([
                    'gridSize' => 8,
                    'snakeStart' => ['x' => 0, 'y' => 0],
                    'treasure' => ['x' => 7, 'y' => 7],
                    'obstacles' => [
                        ['x' => 1, 'y' => 2],
                        ['x' => 2, 'y' => 2],
                        ['x' => 3, 'y' => 2],
                        ['x' => 4, 'y' => 2],

                        ['x' => 5, 'y' => 3],
                        ['x' => 5, 'y' => 4],
                        ['x' => 5, 'y' => 5],

                        ['x' => 2, 'y' => 6],
                        ['x' => 3, 'y' => 6],
                        ['x' => 4, 'y' => 6],
                    ],
                    'defaultCode' => "for i in range(7):\n    move_right()\nfor i in range(7):\n    move_down()",
                    'requiresLoop' => true,
                    'allowedCommands' => [
                        'move_right()',
                        'move_left()',
                        'move_down()',
                        'move_up()',
                        'for i in range(n):',
                    ],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ]);
    }
}