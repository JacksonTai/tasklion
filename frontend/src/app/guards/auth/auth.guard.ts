import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../shared/services/auth/auth.service";

export const AuthGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);

  if (authService.isAuthenticated()) {
    const {requiredRoles} = route.data;
    if (!requiredRoles) {
      return true;
    }
    const accessToken: string | null = authService.getAccessToken();
    if (accessToken) {
      const roles: string[] | undefined = authService.getDecodedToken(accessToken)?.roles?.map(
        role => role.replace('ROLE_', ''));
      return roles && requiredRoles?.some((requiredRole: string) => roles.includes(requiredRole));
    }
  }
  authService.logout();
  return false;

};
