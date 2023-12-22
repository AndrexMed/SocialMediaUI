import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const redirectGuard: CanActivateFn = (route, state) => {

  const tokenSvc = inject(TokenService);
  const router = inject(Router);

  const isValidToken = tokenSvc.isValidToken();

  if (isValidToken) {
    router.navigate(['/app'])
  }
  return true;
};
