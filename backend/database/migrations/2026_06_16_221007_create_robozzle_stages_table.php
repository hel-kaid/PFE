<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('robozzle_stages', function (Blueprint $table) {
            $table->id();

            $table->foreignId('game_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('name');

            $table->text('description')
                ->nullable();

            $table->integer('order');

            $table->json('config');

            $table->integer('xp_reward')
                ->default(50);

            $table->boolean('is_active')
                ->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('robozzle_stages');
    }
};