import { NgModule } from '@angular/core';

import { PaginasComponent } from './paginas.component';
import { PaginasRoutingModule } from './paginas-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PipesModule } from './pipes.module';

@NgModule({
  imports: [
    PaginasRoutingModule,
    ThemeModule,
    MiscellaneousModule,
    UsuariosModule,
    PipesModule
  ],
  declarations: [
    PaginasComponent,
  ],
  exports: [
  ]
})
export class PaginasModule {
}
