import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { MenuComponent } from './menu/menu.component';
import { PagoComponent } from './pago/pago.component';
import { NuevoMenuComponent } from './menu/nuevo-menu/nuevo-menu.component';
import { DetallePedidoComponent } from './pedidos/detalle-pedido/detalle-pedido.component';
import { ClienteComponent } from './pago/cliente/cliente.component';
import { FacturaComponent } from './pago/factura/factura.component';
import { RolesComponent } from './roles/roles.component';
import { NuevoUsuarioComponent } from './roles/nuevo-usuario/nuevo-usuario.component';
import { MesaComponent } from './mesa/mesa.component';
import { AdminComponent } from './mesa/admin/admin.component';
import { MesaNuevaComponent } from './mesa/mesa.nueva/mesa.nueva.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    PedidosComponent,
    MenuComponent,
    PagoComponent,
    NuevoMenuComponent,
    DetallePedidoComponent,
    ClienteComponent,
    FacturaComponent,
    RolesComponent,
    NuevoUsuarioComponent,
    MesaComponent,
    AdminComponent,
    MesaNuevaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
