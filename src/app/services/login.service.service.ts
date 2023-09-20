import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000'; // La URL base del Servidor Express

  autenticarUsuario(user_usuario: string, pass_usuario: string): Observable<any> {
    const body = { user_usuario, pass_usuario };
    return this.http.post(`${this.apiUrl}/autenticar`, body);
  }
}
