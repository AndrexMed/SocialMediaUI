import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PermissionsGuard {

  constructor(private jwtHelper: JwtHelperService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.autorize(route);
  }

  autorize(route: ActivatedRouteSnapshot): boolean {
    let rolesUser: string =
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

    const token = localStorage.getItem('token') || '';
    const roles = this.jwtHelper.decodeToken(token);
    const expectedRoles = route.data['role'];
    return expectedRoles.includes(roles);
  }
}