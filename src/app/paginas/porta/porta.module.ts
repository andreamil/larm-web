import { NgModule } from '@angular/core';
import { UsoLaboratorioComponent } from './uso-laboratorio/uso-laboratorio.component';
import { EntradaSaidaComponent } from './entrada-saida/entrada-saida.component';
import { HistoricoComponent, CustomRenderComponent, CustomRenderDataComponent, CustomRenderTotalComponent, DatePickerFilterComponent } from './historico/historico.component';
import { PortaComponent } from './porta.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthJWTInterceptor } from '@nebular/auth';
import { NbDatepickerModule } from '@nebular/theme';

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
    Ng2SmartTableModule,
    NbDatepickerModule
  ],
  exports: [RouterModule],
  declarations: [
    PortaComponent,
    UsoLaboratorioComponent,
    HistoricoComponent,
    EntradaSaidaComponent,
    CustomRenderComponent,
    CustomRenderDataComponent,
    CustomRenderTotalComponent,
    DatePickerFilterComponent
  ],
  entryComponents:[CustomRenderComponent,CustomRenderDataComponent,CustomRenderTotalComponent,DatePickerFilterComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    ...NbDatepickerModule.forRoot().providers,
  ],
})
export class PortaModule { }
