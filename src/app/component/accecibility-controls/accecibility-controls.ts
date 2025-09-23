import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccecibilityService } from '../../services/accecibility-service';

@Component({
  selector: 'app-accecibility-controls',
  imports: [CommonModule],
  templateUrl: './accecibility-controls.html',
  styleUrl: './accecibility-controls.css',
})
export class AccecibilityControls {
  constructor(private accesibilityService: AccecibilityService) {}
  menuAbierto = false;

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  aumentarFuente() {
    this.accesibilityService.aumentarFuente();
  }

  disminuirFuente() {
    this.accesibilityService.disminuirFuente();
  }

  estadoContraste() {
    this.accesibilityService.toggleContraste();
  }
}
