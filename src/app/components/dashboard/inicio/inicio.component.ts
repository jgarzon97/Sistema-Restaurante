import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServidorService } from 'src/app/services/servidor.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})


export class InicioComponent {

  displayedColumns: string[] = ['num_mesa', 'capacidad', 'estado'];
  dataSource: any[] = [];

  constructor(private snackBar: MatSnackBar, private servidor: ServidorService) {}

  ngOnInit(): void {
    this.servidor.getMesas().subscribe(data => {
      console.log(data); // Verifica si estás recibiendo datos y su estructura
      this.dataSource = data;
    });
  }
}
