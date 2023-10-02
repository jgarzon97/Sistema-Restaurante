import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PagosService } from 'src/app/services/pagos.service';
import { VerFacturaComponent } from './ver-factura/ver-factura.component';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
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
export class PagoComponent {

  displayedColumns: string[] = ['id_factura', 'fecha', 'estado_de_pago', 'id_pedido', 'nombre', 'apellido', 'acciones'];
  dataSource: any[] = [];

  constructor(private servicio: PagosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.servicio.getFacturas().subscribe(data => {
      this.dataSource = data;
    });
  }

  verFactura(id_factura: number) {
    // Llamamos a tu servicio para obtener los detalles de la factura por su ID
    this.servicio.getFactura(id_factura).subscribe(factura => {
      const dialogRef = this.dialog.open(VerFacturaComponent, {
        data: { factura } // Pasamos los detalles de la factura como datos al diálogo
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }

}
