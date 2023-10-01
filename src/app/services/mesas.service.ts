import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  private apiUrl = 'http://localhost:3000'; // La URL base del servidor Express
  private nuevaMesaSubject = new Subject<any>(); // Subject para las nuevas mesas

  constructor(private http: HttpClient) { }

  getMesas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mesas`);
  }

  getMesaEstado(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mesasDisponible`);
  }

  createMesa(mesaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mesa`, mesaData)
      .pipe(
        tap((nuevaMesa) => {
          this.nuevaMesaSubject.next(nuevaMesa);
        })
      );
  }

  // Método para obtener el Subject de nuevas mesas
  obtenerNuevaMesaSubject(): Subject<any> {
    return this.nuevaMesaSubject;
  }

  updateMesa(id: number, mesaData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/mesa/${id}`, mesaData);
  }

  deleteMesa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/mesa/${id}`);
  }
}