import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MesasService } from 'src/app/services/mesas.service';

export interface MesaData {
  id_mesa: number;
  num_mesa: number;
  capacidad: number;
  estado: string;
}

@Component({
  selector: 'app-mesa.nueva',
  templateUrl: './mesa.nueva.component.html',
  styleUrls: ['./mesa.nueva.component.css']
})

export class MesaNuevaComponent {
  data: MesaData = { id_mesa:0, num_mesa: 0, capacidad: 0, estado: '' };
  estados: string[] = ['Disponible', 'Desactivada'];
  estadoSeleccionado: string = '';
  modoEditar!: boolean;

  constructor(
    private mesaService: MesasService,
    public dialogRef: MatDialogRef<MesaNuevaComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFromDialog: MesaData,
  ) {
    this.data = { ...dataFromDialog };
    // Comprueba si estamos en modo edición o creación
    this.modoEditar = this.data.id_mesa !== undefined;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardarMesa() {
    this.data.estado = this.estadoSeleccionado;
    if (this.modoEditar) {
      // Estamos en modo edición, llama a la función de actualización
      this.mesaService.updateMesa(this.data.id_mesa, this.data).subscribe(result => {
        console.log('Mesa editada:', result);
        this.dialogRef.close(result);
      }, error => {
        console.error('Error al editar la mesa:', error);
      });
    } else {
      this.mesaService.createMesa(this.data).subscribe(response => {
        console.log('Mesa creada con éxito', response);
        this.dialogRef.close(response);
      }, error => {
        console.error('Error al crear la mesa:', error);
      });
    }
  }

  actualizarMesa(id_mesa: number, nuevaData: any): void {
    this.mesaService.updateMesa(id_mesa, nuevaData).subscribe(
      (response) => {
        console.log('Mesa actualizada con éxito', response);
        // Aquí puedes realizar otras acciones después de una actualización exitosa, si es necesario
      },
      (error) => {
        console.error('Error al actualizar la mesa', error);
        // Maneja los errores aquí si es necesario
      }
    );
  }
}
