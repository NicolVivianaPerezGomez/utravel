import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/registro';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {

  registerForm: FormGroup;
  userType: string = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      confirmacion: ['', Validators.required],
      tipoUsuario: ['', Validators.required]
    });
  }

  selectUserType(type: string): void {
    this.userType = type;
    this.registerForm.patchValue({ tipoUsuario: type });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      alert('Completa todos los campos');
      return;
    }

    if (this.registerForm.value.contraseña !== this.registerForm.value.confirmacion) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const formData = {
      usu_nombre: this.registerForm.value.nombre,
      usu_apellido: this.registerForm.value.apellido,
      usu_correo: this.registerForm.value.email,
      usu_contraseña: this.registerForm.value.contraseña,
      usu_usunombre: this.registerForm.value.usuario,
      usu_status: true,
      ciu_id: 1,
      tipousu_id: this.userType === 'Empresa' ? 2 : 1
    };

    this.registerService.registrarUsuario(formData).subscribe({
      next: () => {
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);

        if (err.status === 400 && err.error) {
          alert('Error de validación: ' + JSON.stringify(err.error));
        } else {
          alert('Error al registrar');
        }
      }
    });
  }
}
