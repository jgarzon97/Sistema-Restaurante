import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  private apiUrl = 'http://localhost:3000'; // La URL base de tu servidor Express

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pedidos`);
  }

  crearPedido(pedidoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pedido`, pedidoData);
  }

  getMesas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mesas`);
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  crearUsuario(usuarioData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuario`, usuarioData);
  }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }

  crearProducto(productoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/producto`, productoData);
  }

  crearFactura(facturaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/factura`, facturaData);
  }

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clientes`);
  }
}
