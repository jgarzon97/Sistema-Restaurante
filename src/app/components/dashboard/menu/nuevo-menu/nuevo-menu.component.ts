import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServidorService } from 'src/app/services/servidor.service';

@Component({
  selector: 'app-nuevo-menu',
  templateUrl: './nuevo-menu.component.html',
  styleUrls: ['./nuevo-menu.component.css']
})
export class NuevoMenuComponent {

  constructor(private servidorService: ServidorService, private router: Router) {}

  ngOnInit(): void {

  }

}
