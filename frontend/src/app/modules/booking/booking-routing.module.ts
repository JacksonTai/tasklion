import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppPageConstant} from "../../shared/constants/app-page.constant";
import {RouteConstant} from "../../shared/constants/route.constant";
import {BookingTaskerPageComponent} from "./components/booking-tasker-page/booking-tasker-page.component";
import {AuthGuard} from "../../shared/guards/auth/auth.guard";
import {TasklionUserRoleConstant} from "../../shared/constants/tasklion-user-role.constant";
import {
  BookingConfirmationPageComponent
} from "./components/booking-confirmation-page/booking-confirmation-page.component";

const routes: Routes = [
  {
    title: AppPageConstant.BOOKING,
    path: `${RouteConstant.BOOKING}/${RouteConstant.TASKER}`,
    component: BookingTaskerPageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [TasklionUserRoleConstant.CUSTOMER]}
  },
  {
    title: AppPageConstant.BOOKING,
    path: `${RouteConstant.BOOKING}/${RouteConstant.CONFIRM}`,
    component: BookingConfirmationPageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [TasklionUserRoleConstant.CUSTOMER]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
