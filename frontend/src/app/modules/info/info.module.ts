import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InfoRoutingModule} from './info-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {AboutPageComponent} from './about/about-page.component';
import {ContactPageComponent} from './contact/contact-page.component';
import {FaqPageComponent} from './faq/faq-page.component';
import {LegalPageComponent} from './legal/legal-page.component';
import {PrivacyPolicyPageComponent} from './privacy-policy/privacy-policy-page.component';


@NgModule({
  declarations: [
    AboutPageComponent,
    ContactPageComponent,
    FaqPageComponent,
    LegalPageComponent,
    PrivacyPolicyPageComponent,
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    SharedModule,
  ]
})
export class InfoModule { }
