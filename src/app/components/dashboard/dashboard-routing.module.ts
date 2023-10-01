import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { MenuComponent } from './menu/menu.component';
import { PagoComponent } from './pago/pago.component';
import { NuevoMenuComponent } from './menu/nuevo-menu/nuevo-menu.component';
import { DetallePedidoComponent } from './pedidos/detalle-pedido/detalle-pedido.component';
import { RolesComponent } from './roles/roles.component';
import { ClienteComponent } from './pago/cliente/cliente.component';
import { FacturaComponent } from './pago/factura/factura.component';
import { NuevoUsuarioComponent } from './roles/nuevo-usuario/nuevo-usuario.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'mesas/:id_mesa', component: InicioComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'detalle-pedido/:id_pedido', component: DetallePedidoComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'nuevo-menu', component: NuevoMenuComponent },
      { path: 'pago', component: PagoComponent },
      { path: 'factura/:id_pedido', component: FacturaComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'roles/nuevo-usuario', component: NuevoUsuarioComponent },
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
