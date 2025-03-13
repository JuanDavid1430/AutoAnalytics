<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persona extends Model {
    use HasFactory;

    protected $table = 'personas';
    protected $primaryKey = 'idPersona';
    protected $fillable = ['nombre', 'apellido', 'genero', 'fechaNacimiento', 'correoElectronico'];

    public function usuario() {
        return $this->hasOne(Usuario::class, 'idPersona');
    }
}
