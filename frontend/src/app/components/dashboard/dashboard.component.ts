import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string = 'Usuario';
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    // Obtener el nombre del usuario
    this.getUserName();
  }

  getUserName(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.persona) {
      this.userName = `${user.persona.nombre} ${user.persona.apellido}`;
    }
  }

  navigateTo(route: string): void {
    switch(route) {
      case 'registros':
        this.router.navigate(['/registros']);
        break;
      case 'estadisticas':
        this.router.navigate(['/estadisticas']);
        break;
      case 'clientes':
        this.router.navigate(['/clientes']);
        break;
    }
  }

  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas cerrar sesión?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire(
          '¡Sesión cerrada!',
          'Has cerrado sesión correctamente.',
          'success'
        ).then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
