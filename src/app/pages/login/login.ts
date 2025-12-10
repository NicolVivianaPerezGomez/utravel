import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { LoginService } from '../../services/login-service';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule, RouterLink ]
})
export class LoginComponent {

  email: string = '';
  contrasena: string = '';
  mensajeBienvenida: string = '';
  mensajeError: string = '';
  usuarios: any[] = []; // para guardar info de usuarios si quieres

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  onLogin() {
    this.loginService.login(this.email, this.contrasena).subscribe({
      next: (res: any) => {
        // Guardar token
        this.loginService.saveToken(res.access);

        this.mensajeBienvenida = "¡Inicio de sesión exitoso!";
        this.mensajeError = "";

        // Ejemplo: obtener lista de usuarios después del login
        this.usuarioService.getUsuarios().subscribe({
          next: (data) => {
            this.usuarios = data; // ahora ya tienes los usuarios disponibles
            console.log('Usuarios cargados:', this.usuarios);
          },
          error: (err) => console.error('Error al cargar usuarios:', err)
        });

        // Redirigir a otra página
        setTimeout(() => {
          this.router.navigate(['/lugares']);
        }, 800);
      },
      error: () => {
        this.mensajeError = "Credenciales incorrectas";
        this.mensajeBienvenida = "";
      }
    });
  }
}
