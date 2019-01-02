import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { LoadGuard } from '../load-guard.service';
const routes: Routes = [{
  path: '',

  component: PagesComponent,

  children: [{
    path: 'dashboard', canLoad: [LoadGuard],
    loadChildren: './e-commerce/e-commerce.module#ECommerceModule',
  }, {
    path: 'iot-dashboard', canLoad: [LoadGuard],
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  },  {
    path: 'projetos',  canLoad: [LoadGuard],
    loadChildren: './projetos/projetos.module#ProjetosModule',
  },  {
    path: 'banco-de-horas',  canLoad: [LoadGuard],
    loadChildren: './banco-de-horas/bdh.module#BDHModule',
  }, /*{
    path: 'ui-features', canLoad: [LoadGuard],
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  },{
    path: 'modal-overlays',  canLoad: [LoadGuard],
    loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
  }, {
    path: 'extra-components',  canLoad: [LoadGuard],
    loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
  }, {
    path: 'bootstrap',  canLoad: [LoadGuard],
    loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
  }, {
    path: 'maps',  canLoad: [LoadGuard],
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',  canLoad: [LoadGuard],
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',   canLoad: [LoadGuard],
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',  canLoad: [LoadGuard],
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',  canLoad: [LoadGuard],
    loadChildren: './tables/tables.module#TablesModule',
  }, */ {
    path: 'miscellaneous',  canLoad: [LoadGuard],
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
