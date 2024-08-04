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
        Schema::table('libros', function (Blueprint $table) {
            if (!Schema::hasColumn('libros', 'autor_id')) {
                $table->unsignedBigInteger('autor_id')->nullable();
                $table->foreign('autor_id')->references('id')->on('autors')->onDelete('cascade');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('libros', function (Blueprint $table) {
            if (Schema::hasColumn('libros', 'autor_id')) {
                $table->dropForeign(['autor_id']);
                $table->dropColumn('autor_id');
            }
        });
    }
};
