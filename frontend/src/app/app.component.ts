import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { LoginComponent } from './components/login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent],
  template: `<app-login></app-login>`
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