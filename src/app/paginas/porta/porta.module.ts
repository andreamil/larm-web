import { NgModule } from '@angular/core';
import { UsoLaboratorioComponent } from './uso-laboratorio/uso-laboratorio.component';
import { EntradaSaidaComponent } from './entrada-saida/entrada-saida.component';
import { HistoricoComponent } from './historico/historico.component';
import { PortaComponent } from './porta.component';

import { ThemeModule } from '../../@theme/theme.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: PortaComponent,
  children: [ 
    {
      path: 'registrar-entrada-saida',
      component: EntradaSaidaComponent,
    },
    {
      path: 'uso-laboratorio',
      component: UsoLaboratorioComponent,
    },
    {
      path: 'historico',
      component: HistoricoComponent,
    },
  ],
}];

@NgModule({
  imports: [
    ThemeModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [
    PortaComponent,
    UsoLaboratorioComponent,
    HistoricoComponent,
    EntradaSaidaComponent,
  ],
  providers: [
  ],
})
export class PortaModule { }
