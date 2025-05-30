<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;


class Usuario extends Authenticatable {
    use HasFactory, HasApiTokens;

    protected $table = 'usuarios';
    protected $primaryKey = 'idUsuario';
    protected $fillable = ['idPersona', 'idPerfil', 'contraseña', 'fechaCreacion','nick'];
    protected $hidden = ['contraseña'];

    public function persona() {
        return $this->belongsTo(Persona::class, 'idPersona');
    }

    public function perfil() {
        return $this->belongsTo(Perfil::class, 'id_perfil');
    }
}
