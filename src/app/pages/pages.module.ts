import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SocketService } from './socket.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LoadGuard } from '../load-guard.service';
const config: SocketIoConfig = { url: 'http://localhost:8080', 
                                 options: {query:  localStorage.getItem('auth_app_token')
                                                  ? {token: JSON.parse(localStorage.getItem('auth_app_token')).value}
                                                  : {}} };

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    MiscellaneousModule,
    SocketIoModule.forRoot(config),
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [SocketService, LoadGuard],
})
export class PagesModule {
}
