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
  selectedCategoria: any;

  constructor(private servidorService: ServidorService, private router: Router) {}

  ngOnInit(): void {
    this.servidorService.getCategorias().subscribe(
      (data: any[]) => {
        console.log(data);
        this.categories = data;
      },
      (error) => {
        console.error('Error al obtener mesas:', error);
      }
    );
  }

}
