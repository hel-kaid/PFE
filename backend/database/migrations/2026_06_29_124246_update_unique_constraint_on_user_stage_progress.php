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
        Schema::table('user_stage_progress', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'stage_id']);
            $table->unique(['user_id', 'game_id', 'stage_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_stage_progress', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'game_id', 'stage_id']);
            $table->unique(['user_id', 'stage_id']);
        });
    }
};
