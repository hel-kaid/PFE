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
                'name' => '01 - Move Right',
                'game_id' => 2,
                'description' => 'Concept: move_right(). Déplacement simple vers la droite.',
                'order' => 1,
                'xp_reward' => 5,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 1],
                    'objects' => [['type' => 'flag', 'x' => 4, 'y' => 1]],
                    'goal' => 'reach_flag',
                    'defaultCode' => "move_right()\nmove_right()\nmove_right()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '02 - Move Left',
                'game_id' => 2,
                'description' => 'Concept: move_left(). Déplacement vers la gauche.',
                'order' => 2,
                'xp_reward' => 5,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 7, 'y' => 2],
                    'objects' => [['type' => 'flag', 'x' => 3, 'y' => 2]],
                    'goal' => 'reach_flag',
                    'defaultCode' => "move_left()\nmove_left()\nmove_left()\nmove_left()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '03 - Move Up',
                'game_id' => 2,
                'description' => 'Concept: move_up(). Déplacement vers le haut.',
                'order' => 3,
                'xp_reward' => 10,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 5, 'y' => 4],
                    'objects' => [['type' => 'flag', 'x' => 5, 'y' => 1]],
                    'goal' => 'reach_flag',
                    'defaultCode' => "move_up()\nmove_up()\nmove_up()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '04 - Move Down',
                'game_id' => 2,
                'description' => 'Concept: move_down(). Déplacement vers le bas.',
                'order' => 4,
                'xp_reward' => 10,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 2, 'y' => 1],
                    'objects' => [['type' => 'flag', 'x' => 2, 'y' => 4]],
                    'goal' => 'reach_flag',
                    'defaultCode' => "move_down()\nmove_down()\nmove_down()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '05 - Multiple Instructions',
                'game_id' => 2,
                'description' => 'Concept: plusieurs instructions. Suivre un parcours.',
                'order' => 5,
                'xp_reward' => 15,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 1],
                    'objects' => [['type' => 'flag', 'x' => 8, 'y' => 4]],
                    'goal' => 'reach_flag',
                    'defaultCode' => "move_right()\nmove_right()\nmove_right()\nmove_right()\nmove_right()\nmove_right()\nmove_right()\nmove_down()\nmove_down()\nmove_down()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '06 - Variables',
                'game_id' => 2,
                'description' => 'Concept: variables. Utiliser steps = 3.',
                'order' => 6,
                'xp_reward' => 15,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 2],
                    'items' => [['type' => 'coin', 'x' => 4, 'y' => 2]],
                    'goal' => 'collect_coins',
                    'defaultCode' => "steps = 3\nmove_right(steps)",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '07 - Operators',
                'game_id' => 2,
                'description' => 'Concept: opérateurs. Exemple: coins = coins + 1.',
                'order' => 7,
                'xp_reward' => 20,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 1],
                    'items' => [
                        ['type' => 'coin', 'x' => 3, 'y' => 1],
                        ['type' => 'coin', 'x' => 5, 'y' => 1],
                    ],
                    'goal' => 'collect_coins',
                    'defaultCode' => "coins = 0\nmove_right(2)\ncoins = coins + 1\nmove_right(2)\ncoins = coins + 1",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '08 - Conditions If',
                'game_id' => 2,
                'description' => 'Concept: if. Porte fermée et clé.',
                'order' => 8,
                'xp_reward' => 25,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 3],
                    'items' => [['type' => 'key', 'x' => 3, 'y' => 3]],
                    'objects' => [['type' => 'door', 'x' => 5, 'y' => 3]],
                    'goal' => 'open_door',
                    'defaultCode' => "move_right(2)\n\nif has_key():\n    move_right(2)",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '09 - If Else Path',
                'game_id' => 2,
                'description' => 'Concept: if / else. Choisir un chemin.',
                'order' => 9,
                'xp_reward' => 25,
                'is_active' => true,
                'config' => json_encode([
                    'map' => [
                        'width' => 12,
                        'height' => 6,
                        'tiles' => [
                            ['floor','floor','wall','floor','floor','floor','floor','floor','floor','floor','floor','floor'],
                            ['floor','floor','wall','floor','floor','floor','floor','floor','floor','floor','floor','floor'],
                            ['floor','floor','floor','floor','floor','floor','floor','floor','floor','floor','floor','floor'],
                            ['floor','floor','floor','floor','floor','floor','floor','floor','floor','floor','floor','floor'],
                            ['floor','floor','floor','floor','floor','floor','floor','floor','floor','floor','floor','floor'],
                            ['floor','floor','floor','floor','floor','floor','floor','floor','floor','floor','floor','floor'],
                        ],
                    ],
                    'player' => ['x' => 1, 'y' => 0],
                    'objects' => [['type' => 'flag', 'x' => 4, 'y' => 2]],
                    'goal' => 'reach_flag',
                    'defaultCode' => "if wall_ahead():\n    move_down()\nelse:\n    move_right()\n\nmove_down()\nmove_right(3)",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '10 - Comparisons',
                'game_id' => 2,
                'description' => 'Concept: comparaisons ==, >, <. Vérifier les pièces.',
                'order' => 10,
                'xp_reward' => 30,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 1],
                    'items' => [
                        ['type' => 'coin', 'x' => 3, 'y' => 1],
                        ['type' => 'coin', 'x' => 5, 'y' => 1],
                        ['type' => 'coin', 'x' => 7, 'y' => 1],
                    ],
                    'goal' => 'collect_coins',
                    'defaultCode' => "coins = 0\n\nif coins == 0:\n    move_right(2)\n    coins = coins + 1\n\nif coins > 0:\n    move_right(2)\n    coins = coins + 1\n\nif coins < 3:\n    move_right(2)\n    coins = coins + 1",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '11 - Booleans',
                'game_id' => 2,
                'description' => 'Concept: booléens and, or, not. Plusieurs conditions.',
                'order' => 11,
                'xp_reward' => 35,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 3],
                    'items' => [['type' => 'key', 'x' => 3, 'y' => 3]],
                    'objects' => [
                        ['type' => 'door', 'x' => 5, 'y' => 3],
                        ['type' => 'flag', 'x' => 6, 'y' => 3],
                    ],
                    'goal' => 'reach_flag',
                    'defaultCode' => "move_right(2)\n\nif has_key() and door_ahead():\n    move_right(2)\n\nif not has_key() or flag_ahead():\n    move_right()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '12 - While Loop',
                'game_id' => 2,
                'description' => 'Concept: while. Répéter jusqu’à arriver.',
                'order' => 12,
                'xp_reward' => 40,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 2],
                    'objects' => [['type' => 'flag', 'x' => 8, 'y' => 2]],
                    'goal' => 'reach_flag',
                    'defaultCode' => "steps = 7\n\nwhile steps > 0:\n    move_right()\n    steps = steps - 1",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '13 - For Loop',
                'game_id' => 2,
                'description' => 'Concept: for. Collecter plusieurs objets.',
                'order' => 13,
                'xp_reward' => 45,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 1],
                    'items' => [
                        ['type' => 'coin', 'x' => 3, 'y' => 1],
                        ['type' => 'coin', 'x' => 5, 'y' => 1],
                        ['type' => 'coin', 'x' => 7, 'y' => 1],
                    ],
                    'goal' => 'collect_coins',
                    'defaultCode' => "for i in range(3):\n    move_right(2)",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '14 - Range',
                'game_id' => 2,
                'description' => 'Concept: range(). Répéter un déplacement.',
                'order' => 14,
                'xp_reward' => 45,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 4],
                    'objects' => [['type' => 'flag', 'x' => 9, 'y' => 4]],
                    'goal' => 'reach_flag',
                    'defaultCode' => "for step in range(8):\n    move_right()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '15 - Lists',
                'game_id' => 2,
                'description' => 'Concept: listes. Plusieurs monstres / pièces.',
                'order' => 15,
                'xp_reward' => 50,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 2],
                    'items' => [
                        ['type' => 'coin', 'x' => 3, 'y' => 2],
                        ['type' => 'coin', 'x' => 5, 'y' => 2],
                    ],
                    'enemies' => [
                        ['id' => 1, 'type' => 'goblin', 'x' => 7, 'y' => 2, 'hp' => 1, 'attack' => 1],
                    ],
                    'goal' => 'complete_all',
                    'defaultCode' => "\nfor coin in range(2):\n    move_right(2)\n\nmove_right(2)\nif enemy_ahead():\n    attack()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '16 - Simple Functions',
                'game_id' => 2,
                'description' => 'Concept: fonctions simples. def go().',
                'order' => 16,
                'xp_reward' => 60,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 1],
                    'objects' => [['type' => 'flag', 'x' => 6, 'y' => 3]],
                    'goal' => 'reach_flag',
                    'defaultCode' => "def go():\n    move_right()\n    move_right()\n    move_down()\n\ngo()\ngo()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '17 - Function Parameters',
                'game_id' => 2,
                'description' => 'Concept: fonctions avec paramètres. move_many(3).',
                'order' => 17,
                'xp_reward' => 70,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 3],
                    'objects' => [['type' => 'flag', 'x' => 8, 'y' => 3]],
                    'goal' => 'reach_flag',
                    'defaultCode' => "def move_many(n):\n    move_right(n)\n\nmove_many(3)\nmove_many(4)",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '18 - Return',
                'game_id' => 2,
                'description' => 'Concept: fonctions avec retour. return.',
                'order' => 18,
                'xp_reward' => 80,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 2],
                    'items' => [['type' => 'coin', 'x' => 6, 'y' => 2]],
                    'goal' => 'collect_coins',
                    'defaultCode' => "def get_steps():\n    return 5\n\nsteps = get_steps()\nmove_right(steps)",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '19 - Dungeon Logic',
                'game_id' => 2,
                'description' => 'Concept: combiner conditions + boucles. Petit donjon.',
                'order' => 19,
                'xp_reward' => 90,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 3],
                    'items' => [['type' => 'key', 'x' => 3, 'y' => 3]],
                    'objects' => [['type' => 'door', 'x' => 9, 'y' => 3]],
                    'enemies' => [
                        ['id' => 1, 'type' => 'orc', 'x' => 6, 'y' => 3, 'hp' => 3, 'attack' => 1],
                    ],
                    'goal' => 'complete_all',
                    'defaultCode' => "move_right(2)\n\nwhile has_enemy():\n    move_right()\n    if enemy_ahead() or enemy_nearby():\n        attack()\n\nif has_key() and door_ahead():\n    move_right(3)",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => '20 - Final Boss',
                'game_id' => 2,
                'description' => 'Concept: boss final. Utiliser tout ce qui a été appris.',
                'order' => 20,
                'xp_reward' => 120,
                'is_active' => true,
                'config' => json_encode([
                    'map' => ['width' => 12, 'height' => 6],
                    'player' => ['x' => 1, 'y' => 2, 'attack' => 1],
                    'items' => [
                        ['type' => 'coin', 'x' => 3, 'y' => 2],
                        ['type' => 'key', 'x' => 5, 'y' => 2],
                    ],
                    'objects' => [
                        ['type' => 'door', 'x' => 8, 'y' => 2],
                    ],
                    'enemies' => [
                        [
                            'id' => 1,
                            'type' => 'dragon',
                            'x' => 10,
                            'y' => 2,
                            'hp' => 10,
                            'attack' => 2,
                            'boss' => true,
                        ],
                    ],
                    'goal' => 'kill_boss',
                    'defaultCode' => "def move_many(n):\n    for i in range(n):\n        move_right()\n\ndef fight(times):\n    for i in range(times):\n        attack()\n\ncoins = 0\nmove_many(2)\ncoins = coins + 1\n\nif coins > 0:\n    move_many(2)\n\nif has_key() and door_ahead():\n    move_many(3)\n\nwhile has_enemy():\n    if enemy_ahead() or enemy_nearby():\n        fight(10)\n    else:\n        move_right()",
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
