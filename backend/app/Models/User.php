<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'xp',
        'level',
        'streak_days',
        'avatar',
        'is_active',
        'email_verification_token',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'xp' => 'integer',
        'level' => 'integer',
        'streak_days' => 'integer',
    ];

    // Laravel 10+ password hashing automatique
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }
    public function badges()
{
    return $this->belongsToMany(Badge::class)
        ->withPivot('game_id')
        ->withTimestamps();
}
}