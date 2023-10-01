import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
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

export class AdminComponent {

  constructor(
    private mesaService: MesasService,
    private pedidoService: PedidosService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
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
    this.mesaService.mesaActualizada$.subscribe((datosActualizados: any) => {
      console.log('Mesa actualizada:', datosActualizados);
    });
  }

  // Función para crear un pedido apartir de la selección de una mesa
  crearPedido(userId: number | null, mesa: any): void {
    if (userId !== null) {
      this.pedidoService.createPedido(userId, mesa.id_mesa).subscribe(response => {
        this.mostrarSnackbarRuta(`Pedido creado con éxito`);
      });
    } else {
      console.error('El userId no está definido');
    }
  }

  // Función para controlar el color de fondo de las mesas según su estado
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

  // Función para generar mensajes y me lleve a una ruta
  private mostrarSnackbarRuta(mensaje: string): void {
    const snackBarRef = this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['dashboard/pedidos']);
    });
  }

  // Función para generar mensajes y me lleve a una ruta
  private mostrarSnackbar(mensaje: string): void {
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
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Mesa creada:', result);
        this.mesaService.createMesa(result).subscribe(response => {
          if (response) {
            console.log('Mesa creada con éxito:', response);
            this.mostrarSnackbar(`Se actualizará para ver los cambios`);
          } else {
            console.error('Error al crear la mesa.');
          }
        });
      } else {
        console.log('El diálogo se cerró sin crear una mesa');
      }
    });
  }

  actualizarMesa(mesaActualizada: any): void {
    this.mesaService.updateMesa(mesaActualizada.id_mesa, mesaActualizada).subscribe(
      (response) => {
        console.log('Mesa actualizada con éxito', response);
      },
      (error) => {
        console.error('Error al actualizar la mesa', error);
      }
    );
  }

  abrirDialogoEdicion(mesa: any): void {
    console.log('Editando', mesa);
    const dialogRef = this.dialog.open(MesaNuevaComponent, {
      data: { ...mesa },
    });

    dialogRef.componentInstance.mesaActualizada.subscribe((datosActualizados: MesaData) => {
      console.log("datos:", datosActualizados);
      // Puedes realizar otras acciones con los datos actualizados si es necesario
    });

    dialogRef.afterClosed().subscribe((result: MesaData) => {
      if (!result) {
        console.log('El diálogo de edición se cerró sin guardar cambios');
      }
    });
  }
}
