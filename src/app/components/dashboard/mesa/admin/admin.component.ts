import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MesasService } from 'src/app/services/mesas.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { MesaData, MesaNuevaComponent } from '../mesa.nueva/mesa.nueva.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
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
export class AdminComponent implements OnInit {
  mesas: any[] = [];
  userId: number | null = null;

  constructor(
    private mesaService: MesasService,
    private pedidoService: PedidosService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userId = this.getUserIdFromLocalStorage();
    this.loadMesas();
    this.setupMesaActualizadaSubscription();
  }

  getUserIdFromLocalStorage(): number | null {
    const userIdString = localStorage.getItem('id');
    return userIdString ? +userIdString : null;
  }

  loadMesas(): void {
    this.mesaService.getMesas().subscribe((data) => {
      this.mesas = data;
    });
  }

  setupMesaActualizadaSubscription(): void {
    this.mesaService.mesaActualizada$.subscribe((datosActualizados: MesaData) => {
      console.log('Mesa actualizada:', datosActualizados);
      this.actualizarMesaEnLista(datosActualizados);
    });
  }

  actualizarMesaEnLista(mesaActualizada: MesaData): void {
    const mesaIndex = this.mesas.findIndex(
      (mesa) => mesa.id_mesa === mesaActualizada.id_mesa
    );
    if (mesaIndex !== -1) {
      this.mesas[mesaIndex] = mesaActualizada;
    }
  }

  crearPedido(userId: number | null, mesa: any): void {
    if (userId === null) {
      console.error('El userId no está definido');
      return;
    }

    this.pedidoService.createPedido(userId, mesa.id_mesa).subscribe(() => {
      this.mostrarSnackbarRuta('Pedido creado con éxito');
    });
  }

  getBackgroundColorByEstado(estado: string): string {
    switch (estado) {
      case 'Disponible':
        return 'green';
      case 'Desactivada':
        return 'red';
      case 'Ocupada':
        return 'orange';
      default:
        return 'gray';
    }
  }

  mostrarSnackbarRuta(mensaje: string): void {
    const snackBarRef = this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['dashboard/pedidos']);
    });
  }

  mostrarSnackbar(mensaje: string): void {
    const snackBarRef = this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      window.location.reload();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MesaNuevaComponent, {
      data: { num_mesa: 0, capacidad: 0, estado: '' },
    });
    dialogRef.afterClosed().subscribe((result: MesaData | undefined) => {
      if (result) {
        console.log('Mesa creada:', result);
        this.mesaService.createMesa(result).subscribe((response) => {
          if (response) {
            console.log('Mesa creada con éxito:', response);
            this.mostrarSnackbar('Se actualizará para ver los cambios');
          } else {
            console.error('Error al crear la mesa.');
          }
        });
      } else {
        console.log('El diálogo se cerró sin crear una mesa');
      }
    });
  }

  abrirDialogoEdicion(mesa: any): void {
    console.log('Editando', mesa);
    const dialogRef = this.dialog.open(MesaNuevaComponent, {
      data: { ...mesa },
    });

    dialogRef.componentInstance.mesaActualizada.subscribe((datosActualizados: MesaData) => {
      console.log('datos:', datosActualizados);
      this.actualizarMesaEnLista(datosActualizados);
    });

    dialogRef.afterClosed().subscribe((result: MesaData | undefined) => {
      if (!result) {
        console.log('El diálogo de edición se cerró sin guardar cambios');
      }
    });
  }
}
