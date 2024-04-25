import { CanActivateFn } from '@angular/router';
import {CookieService} from "ngx-cookie";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  console.log(cookieService.get('Authorization'))
  return true;
};
