import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../auth.service';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    console.log("canActivate");
    const allowedRoles = route.data['allowedRoles'] as string[] || [];
    return this.authService.profile().pipe(
      map(profile => {
        if (allowedRoles.length === 0 || allowedRoles.includes(profile.type)) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      }),
      catchError(() => of(this.router.createUrlTree(['/auth'])))
    );
  }
}
