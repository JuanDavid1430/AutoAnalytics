import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, RegisterComponent, CommonModule],
  template: `
    <header class="header">
      <div class="logo-container">
        <img src="logo.jpeg" alt="Logo"/>
      </div>
      <h1>Hola!, Bienvenido al portal de AutoAnalytics</h1>
    </header>
    
    <div class="container">
      <div class="form-container">
        <!-- Sección Login -->
        <div class="form-section login-section" *ngIf="showLogin">
          <div style="text-align: center;">
            <app-login></app-login>
            <p class="switch-text">
              ¿No tienes cuenta? 
              <a href="#" (click)="toggleForm($event)">Regístrate aquí</a>
            </p>
          </div>
        </div>
        
        <!-- Sección Registro -->
        <div class="form-section register-section" *ngIf="!showLogin">
          <app-register (registrationSuccess)="onRegistrationSuccess()"></app-register>
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
  showLogin: boolean = true; // Controla qué formulario se muestra

  toggleForm(event: Event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    this.showLogin = !this.showLogin; // Cambia entre login y registro
  }

  onRegistrationSuccess() {
    this.showLogin = true; // Muestra el formulario de login después de un registro exitoso
  }
}