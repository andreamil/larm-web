import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { SocketService } from './paginas/socket.service';
@Injectable()
export class AuthGuard implements CanActivate,CanLoad {

  constructor(private authService: NbAuthService, 
    private router: Router, 
    private accessChecker: NbAccessChecker,
  private socketService: SocketService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          // console.log(route.url[0].path);
          if (authenticated) {
            let path = '';
            if (route.url[0] === undefined)path = 'paginas';
            else path = route.url[0].path;
            console.log(path);
                this.accessChecker.isGranted('view', path).subscribe(granted => {
                  if (!granted) {console.log(path, granted); this.router.navigate(['paginas/painel']); } else {
                     this.socketService.emit('check autorizado', JSON.parse(localStorage.getItem('auth_app_token')).value);
                  }
                });
          } else {
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }
  canLoad(route: Route) {
    return this.authService.isAuthenticated()
    .pipe(
      tap(authenticated => {
        // console.log(route.url[0].path);
        if (authenticated) {
          const url: string = route.path;
          console.log(url);
          
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
}/*
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}*/
