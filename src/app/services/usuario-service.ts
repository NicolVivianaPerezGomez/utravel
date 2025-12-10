import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8000/api/usuarios/';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl, this.getHeaders());
  }

  // Obtener un usuario por ID
  getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`, this.getHeaders());
  }

  // Crear un usuario
  crearUsuario(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, this.getHeaders());
  }

  // Actualizar un usuario
  actualizarUsuario(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, data, this.getHeaders());
  }

  // Eliminar o desactivar usuario
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`, this.getHeaders());
  }

  // Método privado para agregar token a los headers
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  }
}
