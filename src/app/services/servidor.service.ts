import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  private producto = 'http://localhost:8080/producto';
  private pedido = 'http://localhost:8080/pedido';
  private mesa = 'http://localhost:8080/mesa';

  constructor(private http: HttpClient) { }

  getDatos(): Observable<any[]> {
    return this.http.get<any[]>(this.pedido);
  }

  getMesas(): Observable<any[]> {
    return this.http.get<any[]>(this.mesa);
  }

  getProducto(): Observable<any[]> {
    return this.http.get<any[]>(this.producto);
  }
}
