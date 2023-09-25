import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { PedidosServiceService } from 'src/app/services/pedidos.service.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 })),
      ]),
    ]),
  ],
})

export class PedidosComponent {
  displayedColumns: string[] = ['id_pedido', 'fecha', 'hora', 'id_usuario', 'id_mesa', 'estado', 'acciones'];
  dataSource: any[] = [];

  @ViewChild(MatTable) table!: MatTable<any>;

  formData: { id_pedido?: string } = {};

  constructor(private servidor: PedidosServiceService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.servidor.getPedidos().subscribe(data => {
      console.log(data);
      this.dataSource = data;
    });
  }

  borrarPedido(id: number): void {
    this.servidor.deletePedido(id).subscribe((resultado) => {
      this.mostrarSnackbar(`El Pedido ${id} ha sido borrado.`);
      this.actualizarListaPedidos();
    });
  }

  editarPedido(id: number, nuevosDatos: any): void {
    this.servidor.updatePedido(id, nuevosDatos).subscribe((resultado) => {
      console.log(`Pedido con ID ${id} ha sido editado con nuevos datos: `, nuevosDatos);
    });
  }

  private mostrarSnackbar(mensaje: string): void {
    this._snackBar.open(mensaje, undefined, {
      duration: 1000,
    });
  }

  private actualizarListaPedidos(): void {
    this.servidor.getPedidos().subscribe((data) => {
      this.dataSource = data;
    });
  }

  verDetallePedido(id_pedido: string): void {
    this.router.navigate(['/dashboard/detalle-pedido', id_pedido]);
  }
}
