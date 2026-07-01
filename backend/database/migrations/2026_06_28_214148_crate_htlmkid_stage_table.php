<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('html_kid_stages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('name');
            $table->text('description')
                ->nullable();
            $table->integer('order');
            $table->longText('content');
            $table->json('config');
            $table->unsignedInteger('timer_seconds')
                ->default(60);
            $table->unsignedInteger('xp_reward')
                ->default(50);
            $table->boolean('is_active')
                ->default(true);
            $table->timestamps();
            $table->unique(['game_id', 'order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('html_kid_stages');
    }
};