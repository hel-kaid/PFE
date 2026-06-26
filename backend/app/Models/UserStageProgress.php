<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserStageProgress extends Model
{
    protected $table = 'user_stage_progress';

    protected $fillable = [
        'user_id',
        'stage_id',
        "game_id",
        'completed',
        'stars',
        'completed_at',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'completed_at' => 'datetime',
    ];

    /**
     * Utilisateur
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
}