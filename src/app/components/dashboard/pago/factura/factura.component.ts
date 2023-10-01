import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormControl } from '@angular/forms';
import { PagosService } from 'src/app/services/pagos.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
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

export class FacturaComponent {

  clientes: Observable<any[]> = this.clientesService.getClientes();

  filteredOptions: Observable<string[]> | undefined;

  myControl = new FormControl();

  idPedido!: string;

  cedulaClientes: string[] = [];

  formData = {
    id_pedido: '',
    id_cliente: ''
  }

  constructor(
    private pagoService: PagosService,
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.idPedido = this.activatedRoute.snapshot.url[this.activatedRoute.snapshot.url.length - 1].path;
    if (!isNaN(+this.idPedido)) {
      console.log('ID de pedido:', this.idPedido);
      this.formData.id_pedido = this.idPedido;
    } else {
      console.error('ID de pedido no válido:', this.idPedido);
    }

    this.clientes.subscribe((clientes) => {
      this.cedulaClientes = clientes.map((clientes: any) => clientes.cedula);
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Reduje el tiempo de espera para una búsqueda más responsiva
      distinctUntilChanged(),
      map(value => this._filter(value))
    );
  }

  submitForm() {
    if (this.formData.id_pedido && this.myControl.value) {
      const cedulaSeleccionada = this.myControl.value;
      console.log('Cédula seleccionada:', cedulaSeleccionada); // Agrega esta línea para ver la cédula seleccionada en la consola

      const facturaData = {
        id_pedido: this.formData.id_pedido,
        id_cliente: cedulaSeleccionada // Usa la cédula seleccionada
      };

      this.pagoService.createFactura(facturaData).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          this.mostrarSnackbar(`Los detalles se ingresaron correctamente.`);
        },
        (error) => {
          this.mostrarSnackbar(`Ha ocurrido un error en el ingreso.`);
        }
      );
    } else {
      this.mostrarSnackbarError('Completa todos los campos antes de crear la Factura.');
    }
  }

  agregarCliente() {
    this.router.navigate(['dashboard/cliente']);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cedulaClientes.filter(option => option.toLowerCase().includes(filterValue));
  }

  private mostrarSnackbar(mensaje: string): void {
    this._snackBar.open(mensaje, undefined, {
      duration: 3000,
    });
  }

  private mostrarSnackbarError(mensaje: string): void {
    this._snackBar.open(mensaje, undefined, {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}