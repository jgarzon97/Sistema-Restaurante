import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServidorService } from 'src/app/services/servidor.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
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

export class MenuComponent {

  displayedColumns: string[] = ['id_producto', 'nombre', 'precio', 'estado', 'nombre_categoria', 'acciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(private snackBar: MatSnackBar, private servidor: ServidorService) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.servidor.getProductos().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
    });
  }

  borrarProducto(id: number): void {
    this.servidor.deleteProducto(id).subscribe((resultado) => {
      this.mostrarSnackbar(`El Producto ${id} ha sido borrado.`);
      this.ActualizarProductos();
    });
  }

  private mostrarSnackbar(mensaje: string): void {
    this.snackBar.open(mensaje, undefined, {
      duration: 1000,
    });
  }

  private ActualizarProductos(): void {
    this.servidor.getProductos().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

}
