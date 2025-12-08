import { Component, OnInit } from '@angular/core';
import { CiudadesApi } from '../../services/ciudades-api';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lugares',
  imports: [CommonModule, RouterLink],
  templateUrl: './lugares.html',
  styleUrl: './lugares.css',
})
export class Lugares implements OnInit {

  ngOnInit(): void {
  }

}
