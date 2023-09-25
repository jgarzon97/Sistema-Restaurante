import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {

  displayedColumns: string[] = ['id_factura', 'numero', 'fecha', 'total', 'estado_de_pago', 'id_pedido', 'id_cliente'];
  dataSource: any[] = [];

  constructor(private servidor: PagosService) {}

  ngOnInit(): void {
    this.servidor.getFacturas().subscribe(data => {
      this.dataSource = data;
    });
  }

}
