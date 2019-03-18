import { NgModule } from '@angular/core';
import { EstoqueComponent } from './estoque.component';
import { GerenciarComponent } from './gerenciar/gerenciar.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: EstoqueComponent,
  children: [
    {
      path: 'gerenciar',
      component: GerenciarComponent,
    },
    // {
    //   path: 'criar',
    //   component: CriarUsuariosComponent,
    // },
  ],
}];

@NgModule({
  imports: [
    ThemeModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [
    EstoqueComponent,
    GerenciarComponent,
  ],
  providers: [
  ],
})
export class EstoqueModule { }
