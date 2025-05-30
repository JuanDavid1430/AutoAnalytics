<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;


class Usuario extends Authenticatable {
    use HasFactory, HasApiTokens;

    protected $table = 'usuarios';
    protected $primaryKey = 'idUsuario';
    public $timestamps = false;
    protected $fillable = ['idPersona', 'idPerfil', 'nick', 'contraseña', 'fechaCreacion'];
    protected $hidden = ['contraseña'];

    public function persona() {
        return $this->belongsTo(Persona::class, 'idPersona', 'idPersona');
    }

    public function perfil() {
        return $this->belongsTo(Perfil::class, 'idPerfil');
    }
}
