<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Usuario extends Authenticatable {
    use HasFactory;

    protected $table = 'usuarios';
    protected $primaryKey = 'idUsuario';
    protected $fillable = ['idPersona', 'idPerfil', 'contraseña', 'fechaCreacion'];
    protected $hidden = ['contraseña'];

    public function persona() {
        return $this->belongsTo(Persona::class, 'idPersona');
    }

    public function perfil() {
        return $this->belongsTo(Perfil::class, 'idPerfil');
    }
}
