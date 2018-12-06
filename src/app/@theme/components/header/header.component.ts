import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import { NbAuthJWTToken, NbAuthService,NbTokenService } from '@nebular/auth';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  user = {};

  //user: any;

  userMenu = [{ title: 'Perfil' }, { title: 'Sair' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authService: NbAuthService,
              private nbTokenService:NbTokenService,
              private router:Router) {
                this.authService.onTokenChange()
                    .subscribe((token: NbAuthJWTToken) => {
                      if (token.isValid()) {
                        this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable
                        console.log(this.user);
                      }
                    });
  }

  ngOnInit() {


    this.menuService.onItemClick()
    .pipe(
        filter(({ tag }) => tag === 'context-menu'),
        map(({ item: { title } }) => title),
      )
    .subscribe(title => {
        if(title==='Sair'){
          localStorage.removeItem('auth_app_token');
          this.router.navigate(['auth/login']);

        }
        if(title==='Perfil'){
          console.log(title);
        }
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
