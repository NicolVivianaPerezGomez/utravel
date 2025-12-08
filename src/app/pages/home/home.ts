import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LugaresApi } from '../../services/lugares-api';
import { CiudadesApi } from '../../services/ciudades-api';

@Component({
  selector: 'app-home',
  standalone: true, // 
  imports: [CommonModule], // 
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  ciudades: any[] = [];

  constructor(private ciudadesApi: CiudadesApi) {}

  
  //Listar ciudades
  listCiudades() {

    this.ciudadesApi.getCiudades().subscribe(data => {
      this.ciudades = this.ciudades;
    })
    
  }

  //método que renderiza
  ngOnInit(): void {
    this.llenarCiudades()
  }
}
