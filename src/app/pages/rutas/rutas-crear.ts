import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RutasService } from '../../services/rutas-api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rutas-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rutas-crear.html',
  styleUrls: ['./rutas-crear.css']
})
export class RutasCrear {
  formulario = {
    rut_nombre: '',
    rut_descripcion: '',
    rut_duracion: ''
  };

  imagenSeleccionada: File | null = null;
  previewImagen: string | null = null;
  cargando = false;
  error: string | null = null;

  constructor(
    private rutasService: RutasService,
    private router: Router
  ) {}

  // Manejar selección de imagen
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;

      // Mostrar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImagen = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  crearRuta() {
    if (!this.formulario.rut_nombre || !this.formulario.rut_descripcion) {
      this.error = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    this.cargando = true;
    this.error = null;

    this.rutasService.crearRuta(this.formulario, this.imagenSeleccionada || undefined).subscribe({
      next: (response) => {
        console.log('Ruta creada:', response);
        alert('Ruta creada correctamente');
        this.router.navigate(['/rutas']);
      },
      error: (error) => {
        console.error('Error al crear ruta:', error);
        this.error = error.error?.rut_nombre?.[0] || 'Error al crear la ruta.';
        this.cargando = false;
      }
    });
  }

  cancelar() {
    this.router.navigate(['/rutas']);
  }
}
