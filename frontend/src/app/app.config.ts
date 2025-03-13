import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Provee HttpClient globalmente
import { provideRouter } from '@angular/router'; // Importa provideRouter
import { routes } from './app.routes'; // Importa tus rutas

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // Solo provee HttpClient
    provideRouter(routes) // Configura las rutas
  ]
};