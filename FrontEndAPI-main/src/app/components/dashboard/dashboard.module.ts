import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AutoresComponent } from './autores/autores.component';
import { BarralateralComponent } from './barralateral/barralateral.component';
import { InicioComponent } from './inicio/inicio.component';
import { LibrosComponent } from './libros/libros.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ClientesComponent,
    AutoresComponent,
    BarralateralComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatGridListModule,
    MatIconModule,
    InicioComponent, // Importar el componente en lugar de declararlo
    LibrosComponent, // Importar el componente en lugar de declararlo
  ]
})
export class DashboardModule { }
