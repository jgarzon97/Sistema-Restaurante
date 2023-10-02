import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
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


export class ClienteComponent {
  cliente!: FormGroup;
  activo: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private pagoService: PagosService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.cliente = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  onSubmit() {
    if (this.cliente.invalid) {
      console.log("Formulario inválido, verifica los campos.");
      return;
    }

    const data = this.cliente.value;
    this.pagoService.createCliente(data).subscribe(
      response => {
        console.log("Cliente registrado:", response);
        window.history.back();
      },
      error => {
        console.error("Error al registrar cliente:", error);
      }
    );
  }

  getErrorMessage(fieldName: string): string {
    const control = this.cliente.get(fieldName);

    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    if (fieldName === 'cedula' && control.hasError('cedula')) {
      return 'Cédula no válida';
    }

    if (fieldName === 'telefono' && control.hasError('telefono')) {
      return 'Teléfono no válido';
    }

    if (fieldName === 'email' && control.hasError('email')) {
      return 'Correo electrónico no válido';
    }

    return '';
  }


  onCedulaKeyPress(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;

    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  }

  clearForm() {
    this.cliente.reset();
  }
}
