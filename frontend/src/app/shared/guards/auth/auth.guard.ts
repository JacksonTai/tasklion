import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {RedirectService} from '../../services/redirect/redirect.service';
import {JwtPayloadModel} from '../../models/auth/jwt-payload.model';
import {RouteConstant} from '../../constants/route.constant';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const authService: AuthService = inject(AuthService);
  const redirectService: RedirectService = inject(RedirectService);
  const router: Router = inject(Router);

  const isAuthenticated: boolean = await authService.isFullyAuthenticated();
  if (isAuthenticated) {
    const { requiredRoles } = route.data;
    if (!requiredRoles) {
      return true;
    }

    const accessToken: string | null = authService.getAccessToken();
    if (accessToken) {
      const decodedToken: JwtPayloadModel | null = authService.getDecodedToken(accessToken);
      if (decodedToken) {
        const currentRole: string = decodedToken.currentRole;
        if (requiredRoles.includes(currentRole)) {
          return true;
        }
        redirectService.redirectOnSuccessLogin(currentRole);
        return false;
      }
    }
    router.navigate([RouteConstant.INTERNAL_SERVER_ERROR], { skipLocationChange: true });
    return false;
  }

  authService.handleLogoutAndRedirect();
  return false;
};
