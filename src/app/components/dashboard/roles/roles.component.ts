import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
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
export class RolesComponent {

  displayedColumns: string[] = ['id_usuario', 'user_usuario', 'nombre_user', 'apellido_user', 'tipo_rol', 'estado'];
  dataSource: any[] = [];

  constructor(private snackBar: MatSnackBar, private usuarios: UsuariosService) { }

  ngOnInit(): void {
    this.usuarios.getUsuarios().subscribe(data => {
      console.log(data);
      this.dataSource = data;
    });
  }
}
