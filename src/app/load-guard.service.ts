
import { CanLoad, Route, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth/services/auth.service';
import { NbAccessChecker } from '@nebular/security/services/access-checker.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Injectable } from '@angular/core';
@Injectable()
export class LoadGuard implements CanLoad {
    constructor(private authService: NbAuthService, private router: Router, private accessChecker: NbAccessChecker) { }

    canLoad(route: Route) {
        return this.authService.isAuthenticated()
        .pipe(
          tap(authenticated => {
            // console.log(route.url[0].path);
            if (authenticated) {
              const url: string = route.path;
              console.log(url);
                  this.accessChecker.isGranted('view', url).subscribe(granted => {
                    if (!granted) {console.log(url, granted); this.router.navigate(['pages/dashboard']); }
                  });
            } else {
              this.router.navigate(['auth/login']);
            }
          }),
        );
    }
}
