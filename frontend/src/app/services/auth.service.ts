import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Interfaz para la respuesta de login
interface LoginResponse {
  success: boolean;
  token?: string;
  user?: any;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private userKey = 'user_data';

  constructor(private http: HttpClient) {}

  login(nick: string, contraseña: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { nick, contraseña }).pipe(
      tap(response => {
        if (response.success && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          if (response.user) {
            localStorage.setItem(this.userKey, JSON.stringify(response.user));
          }
        }
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return of({ success: false, message: 'Error al iniciar sesión' });
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError(error => {
        console.error('Error en registro:', error);
        return of({ success: false, message: 'Error al registrar usuario' });
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  getUserName(): string {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.nombre || 'Usuario';
    }
    return 'Usuario';
  }
}
