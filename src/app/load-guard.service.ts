
import { CanLoad, Route, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth/services/auth.service';
import { NbAccessChecker } from '@nebular/security/services/access-checker.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Injectable } from '@angular/core';
import { SocketService } from './paginas/socket.service';
@Injectable()
export class LoadGuard implements CanLoad {
    constructor(private authService: NbAuthService, private router: Router,
                private accessChecker: NbAccessChecker, private socketService: SocketService) { }

    canLoad(route: Route) {
        return this.authService.isAuthenticated()
        .pipe(
          tap(authenticated => {
            // console.log(route.url[0].path);
            if (authenticated) {
              const url: string = route.path;
                  this.accessChecker.isGranted('view', url).subscribe(granted => {
                    if (!granted)this.router.navigate(['paginas/painel']);
                    else {
                     this.socketService.emit('check autorizado', JSON.parse(localStorage.getItem('auth_app_token')).value);
                    }
                  });
            } else {
              this.router.navigate(['auth/login']);
            }
          }),
        );
    }
}
