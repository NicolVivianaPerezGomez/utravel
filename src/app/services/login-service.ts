import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/users/login';

  constructor(private http: HttpClient) {}

  login(email: string, contraseña: string): Observable<any> {
    const datos = { email, contraseña };
    return this.http.post(this.apiUrl, datos);
  }
}
