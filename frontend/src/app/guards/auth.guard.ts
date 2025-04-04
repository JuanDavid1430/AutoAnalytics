import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Verificamos si estamos en el navegador
  if (!isPlatformBrowser(platformId)) {
    console.log('No estamos en el navegador, permitiendo acceso');
    return true;
  }

  // Verificamos si el usuario está autenticado
  if (authService.isLoggedIn()) {
    console.log('Usuario autenticado, permitiendo acceso al dashboard');
    return true;
  }

  // Si el usuario no está autenticado, redirigir al login
  console.log('Usuario no autenticado, redirigiendo al login');
  router.navigate(['/login']);
  return false;
};
