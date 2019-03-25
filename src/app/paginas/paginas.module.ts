import { NgModule } from '@angular/core';

import { PaginasComponent } from './paginas.component';
import { PaginasRoutingModule } from './paginas-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';

@NgModule({
  imports: [
    PaginasRoutingModule,
    ThemeModule,
    MiscellaneousModule,
    UsuariosModule,
    SolicitacoesModule
  ],
  declarations: [
    PaginasComponent
  ],
  exports: [
  ]
})
export class PaginasModule {
}
