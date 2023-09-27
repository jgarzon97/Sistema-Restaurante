import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'http://localhost:3000'; // La URL base del Servidor Express

  constructor(private http: HttpClient) { }

  // Obtener un usuario por ID
  getUsuario(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario/${id}`);
  }
  // Obtener nombres de usuarios
  getUsuarioRoles(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/usuarioRoles`);
  }

  // Obtener nombres de usuarios
  getUsuarioNombres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/usuarioNombres`);
  }

  // Obtener lista de usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  // Crear un nuevo usuario
  createUsuario(usuarioData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuario`, usuarioData);
  }

  // Autenticar un usuario
  authUsuario(user_usuario: string, pass_usuario: string): Observable<any> {
    const body = { user_usuario, pass_usuario };
    return this.http.post(`${this.apiUrl}/auth`, body);
  }
}
