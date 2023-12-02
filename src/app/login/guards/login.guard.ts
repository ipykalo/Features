import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { RoutesConstant } from '../../constants/routes.constant';

export const LoginGuard: CanActivateFn = (route, state): boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate([RoutesConstant.Home], {
      queryParams: { loggedOut: false, origUrl: state.url },
    });
    return false;
  }

  return true;
};
