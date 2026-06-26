<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('snake_game_stages', function (Blueprint $table) {
            $table->integer('xp_reward')->default(5);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('snake_game_stages', function (Blueprint $table) {
            $table->dropColumn('xp_reward');
        });
    }
};
