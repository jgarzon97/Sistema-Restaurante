import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  formulario = {
    cedula: '',
    nombre: '',
    apellido: '',
    direccion: '',
    email: '',
    telefono: ''
  };

  constructor(private pagoService: PagosService, private router: Router){ }

  submitForm() {
    if (this.formulario.cedula) {
      const facturaData = {
        id_usuario: this.formulario.cedula,
        id_mesa: this.formulario.nombre
      };

      this.pagoService.crearteFactura(facturaData).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          this.router.navigate(['/pago']);
        },
        (error) => {
          console.error('Error al enviar el cliente:', error);
        }
      );
    }
  }
  
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onCedulaKeyPress(event: KeyboardEvent) {
    const keyCode = event.which || event.keyCode;

    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  }
}
