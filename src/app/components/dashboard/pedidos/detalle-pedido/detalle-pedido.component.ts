import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})

export class DetallePedidoComponent implements OnInit {

  productos: Observable<any[]> = this.productosService.getProductos();

  filteredOptions: Observable<string[]> | undefined;

  nombresProductos: string[] = [];

  myControl = new FormControl();

  formData = {
    id_pedido: '',
    id_producto: '',
    cantidad: '',
    detalle: ''
  };

  constructor(
    private pedidoService: PedidosService,
    private productosService: ProductosService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.formData.id_pedido = params['id_pedido'];
    });

    this.productos.subscribe((productos) => {
      this.nombresProductos = productos.map((producto: any) => producto.nombre);
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Reduje el tiempo de espera para una búsqueda más responsiva
      distinctUntilChanged(),
      map(value => this._filter(value))
    );
  }

  submitForm() {
    if (this.formData.id_pedido && this.myControl.value && this.formData.cantidad) {
      const pedidoProductoData = {
        id_pedido: this.formData.id_pedido,
        id_producto: this.myControl.value,
        cantidad: this.formData.cantidad,
        detalle: this.formData.detalle
      };

      console.log(pedidoProductoData);

      this.pedidoService.createPedido_Producto(pedidoProductoData).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          this.mostrarSnackbar(`Los detalles se ingresaron correctamente.`);

        },
        (error) => {
          this.mostrarSnackbar(`Ha ocurrido un error en el ingreso.`);
        }
      );
    } else {
      this.mostrarSnackbarError('Completa todos los campos antes de enviar los detalles del pedido.');
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.nombresProductos.filter(option => option.toLowerCase().includes(filterValue));
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
