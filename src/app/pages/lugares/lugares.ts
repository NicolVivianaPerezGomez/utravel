import { Component, OnInit } from '@angular/core';
import { LugaresApi } from '../../services/lugares-api';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-lugares',
  imports: [CommonModule],
  templateUrl: './lugares.html',
  styleUrls: ['./lugares.css'],
})
export class Lugares implements OnInit {
  lugares: any[] = [];

  constructor(private lugaresApi: LugaresApi) {}

  ngOnInit(): void {
    this.cargarLugares();
  }

  cargarLugares() {
    this.lugaresApi.getLugares().subscribe({
      next: (data) => {
        console.log("Datos de la API:", data);

        // Adaptar los datos a los card
        this.lugares = data.map((l: any) => ({
          lug_id: l.lug_id,
          lug_nombre: l.lug_nombre,
          lug_descripcion: l.lug_descripcion,
          lug_ubicacion: l.lug_ubicacion,
          lug_latitud: l.lug_latitud,
          lug_longitud: l.lug_longitud,
          categoria: l.categoria,
          ciudad: l.ciudad,
          imagen_url: l.lug_imagen || 'assets/default.jpg',
        }));
      },
      error: (err) => console.error("Error cargando lugares:", err)
    });
  }
}
