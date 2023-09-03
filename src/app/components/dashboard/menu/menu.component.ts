import { Component } from '@angular/core';
import { Platos } from 'src/app/interfaces/platos';

const list_platos: Platos[] = [

];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'preparacion', 'imagen'];
  dataSource = list_platos;
}
