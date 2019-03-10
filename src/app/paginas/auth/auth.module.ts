import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbRadioModule,
  NbInputModule,
} from '@nebular/theme';
import {  LarmLoginComponent} from './login/login.component';
import {  LarmRegisterComponent} from './register/register.component';
import {  LarmLogoutComponent} from './logout/logout.component';
import {  LarmRequestPasswordComponent} from './request-password/request-password.component';
import {  LarmResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbRadioModule,
    NgxAuthRoutingModule,

    NbAuthModule,
  ],
  declarations: [
    // ... here goes our new components
    LarmLoginComponent,
    LarmRegisterComponent,
    LarmLogoutComponent,
    LarmRequestPasswordComponent,
    LarmResetPasswordComponent,
  ],
})
export class AuthModule {
}
