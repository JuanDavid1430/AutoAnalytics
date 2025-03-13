import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Importa ReactiveFormsModule y CommonModule
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  @Output() registrationSuccess = new EventEmitter<void>(); // Evento para notificar registro exitoso

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      idPerfil: [2, Validators.required],
      nick: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('contraseña')!.value === form.get('confirmPassword')!.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Corrige los errores en el formulario.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Tu cuenta ha sido creada correctamente.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.registerForm.reset(); // Limpiar el formulario
            this.registrationSuccess.emit(); // Notificar registro exitoso
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al registrarse.',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al intentar registrarse.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
