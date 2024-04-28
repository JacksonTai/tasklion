import {NgModule} from '@angular/core';
import {TaskComponent} from "./components/task/task.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/auth/login/login.component";
import {RouteConstant} from "./shared/constants/route.constant";
import {AppPageConstant} from "./shared/constants/app-page.constant";
import {AppConstant} from "./shared/constants/app.constant";
import {AuthGuard} from "./guards/auth/auth.guard";
import {NoAuthGuard} from "./guards/no-auth/no-auth.guard";
import {AboutComponent} from "./components/about/about.component";
import {ServiceComponent} from "./components/service/service.component";
import {ContactComponent} from "./components/contact/contact.component";
import {FaqComponent} from "./components/faq/faq.component";
import {LegalComponent} from "./components/legal/legal.component";
import {PrivacyPolicyComponent} from "./components/privacy-policy/privacy-policy.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {UserRoleConstant} from "./shared/constants/user-role.constant";
import {UserComponent} from "./components/user/user.component";
import {StatisticComponent} from "./components/statistic/statistic.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    title: AppConstant.TASKLION,
    path: RouteConstant.ROOT,
    component: LandingPageComponent,
  },
  {
    title: AppPageConstant.LOGIN,
    path: RouteConstant.LOGIN,
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    title: AppPageConstant.REGISTER,
    path: RouteConstant.REGISTER,
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  {
    title: AppPageConstant.DASHBOARD,
    path: RouteConstant.DASHBOARD,
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    title: AppPageConstant.ABOUT,
    path: RouteConstant.ABOUT,
    component: AboutComponent,
  },
  {
    title: AppPageConstant.SERVICE,
    path: RouteConstant.SERVICE,
    component: ServiceComponent,
  },
  {
    title: AppPageConstant.CONTACT,
    path: RouteConstant.CONTACT,
    component: ContactComponent,
  },
  {
    title: AppPageConstant.FAQ,
    path: RouteConstant.FAQ,
    component: FaqComponent,
  },
  {
    title: AppPageConstant.LEGAL,
    path: RouteConstant.LEGAL,
    component: LegalComponent,
  },
  {
    title: AppPageConstant.PRIVACY_POLICY,
    path: RouteConstant.PRIVACY_POLICY,
    component: PrivacyPolicyComponent,
  },
  {
    title: AppPageConstant.TASK,
    path: RouteConstant.TASK,
    component: TaskComponent,
    canActivate: [AuthGuard],
  },
  {
    title: AppPageConstant.PROFILE,
    path: RouteConstant.PROFILE,
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    title: AppPageConstant.USER,
    path: RouteConstant.USER,
    component: UserComponent,
    canActivate: [AuthGuard],
    data: {roles: [UserRoleConstant.ADMIN]}
  },
  {
    title: AppPageConstant.STATISTIC,
    path: RouteConstant.STATISTIC,
    component: StatisticComponent,
    canActivate: [AuthGuard],
    data: {roles: [UserRoleConstant.ADMIN]}
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule {
}
