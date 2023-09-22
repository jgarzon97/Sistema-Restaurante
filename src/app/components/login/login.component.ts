import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading = false;

  constructor(private loginService: LoginServiceService, private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  Ingresar() {
    if (this.form.invalid) {
      return;
    }

    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    this.loading = true;

    this.loginService.authUsuario(usuario, password).subscribe(
      (response) => {
        console.log(response);
        this.loading = false;
        this.bienvenido();
        this.fakeloading();
      },
      (error) => {
        console.error(error);
        this.loading = false;
        this.error();
        this.form.reset();
      }
    );
  }

  bienvenido() {
    this._snackBar.open('Bienvenido al sistema', undefined, {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  error() {
    this._snackBar.open('Usuario o contraseña inválidos', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  fakeloading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard'])
    }, 1500);
  }
}