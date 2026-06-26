<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Game extends Model
{
    use HasFactory;

    protected $table = 'games';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'is_active',
    ];

    protected $casts = [

        'is_active' => 'boolean',
    ];
    public function stages(): HasMany
    {
        return $this->hasMany(SnakeGameStage::class);
    }
}
