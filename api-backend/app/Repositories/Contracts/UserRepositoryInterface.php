<?php

namespace App\Repositories\Contracts;

use App\DTOs\RegisterUserDto;
use App\Models\Usuario;

interface UserRepositoryInterface
{
    public function findByNick(string $nick): ?Usuario;
    public function create(RegisterUserDto $dto): Usuario;
}
