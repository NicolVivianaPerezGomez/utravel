import { Component } from '@angular/core';
import { LoginService } from '../../services/login-service' // ruta correcta
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

  constructor(private loginService: LoginService) {}

onLogin() {
  const datosLogin = {
    usu_correo: this.email,
    usu_contraseña: this.contrasena
  };

  // 1️⃣ Mostrar lo que se va a enviar
  console.log('🔹 Datos que se envían al backend:', datosLogin);

  this.loginService.login(datosLogin).subscribe({
    next: (res: any) => {
      // 2️⃣ Mostrar respuesta del backend
      console.log('✅ Respuesta del backend:', res);

      if (res.access && res.refresh) {
        // 3️⃣ Guardar tokens
        this.loginService.guardarTokens(res);
        console.log('🔹 Tokens guardados en localStorage');
        this.mensajeBienvenida = '¡Bienvenido!';
        this.mensajeError = '';
      } else {
        console.warn('⚠️ La respuesta no contiene tokens válidos');
        this.mensajeError = 'Respuesta inválida del backend';
      }
    },
    error: (err: any) => {
      // 4️⃣ Mostrar todo el error
      console.error('❌ Error al iniciar sesión:', err);

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