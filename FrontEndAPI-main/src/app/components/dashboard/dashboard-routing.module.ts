import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { LibrosComponent } from './libros/libros.component';
import { AutoresComponent } from './autores/autores.component';
import { BarralateralComponent } from './barralateral/barralateral.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'libros', component: LibrosComponent },
      { path: 'autores', component: AutoresComponent },
      { path: '', component: BarralateralComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
