<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('personas', function (Blueprint $table) {
            $table->id('idPersona');
            $table->string('nombre');
            $table->string('apellido');
            $table->enum('genero', ['M', 'F', 'Otro']);
            $table->date('fechaNacimiento');
            $table->string('correoElectronico')->unique();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('personas');
    }
};
