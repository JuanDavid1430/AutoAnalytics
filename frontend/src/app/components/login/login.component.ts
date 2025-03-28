import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule], 
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup; // Declaramos la variable loginForm

  @Output() loginSuccess = new EventEmitter<void>();

  constructor(private authService: AuthService, private fb: FormBuilder) {
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
          Swal.fire({
            icon: 'success',
            title: '¡Inicio de sesión exitoso!',
            text: 'Has iniciado sesión correctamente.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.loginForm.reset(); // ✅ Limpia el formulario tras el login exitoso
            this.loginSuccess.emit();
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
