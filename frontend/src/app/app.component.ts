import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [], // No necesitas HttpClientModule aquí
  template: `<h1>{{ message }}</h1>`
})
export class AppComponent implements OnInit {
  message: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getTest().subscribe(
      (response) => this.message = response.message,
      (error) => console.error(error)
    );
  }
}