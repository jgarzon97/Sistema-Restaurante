import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000'; // La URL base del Servidor Express

  getUsuario(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario/${id}`);
  }

  getUsuarioNombres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarioNombres`);
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  createUsuario(usuarioData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuario`, usuarioData);
  }

  authUsuario(user_usuario: string, pass_usuario: string): Observable<any> {
    const body = { user_usuario, pass_usuario };
    return this.http.post(`${this.apiUrl}/auth`, body);
  }
}
