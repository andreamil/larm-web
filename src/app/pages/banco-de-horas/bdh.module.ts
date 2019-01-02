import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { EntradaSaidaComponent } from './entrada-saida/entrada-saida.component';
import { BDHRoutingModule } from './bdh-routing.module';
// import { BDHService } from '../../@core/data/bdh.service';


@NgModule({
  imports: [
    ThemeModule,
    BDHRoutingModule,
  ],
  declarations: [
    EntradaSaidaComponent,
  ],
  providers: [
  // CountryOrdersMapService,
  // BDHService,
  ],
})
export class BDHModule { }
