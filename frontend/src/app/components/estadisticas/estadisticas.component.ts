import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="estadisticas-container">
      <h2>Estadísticas</h2>
      <p>Contenido de estadísticas en desarrollo...</p>
    </div>
  `,
  styles: [`
    .estadisticas-container {
      padding: 20px;
    }
  `]
})
export class EstadisticasComponent {} 