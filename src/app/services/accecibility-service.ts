import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccecibilityService {
  private fontSize = 16; //tamaño default
  private contrast = false; //inicializacion de contraste

  constructor() {}
  //método aumentar fuente
  aumentarFuente() {
    if (this.fontSize < 24) {
      this.fontSize++; //aumentar 1
      this.aplicarFontSize(); //método que aplica el cambio
    }
  }

  //método disminuir fuente
  disminuirFuente() {
    if (this.fontSize > 12) {
      this.fontSize--; //disminuir 1
      this.aplicarFontSize();
    }
  }

  toggleContraste() {
    this.contrast = !this.contrast; //contraste true
    if (this.contrast) {
      //si es true
      document.body.classList.add('modo-contraste'); //agregar al body la class de modo contraste
    } else {
      document.body.classList.remove('modo-contraste'); //si ahora es false quitar elementos con la clase
    }
  }

  //método para aplicar el cambio
  private aplicarFontSize() {
    document.documentElement.style.fontSize = `${this.fontSize}px`; //convertir en un string valido para el cc y aplicar
    //documentElement: apunta al elemento raiz osea el html}, syle: seleccionado todos los estilos de la etiqueta y fontSize específico
  }
}
