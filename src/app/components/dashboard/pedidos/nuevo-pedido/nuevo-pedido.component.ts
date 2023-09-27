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

  formData = {
    id_usuario: '',
    id_mesa: ''
  };


  constructor(private servidorService: ServidorService, private _snackBar: MatSnackBar, private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const idUsuarioLocalStorage = localStorage.getItem('id');
    if (idUsuarioLocalStorage) {
      this.formData.id_usuario = idUsuarioLocalStorage;
    }
    this.actualizarListaMesas();
}


  submitForm() {
    if (this.formData.id_mesa) {
      const pedidoData = {
        id_usuario: this.formData.id_usuario,
        id_mesa: this.formData.id_mesa
      };

      this.servidorService.crearPedido(pedidoData).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          this.mostrarSnackbarExito(`El Pedido ha sido ingresado correctamente.`);
          this.actualizarListaMesas();
        },
        (error) => {
          console.error('Error al enviar el pedido:', error);
        }
      );
    }
  }

  private mostrarSnackbarExito(mensaje: string): void {
    this._snackBar.open(mensaje, undefined, {
      duration: 3000,
    });
  }

  private actualizarListaMesas(): void {
    this.servidorService.getMesaEstado().subscribe(
      (data: any[]) => {
        console.log(data);
        this.mesas = data;
      },
      (error) => {
        console.error('Error al obtener mesas:', error);
      }
    );
  }
}
