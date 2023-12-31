import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Aquí va las peticiones para Pagos y Facturas
export class PagosService {

  private apiUrl = 'http://localhost:3000'; // La URL base del servidor Express

  constructor(private http: HttpClient) { }

  createFactura(facturaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/factura`, facturaData);
  }

  getFacturas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/facturas`);
  }

  getFactura(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/factura/${id}`);
  }

  updateFactura(id: number, facturaData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/factura/${id}`, facturaData);
  }

  createCliente(clientData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cliente`, clientData);
  }
}
