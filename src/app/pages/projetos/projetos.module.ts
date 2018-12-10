import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProjetosComponent } from './projetos.component';
import { ProjetoService } from '../../@core/data/projeto.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: ProjetosComponent,
  children: [
  ],
}];

@NgModule({
  imports: [
    ThemeModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [
    ProjetosComponent,
  ],
  providers: [
  //  CountryOrdersMapService,
    ProjetoService,
  ],
})
export class ProjetosModule { }
