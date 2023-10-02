import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-nuevo-menu',
  templateUrl: './nuevo-menu.component.html',
  styleUrls: ['./nuevo-menu.component.css']
})
export class NuevoMenuComponent {
  disableSelect = new FormControl(false);
  productoForm!: FormGroup;

  constructor(private fb: FormBuilder, private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      stock: ['', Validators.required],
      precio: ['', Validators.required],
      tiempo: ['', Validators.required],
      estado: '',
      id_categoria: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const productData = this.productoForm.value;
      this.productosService.createProducto(productData)
        .subscribe(
          (response) => {
            // Manejar la respuesta aquí, por ejemplo, mostrar un mensaje de éxito
            console.log('Producto creado exitosamente', response);
          },
          (error) => {
            // Manejar el error aquí, por ejemplo, mostrar un mensaje de error
            console.error('Error al crear el producto', error);
          }
        );
    }
  }
}
