<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('python_rpg_stages', function (Blueprint $table) {

            $table->id();

            $table->foreignId('game_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('name');

            $table->text('description')
                ->nullable();

            $table->integer('order');

            $table->boolean('is_active')
                ->default(true);

            $table->json('config');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('python_rpg_stages');
    }
};

