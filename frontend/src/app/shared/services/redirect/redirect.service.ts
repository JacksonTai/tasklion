import {Injectable} from '@angular/core';
import {RouteConstant} from "../../constants/route.constant";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor() {
  }

  redirectOnSuccessLogin(currentRole: string): void {
    switch (currentRole) {
      case 'CUSTOMER':
        window.location.href = RouteConstant.CUSTOMER_DASHBOARD;
        break;
      case 'TASKER':
        window.location.href = RouteConstant.TASK;
        break;
      case 'ADMIN':
        window.location.href = RouteConstant.STATISTIC;
        break;
      default:
        window.location.href = RouteConstant.DASHBOARD;
        break;
    }
  }

}
