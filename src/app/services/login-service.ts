import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8000/api/login/'; // Cambia según tu backend

  constructor(private http: HttpClient) {}

  // Login
  login(datos: { usu_correo: string; usu_contraseña: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl, datos);
  }

  // Guardar tokens en localStorage
  guardarTokens(tokens: LoginResponse) {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }

  // Obtener token de acceso
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Limpiar tokens
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

