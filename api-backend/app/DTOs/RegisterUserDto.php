<?php
namespace App\DTOs;

class RegisterUserDto
{
    public function __construct(
        public string $nombre,
        public string $apellido,
        public string $genero,
        public string $fechaNacimiento,
        public string $correoElectronico,
        public int    $idPerfil,
        public string $nick,
        public string $password,
    ) {}
}
