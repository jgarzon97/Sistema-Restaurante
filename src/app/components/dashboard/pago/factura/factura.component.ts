import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormBuilder } from '@angular/forms';
import { PagosService } from 'src/app/services/pagos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
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

export class FacturaComponent {

  idPedido!: string;

  formData = {
    id_pedido: '',
    id_cliente: ''
  }

  constructor(private pagoService: PagosService, private router: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idPedido = this.activatedRoute.snapshot.url[this.activatedRoute.snapshot.url.length - 1].path;
    if (!isNaN(+this.idPedido)) {
      console.log('ID de pedido:', this.idPedido);
      this.formData.id_pedido = this.idPedido;
    } else {
      console.error('ID de pedido no válido:', this.idPedido);
    }
  }

  submitForm() {

  }

}
