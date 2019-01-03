import { NgModule } from '@angular/core';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { CadastrarUsuariosComponent } from './cadastrar-usuarios/cadastrar-usuarios.component';

import { ThemeModule } from '../../@theme/theme.module';
import { UsuariosComponent } from './usuarios.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: UsuariosComponent,
  children: [
    {
      path: 'listar',
      component: ListarUsuariosComponent,
    },
    {
      path: 'cadastrar',
      component: CadastrarUsuariosComponent,
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
    UsuariosComponent,
    ListarUsuariosComponent,
    CadastrarUsuariosComponent,
  ],
  providers: [
  ],
})
export class UsuariosModule { }
