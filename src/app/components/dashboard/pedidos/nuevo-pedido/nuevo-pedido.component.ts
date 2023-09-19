import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServidorService } from 'src/app/services/servidor.service';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.css']
})
export class NuevoPedidoComponent {

  mesas: any[] = [];
  selectedMesa: any;

  clientes: any[] = [];
  selectedCliente: any;

  constructor(private servidorService: ServidorService, private router: Router) {}

  ngOnInit(): void {
    // Cargar la lista de mesas
    this.servidorService.getMesas().subscribe(
      (data: any[]) => {
        console.log(data);
        this.mesas = data;
      },
      (error) => {
        console.error('Error al obtener mesas:', error);
      }
    );

    // Cargar la lista de clientes
    this.servidorService.getClientes().subscribe(
      (data: any[]) => {
        console.log(data);
        this.clientes = data;
      },
      (error) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }
}
