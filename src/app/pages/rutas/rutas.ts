import { Component, OnInit } from '@angular/core';
import { RutasService } from '../../services/rutas-api';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rutas-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rutas.html',
  styleUrls: ['./rutas.css']
})
export class RutasList implements OnInit {
  rutas: any[] = [];
  cargando = false;
  error: string | null = null;

  constructor(private rutasService: RutasService) {}

  ngOnInit() {
    this.cargarRutas();
  }

  cargarRutas() {
    this.cargando = true;
    this.error = null;

    this.rutasService.listarRutas().subscribe({
      next: (data) => {
        this.rutas = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar rutas:', error);
        this.error = 'Error al cargar las rutas. Intenta nuevamente.';
        this.cargando = false;
      }
    });
  }

  // Obtener URL completa de la imagen para mostrar en <img>
  getImageUrl(ruta: any): string {
    if (!ruta.rut_imagen) {
      return 'assets/placeholder.png'; // imagen por defecto
    }
    return this.rutasService.getImageUrl(ruta.rut_imagen);
  }

  eliminarRuta(id: number) {
    if (confirm('¿Deseas eliminar esta ruta?')) {
      this.rutasService.eliminarRuta(id).subscribe({
        next: () => {
          this.cargarRutas(); // Recargar lista
          alert('Ruta eliminada correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          this.error = 'Error al eliminar la ruta.';
        }
      });
    }
  }

  verDetalles(id: number) {
    // Será implementado después
    alert(`Ver detalles de ruta ${id}`);
  }

  editarRuta(id: number) {
    // Será implementado después
    alert(`Editar ruta ${id}`);
  }
}
