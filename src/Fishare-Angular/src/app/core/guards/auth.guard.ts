import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // logged in so return true
    // tslint:disable-next-line: curly
    if (this.jwtService.isAuthorized())
      return true;

    // To log the user off if token is expired.
    this.jwtService.logout();
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/signIn'], { queryParams: { returnUrl: state.url } });
    return false;
  }


}
