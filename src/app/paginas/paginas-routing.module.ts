import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PaginasComponent } from './paginas.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { LoadGuard } from '../load-guard.service';
const routes: Routes = [{
  path: '',

  component: PaginasComponent,

  children: [
  {
    path: 'painel',  canLoad: [LoadGuard],
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  }, {
    path: 'usuarios',  canLoad: [LoadGuard],
    loadChildren: './usuarios/usuarios.module#UsuariosModule',
  }, {
    path: 'projetos',  canLoad: [LoadGuard],
    loadChildren: './projetos/projetos.module#ProjetosModule',
  }, {
    path: 'porta',  canLoad: [LoadGuard],
    loadChildren: './porta/porta.module#PortaModule',
  }, {
    path: 'estoque',  canLoad: [LoadGuard],
    loadChildren: './estoque/estoque.module#EstoqueModule',
  }, {
    path: 'miscellaneous',  canLoad: [LoadGuard],
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, {
    path: '',
    redirectTo: 'painel',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginasRoutingModule {
}
