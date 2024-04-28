import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../shared/services/auth/auth.service";
import {RouteConstant} from "../../shared/constants/route.constant";

export const AuthGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isAuthenticated()) {
    const {requiredRoles} = route.data;
    if (!requiredRoles) {
      return true;
    }

    const roles: string[] | undefined = authService.getDecodedAccessToken()?.roles;
    if (roles && requiredRoles?.some((requiredRole: string) => roles.includes(requiredRole))) {
      return true;
    }
  }
  router.navigate([RouteConstant.LOGIN]);
  return false;

};
