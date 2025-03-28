import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =  environment.apiUrl; 

  constructor(private http: HttpClient) { }

  login(nick: string, contraseña: string): Observable<any> {
    const body = { nick, contraseña };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
