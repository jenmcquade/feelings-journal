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
        Schema::create('user_feelings', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
            $table->foreignId('feeling_id')->constrained();
            $table->primary(['user_id', 'feeling_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_feelings');
    }
};
