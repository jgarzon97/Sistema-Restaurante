import { Component, EventEmitter, Inject, Output } from '@angular/core';
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
  @Output() mesaActualizada: EventEmitter<MesaData> = new EventEmitter<MesaData>();

  constructor(
    private mesaService: MesasService,
    public dialogRef: MatDialogRef<MesaData>,
    @Inject(MAT_DIALOG_DATA) public dataFromDialog: MesaData,
  ) {
    this.data = { ...dataFromDialog };
    this.modoEditar = this.data.id_mesa !== undefined;
    this.estadoSeleccionado = this.data.estado;
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

  guardarMesa(): void {
    this.data.estado = this.estadoSeleccionado;
    if (this.data.id_mesa) {
      this.mesaService.updateMesa(this.data.id_mesa, this.data).subscribe(
        (result) => {
          console.log('Mesa editada:', result);
          this.mesaActualizada.emit(this.data);
          this.dialogRef.close(result);
        },
        (error) => {
          console.error('Error al editar la mesa:', error);
        }
      );
    } else {
      this.mesaService.createMesa(this.data).subscribe(
        (response) => {
          console.log('Mesa creada con éxito', response);
          this.mesaActualizada.emit(response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error al crear la mesa:', error);
        }
      );
    }
  }
}
