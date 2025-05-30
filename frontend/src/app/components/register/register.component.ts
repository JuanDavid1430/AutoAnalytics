import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterData } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      idPerfil: [1, [Validators.required]],
      nick: ['', [Validators.required]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('contraseña');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  resetForm() {
    this.registerForm.reset();
    this.errorMessage = '';
    this.loading = false;
    
    // Marcar todos los campos como no tocados
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.setErrors(null);
      control?.markAsUntouched();
      control?.markAsPristine();
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const userData: RegisterData = this.registerForm.value;
      
      this.authService.register(userData).subscribe({
        next: (response) => {
          if (response.success === 'true') {
            Swal.fire({
              icon: 'success',
              title: '¡Registro exitoso!',
              text: 'Tu cuenta ha sido creada correctamente',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              this.resetForm();
              this.router.navigate(['/login']);
            });
          } else {
            this.errorMessage = response.message || 'Error al registrar usuario';
            this.loading = false;
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message || 'Error al registrar usuario',
            confirmButtonColor: '#41AED9'
          });
          this.errorMessage = error.error.message || 'Error al registrar usuario';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos correctamente',
        confirmButtonColor: '#41AED9'
      });
    }
  }
}
