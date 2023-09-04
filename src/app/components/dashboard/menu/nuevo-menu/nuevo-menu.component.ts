import { Component } from '@angular/core';

@Component({
  selector: 'app-nuevo-menu',
  templateUrl: './nuevo-menu.component.html',
  styleUrls: ['./nuevo-menu.component.css']
})
export class NuevoMenuComponent {
  tiles: any[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  foods: any[] = [
    {value: 'Comida rapida', viewValue: 'Comida rapida'},
    {value: 'Caldos', viewValue: 'Caldos'},
    {value: 'Postres', viewValue: 'Postres'},
  ];
}
