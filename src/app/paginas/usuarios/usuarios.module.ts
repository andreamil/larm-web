import { NgModule } from '@angular/core';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { CadastrarUsuariosComponent, DialogUsuarioComponent } from './cadastrar-usuarios/cadastrar-usuarios.component';

import { ThemeModule } from '../../@theme/theme.module';
import { UsuariosComponent } from './usuarios.component';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosService } from './usuarios.service';
import { NbDialogModule } from '@nebular/theme';
import { ImageCropperModule } from 'ngx-image-cropper';
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
    NbDialogModule.forChild(),
    ImageCropperModule
  ],
  exports: [RouterModule],
  declarations: [
    UsuariosComponent,
    ListarUsuariosComponent,
    CadastrarUsuariosComponent,
    DialogUsuarioComponent,
  ],
  providers: [
    UsuariosService
  ],
  entryComponents: [
    DialogUsuarioComponent,
  ],
})
export class UsuariosModule { }
