import {NgModule} from '@angular/core';
import {TaskComponent} from "./components/task/task.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/auth/login/login.component";
import {RouteConstant} from "./shared/constants/route.constant";
import {AppPageConstant} from "./shared/constants/app.page.constant";
import {AppConstant} from "./shared/constants/app.constant";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {NoAuthGuard} from "./guards/no-auth/no.auth.guard";
import {AboutComponent} from "./components/about/about.component";
import {ServiceComponent} from "./components/service/service.component";
import {ContactComponent} from "./components/contact/contact.component";
import {FaqComponent} from "./components/faq/faq.component";
import {LegalComponent} from "./components/legal/legal.component";
import {PrivacyPolicyComponent} from "./components/privacy-policy/privacy-policy.component";

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
    canActivate: [NoAuthGuard],
  },
  {
    title: AppPageConstant.REGISTER,
    path: RouteConstant.REGISTER,
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
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
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule {
}
