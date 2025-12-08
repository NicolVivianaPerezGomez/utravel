import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


//CIUDADES 
@Injectable({
  providedIn: 'root',
})
export class CiudadesApi {
  private urlApiCiudades = 'http://127.0.0.1:8000/ciudades/';

  constructor(private htttp: HttpClient) {}

  public getData(): Observable<any> {
    return this.htttp.get<any>(this.urlApiCiudades);
  }
}
