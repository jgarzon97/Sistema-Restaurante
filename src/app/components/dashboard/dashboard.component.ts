import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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

export class DashboardComponent {
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
