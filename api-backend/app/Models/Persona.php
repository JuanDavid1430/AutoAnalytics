<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    use HasFactory;

    protected $table      = 'personas';
    protected $primaryKey = 'id_persona';
    public    $timestamps = true;

    protected $fillable = [
        'nombre',
        'apellido',
        'genero',
        'fecha_nacimiento',
        'correo_electronico',
    ];

    /** Relación 1-a-1 con Usuario */
    public function usuario()
    {
        return $this->hasOne(Usuario::class, 'id_persona');
    }
}
