import { Component } from '@angular/core';


export interface PeriodicElement {
  mesa: string;
  position: number;
  capacidad: number;
  estado: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, mesa: 'Mesa 1', capacidad: 4, estado: 'Libre'},
  {position: 2, mesa: 'Mesa 2', capacidad: 4, estado: 'Libre'},
  {position: 3, mesa: 'Mesa 3', capacidad: 6, estado: 'Libre'},
  {position: 4, mesa: 'Mesa 4', capacidad: 6, estado: 'Libre'},
  {position: 5, mesa: 'Mesa 5', capacidad: 10, estado: 'Libre'},
  {position: 6, mesa: 'Mesa 6', capacidad: 10, estado: 'Libre'},
  {position: 7, mesa: 'Mesa 7', capacidad: 4, estado: 'Libre'},
  {position: 8, mesa: 'Mesa 8', capacidad: 4, estado: 'Libre'},
  {position: 9, mesa: 'Mesa 9', capacidad: 2, estado: 'Libre'},
  {position: 10, mesa: 'Mesa 10', capacidad: 2, estado: 'Libre'},
];

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {
  displayedColumns: string[] = ['position', 'mesa', 'capacidad', 'estado'];
  dataSource = ELEMENT_DATA;
}
