import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  rol:string='';

  constructor() { }

  ngOnInit(): void {
    const rolActual = localStorage.getItem('rol');

    if(rolActual!==null){
      this.rol=rolActual;
    }else{
      this.rol='';
    }
  }
}
