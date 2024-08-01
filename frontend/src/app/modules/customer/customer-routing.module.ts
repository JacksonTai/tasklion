import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppPageConstant} from "../../shared/constants/app-page.constant";
import {RouteConstant} from "../../shared/constants/route.constant";
import {TasklionUserRoleConstant} from "../../shared/constants/tasklion-user-role.constant";
import {CustomerLoginPageComponent} from './components/customer-login-page/customer-login-page.component';
import {NoAuthGuard} from 'src/app/shared/guards/no-auth/no-auth.guard';
import {
  CustomerRegistrationPageComponent
} from './components/customer-registration-page/customer-registration-page.component';
import {CustomerDashboardPageComponent} from './components/customer-dashboard-page/customer-dashboard-page.component';
import {BecomeTaskerPageComponent} from './components/become-tasker-page/become-tasker-page.component';
import {AuthGuard} from 'src/app/shared/guards/auth/auth.guard';
import {CustomerDetailPageComponent} from "./components/customer-detail-page/customer-detail-page.component";

const routes: Routes = [
  {
    title: AppPageConstant.LOGIN,
    path: RouteConstant.CUSTOMER_LOGIN,
    component: CustomerLoginPageComponent,
    canActivate: [NoAuthGuard],
  },
  {
    title: AppPageConstant.REGISTER,
    path: RouteConstant.CUSTOMER_REGISTER,
    component: CustomerRegistrationPageComponent,
    canActivate: [NoAuthGuard],
  },
  {
    title: AppPageConstant.REGISTER,
    path: RouteConstant.CUSTOMER_DASHBOARD,
    component: CustomerDashboardPageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [TasklionUserRoleConstant.CUSTOMER]}
  },
  {
    title: AppPageConstant.REGISTER,
    path: RouteConstant.CUSTOMER_BECOME_A_TASKER,
    component: BecomeTaskerPageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [TasklionUserRoleConstant.CUSTOMER]}
  },
  {
    title: AppPageConstant.CUSTOMER,
    path: RouteConstant.CUSTOMER + `/:username`,
    component: CustomerDetailPageComponent,
    canActivate: [AuthGuard],
    data: {viewRole: TasklionUserRoleConstant.CUSTOMER},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
