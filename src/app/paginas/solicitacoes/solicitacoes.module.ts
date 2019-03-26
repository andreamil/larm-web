import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetiradaDeMateriaisComponent } from './retirada-de-materiais/retirada-de-materiais.component';
import { PermanenciaForaDoHorarioComponent } from './permanencia-fora-do-horario/permanencia-fora-do-horario.component';
import { NovoMembroComponent } from './novo-membro/novo-membro.component';
import { SolicitacoesComponent } from './solicitacoes.component';
import { ThemeModule } from '../../@theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth-guard.service';
const routes: Routes = [{
  path: '',
  //redirectTo: 'meuperfil',
  children: [
    {
      path: 'novo-membro', canLoad: [AuthGuard],canActivate: [AuthGuard],
      component: NovoMembroComponent,
    },
    {
      path: 'permanencia-fora-do-horario', canLoad: [AuthGuard],canActivate: [AuthGuard],
      component: PermanenciaForaDoHorarioComponent,
    },
    {
      path: 'retirada-de-materiais',
      component: RetiradaDeMateriaisComponent,
    }
  ],
}];

@NgModule({
  declarations: [RetiradaDeMateriaisComponent, PermanenciaForaDoHorarioComponent, NovoMembroComponent, SolicitacoesComponent],
  imports: [
    ThemeModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class SolicitacoesModule { }
