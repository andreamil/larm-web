import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProjetosComponent } from './projetos.component';
import { ProjetoService } from '../../@core/data/projeto.service';
import { Routes, RouterModule } from '@angular/router';
import { CriarProjetoComponent } from './criar-projeto/criar-projeto.component';
import { MeusProjetosComponent } from './meus-projetos/meus-projetos.component';
import { TodosProjetosComponent } from './todos-projetos/todos-projetos.component';

const routes: Routes = [{
  path: '',
  component: ProjetosComponent,
  children: [
    {
      path: 'criar',
      component: CriarProjetoComponent,
    },
    {
      path: 'meus',
      component: MeusProjetosComponent,
    },
    {
      path: 'todos',
      component: TodosProjetosComponent,
    },
    {
      path: '',
      redirectTo: 'todos',
      pathMatch: 'full',
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
    ProjetosComponent,
    CriarProjetoComponent,
    MeusProjetosComponent,
    TodosProjetosComponent,
  ],
  providers: [
    ProjetoService,
  ],
})
export class ProjetosModule { }
