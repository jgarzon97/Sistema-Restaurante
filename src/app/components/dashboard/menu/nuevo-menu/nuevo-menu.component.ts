import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServidorService } from 'src/app/services/servidor.service';

@Component({
  selector: 'app-nuevo-menu',
  templateUrl: './nuevo-menu.component.html',
  styleUrls: ['./nuevo-menu.component.css']
})
export class NuevoMenuComponent {

  // Variable para almacenar las categorías
  categories: any[] = [];

  constructor(private servidorService: ServidorService, private router: Router) {}

  ngOnInit(): void {
    this.servidorService.getCategoria().subscribe(
      (data) => {
        console.log('Mostrar los datos', data);
      },
      (error) => {
        console.error('Error al cargar los datos', error);
      }
    );
  }

}
