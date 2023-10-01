import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

export interface estados {
  estado: string;
}

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

  myControl = new FormControl<string | estados>('');
  options: estados[] = [{estado: 'Activo'}, {estado: 'Inactivo'}];
  filteredOptions!: Observable<estados[]>;

  formData = {
    user_usuario: '',
    pass_usuario: '',
    nombre_user: '',
    apellido_user: '',
    id_rol: '',
    estado: ''
  };

  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const estado = typeof value === 'string' ? value : value?.estado;
        return estado ? this._filter(estado as string) : this.options.slice();
      }),
    );
  }

  submitForm() {
    if (this.formData.user_usuario && this.formData.pass_usuario && this.formData.nombre_user &&
      this.formData.apellido_user && this.formData.id_rol && this.myControl.value) {
      const clienteData = {
        user_usuario: this.formData.user_usuario,
        pass_usuario: this.formData.pass_usuario,
        nombre_user: this.formData.nombre_user,
        apellido_user: this.formData.apellido_user,
        id_rol: this.formData.id_rol,
        estado: this.myControl.value
      };
      console.log(clienteData);
      this.loginService.createUsuario(clienteData).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          this.mostrarSnackbar(`Usuario ingresado al sistema.`);
        },
        (error) => {
          this.mostrarSnackbar(`Ha ocurrido un error en el ingreso.`);
        }
      );
    } else {
      this.mostrarSnackbarError('Completa todos los campos antes de crear un Usuario');
    }
  }

  displayFn(estado: estados): string {
    return estado ? estado.estado : '';
  }

  private _filter(estado: string): estados[] {
    const filterValue = estado.toLowerCase();

    return this.options.filter(option => option.estado.toLowerCase().includes(filterValue));
  }

  private mostrarSnackbar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }

  private mostrarSnackbarError(mensaje: string): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
