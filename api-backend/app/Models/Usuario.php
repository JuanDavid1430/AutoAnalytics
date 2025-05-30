<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table      = 'usuarios';
    protected $primaryKey = 'id_usuario';
    public    $timestamps = false;          // usamos fechaCreacion, no created_at

    protected $fillable = [
        'id_persona',
        'id_perfil',
        'nick',
        'contraseña',      // o 'password'
        'fechaCreacion',
    ];

    protected $hidden = ['contraseña'];

    /* Relaciones */
    public function persona()
    {
        return $this->belongsTo(Persona::class, 'id_persona');
    }

    public function perfil()
    {
        return $this->belongsTo(Perfil::class, 'id_perfil');
    }
}
