import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="clientes-container">
      <h2>Registro de Clientes</h2>
      <p>Contenido de registro de clientes en desarrollo...</p>
    </div>
  `,
  styles: [`
    .clientes-container {
      padding: 20px;
    }
  `]
})
export class ClientesComponent {} 