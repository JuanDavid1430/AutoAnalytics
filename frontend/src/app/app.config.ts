import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Provee HttpClient globalmente

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()) // Solo provee HttpClient
  ]
};