import { Component } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';
  mensajeError: string = '';
  mensajeBienvenida: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onLogin() {
    const datosLogin = {
      usu_correo: this.email,
      usu_contraseña: this.contrasena
    };

    console.log('🔹 Datos que se envían al backend:', datosLogin);

    this.loginService.login(datosLogin).subscribe({
      next: (res: any) => {
        console.log('✅ Respuesta del backend:', res);

        if (res.access && res.refresh) {
          // Guardar tokens
          this.loginService.guardarTokens(res);
          this.mensajeBienvenida = '¡Inicio de sesión exitoso!';
          this.mensajeError = '';

          // Redirigir a la página principal o de lugares
          setTimeout(() => {
            this.router.navigate(['/lugares']);
          }, 800);
        } else {
          this.mensajeError = 'Respuesta inválida del backend';
          this.mensajeBienvenida = '';
        }
      },
      error: (err: any) => {
        console.error(' Error al iniciar sesión:', err);

        if (err.status === 0) {
          this.mensajeError = 'No se puede conectar al backend (CORS o servidor apagado)';
        } else if (err.status === 400 || err.status === 401) {
          this.mensajeError = err.error?.error || 'Usuario o contraseña incorrectos';
        } else {
          this.mensajeError = 'Error inesperado';
        }

        this.mensajeBienvenida = '';
      }
    });
  }
}
