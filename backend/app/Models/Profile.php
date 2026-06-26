<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $table = 'profiles';

    protected $fillable = [
        'user_id',
        'bio',
        'favorite_language',
    ];

    protected $casts = [
        // pas de casts nécessaires ici, mais prêt à évoluer
    ];

    /**
     * Relation: un profil appartient à un utilisateur
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}