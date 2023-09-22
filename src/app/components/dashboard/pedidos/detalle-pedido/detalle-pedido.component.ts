import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosServiceService } from 'src/app/services/pedidos.service.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})

export class DetallePedidoComponent {

  mesas: any[] = [];
  selectedMesa: any;

  formData = {
    id_pedido: '',
    id_producto: '',
    cantidad: ''
  };

  constructor(private servidorService: PedidosServiceService, private activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.formData.id_pedido = params['id_pedido'];
    });
  }

  submitForm() {
    if (this.formData.id_pedido && this.formData.id_producto && this.formData.cantidad) {
      const pedidoProductoData = {
        id_pedido: this.formData.id_pedido,
        id_producto: this.formData.id_producto,
        cantidad: this.formData.cantidad
      };
  
      this.servidorService.createPedido_Producto(pedidoProductoData).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          this.router.navigate(['/dashboard/pedido']);
          this.mostrarSnackbarExito(`Los detalles se ingresaron correctamente.`);
        },
        (error) => {
          console.error('Error al enviar los detalles del pedido:', error);
        }
      );
    } else {
      this.mostrarSnackbarError('Completa todos los campos antes de enviar los detalles del pedido.');
    }
  }
  
  private mostrarSnackbarExito(mensaje: string): void {
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
  
}
