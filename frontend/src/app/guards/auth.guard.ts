import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, UrlTree, CanActivateChild} from '@angular/router';
import {AuthService} from '../auth.service';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.checkAccess(route);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.checkAccess(childRoute);
  }

  private checkAccess(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const allowedRoles = (route.data['allowedRoles'] || []) as string[];
    return this.authService.profile().pipe(
      map(profile => {
        if (!profile || !profile.type) return this.router.createUrlTree(['/auth']);
        if (allowedRoles.length === 0 || allowedRoles.includes(profile.type)) return true;
        else return this.router.createUrlTree(['/events']);
      }),
      catchError(() => of(this.router.createUrlTree(['/auth'])))
    );
  }
}
