import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private apiUrl = 'http://localhost:8080/consulta';
  private apiUrl2 = 'http://localhost:8080/mesa';


  constructor(private http: HttpClient) { }

  // Obtener datos de la tabla "pedidos"
  getDatos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener datos de la tabla "mesa"
  getMesas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2);
  }
}
