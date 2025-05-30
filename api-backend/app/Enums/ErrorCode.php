<?php

namespace App\Enums\Enums;

enum ErrorCode:string
{
    case VALIDATION_FAILED      = 'LAV001';
    case USER_NOT_FOUND         = 'LAV002';
    case WRONG_CREDENTIALS      = 'LAV003';
    case DB_ERROR               = 'LAV004';
}
