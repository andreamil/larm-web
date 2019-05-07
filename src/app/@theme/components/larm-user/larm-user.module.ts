import { NgModule } from '@angular/core';


import {
    NbLarmUserComponent,
} from './larm-user.component';
import { NbBadgeModule, NbPopoverModule, NbCardModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { UserPopoverComponent } from './user-popover.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    NbBadgeModule,
    NbCardModule,
    NbPopoverModule,
    RouterModule
  ],
  declarations: [
    NbLarmUserComponent,
    UserPopoverComponent
  ],
  exports: [
    NbLarmUserComponent,
  ],
  entryComponents:[
    UserPopoverComponent 
  ]
})
export class NbLarmUserModule { }