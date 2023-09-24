import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {

  formData = {
    numero: '',
    id_producto: '',
    cantidad: '',
    detalle: ''
  };

  submitForm(){

  }
}
