import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PedidosServiceService } from 'src/app/services/pedidos.service.service';
import { ServidorService } from 'src/app/services/servidor.service';


@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})

export class DetallePedidoComponent {

  productos: Observable<any[]> = this.servidorService.getProductos();

  formData = {
    id_pedido: '',
    id_producto: '',
    cantidad: '',
    detalle: ''
  };

  constructor(private pedidoservidorService: PedidosServiceService, private servidorService: ServidorService, private activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.formData.id_pedido = params['id_pedido'];
    });

    this.cargarProductos();
  }

  submitForm() {
    if (this.formData.id_pedido && this.formData.id_producto && this.formData.cantidad) {
      const pedidoProductoData = {
        id_pedido: this.formData.id_pedido,
        id_producto: this.formData.id_producto,
        cantidad: this.formData.cantidad,
        detalle: this.formData.detalle
      };

      this.pedidoservidorService.createPedido_Producto(pedidoProductoData).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          this.mostrarSnackbar(`Los detalles se ingresaron correctamente.`);
        },
        (error) => {
          this.mostrarSnackbar(`Ha ocurrido un error en el ingreso.`);
        }
      );
    } else {
      this.mostrarSnackbarError('Completa todos los campos antes de enviar los detalles del pedido.');
    }
  }

  cargarProductos() {
    this.productos = this.servidorService.getProductos();
  }

  buscarProducto() {
    const productoIdString = this.formData.id_producto;
    const productoId = parseInt(productoIdString, 10);
  
    if (!isNaN(productoId)) {
      this.servidorService.getProducto(productoId).subscribe(
        (producto) => {
          
        },
        (error) => {
          console.error('Error al obtener el producto:', error);
        }
      );
    } else {
      console.error('El valor de productoId no es un número válido.');
    }
  }
  


  private mostrarSnackbar(mensaje: string): void {
    this._snackBar.open(mensaje, undefined, {
      duration: 3000,
    });
  }

  private mostrarSnackbarError(mensaje: string): void {
    this._snackBar.open(mensaje, undefined, {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  displayFn(producto: any): string {
    return producto ? producto.nombre : '';
  }
}
