import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LugaresApi } from '../../services/lugares-api';

@Component({
  selector: 'app-home',
  standalone: true, // 
  imports: [CommonModule], // 
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  data: any[] = [];
  ciudadSeleccionada: any = null;
  mapaUrl: SafeResourceUrl | null = null; // URL segura para el iframe

  constructor(private lugares: LugaresApi, private sanitizer: DomSanitizer) {}

  mostrarLugares1magen() {
    this.lugares.getDATA().subscribe((data: any[]) => {
      this.data = data.slice(0, 20).map((item) => {
        let imageUrl = 'assets/default.png'; 
        if (item.images && item.images.length > 0) {
          imageUrl = item.images[0]; // si hay array, toma la primera
        } else if (item.image) {
          imageUrl = item.image; // si hay imagen suelta, la usa
        }

        return {
          ...item,
          image: imageUrl,
        };
      });

      console.log(this.data);
    });
  }

  abrirModal(ciudad: any) {
    this.ciudadSeleccionada = ciudad;
    const url = `https://www.google.com/maps?q=${ciudad.latitude},${ciudad.longitude}&hl=es&z=14&output=embed`;
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  cerrarModal() {
    this.ciudadSeleccionada = null;
    this.mapaUrl = null;
  }

  ngOnInit(): void {
    this.mostrarLugares1magen();
  }
}
