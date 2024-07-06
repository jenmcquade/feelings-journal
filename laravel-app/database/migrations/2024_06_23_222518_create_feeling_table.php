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
        Schema::create('feelings', function (Blueprint $table) {
            $table->id();
            $table->string('text');
            $table->integer('weight')->default(0);
            $table->foreignId('parent_id')->nullable();
            $table->timestamps();

            $table->foreign('parent_id')->references('id')->on('feelings')->onDelete('cascade');

            $table->index('parent_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feelings');
    }
};
