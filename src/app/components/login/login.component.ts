import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login.service.service';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  form: FormGroup;
  loading = false;

  constructor(private loginService: LoginServiceService, private route: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  Ingresar() {
    if (this.form.valid) {
      const user_usuario = this.form.value.usuario;
      const pass_usuario = this.form.value.password;

      const url = 'http://localhost:3000/iniciarSesion';
      const datosIngreso = {
        user_usuario: user_usuario,
        pass_usuario: pass_usuario
      };

      axios.post(url, datosIngreso)
        .then((response) => {
          // Verifica si el estado es "Activo"
          if (response.data.estado === 'Activo') {
            // Almacena en el local storage, maneja la respuesta y Autenticación exitosa
            localStorage.setItem('rol', response.data.id_rol);
            localStorage.setItem('id', response.data.id_usuario);
            localStorage.setItem('estado', response.data.estado);
            localStorage.setItem('nombre_user', response.data.nombre_user);
            localStorage.setItem('apellido_user', response.data.apellido_user);
            this.fakeloading();
            console.log('Ingreso exitoso');
          } else {
            // El usuario no está "Activo", muestra un mensaje de error y reinicia el formulario
            this.inactivo();
            this.form.reset();
          }
        })
        .catch((error) => {
          // Maneja el error, muestra un mensaje de error y reinicia el formulario
          this.error();
          this.form.reset();
        });
    }
  }

  error() {
    this._snackBar.open('Usuario o contraseña inválidos', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  inactivo() {
    this._snackBar.open('El usuario no se encuentra Activado', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  fakeloading() {
    // Creara una pantalla de carga
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard/inicio']);
    }, 1500);
  }
}