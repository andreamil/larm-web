import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { filter, map } from 'rxjs/operators';
import { LayoutService } from '../../../@core/data/layout.service';
import { Config } from '../../../config';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  @Input() user:any = {};
  @Input() baseUrl = Config.BASE_API_URL;
  // user: any;

  userMenu = [{ title: 'Perfil' }, { title: 'Sair' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
            //  private userService: UserService,
              private analyticsService: AnalyticsService,
              private authService: NbAuthService,
            //  private nbTokenService: NbTokenService,
            private layoutService: LayoutService,
              private router: Router) {
                this.authService.onTokenChange()
                    .subscribe((token: NbAuthJWTToken) => {
                      if (token.isValid()) {
                        this.user = token.getPayload();
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
        if (title === 'Sair') {
          localStorage.removeItem('auth_app_token');
          this.router.navigate(['auth/login']);

        }
        if (title === 'Perfil') {
          //this.usuarioService.setUsuarioEdit(this.user);
          this.router.navigate(['paginas/usuarios/meuperfil']);
        }
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }
  toggleSettings(): boolean {
    // this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
