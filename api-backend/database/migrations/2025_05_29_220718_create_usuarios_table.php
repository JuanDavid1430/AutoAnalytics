<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $t) {
            $t->id('id_usuario');
            $t->foreignId('id_persona')
              ->constrained('personas', 'id_persona');
            $t->foreignId('id_perfil')
              ->constrained('perfiles', 'id_perfil');
            $t->string('nick')->unique();
            $t->string('contraseña');
            $t->timestamp('fechaCreacion');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
