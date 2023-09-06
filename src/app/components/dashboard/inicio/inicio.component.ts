import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})


export class InicioComponent {

  displayedColumns: string[] = ['numero_de_mesa', 'capacidad', 'estado'];
  dataSource: any[] = [];

  constructor(private snackBar: MatSnackBar, private pruebaService: PruebaService) {}

  ngOnInit(): void {
    this.pruebaService.getMesas().subscribe(data => {
      console.log(data); // Verifica si estás recibiendo datos y su estructura
      this.dataSource = data;
    });
  }
}
