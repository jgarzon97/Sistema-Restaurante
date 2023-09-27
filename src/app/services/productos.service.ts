import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }

  getNombreProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nameproductos`);
  }

  getProducto(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/producto/${id}`);
  }

  createProducto(productData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/producto`, productData);
  }

  obtenerIdPorNombre(nombreProducto: string): Observable<number> {
    // Realiza una solicitud HTTP para obtener el ID del producto por nombre
    return this.http.get<number>(`${this.apiUrl}/obtenerIdPorNombre/${nombreProducto}`);
  }

}
