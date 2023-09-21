import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosServiceService {

  private apiUrl = 'http://localhost:3000'; // La URL base del servidor Express

  constructor(private http: HttpClient) { }

  // METODOS PARA LAS TABLAS Pedido y Pedido_Producto

  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pedidos`);
  }

  getPedido(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pedido/${id}`);
  }

  createPedido(pedidoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pedido`, pedidoData);
  }

  updatePedido(id: number, pedidoData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pedido/${id}`, pedidoData);
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/pedido/${id}`);
  }

  getPedido_Producto(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pedidoProductos`);
  }

  getPedido_Productos(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pedidoProducto/${id}`);
  }

  createPedido_Producto(pedidoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pedidoProducto`, pedidoData);
  }

  updatePedido_Producto(id: number, pedidoData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pedidoProducto/${id}`, pedidoData);
  }

  deletePedido_Producto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/pedidoProducto/${id}`);
  }
}
