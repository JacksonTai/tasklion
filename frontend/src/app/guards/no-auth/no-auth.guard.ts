import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../shared/services/auth/auth.service";
import {RouteConstant} from "../../shared/constants/route.constant";

export const NoAuthGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const protectedRoutes: string[] = [
    RouteConstant.ROOT,
    RouteConstant.LOGIN,
    RouteConstant.REGISTER
  ];
  const isProtectedRoute: boolean = protectedRoutes.some(route => state.url.includes(route));

  if (authService.isAuthenticated() && isProtectedRoute) {
    router.navigate([RouteConstant.DASHBOARD]);
    return false;
  }
  return true;
};
