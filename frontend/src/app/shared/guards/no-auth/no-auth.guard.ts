import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {RouteConstant} from '../../constants/route.constant';
import {AuthService} from '../../services/auth/auth.service';
import {RedirectService} from '../../services/redirect/redirect.service';
import {JwtPayloadModel} from '../../models/auth/jwt-payload.model';

export const NoAuthGuard: CanActivateFn = async (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const redirectService: RedirectService = inject(RedirectService);
  const protectedRoutes: string[] = [
    RouteConstant.ROOT,
    RouteConstant.LOGIN,
    RouteConstant.REGISTER,
  ];
  const isProtectedRoute: boolean = protectedRoutes.some((route: string) => state.url.includes(route));

  const isAuthenticated: boolean = await authService.isFullyAuthenticated();
  if (isAuthenticated && isProtectedRoute) {
    const accessToken: string | null = authService.getAccessToken();
    if (accessToken) {
      const decodedToken: JwtPayloadModel | null = authService.getDecodedToken(accessToken);
      if (decodedToken) {
        redirectService.redirectOnSuccessLogin(decodedToken.currentRole);
        return false;
      }
    }
    await router.navigate([RouteConstant.INTERNAL_SERVER_ERROR], { skipLocationChange: true });
    return false;
  }
  return true;
};
