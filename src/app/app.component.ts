import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  mensaje: string = 'AJAJAJAJAJ';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTest().subscribe(response => {
      this.mensaje = response.message;
    });
  }
}