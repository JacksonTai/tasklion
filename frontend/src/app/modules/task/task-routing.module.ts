import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppPageConstant} from "../../shared/constants/app-page.constant";
import {RouteConstant} from "../../shared/constants/route.constant";
import {AuthGuard} from "../../shared/guards/auth/auth.guard";
import {TasklionUserRoleConstant} from "../../shared/constants/tasklion-user-role.constant";
import {TaskListComponent} from "./components/task-list/task-list.component";
import {TaskDetailPageComponent} from './components/task-detail-page/task-detail-page.component';
import {UpdateTaskPageComponent} from "./components/update-task-page/update-task-page.component";
import {TaskPageComponent} from "./components/task-page/task-page.component";
import {
  ServiceReviewFormComponent
} from "../tasker-service/service-review/components/service-review-form/service-review-form.component";

const routes: Routes = [
  {
    title: AppPageConstant.TASK,
    path: `${RouteConstant.TASK}`,
    component: TaskPageComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: [
        TasklionUserRoleConstant.CUSTOMER,
        TasklionUserRoleConstant.TASKER
      ]
    },
    children: [
      {
        title: AppPageConstant.TASK,
        path: ``,
        component: TaskListComponent,
        canActivate: [AuthGuard],
      },
      {
        title: AppPageConstant.TASK,
        path: `:taskId`,
        component: TaskDetailPageComponent,
        canActivate: [AuthGuard],
      },
      {
        title: AppPageConstant.TASK,
        path: `:taskId/${RouteConstant.EDIT}`,
        component: UpdateTaskPageComponent,
        canActivate: [AuthGuard],
      },
      {
        title: AppPageConstant.TASK,
        path: `:taskId/${RouteConstant.REVIEW}/${RouteConstant.ADD}`,
        component: ServiceReviewFormComponent,
        canActivate: [AuthGuard],
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {
}
