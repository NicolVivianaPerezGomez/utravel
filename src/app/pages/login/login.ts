import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {

  email: string = '';
  contrasena: string = '';

  mensajeBienvenida: string = '';
  mensajeError: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin() {
    this.loginService.login(this.email, this.contrasena).subscribe({
      next: (res: any) => {
        this.loginService.saveToken(res.access);
        this.mensajeBienvenida = "¡Inicio de sesión exitoso!";
        this.mensajeError = "";

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
