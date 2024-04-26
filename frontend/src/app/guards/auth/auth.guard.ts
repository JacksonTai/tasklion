import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../shared/services/auth/auth.service";
import {RouteConstant} from "../../shared/constants/route.constant";

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    if (state.url.includes(RouteConstant.LOGIN) || state.url.includes(RouteConstant.REGISTER)) {
      router.navigate([RouteConstant.ROOT]);
      return false;
    }
    return true;
  }
  router.navigate([RouteConstant.LOGIN]);
  return false;
};
