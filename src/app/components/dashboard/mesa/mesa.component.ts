import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MesasService } from 'src/app/services/mesas.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css'],
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


export class MesaComponent {

  constructor(
    private mesaService: MesasService,
    private pedidoService: PedidosService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  mesas: any[] = [];
  dataSource: any[] = [];
  userId: number | null = null;

  ngOnInit(): void {
    const userIdString = localStorage.getItem('id');
    if (userIdString) {
      this.userId = Number(userIdString); // Convierte el userId a número si existe
    } else {
      console.error('No se encontró el userId en el localStorage');
    }
    this.mesaService.getMesas().subscribe(data => {
      this.mesas = data;
    });
    this.mesaService.obtenerNuevaMesaSubject().subscribe(nuevaMesa => {
      this.mesas.push(nuevaMesa);
    });
  }

  // Función para crear un pedido apartir de la selección de una mesa
  crearPedido(userId: number | null, mesa: any): void {
    if (userId !== null) {
      this.pedidoService.createPedido(userId, mesa.id_mesa).subscribe(response => {
        this.mostrarSnackbar(`Pedido creado con éxito`);
      });
    } else {
      console.error('El userId no está definido');
    }
  }

  // Función para crear una nueva mesa
  crearMesa() {
    const nuevaMesaData = {
    };
    this.mesaService.createMesa(nuevaMesaData).subscribe(response => {
      this.mostrarSnackbar(`Nueva mesa en el sistema`);
    });
  }

  getBackgroundColorByEstado(estado: string): string {
    return estado === 'Ocupada' ? 'red' : 'green';
  }

  private mostrarSnackbar(mensaje: string): void {
    const snackBarRef = this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['dashboard/pedidos']);
    });
  }

}
