import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Platos } from 'src/app/interfaces/platos';
import { ServidorService } from 'src/app/services/servidor.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {

  displayedColumns: string[] = ['nombre', 'stock', 'precio', 'tiempo', 'estado', 'id_categoria'];
  dataSource = new MatTableDataSource<Platos>(); // Usar MatTableDataSource con el tipo de tus datos

  constructor(private snackBar: MatSnackBar, private servidor: ServidorService) {}

  ngAfterViewInit() {
    // Asignar el paginador y el clasificador aquí después de que se cargue la vista
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.servidor.getProductos().subscribe(
      (data: Platos[]) => {
        console.log(data);
        this.dataSource.data = data; // Establecer los datos en el MatTableDataSource
      },
      (error) => {
        console.error('Error al obtener datos:', error);
        this.snackBar.open('Error al obtener datos', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

}
