import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  mesa: string;
  num_pedido: number;
  capacidad: number;
  estado: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {num_pedido: 1, mesa: 'Mesa 1', capacidad: 4, estado: 'Ocupado'},
  {num_pedido: 2, mesa: 'Mesa 2', capacidad: 4, estado: 'Ocupado'},
  {num_pedido: 3, mesa: 'Mesa 3', capacidad: 6, estado: 'Ocupado'},
  {num_pedido: 4, mesa: 'Mesa 4', capacidad: 2, estado: 'Ocupado'},
  {num_pedido: 5, mesa: 'Mesa 5', capacidad: 4, estado: 'Ocupado'},
  {num_pedido: 6, mesa: 'Mesa 6', capacidad: 4, estado: 'Ocupado'},
  {num_pedido: 7, mesa: 'Mesa 7', capacidad: 6, estado: 'Ocupado'},
  {num_pedido: 8, mesa: 'Mesa 8', capacidad: 2, estado: 'Ocupado'},
  {num_pedido: 9, mesa: 'Mesa 9', capacidad: 4, estado: 'Ocupado'},
  {num_pedido: 10, mesa: 'Mesa 10', capacidad: 4, estado: 'Ocupado'},
];
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  displayedColumns: string[] = ['num_pedido', 'mesa', 'capacidad', 'estado'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;

  constructor(private snackBar: MatSnackBar) {}

  addData() {
    if (this.dataSource.length >= 10) {
      this.snackBar.open('No se pueden agregar más mesas.', 'Cerrar', {
        duration: 3000, // Duración de la alerta en milisegundos
      });
    } else {
      const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
      this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
      this.table.renderRows();
    }
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }
}
