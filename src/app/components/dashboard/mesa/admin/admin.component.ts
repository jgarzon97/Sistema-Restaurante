import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MesasService } from 'src/app/services/mesas.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { MesaNuevaComponent } from '../mesa.nueva/mesa.nueva.component';

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
    public dialog: MatDialog
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

  // Función para generar mensajes personalizados
  private mostrarSnackbar(mensaje: string): void {
    const snackBarRef = this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['dashboard/pedidos']);
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
    const dialogRef = this.dialog.open(MesaNuevaComponent, {
      data: { ...mesa }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Mesa editada:', result);
      } else {
        console.log('El diálogo de edición se cerró sin guardar cambios');
      }
    });
  }
}
