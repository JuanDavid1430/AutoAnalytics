import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Importa FormsModule para formularios
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.message = response.success ? 'Login exitoso' : 'Credenciales incorrectas';
      },
      error: (error) => {
        console.error(error);
        this.message = 'Error al intentar login';
      }
    });
  }
}