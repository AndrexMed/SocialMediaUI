// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { TokenService } from '../services/token.service';

// export const authGuard: CanActivateFn = (route, state) => {

//   const tokenSvc = inject(TokenService);
//   const router = inject(Router);

//   const isValidToken = tokenSvc.isValidToken();
//   console.log("Is valid token?: ", isValidToken, " From Guard")

//   if (!isValidToken) {
//     router.navigate(['/login'])
//     return false;
//   }
//   return true;
// };
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private jwtHelper: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}