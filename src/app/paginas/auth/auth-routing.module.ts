import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {  LarmLoginComponent} from './login/login.component';
import {  LarmRegisterComponent} from './register/register.component';
import {  LarmLogoutComponent} from './logout/logout.component';
import {  LarmRequestPasswordComponent} from './request-password/request-password.component';
import {  LarmResetPasswordComponent } from './reset-password/reset-password.component';
export const routes: Routes = [
  {
    path: '',
    children: [
        {
          path: '',
          component: LarmLoginComponent,
        },
        {
          path: 'login',
          component: LarmLoginComponent,
        },
        {
          path: 'register',
          component: LarmRegisterComponent,
        },
        {
          path: 'logout',
          component: LarmLogoutComponent,
        },
        {
          path: 'request-password',
          component: LarmRequestPasswordComponent,
        },
        {
          path: 'reset-password',
          component: LarmResetPasswordComponent,
        },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
