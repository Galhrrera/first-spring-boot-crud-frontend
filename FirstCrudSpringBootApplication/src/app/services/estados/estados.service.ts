import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private API_SERVER = "http://localhost:8000/estados/"

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllEstadosByPais(id: number): Observable<any>{
    return this.httpClient.get(this.API_SERVER+id)
  }
}
