import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppPageConstant} from "../../shared/constants/app-page.constant";
import {AuthGuard} from "../../shared/guards/auth/auth.guard";
import {RouteConstant} from "../../shared/constants/route.constant";
import {
  TaskerAvailabilityPageComponent
} from "./components/tasker-availability-page/tasker-availability-page.component";
import {TasklionUserRoleConstant} from "../../shared/constants/tasklion-user-role.constant";
import {
  TaskerManageAvailabilityListComponent
} from "./components/tasker-manage-availability-list/tasker-manage-availability-list.component";
import {
  TaskerAddAvailabilityPageComponent
} from "./components/tasker-add-availability-page/tasker-add-availability-page.component";
import {
  TaskerUpdateAvailabilityPageComponent
} from "./components/tasker-update-availability-page/tasker-update-availability-page.component";

const routes: Routes = [
  {
    title: AppPageConstant.AVAILABILITY,
    path: `${RouteConstant.TASKER}/${RouteConstant.AVAILABILITY}`,
    component: TaskerAvailabilityPageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [TasklionUserRoleConstant.TASKER]},
    children: [
      {
        title: AppPageConstant.AVAILABILITY,
        path: '',
        component: TaskerManageAvailabilityListComponent,
        canActivate: [AuthGuard],
      },
      {
        title: AppPageConstant.AVAILABILITY,
        path: RouteConstant.ADD,
        component: TaskerAddAvailabilityPageComponent,
        canActivate: [AuthGuard],
      },
      {
        title: AppPageConstant.AVAILABILITY,
        path: `:availabilityId/${RouteConstant.EDIT}`,
        component: TaskerUpdateAvailabilityPageComponent,
        canActivate: [AuthGuard],
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskerAvailabilityRoutingModule { }
