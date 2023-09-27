import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { MenuComponent } from './menu/menu.component';
import { PagoComponent } from './pago/pago.component';
import { NuevoMenuComponent } from './menu/nuevo-menu/nuevo-menu.component';
import { NuevoPedidoComponent } from './pedidos/nuevo-pedido/nuevo-pedido.component';
import { DetallePedidoComponent } from './pedidos/detalle-pedido/detalle-pedido.component';
import { RolesComponent } from './roles/roles.component';
import { ClienteComponent } from './pago/cliente/cliente.component';
import { FacturaComponent } from './pago/factura/factura.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'mesas/:id_mesa', component: InicioComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'pago', component: PagoComponent },
      { path: 'factura/:id_pedido', component: FacturaComponent },
      { path: 'nuevo-menu', component: NuevoMenuComponent },
      { path: 'nuevo-pedido', component: NuevoPedidoComponent },
      { path: 'detalle-pedido/:id_pedido', component: DetallePedidoComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'factura', component: FacturaComponent },
      { path: 'cliente', component: ClienteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
