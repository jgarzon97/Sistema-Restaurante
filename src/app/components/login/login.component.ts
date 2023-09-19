import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form : FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router){
this.form = this.fb.group({
  usuario: ['', Validators.required],
  password: ['', Validators.required]
})
  }

  ngOnInit(): void {

  }

  Ingresar() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    if(usuario == 'jgarzon' && password == 'admin123'){
      // Redireccion al dashboard
      this.fakeloading();
    } else {
      // Muestra error
      this.error();
      this.form.reset();
    }
  }

  error () {
    this._snackBar.open('Usuario o contraseña inválidos', '', {
      duration : 5000,
      horizontalPosition : 'center',
      verticalPosition : 'bottom'
    })
  }

  fakeloading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard'])
    }, 1500);
  }
}