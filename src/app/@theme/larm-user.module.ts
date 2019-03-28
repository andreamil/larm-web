import { NgModule } from '@angular/core';


import {
    NbLarmUserComponent,
} from './larm-user.component';
import { NbBadgeModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    NbBadgeModule,
  ],
  declarations: [
    NbLarmUserComponent
  ],
  exports: [
    NbLarmUserComponent
  ],
})
export class NbLarmUserModule { }