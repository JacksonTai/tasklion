import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppPageConstant} from "../../shared/constants/app-page.constant";
import {RouteConstant} from "../../shared/constants/route.constant";
import {TasklionUserRoleConstant} from "../../shared/constants/tasklion-user-role.constant";
import {NoAuthGuard} from 'src/app/shared/guards/no-auth/no-auth.guard';
import {
  TaskerRegistrationPageComponent
} from './components/tasker-registration-page/tasker-registration-page.component';
import {TaskerLoginPageComponent} from './components/tasker-login-page/tasker-login-page.component';
import {
  TaskerRegistrationOptionMenuComponent
} from './components/tasker-registration-option-menu/tasker-registration-option-menu.component';
import {
  TaskerCreateTasklionMenuComponent
} from './components/tasker-create-tasklion-menu/tasker-create-tasklion-menu.component';
import {
  TaskerContinueTasklionMenuComponent
} from './components/tasker-continue-tasklion-menu/tasker-continue-tasklion-menu.component';
import {TaskerDashboardPageComponent} from './components/tasker-dashboard-page/tasker-dashboard-page.component';
import {AuthGuard} from 'src/app/shared/guards/auth/auth.guard';
import {
  TaskerServiceDetailComponent
} from '../tasker-service/components/tasker-service-detail/tasker-service-detail.component';
import {TaskerDetailPageComponent} from "./components/tasker-detail-page/tasker-detail-page.component";
import {
  TaskerServiceListComponent
} from "../tasker-service/components/tasker-service-list/tasker-service-list.component";
import {TaskerProfilePageComponent} from "./components/tasker-profile-page/tasker-profile-page.component";

const routes: Routes = [
  {
    title: AppPageConstant.LOGIN,
    path: RouteConstant.TASKER_LOGIN,
    component: TaskerLoginPageComponent,
    canActivate: [NoAuthGuard],
  },
  {
    title: AppPageConstant.REGISTER,
    path: RouteConstant.TASKER_REGISTER,
    component: TaskerRegistrationPageComponent,
    canActivate: [NoAuthGuard],
    children: [
      {
        title: AppPageConstant.REGISTER,
        path: '',
        component: TaskerRegistrationOptionMenuComponent,
      },
      {
        title: AppPageConstant.REGISTER,
        path: RouteConstant.CREATE_TASKLION_ACCOUNT,
        component: TaskerCreateTasklionMenuComponent,
      },
      {
        title: AppPageConstant.REGISTER,
        path: RouteConstant.CONTINUE_WITH_TASKLION_ACCOUNT,
        component: TaskerContinueTasklionMenuComponent,
      }
    ]
  },
  {
    title: AppPageConstant.DASHBOARD,
    path: RouteConstant.TASKER_DASHBOARD,
    component: TaskerDashboardPageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [TasklionUserRoleConstant.TASKER]}
  },
  {
    title: AppPageConstant.PROFILE,
    path: `${RouteConstant.TASKER}/${RouteConstant.PROFILE}`,
    component: TaskerProfilePageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [TasklionUserRoleConstant.TASKER]}
  },

  {
    title: AppPageConstant.TASKER,
    path: RouteConstant.TASKER + `/:username`,
    component: TaskerDetailPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        title: AppPageConstant.TASKER,
        path: '',
        component: TaskerServiceListComponent,
        canActivate: [AuthGuard],
      },
      {
        title: AppPageConstant.TASKER,
        path: RouteConstant.SERVICE + `/:serviceId`,
        component: TaskerServiceDetailComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskerRoutingModule {
}
