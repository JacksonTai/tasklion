import {NgModule} from '@angular/core';
import {TaskComponent} from "./components/task/task.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/auth/login/login.component";
import {RouteConstant} from "./shared/constants/route.constant";
import {AppPageConstant} from "./shared/constants/app.page.constant";
import {AppConstant} from "./shared/constants/app.constant";
import {HomeComponent} from "./components/home/home.component";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    title: AppConstant.TASKLION,
    path: RouteConstant.ROOT,
    component: HomeComponent,
  },
  {
    title: AppPageConstant.LOGIN,
    path: RouteConstant.LOGIN,
    component: LoginComponent,
  },
  {
    title: AppPageConstant.REGISTER,
    path: RouteConstant.REGISTER,
    component: RegisterComponent,
  },
  {
    title: AppPageConstant.TASK,
    path: RouteConstant.TASK,
    component: TaskComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule {
}
