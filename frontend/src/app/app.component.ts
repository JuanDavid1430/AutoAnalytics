import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  template: `
    <header class="header">
      <div class="logo-container">
       <img src="../app/assets/logo.jpeg" alt="Logo" />
      </div>
      <h1>Bienvenido a la Aplicación</h1>
    </header>
    <div class="container">
      <div class="form-section login-section">
        <app-login></app-login>
      </div>
      <div class="form-section register-section">
        <app-register></app-register>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}