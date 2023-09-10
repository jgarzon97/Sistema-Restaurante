import { Component, OnInit } from '@angular/core';
import { Rutas } from 'src/app/interfaces/rutas';
import { RutasService } from 'src/app/services/rutas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  rutas: Rutas[] = [];

  constructor(private _rutasService : RutasService) { }

  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu() {
    this._rutasService.geRoutes().subscribe(data => {
      this.rutas = data;
    });
  }
}
