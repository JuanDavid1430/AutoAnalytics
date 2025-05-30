<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\UserRepositoryInterface;
use App\DTOs\RegisterUserDto;
use App\Models\{Persona, Usuario};
use Illuminate\Support\Facades\{DB, Hash};

class UserRepository implements UserRepositoryInterface
{
    public function create(RegisterUserDto $dto): Usuario
    {
        return DB::transaction(function () use ($dto) {

            $persona = Persona::create([
                'nombre'             => $dto->nombre,
                'apellido'           => $dto->apellido,
                'genero'             => $dto->genero,
                'fecha_nacimiento'   => $dto->fechaNacimiento,
                'correo_electronico' => $dto->correoElectronico,
            ]);

            $usuario = Usuario::create([
                'id_persona'   => $persona->id_persona,
                'id_perfil'    => $dto->idPerfil,
                'nick'         => $dto->nick,
                'contraseña'   => Hash::make($dto->password),
                'fechaCreacion'=> now(),
            ]);

            return $usuario->load('persona', 'perfil');
        });
    }

    public function findByNick(string $nick): ?Usuario
    {
        return Usuario::where('nick', $nick)->with('perfil','persona')->first();
    }
}