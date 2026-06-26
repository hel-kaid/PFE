<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PythonRpgStage extends Model
{
    protected $fillable = [
        'game_id',
        'name',
        'description',
        'order',
        'xp_reward',
        'is_active',
        'config',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'config' => 'array',
    ];

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    public function progresses(): HasMany
    {
        return $this->hasMany(
            UserStageProgress::class,
            'stage_id'
        );
    }
}