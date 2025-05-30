<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    use HasFactory;

    /** Nombre correcto de la tabla */
    protected $table = 'perfiles';

    /** PK personalizada (opcional) */
    protected $primaryKey = 'id_perfil';

    protected $fillable = ['nombre'];
}
