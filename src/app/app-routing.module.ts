import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { AppComponent } from './app.component';
// import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'paginas',
    //canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
    // canLoad: [LoadGuard],
    component: AppComponent,
    loadChildren: 'app/paginas/paginas.module#PaginasModule',
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    loadChildren: 'app/paginas/auth/auth.module#AuthModule',
  },
  { path: '', redirectTo: 'paginas/painel', pathMatch: 'full' },
  { path: '**', redirectTo: 'paginas/painel' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
