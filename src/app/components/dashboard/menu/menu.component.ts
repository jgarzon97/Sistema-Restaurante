import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Platos } from 'src/app/interfaces/platos';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {

  list_platos: Platos[] = [
    {
      nombre: 'Lasagna',
      descripcion: 'Deliciosa lasaña de carne y queso',
      precio: 12.99,
      preparacion: 'Hornear la lasaña durante 30 minutos a 180°C.'
    },
    {
      nombre: 'Ensalada de César',
      descripcion: 'Ensalada fresca con lechuga romana y aderezo César',
      precio: 7.5,
      preparacion: 'Mezclar la lechuga con el aderezo y añadir crotones de pan.'
    },
    {
      nombre: 'Sushi de salmón',
      descripcion: 'Rolls de sushi rellenos de salmón fresco',
      precio: 15.5,
      preparacion: 'Preparar el arroz de sushi, envolver en algas nori y rellenar con salmón.'
    },
    {
      nombre: 'Pizza Margherita',
      descripcion: 'Pizza clásica con tomate, mozzarella y albahaca',
      precio: 10.0,
      preparacion: 'Extender la masa, agregar salsa de tomate, queso mozzarella y albahaca fresca.'
    },
    {
      nombre: 'Tarta de manzana',
      descripcion: 'Tarta dulce rellena de manzanas y canela',
      precio: 8.75,
      preparacion: 'Pelar y cortar las manzanas, colocarlas sobre la masa y espolvorear con canela.'
    },
    {
      nombre: 'Tacos de pescado',
      descripcion: 'Tacos rellenos de pescado empanizado y salsa de aguacate',
      precio: 9.0,
      preparacion: 'Empanizar el pescado, freírlo y servirlo en tortillas con salsa de aguacate.'
    },
    {
      nombre: 'Risotto de champiñones',
      descripcion: 'Risotto cremoso con champiñones y parmesano',
      precio: 11.5,
      preparacion: 'Saltear los champiñones, agregar arroz y caldo, cocinar hasta que esté cremoso.'
    },
    {
      nombre: 'Tarta de chocolate',
      descripcion: 'Tarta de chocolate negro con ganache',
      precio: 8.99,
      preparacion: 'Hacer la masa, hornearla y cubrirla con ganache de chocolate.'
    },
    {
      nombre: 'Hummus',
      descripcion: 'Dip de garbanzos con tahini y aceite de oliva',
      precio: 5.0,
      preparacion: 'Mezclar garbanzos cocidos, tahini, aceite de oliva y especias en una licuadora.'
    },
    {
      nombre: 'Hamburguesa con queso',
      descripcion: 'Hamburguesa jugosa con queso cheddar',
      precio: 5.99,
      preparacion: 'Asar la carne, fundir el queso y servir en un pan.'
    },
    {
      nombre: 'Hot Dog con cebolla',
      descripcion: 'Hot dog con cebolla caramelizada',
      precio: 4.5,
      preparacion: 'Cocinar la salchicha y caramelizar la cebolla, luego ensamblar.'
    },
    {
      nombre: 'Papas fritas crujientes',
      descripcion: 'Papas fritas doradas y crujientes',
      precio: 3.99,
      preparacion: 'Cortar las papas, freírlas en aceite caliente y sazonar con sal.'
    },
    {
      nombre: 'Tacos de carne molida',
      descripcion: 'Tacos rellenos de carne molida y salsa picante',
      precio: 6.25,
      preparacion: 'Saltear la carne molida, agregar la salsa picante y servir en tortillas.'
    },
    {
      nombre: 'Pizza Pepperoni',
      descripcion: 'Pizza con abundantes rodajas de pepperoni',
      precio: 10.75,
      preparacion: 'Extender la masa, agregar salsa de tomate y pepperoni, hornear hasta que esté dorado.'
    }
  ];

  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'preparacion'];
  dataSource = new MatTableDataSource(this.list_platos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
