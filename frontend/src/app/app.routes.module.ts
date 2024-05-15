import {NgModule} from '@angular/core';
import {TaskPageComponent} from "./components/task/task-page.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginFormComponent} from "./components/auth/login/login-form/login-form.component";
import {RouteConstant} from "./shared/constants/route.constant";
import {AppPageConstant} from "./shared/constants/app-page.constant";
import {AppConstant} from "./shared/constants/app.constant";
import {AuthGuard} from "./guards/auth/auth.guard";
import {NoAuthGuard} from "./guards/no-auth/no-auth.guard";
import {AboutPageComponent} from "./components/about/about-page.component";
import {ServicePageComponent} from "./components/service/service-page.component";
import {ContactPageComponent} from "./components/contact/contact-page.component";
import {FaqPageComponent} from "./components/faq/faq-page.component";
import {LegalPageComponent} from "./components/legal/legal-page.component";
import {PrivacyPolicyPageComponent} from "./components/privacy-policy/privacy-policy-page.component";
import {ProfilePageComponent} from "./components/profile/profile-page.component";
import {UserRoleConstant} from "./shared/constants/user-role.constant";
import {UserPageComponent} from "./components/user/user-page.component";
import {StatisticPageComponent} from "./components/statistic/statistic-page.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PageNotFoundComponent} from "./shared/components/page/page-not-found/page-not-found.component";
import {RegistrationFormComponent} from "./components/auth/registration/registration-form/registration-form.component";

const routes: Routes = [
  {
    title: AppConstant.TASKLION,
    path: RouteConstant.ROOT,
    component: LandingPageComponent,
    canActivate: [NoAuthGuard],
  },
  {
    title: AppPageConstant.LOGIN,
    path: RouteConstant.LOGIN,
    component: LoginFormComponent,
    canActivate: [NoAuthGuard],
  },
  {
    title: AppPageConstant.REGISTER,
    path: RouteConstant.REGISTER,
    component: RegistrationFormComponent,
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
    component: AboutPageComponent,
  },
  {
    title: AppPageConstant.SERVICE,
    path: RouteConstant.SERVICE,
    component: ServicePageComponent,
  },
  {
    title: AppPageConstant.CONTACT,
    path: RouteConstant.CONTACT,
    component: ContactPageComponent,
  },
  {
    title: AppPageConstant.FAQ,
    path: RouteConstant.FAQ,
    component: FaqPageComponent,
  },
  {
    title: AppPageConstant.LEGAL,
    path: RouteConstant.LEGAL,
    component: LegalPageComponent,
  },
  {
    title: AppPageConstant.PRIVACY_POLICY,
    path: RouteConstant.PRIVACY_POLICY,
    component: PrivacyPolicyPageComponent,
  },
  {
    title: AppPageConstant.TASK,
    path: RouteConstant.TASK,
    component: TaskPageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [UserRoleConstant.CUSTOMER, UserRoleConstant.TASKER]}

  },
  {
    title: AppPageConstant.PROFILE,
    path: RouteConstant.PROFILE,
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    title: AppPageConstant.USER,
    path: RouteConstant.USER,
    component: UserPageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [UserRoleConstant.ADMIN]}
  },
  {
    title: AppPageConstant.STATISTIC,
    path: RouteConstant.STATISTIC,
    component: StatisticPageComponent,
    canActivate: [AuthGuard],
    data: {requiredRoles: [UserRoleConstant.ADMIN]}
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule {
}
