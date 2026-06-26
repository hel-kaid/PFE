<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::table('snake_game_stages', function (Blueprint $table) {

            $table->json('config')
                ->nullable()
                ->after('description');
        });
    }

    public function down(): void
    {
        Schema::table('snake_game_stages', function (Blueprint $table) {
            if (Schema::hasColumn('snake_game_stages', 'config')) {
                $table->dropColumn('config');
            }
        });
    }
};