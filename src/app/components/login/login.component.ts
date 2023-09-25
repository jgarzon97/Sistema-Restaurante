import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login.service.service';

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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        console.log('Valor de id:', id);
      }
    });
  }

  ingresar() {
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
        this.mostrarMensajeBienvenida(response.rol, response.nombre);
        // Navegar a la página de Dashboard con el ID de usuario
        //const idUsuario = response.id;
        this.fakeloading()
      },
      (error) => {
        console.error(error);
        this.loading = false;
        this.mostrarError();
        this.form.reset();
      }
    );
  }

  mostrarMensajeBienvenida(rol: string, nombre: string) {
    let mensajeBienvenida = '';

    if (rol === '1') {
      mensajeBienvenida = `Bienvenido Administrador, ${nombre}`;
    } else if (rol === '2') {
      mensajeBienvenida = `Bienvenido Camarero, ${nombre}`;
    }
  }

  mostrarError() {
    this._snackBar.open('Error al autenticar', undefined, {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
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
      this.router.navigate(['/dashboard/inicio']);
    }, 1500);
  }
}