import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EntradaSaidaComponent} from './entrada-saida/entrada-saida.component';
const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'registrar-entrada-saida',
      component: EntradaSaidaComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BDHRoutingModule {
}
