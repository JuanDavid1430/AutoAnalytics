import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Inicializa la aplicación con la configuración
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Error al inicializar la aplicación:', err));
