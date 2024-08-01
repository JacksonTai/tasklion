import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppPageConstant} from 'src/app/shared/constants/app-page.constant';
import {RouteConstant} from "../../shared/constants/route.constant";
import {TasklionUserRoleConstant} from 'src/app/shared/constants/tasklion-user-role.constant';
import {AuthGuard} from 'src/app/shared/guards/auth/auth.guard';
import {AdminLoginPageComponent} from "./components/admin-login-page/admin-login-page.component";
import {AdminManageUserComponent} from "./components/admin-manage-user/admin-manage-user.component";
import {AdminStatisticPageComponent} from "./components/admin-statistic-page/admin-statistic-page.component";
import {AdminAddUserPageComponent} from "./components/admin-add-user-page/admin-add-user-page.component";
import {AdminManageUserListComponent} from "./components/admin-manage-user-list/admin-manage-user-list.component";
import {
  CustomerRecordTableComponent
} from "../customer/components/customer-record-table/customer-record-table.component";
import {TaskerRecordTableComponent} from "../tasker/components/tasker-record-table/tasker-record-table.component";


const routes: Routes = [
  {
    title: AppPageConstant.LOGIN,
    path: RouteConstant.ADMIN_LOGIN,
    component: AdminLoginPageComponent,
  },
  {
    title: AppPageConstant.USER,
    path: RouteConstant.USER,
    component: AdminManageUserComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [TasklionUserRoleConstant.ADMIN]},
    children: [
      {
        title: AppPageConstant.USER,
        path: '',
        component: AdminManageUserListComponent,
        canActivate: [AuthGuard],
        children: [
          {
            title: AppPageConstant.USER,
            path: '',
            component: CustomerRecordTableComponent,
          },
          {
            title: AppPageConstant.USER,
            path: RouteConstant.CUSTOMER,
            component: CustomerRecordTableComponent,
            canActivate: [AuthGuard],
          },
          {
            title: AppPageConstant.USER,
            path: RouteConstant.TASKER,
            component: TaskerRecordTableComponent,
            canActivate: [AuthGuard],
          },
        ]
      },
      {
        title: AppPageConstant.USER,
        path: RouteConstant.ADD,
        component: AdminAddUserPageComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    title: AppPageConstant.STATISTIC,
    path: RouteConstant.STATISTIC,
    component: AdminStatisticPageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [TasklionUserRoleConstant.ADMIN]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
