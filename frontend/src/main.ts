import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Combina la configuración de appConfig con provideHttpClient
const combinedConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // Incluye los providers de appConfig
    provideHttpClient(withFetch()) // Agrega provideHttpClient
  ]
};

bootstrapApplication(AppComponent, combinedConfig)
  .catch((err) => console.error(err));
