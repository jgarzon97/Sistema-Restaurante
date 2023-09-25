import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { PagosService } from 'src/app/services/pagos.service';

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

  displayedColumns: string[] = ['id_factura', 'numero', 'fecha', 'total', 'estado_de_pago', 'id_pedido', 'id_cliente'];
  dataSource: any[] = [];

  constructor(private servidor: PagosService) {}

  ngOnInit(): void {
    this.servidor.getFacturas().subscribe(data => {
      this.dataSource = data;
    });
  }

}
