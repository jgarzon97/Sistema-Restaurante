import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.css']
})
export class NuevoPedidoComponent {

  constructor(private router: Router) {}

}
