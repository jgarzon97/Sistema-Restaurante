import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ServidorService } from 'src/app/services/servidor.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  displayedColumns: string[] = ['num_pedido', 'fecha', 'hora', 'id_usuario', 'id_mesa', 'id_cliente'];
  dataSource: any[] = [];

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private servidor: ServidorService) {}

  ngOnInit(): void {
    this.servidor.getPedidos().subscribe(data => {
      console.log(data);
      this.dataSource = data;
    });
  }
}
