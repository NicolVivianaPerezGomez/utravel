import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        nombre: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
        ],
        apellido: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        usuario: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{4,15}$/)],
        ],
        contraseña: [
          '',
          [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)],
        ],
        confirmacion: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('contraseña')?.value;
    const confirm = form.get('confirmacion')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);

    if (control?.hasError('required')) {
      return `El campo ${controlName} es obligatorio`;
    }

    if (control?.hasError('pattern')) {
      switch (controlName) {
        case 'nombre':
          return 'Ingrese un nombre válido (solo letras y espacios)';
        case 'apellido':
          return 'Ingrese un apellido válido (solo letras)';
        case 'usuario':
          return 'El usuario debe tener 4-15 caracteres (solo letras y números)';
        case 'contraseña':
          return 'La contraseña debe tener al menos 8 caracteres, incluir mayúscula, número y símbolo';
      }
    }

    if (control?.hasError('email')) {
      return 'Ingrese un correo válido (ej: correo@dominio.com)';
    }

    if (
      controlName === 'confirmacion' &&
      this.registerForm.hasError('passwordMismatch')
    ) {
      return 'Las contraseñas no coinciden';
    }

    return '';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Datos correctos', this.registerForm.value);
      alert('Registro exitoso');
    } else {
      console.log('Formulario inválido');
      this.registerForm.markAllAsTouched();
      alert('Por favor revisa los campos en rojo');
    }
  }
}
