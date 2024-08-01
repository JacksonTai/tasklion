import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppPageConstant} from 'src/app/shared/constants/app-page.constant';
import {RouteConstant} from "../../shared/constants/route.constant";
import {AuthGuard} from 'src/app/shared/guards/auth/auth.guard';
import {TaskerAddServicePageComponent} from "./components/tasker-add-service-page/tasker-add-service-page.component";
import {TaskerServicePageComponent} from "./components/tasker-service-page/tasker-service-page.component";
import {TasklionUserRoleConstant} from "../../shared/constants/tasklion-user-role.constant";
import {TaskerServiceListComponent} from "./components/tasker-service-list/tasker-service-list.component";
import {TaskerServiceDetailComponent} from "./components/tasker-service-detail/tasker-service-detail.component";
import {TaskerEditServicePageComponent} from "./components/tasker-edit-service-page/tasker-edit-service-page.component";
import {ServiceAreaPageComponent} from "./service-area/components/service-area-page/service-area-page.component";
import {
  AddServiceAreaPageComponent
} from "./service-area/components/add-service-area-page/add-service-area-page.component";
import {
  EditServiceAreaPageComponent
} from "./service-area/components/edit-service-area-page/edit-service-area-page.component";
import {ServiceAreaListComponent} from "./service-area/components/service-area-list/service-area-list.component";

const routes: Routes = [
  {
    title: AppPageConstant.SERVICE,
    path: `${RouteConstant.TASKER}/${RouteConstant.SERVICE}`,
    component: TaskerServicePageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [TasklionUserRoleConstant.TASKER]},
    children: [
      {
        title: AppPageConstant.SERVICE,
        path: '',
        component: TaskerServiceListComponent,
        canActivate: [AuthGuard],
      },
      {
        title: AppPageConstant.SERVICE,
        path: RouteConstant.ADD,
        component: TaskerAddServicePageComponent,
        canActivate: [AuthGuard],
      },
      {
        title: AppPageConstant.SERVICE,
        path: ':serviceId',
        component: TaskerServiceDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        title: AppPageConstant.SERVICE,
        path: `:serviceId/${RouteConstant.EDIT}`,
        component: TaskerEditServicePageComponent,
        canActivate: [AuthGuard],
      },
    ]
  },
  {
    title: AppPageConstant.SERVICE_AREA,
    path: RouteConstant.SERVICE_AREA,
    component: ServiceAreaPageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [TasklionUserRoleConstant.TASKER]},
    children: [
      {
        title: AppPageConstant.SERVICE_AREA,
        path: '',
        component: ServiceAreaListComponent,
        canActivate: [AuthGuard],
      },
      {
        title: AppPageConstant.SERVICE_AREA,
        path: RouteConstant.ADD,
        component: AddServiceAreaPageComponent,
        canActivate: [AuthGuard],
      },
      {
        title: AppPageConstant.SERVICE_AREA,
        path: `:serviceAreaId/${RouteConstant.EDIT}`,
        component: EditServiceAreaPageComponent,
        canActivate: [AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskerServiceRoutingModule { }
