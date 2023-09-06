import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  displayedColumns: string[] = ['id', 'cliente', 'fecha', 'estado', 'total'];
  dataSource: any[] = [];

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private snackBar: MatSnackBar, private pruebaService: PruebaService) {}

  ngOnInit(): void {
    this.pruebaService.getDatos().subscribe(data => {
      console.log(data); // Verifica si estás recibiendo datos y su estructura
      this.dataSource = data;
    });
  }

  addData() {
  }

  removeData() {
  }
}
