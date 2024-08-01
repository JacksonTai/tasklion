import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppPageConstant} from "../../shared/constants/app-page.constant";
import {RouteConstant} from "../../shared/constants/route.constant";
import {ContactPageComponent} from './contact/contact-page.component';
import {FaqPageComponent} from './faq/faq-page.component';
import {PrivacyPolicyPageComponent} from './privacy-policy/privacy-policy-page.component';
import {AboutPageComponent} from './about/about-page.component';

const routes: Routes = [
  {
    title: AppPageConstant.ABOUT,
    path: RouteConstant.ABOUT,
    component: AboutPageComponent,
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
    title: AppPageConstant.PRIVACY_POLICY,
    path: RouteConstant.PRIVACY_POLICY,
    component: PrivacyPolicyPageComponent,
  },
  // {
  //   title: AppPageConstant.LEGAL,
  //   path: RouteConstant.LEGAL,
  //   component: LegalPageComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
