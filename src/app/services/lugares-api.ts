import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LugaresApi {
  private urlApi = 'https://api-colombia.com/api/v1/TouristicAttraction';

  constructor(private htttp: HttpClient) {}

  public getDATA(): Observable<any[]> {
    return this.htttp.get<any[]>(this.urlApi);
  }
}
