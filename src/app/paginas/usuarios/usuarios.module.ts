import { NgModule } from '@angular/core';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { CadastrarUsuariosComponent, DialogUsuarioComponent, DialogExcluirUsuarioComponent } from './cadastrar-usuarios/cadastrar-usuarios.component';

import { ThemeModule } from '../../@theme/theme.module';
import { UsuariosComponent } from './usuarios.component';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosService } from './usuarios.service';
import { NbDialogModule } from '@nebular/theme';
import { ImageCropperModule } from 'ngx-image-cropper'
import { AuthGuard } from '../../auth-guard.service';
const routes: Routes = [{
  path: '',
  //redirectTo: 'meuperfil',
  children: [
    {
      path: 'listar', canLoad: [AuthGuard],canActivate: [AuthGuard],
      component: ListarUsuariosComponent,
    },
    {
      path: 'criar-editar-usuario', canLoad: [AuthGuard],canActivate: [AuthGuard],
      component: CadastrarUsuariosComponent,
    },
    {
      path: 'criar-editar-usuario/:id', canLoad: [AuthGuard],canActivate: [AuthGuard],
      component: CadastrarUsuariosComponent,
    },
    {
      path: 'meu-perfil',
      component: CadastrarUsuariosComponent,
    }
  ],
}];

@NgModule({
  imports: [
    ThemeModule,
    RouterModule.forChild(routes),
    NbDialogModule.forChild(),
    ImageCropperModule
  ],
  exports: [RouterModule],
  declarations: [
    UsuariosComponent,
    ListarUsuariosComponent,
    CadastrarUsuariosComponent,
    DialogUsuarioComponent,
    DialogExcluirUsuarioComponent
  ],
  providers: [
    UsuariosService
  ],
  entryComponents: [
    DialogUsuarioComponent,
    DialogExcluirUsuarioComponent
  ],
})
export class UsuariosModule { }
