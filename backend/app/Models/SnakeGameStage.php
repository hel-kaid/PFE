<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SnakeGameStage extends Model
{
    protected $fillable = [
        "game_id",
        'name',
        'description',
        'order',
        'xp_reward',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'config' => 'array',
    ];
    /**
     * Progressions des utilisateurs
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }
    public function progresses(): HasMany
    {
        return $this->hasMany(
            UserStageProgress::class
        );
    }

}