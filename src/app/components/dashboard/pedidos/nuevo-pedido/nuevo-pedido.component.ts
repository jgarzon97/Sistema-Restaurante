import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  formData = {
    num_pedido: '',
    id_usuario: '',
    id_mesa: '',
    id_cliente: ''
  };

  constructor(private servidorService: ServidorService, private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { }

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

  submitForm() {
    if (this.formData.id_mesa && this.formData.id_cliente) {
      // Define los datos del pedido a enviar al servidor.
      const pedidoData = {
        num_pedido: this.formData.num_pedido,
        id_usuario: this.formData.id_usuario,
        id_mesa: this.formData.id_mesa,
        id_cliente: this.formData.id_cliente
      };

      // Realiza la solicitud POST al servidor.
      this.servidorService.crearPedido(pedidoData).subscribe(
        (response) => {
          // Maneja la respuesta del servidor aquí.
          console.log('Respuesta del servidor:', response);

          // Redirige a la página deseada después de un pedido exitoso.
          this.router.navigate(['/dashboard/menu']);
        },
        (error) => {
          // Maneja los errores aquí, muestra detalles del error.
          console.error('Error al enviar el pedido:', error);
        }
      );
    } else {
      // Muestra un mensaje de error o una notificación al usuario para que complete todos los campos.
      this.snackBar.open('Completa todos los campos antes de enviar el pedido.', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  mostrarSnackBar() {
    this.snackBar.open('Llene los campos', 'Cerrar', {
      duration: 3000, // Duración del Snack-bar en milisegundos (3 segundos en este caso)
    });
  }
}
