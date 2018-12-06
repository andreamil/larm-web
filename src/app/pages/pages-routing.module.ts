import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from './auth/auth-guard.service';
const routes: Routes = [{
  path: '',

  component: PagesComponent,

  children: [{
    path: 'dashboard', canActivate: [AuthGuard],
    component: ECommerceComponent,
  }, {
    path: 'iot-dashboard', canActivate: [AuthGuard],
    component: DashboardComponent,
  }, {
    path: 'ui-features', canActivate: [AuthGuard],
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'modal-overlays',  canActivate: [AuthGuard],
    loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
  }, {
    path: 'extra-components',  canActivate: [AuthGuard],
    loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
  }, {
    path: 'bootstrap',  canActivate: [AuthGuard],
    loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
  }, {
    path: 'maps',  canActivate: [AuthGuard],
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',  canActivate: [AuthGuard],
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',   canActivate: [AuthGuard],
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',  canActivate: [AuthGuard],
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',  canActivate: [AuthGuard],
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'miscellaneous',  canActivate: [AuthGuard],
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
