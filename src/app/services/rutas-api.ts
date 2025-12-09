import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
  private apiUrl = 'http://127.0.0.1:8000/api/utravel/rutas/';
  private token: string | null = null;

  constructor(private http: HttpClient) {
    // Recuperar token del localStorage si existe
    this.token = localStorage.getItem('access_token');
  }

  // Obtener headers con autenticación JWT (opcional)
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

  // LISTAR RUTAS
  listarRutas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // OBTENER UNA RUTA POR ID
  obtenerRuta(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  // CREAR RUTA CON IMAGEN
  crearRuta(datos: any, imagen?: File): Observable<any> {
    const formData = new FormData();
    formData.append('rut_nombre', datos.rut_nombre);
    formData.append('rut_descripcion', datos.rut_descripcion);
    formData.append('rut_duracion', datos.rut_duracion);
    
    if (imagen) {
      formData.append('rut_imagen', imagen);
    }

    return this.http.post<any>(
      `${this.apiUrl}crear/`,
      formData,
      { headers: this.getHeaders() }
    );
  }

  // ACTUALIZAR RUTA (con o sin imagen)
  actualizarRuta(id: number, datos: any, imagen?: File): Observable<any> {
    const formData = new FormData();
    formData.append('rut_nombre', datos.rut_nombre);
    formData.append('rut_descripcion', datos.rut_descripcion);
    formData.append('rut_duracion', datos.rut_duracion);
    
    if (imagen) {
      formData.append('rut_imagen', imagen);
    }

    return this.http.patch<any>(
      `${this.apiUrl}${id}/actualizar/`,
      formData,
      { headers: this.getHeaders() }
    );
  }

  // ELIMINAR RUTA (eliminación lógica)
  eliminarRuta(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}${id}/eliminar/`,
      { headers: this.getHeaders() }
    );
  }

  // OBTENER URL COMPLETA DE LA IMAGEN
  getImageUrl(relativePath: string): string {
    if (!relativePath) return '';
    // Si ya es una URL completa, devolverla tal cual
    if (relativePath.startsWith('http')) {
      return relativePath;
    }
    // Si es una ruta relativa, agregarle el baseURL
    return `http://127.0.0.1:8000${relativePath}`;
  }

  // ESTABLECER TOKEN (llamar después de login)
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('access_token', token);
  }
}
