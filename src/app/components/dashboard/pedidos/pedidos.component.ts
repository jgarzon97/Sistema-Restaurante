import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { PedidosServiceService } from 'src/app/services/pedidos.service.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  displayedColumns: string[] = ['id_pedido', 'fecha', 'hora', 'id_usuario', 'id_mesa', 'estado', 'acciones'];
  dataSource: any[] = [];

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private servidor: PedidosServiceService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.servidor.getPedidos().subscribe(data => {
      console.log(data);
      this.dataSource = data;
    });
  }

  borrarPedido(id: number): void {
    this.servidor.deletePedido(id).subscribe((resultado) => {
      this.mostrarSnackbarExito(`El Pedido ${id} ha sido borrado.`);
      this.actualizarListaPedidos();
    });
  }

  editarPedido(id: number, nuevosDatos: any): void {
    this.servidor.updatePedido(id, nuevosDatos).subscribe((resultado) => {
      console.log(`Pedido con ID ${id} ha sido editado con nuevos datos: `, nuevosDatos);
    });
  }

  private mostrarSnackbarExito(mensaje: string): void {
    this._snackBar.open(mensaje, undefined, {
      duration: 1000,
    });
  }

  private actualizarListaPedidos(): void {
    this.servidor.getPedidos().subscribe((data) => {
      this.dataSource = data;
    });
  }
}
