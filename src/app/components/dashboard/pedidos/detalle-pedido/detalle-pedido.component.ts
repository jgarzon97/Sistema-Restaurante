import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PedidosServiceService } from 'src/app/services/pedidos.service.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})

export class DetallePedidoComponent {

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

  constructor(private pedidoservidorService: PedidosServiceService, private productosService: ProductosService, private activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar) { 
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnInit(): void {
    this.myControl.valueChanges.subscribe((nombreProducto: string) => {
      this.productoSeleccionado(nombreProducto);
    });
    this.activatedRoute.params.subscribe((params) => {
      this.formData.id_pedido = params['id_pedido'];
    });
  }

  submitForm() {
    if (this.formData.id_pedido && this.formData.id_producto && this.formData.cantidad) {
      const pedidoProductoData = {
        id_pedido: this.formData.id_pedido,
        id_producto: this.formData.id_producto,
        cantidad: this.formData.cantidad,
        detalle: this.formData.detalle
      };

      this.pedidoservidorService.createPedido_Producto(pedidoProductoData).subscribe(
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
    console.log('ID Pedido:', this.formData.id_pedido);
    console.log('ID Producto:', this.formData.id_producto);
    console.log('Cantidad:', this.formData.cantidad);
    console.log('Detalle:', this.formData.detalle);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.nombresProductos.filter(option => option.toLowerCase().includes(filterValue));
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

  productoSeleccionado(nombreProducto: string) {
    this.myControl.valueChanges
      .pipe(
        debounceTime(3000), // Espera 300 milisegundos de inactividad
        distinctUntilChanged(), // Asegura que solo se realice una búsqueda si el valor cambió
        switchMap(nombreProducto => this.productosService.obtenerIdPorNombre(nombreProducto))
      )
      // Utiliza tu servicio para obtener el ID del producto por nombre
      .subscribe((id: number) => {
        if (id !== undefined && !isNaN(id)) {
          this.formData.id_producto = id.toString(); // Convierte id a string
        } else {
          console.error('ID de producto no válido:', id);
        }
      });
  }
}
