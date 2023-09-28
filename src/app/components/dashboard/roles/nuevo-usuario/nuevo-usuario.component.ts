import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login.service.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
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
export class NuevoUsuarioComponent {
  displayedColumns: string[] = ['user_usuario', 'pass_usuario', 'nombre_user', 'apellido_user', 'id_rol', 'estado'];
  dataSource: any[] = [];

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor() { }

  submitForm() {

  }
}