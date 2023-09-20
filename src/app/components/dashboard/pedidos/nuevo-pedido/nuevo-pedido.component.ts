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

  numeroPedido: string | undefined;
  usuario: string | undefined;

  constructor(private servidorService: ServidorService, private router: Router) { }

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

  actualizarMesasDisponibles() {
    this.servidorService.getMesas().subscribe(
      (data: any[]) => {
        console.log(data);
        this.mesas = data;
      },
      (error) => {
        console.error('Error al obtener mesas:', error);
      }
    );
  }

  enviarPedido() {
    if (this.numeroPedido && this.usuario && this.selectedMesa && this.selectedCliente) {
      const pedidoData = {
        numeroPedido: this.numeroPedido,
        usuario: this.usuario,
        mesa: this.selectedMesa,
        cliente: this.selectedCliente,
      };

      this.servidorService.crearPedido(pedidoData).subscribe(
        (response) => {
          // Maneja la respuesta del servidor aquí.
          console.log('Respuesta del servidor:', response);
        },
        (error) => {
          // Maneja los errores aquí, muestra detalles del error.
          console.error('Error al enviar el pedido:', error);
        }
      );
    } else {
      // Muestra un mensaje de error o una notificación al usuario para que complete todos los campos.
      console.error('Completa todos los campos antes de enviar el pedido.');
    }
  }
}
