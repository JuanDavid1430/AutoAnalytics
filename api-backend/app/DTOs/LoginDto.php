<?php

namespace App\DTOs;

class LoginDto
{
    public function __construct(
        public string $nick,
        public string $password
    ) {}
}
