import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbMenuItem, NbToastrService } from '@nebular/theme';

import { MENU_ITEMS } from './pages-menu';
import { Subscription } from 'rxjs';
import { SocketService } from './socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent  implements OnInit, OnDestroy {

  menu = MENU_ITEMS;
  //msg: any;
  private _msgSub: Subscription;
  private _authSub: Subscription;
  constructor(
    private accessChecker: NbAccessChecker,
    private socketService: SocketService,
    private toastrService: NbToastrService,
    private router: Router) {        
    this._msgSub = this.socketService.msg.subscribe(msg => this.toastrService.show(msg.body,msg.title,msg.config));
    this._authSub = this.socketService.autorizado.subscribe(autorizado => {
      if(autorizado){
        console.log('autorizado')
      }else{        
        localStorage.removeItem('auth_app_token');
        this.router.navigate(['auth/login']);
      }
    });

  }
  
  ngOnInit() {      

    this.authMenuItems();

  }
  ngOnDestroy() {
    this._msgSub.unsubscribe();
    this._authSub.unsubscribe();
  }
  authMenuItems() {
    this.menu.forEach(item => {
      this.authMenuItem(item);
    });
  }

  authMenuItem(menuItem: NbMenuItem) {
    if (menuItem.data && menuItem.data['permission'] && menuItem.data['resource']) {
      this.accessChecker.isGranted(menuItem.data['permission'], menuItem.data['resource']).subscribe(granted => {
        menuItem.hidden = !granted;
      });
    } else {
      menuItem.hidden = true;
    }
    if (!menuItem.hidden && menuItem.children != null) {
      menuItem.children.forEach(item => {
        if (item.data && item.data['permission'] && item.data['resource']) {
          this.accessChecker.isGranted(item.data['permission'], item.data['resource']).subscribe(granted => {
            item.hidden = !granted;
          });
        } else {
          // if child item do not config any `data.permission` and `data.resource` just inherit parent item's config
          item.hidden = menuItem.hidden;
        }
      });
    }
  }
}
