import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Declaramos la variable loginForm

  @Output() loginSuccess = new EventEmitter<void>();

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder,
    private router: Router
  ) {
    // ✅ Creamos correctamente el FormGroup en el constructor
    this.loginForm = this.fb.group({
      nick: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return; // Evita enviar el formulario si es inválido
    }

    const { nick, password } = this.loginForm.value; // ✅ Tomamos los valores del formulario

    this.authService.login(nick, password).subscribe({
      next: (response) => {
        if (response.success) {
          // Primero emitimos el evento de login exitoso
          this.loginSuccess.emit();
          
          // Luego limpiamos el formulario
          this.loginForm.reset();
          
          // Mostramos el mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Inicio de sesión exitoso!',
            text: 'Has iniciado sesión correctamente.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Después de cerrar el mensaje, redirigimos al dashboard
            // Usamos router.navigate para una navegación más limpia
            this.router.navigate(['/dashboard']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '!Ops!',
            text: response.message,
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.loginForm.reset(); // Limpiamos formulario
          });
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message,
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.loginForm.reset(); // Limpiamos formulario
        });
      }
    });
  }
}
