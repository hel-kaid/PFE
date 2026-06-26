<?php

namespace Database\Seeders;

use App\Models\PythonRpgStage;
use Illuminate\Database\Seeder;

class PythonRpgSeeder extends Seeder
{
    public function run(): void
    {
        PythonRpgStage::truncate();

        PythonRpgStage::insert([
            [
                'name' => 'First Adventure',
                'game_id' => 2,
                'description' => 'Learn all basic movements',
                'order' => 1,
                'xp_reward' => 5,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 1],
                    'objects' => [
                        ['type' => 'flag', 'x' => 8, 'y' => 4],
                    ],
                    'goal' => 'reach_flag',
                    'defaultCode' =>
                        "move_right()
move_right()
move_down()
move_down()
move_right()
move_right()
move_right()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Maze Escape',
                'game_id' => 2,
                'description' => 'Avoid walls and reach the flag',
                'order' => 2,
                'xp_reward' => 10,
                'is_active' => true,
                'config' => json_encode([
                    'map' => [
                        'width' => 12,
                        'height' => 6,
                        'tiles' => [
                            ['floor', 'floor', 'floor', 'wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor'],
                            ['floor', 'wall', 'floor', 'wall', 'floor', 'wall', 'wall', 'wall', 'floor', 'wall', 'floor', 'floor'],
                            ['floor', 'wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall', 'floor', 'wall', 'floor', 'floor'],
                            ['floor', 'wall', 'wall', 'wall', 'wall', 'wall', 'floor', 'wall', 'floor', 'floor', 'floor', 'floor'],
                            ['floor', 'floor', 'floor', 'floor', 'floor', 'wall', 'floor', 'floor', 'floor', 'wall', 'wall', 'floor'],
                            ['floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor'],
                        ],
                    ],
                    'player' => ['x' => 0, 'y' => 0],
                    'objects' => [
                        ['type' => 'flag', 'x' => 10, 'y' => 4],
                    ],
                    'goal' => 'reach_flag',
                    'defaultCode' => "move_right()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Coin Hunter',
                'game_id' => 2,
                'description' => 'Collect all coins',
                'order' => 3,
                'xp_reward' => 15,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 1],
                    'items' => [
                        ['type' => 'coin', 'x' => 3, 'y' => 1],
                        ['type' => 'coin', 'x' => 6, 'y' => 3],
                        ['type' => 'coin', 'x' => 9, 'y' => 4],
                    ],
                    'goal' => 'collect_coins',
                    'defaultCode' => "move_right()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'First Goblin',
                'game_id' => 2,
                'description' => 'Defeat the goblin',
                'order' => 4,
                'xp_reward' => 15,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 2],
                    'enemies' => [
                        ['id' => 1, 'type' => 'goblin', 'x' => 5, 'y' => 2, 'hp' => 1, 'attack' => 1],
                    ],
                    'goal' => 'kill_all',
                    'defaultCode' =>
                        "move_right()
move_right()
attack()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Orc Warrior',
                'game_id' => 2,
                'description' => 'Defeat a stronger enemy',
                'order' => 5,
                'xp_reward' => 20,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 2],
                    'enemies' => [
                        ['id' => 1, 'type' => 'orc', 'x' => 6, 'y' => 2, 'hp' => 3, 'attack' => 1],
                    ],
                    'goal' => 'kill_all',
                    'defaultCode' =>
                        "move_right()
move_right()
attack()
attack()
attack()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Treasure Room',
                'game_id' => 2,
                'description' => 'Collect the key and reach the door',
                'order' => 6,
                'xp_reward' => 20,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 3],
                    'items' => [
                        ['type' => 'key', 'x' => 4, 'y' => 3],
                    ],
                    'objects' => [
                        ['type' => 'door', 'x' => 9, 'y' => 3],
                    ],
                    'goal' => 'open_door',
                    'defaultCode' =>
                        "move_right()
move_right()
move_right()
move_right()
move_right()
move_right()
move_right()
move_right()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Monster Camp',
                'game_id' => 2,
                'description' => 'Defeat all monsters',
                'order' => 7,
                'xp_reward' => 25,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 3],
                    'enemies' => [
                        ['id' => 1, 'type' => 'goblin', 'x' => 4, 'y' => 3, 'hp' => 1, 'attack' => 1],
                        ['id' => 2, 'type' => 'goblin', 'x' => 7, 'y' => 2, 'hp' => 1, 'attack' => 1],
                        ['id' => 3, 'type' => 'orc', 'x' => 9, 'y' => 4, 'hp' => 3, 'attack' => 1],
                    ],
                    'goal' => 'kill_all',
                    'defaultCode' => "attack()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Dungeon Escape',
                'game_id' => 2,
                'description' => 'Reach the flag while enemies chase you',
                'order' => 8,
                'xp_reward' => 30,
                'is_active' => true,
                'config' => json_encode([
                    'map' => [
                        'width' => 12,
                        'height' => 6,
                        'tiles' => [
                            ['floor', 'floor', 'floor', 'floor', 'wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor'],
                            ['floor', 'wall', 'wall', 'floor', 'wall', 'floor', 'wall', 'wall', 'wall', 'wall', 'floor', 'floor'],
                            ['floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall', 'floor', 'floor'],
                            ['floor', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'floor', 'wall', 'floor', 'floor'],
                            ['floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor'],
                            ['floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor'],
                        ],
                    ],
                    'player' => ['x' => 0, 'y' => 0],
                    'objects' => [
                        ['type' => 'flag', 'x' => 10, 'y' => 4],
                    ],
                    'enemies' => [
                        ['id' => 1, 'type' => 'goblin', 'x' => 5, 'y' => 2, 'hp' => 1, 'attack' => 1],
                        ['id' => 2, 'type' => 'orc', 'x' => 8, 'y' => 4, 'hp' => 3, 'attack' => 1],
                    ],
                    'goal' => 'reach_flag',
                    'defaultCode' => "move_right()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Arena Survival',
                'game_id' => 2,
                'description' => 'Defeat every enemy in the arena',
                'order' => 9,
                'xp_reward' => 35,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 5, 'y' => 3],
                    'enemies' => [
                        ['id' => 1, 'type' => 'goblin', 'x' => 2, 'y' => 1, 'hp' => 1, 'attack' => 1],
                        ['id' => 2, 'type' => 'goblin', 'x' => 9, 'y' => 1, 'hp' => 1, 'attack' => 1],
                        ['id' => 3, 'type' => 'orc', 'x' => 2, 'y' => 4, 'hp' => 3, 'attack' => 1],
                        ['id' => 4, 'type' => 'orc', 'x' => 9, 'y' => 4, 'hp' => 3, 'attack' => 1],
                    ],
                    'goal' => 'kill_all',
                    'defaultCode' => "attack()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Dragon King',
                'game_id' => 2,
                'description' => 'Final boss battle',
                'order' => 10,
                'xp_reward' => 50,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 2],
                    'enemies' => [
                        [
                            'id' => 1,
                            'type' => 'dragon',
                            'x' => 9,
                            'y' => 2,
                            'hp' => 10,
                            'attack' => 2,
                            'boss' => true,
                        ],
                    ],
                    'goal' => 'kill_boss',
                    'defaultCode' =>
                        "move_right()
attack()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}