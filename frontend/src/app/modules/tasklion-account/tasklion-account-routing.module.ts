import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasklionAccountDetailComponent} from "./components/tasklion-account-detail/tasklion-account-detail.component";
import {AuthGuard} from 'src/app/shared/guards/auth/auth.guard';
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {AppPageConstant} from 'src/app/shared/constants/app-page.constant';
import {
  TasklionAccountChangePasswordComponent
} from "./components/tasklion-account-change-password/tasklion-account-change-password.component";
import {TasklionAccountFormComponent} from "./components/tasklion-account-form/tasklion-account-form.component";
import {TasklionUserRoleConstant} from "../../shared/constants/tasklion-user-role.constant";

const routes: Routes = [
  {
    title: AppPageConstant.TASKLION_ACCOUNT,
    path: RouteConstant.TASKLION_ACCOUNT,
    component: TasklionAccountDetailComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [TasklionUserRoleConstant.TASKER, TasklionUserRoleConstant.CUSTOMER]},
    children: [
      {
        title: AppPageConstant.TASKLION_ACCOUNT,
        path: '',
        component: TasklionAccountFormComponent,
        canActivate: [AuthGuard],
      },
      {
        title: AppPageConstant.CHANGE_PASSWORD,
        path: RouteConstant.CHANGE_PASSWORD,
        component: TasklionAccountChangePasswordComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasklionAccountRoutingModule { }
