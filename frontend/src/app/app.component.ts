import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  template: `
    <header class="header">
      <div class="logo-container">
        <img src="logo.jpeg" alt="Logo"/>
      </div>
      <h1>Hola!, Bienvenido al portal de AutoAnalytics</h1>
    </header>
    
    <div class="container">
      <div #formContainer class="form-container">
        <!-- Sección Login -->
        <div class="form-section login-section">
          <div style="text-align: center;">

          <app-login></app-login>
          <p class="switch-text">
            ¿No tienes cuenta? 
            <a href="#" (click)="toggleForm($event)">Regístrate aquí</a>
          </p>
          </div>
        </div>
        
        <!-- Sección Registro -->
        <div class="form-section register-section">
          <app-register></app-register>
          <p class="switch-text">
            ¿Ya tienes cuenta? 
            <a href="#" (click)="toggleForm($event)">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('formContainer') formContainer!: ElementRef;

  toggleForm(event: Event) {
    event.preventDefault();
    this.formContainer.nativeElement.classList.toggle('show-register');
  }
}