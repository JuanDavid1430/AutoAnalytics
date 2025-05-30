<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('idUsuario');
            $table->unsignedBigInteger('idPersona');
            $table->unsignedBigInteger('idPerfil');
            $table->string('contraseña');
            $table->timestamp('fechaCreacion')->useCurrent();

            $table->foreign('idPersona')->references('idPersona')->on('personas')->onDelete('cascade');
            $table->foreign('idPerfil')->references('idPerfil')->on('perfiles')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('usuarios');
    }
};

