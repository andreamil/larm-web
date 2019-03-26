import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PaginasComponent } from './paginas.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from '../auth-guard.service';
const routes: Routes = [{
  path: '',

  component: PaginasComponent,

  children: [
  {
    path: 'painel',  
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  }, {
    path: 'usuarios',  canLoad: [AuthGuard],
    loadChildren: './usuarios/usuarios.module#UsuariosModule',
  }, {
    path: 'projetos',  canLoad: [AuthGuard],
    loadChildren: './projetos/projetos.module#ProjetosModule',
  }, {
    path: 'porta',  canLoad: [AuthGuard],
    loadChildren: './porta/porta.module#PortaModule',
  }, {
    path: 'estoque',  canLoad: [AuthGuard],
    loadChildren: './estoque/estoque.module#EstoqueModule',
  }, {
    path: 'solicitacoes',  canLoad: [AuthGuard],
    loadChildren: './solicitacoes/solicitacoes.module#SolicitacoesModule',
  }, {
    path: 'miscellaneous',  canLoad: [AuthGuard],
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
