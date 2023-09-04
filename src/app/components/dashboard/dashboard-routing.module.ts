import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { MenuComponent } from './menu/menu.component';
import { PagoComponent } from './pago/pago.component';
import { NuevoMenuComponent } from './menu/nuevo-menu/nuevo-menu.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'inicio', component: InicioComponent },
    { path: 'pedidos', component: PedidosComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'pago', component: PagoComponent },
    { path: 'nuevo-menu', component: NuevoMenuComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
