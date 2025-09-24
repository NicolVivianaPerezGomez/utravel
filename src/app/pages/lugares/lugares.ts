import { Component, OnInit } from '@angular/core';
import { CiudadesApi } from '../../services/ciudades-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lugares',
  imports: [CommonModule],
  templateUrl: './lugares.html',
  styleUrl: './lugares.css',
})
export class Lugares implements OnInit {
  data: any[] = [];
  ciudadSeleccionada: any = null;

  // lista de imágenes
  imagenCard: string[] = [
    '/col-1.jpg',
    '/col-2.webp',
    '/col-3.jpeg',
    '/col-4.jpg',
    '/col-5.jpg',
    '/col-6.jpg',
    '/col-8.jpeg',
    '/col-9.jpeg',
    '/col-10.jpg',
  ];

  // pool dinámico que se va vaciando
  private imagenesDisponibles: string[] = [];

  constructor(private ciudadesApi: CiudadesApi) {}

  
  ngOnInit(): void {
    this.llenarData();
  }

  //método de llenar datos de las cards
  llenarData() {
    this.ciudadesApi.getDATA().subscribe((data: any[]) => {
      this.data = data
        .filter((city) => city.description && city.description.trim() !== '') 
        .slice(0, 10) // limitar a 10
        .map((city) => ({
          ...city,
          image: this.obtenerImagen(), 
        }));

      console.log(this.data);
    });
  }

  // método para entregar una imagen random sin repetición inmediata
  obtenerImagen(): string {
    if (this.imagenesDisponibles.length === 0) {
      this.imagenesDisponibles = [...this.imagenCard];
    }

    const randomIndex = Math.floor(
      Math.random() * this.imagenesDisponibles.length
    );
    const imagenSeleccionada = this.imagenesDisponibles[randomIndex];
    this.imagenesDisponibles.splice(randomIndex, 1);

    return imagenSeleccionada;
  }

  abrirModal(ciudad: any) {
    this.ciudadSeleccionada = ciudad;
  }

  cerrarModal() {
    this.ciudadSeleccionada = null;
  }
}
