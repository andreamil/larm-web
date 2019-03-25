import { NgModule } from '@angular/core';

import { PaginasComponent } from './paginas.component';
import { PaginasRoutingModule } from './paginas-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
@NgModule({
  imports: [
    PaginasRoutingModule,
    ThemeModule,
    MiscellaneousModule,
  ],
  declarations: [
    PaginasComponent
  ],
  exports: [
  ]
})
export class PaginasModule {
}
