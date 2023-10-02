import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-factura',
  templateUrl: './ver-factura.component.html',
  styleUrls: ['./ver-factura.component.css']
})

export class VerFacturaComponent {
  factura: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { factura: any }) {
    this.factura = data.factura;
    console.log(data);
  }
}
