import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

interface Auto {
  id: number;
  placa: string;
  marca: string;
  modelo: string;
  capacidad: number;
}

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {
  autos: Auto[] = [];
  autoForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.autoForm = this.fb.group({
      placa: ['', [Validators.required, Validators.maxLength(10)]],
      marca: ['', [Validators.required, Validators.maxLength(50)]],
      modelo: ['', [Validators.required, Validators.maxLength(50)]],
      capacidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.cargarAutos();
  }

  cargarAutos(): void {
    this.http.get<{autos: Auto[]}>(`${environment.apiUrl}/autos`).subscribe({
      next: (response) => {
        this.autos = response.autos;
      },
      error: (error) => {
        Swal.fire('Error', 'Error al cargar los autos', 'error');
      }
    });
  }

  onSubmit(): void {
    if (this.autoForm.valid) {
      if (this.isEditing && this.editingId) {
        this.actualizarAuto();
      } else {
        this.crearAuto();
      }
    }
  }

  crearAuto(): void {
    this.http.post(`${environment.apiUrl}/autos`, this.autoForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Auto registrado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        this.cargarAutos();
        this.resetForm();
      },
      error: (error) => {
        if (error.error.message && error.error.message.includes('placa')) {
          Swal.fire({
            icon: 'warning',
            title: 'Placa duplicada',
            text: 'Ya existe un auto registrado con esta placa',
            confirmButtonColor: '#41AED9'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message || 'Error al registrar el auto',
            confirmButtonColor: '#41AED9'
          });
        }
      }
    });
  }

  actualizarAuto(): void {
    if (!this.editingId) return;
    
    this.http.put(`${environment.apiUrl}/autos/${this.editingId}`, this.autoForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Auto actualizado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        this.cargarAutos();
        this.resetForm();
      },
      error: (error) => {
        if (error.error.message && error.error.message.includes('placa')) {
          Swal.fire({
            icon: 'warning',
            title: 'Placa duplicada',
            text: 'Ya existe un auto registrado con esta placa',
            confirmButtonColor: '#41AED9'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message || 'Error al actualizar el auto',
            confirmButtonColor: '#41AED9'
          });
        }
      }
    });
  }

  editarAuto(auto: Auto): void {
    this.isEditing = true;
    this.editingId = auto.id;
    this.autoForm.patchValue(auto);
  }

  eliminarAuto(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2b6cb0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${environment.apiUrl}/autos/${id}`).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Auto eliminado correctamente', 'success');
            this.cargarAutos();
          },
          error: (error) => {
            Swal.fire('Error', error.error.message || 'Error al eliminar el auto', 'error');
          }
        });
      }
    });
  }

  resetForm(): void {
    this.autoForm.reset();
    this.isEditing = false;
    this.editingId = null;
    
    // Marcar todos los campos como no tocados
    Object.keys(this.autoForm.controls).forEach(key => {
      const control = this.autoForm.get(key);
      control?.setErrors(null);
      control?.markAsUntouched();
      control?.markAsPristine();
    });
  }
} 