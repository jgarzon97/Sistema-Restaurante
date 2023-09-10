import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rutas } from '../interfaces/rutas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(private http: HttpClient) { }

  geRoutes(): Observable<Rutas[]> {
    return this.http.get<Rutas[]>("./assets/data/routes.navbar.json")
  }

}
