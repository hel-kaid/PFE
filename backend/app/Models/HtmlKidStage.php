<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HtmlKidStage extends Model
{
    protected $fillable = [
        'game_id',
        'name',
        'description',
        'order',
        'content',
        'config',
        'timer_seconds',
        'xp_reward',
        'is_active',
    ];

    protected $casts = [
        'config' => 'array',
        'is_active' => 'boolean',
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