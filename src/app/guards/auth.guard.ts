import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {

  const tokenSvc = inject(TokenService);
  const router = inject(Router);

  const isValidToken = tokenSvc.isValidToken();
  console.log("Is valid token?: ", isValidToken, " From Guard")

  if (!isValidToken) {
    router.navigate(['/login'])
    return false;
  }
  return true;
};
