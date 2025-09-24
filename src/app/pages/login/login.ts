import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login-service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  providers: [LoginService],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  contrasena: string = '';
  mensajeError: string = '';
  mensajeBienvenida: string = '';

  constructor(private authService: LoginService, private router: Router) { }

onLogin(): void {
  this.authService.login(this.email, this.contrasena).subscribe({
    next: (usuario: any) => {
      console.log('Usuario autenticado:', usuario);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.mensajeBienvenida = `¡Bienvenido, ${usuario.userName}!`;
      // Puedes redirigir después de unos segundos si quieres
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    },
    error: (error: any) => {
  if (error.error instanceof ProgressEvent) {
    this.mensajeError = 'Error de conexión con el servidor';
  } else {
    this.mensajeError = error.error || 'Error al iniciar sesión';
  }
}

  });
}
}