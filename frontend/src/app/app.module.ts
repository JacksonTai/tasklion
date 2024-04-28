import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {TaskComponent} from './components/task/task.component';
import {AppRoutesModule} from "./app.routes.module";
import {HomeHeaderComponent} from './shared/components/home/home-header/home-header.component';
import {HomeNavbarComponent} from './shared/components/home/home-navbar/home-navbar.component';
import {HomeFooterComponent} from './shared/components/home/home-footer/home-footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {LoginComponent} from './components/auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ENVIRONMENT} from "./shared/services/environment/environment";
import {ErrorFieldComponent} from './shared/components/error-field/error-field.component';
import {ValidationPipe} from './shared/pipe/validation/validation.pipe';
import {HomeComponent} from './components/home/home.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {CookieModule} from "ngx-cookie";
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceComponent } from './components/service/service.component';
import { LegalComponent } from './components/legal/legal.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { FaqComponent } from './components/faq/faq.component';
import { UserComponent } from './components/user/user.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashIfEmptyPipe } from './shared/pipe/dash-if-empty/dash-if-empty.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TaskComponent,
    HomeHeaderComponent,
    HomeNavbarComponent,
    HomeFooterComponent,
    LandingPageComponent,
    LoginComponent,
    ErrorFieldComponent,
    ValidationPipe,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ServiceComponent,
    LegalComponent,
    PrivacyPolicyComponent,
    FaqComponent,
    UserComponent,
    StatisticComponent,
    ProfileComponent,
    DashIfEmptyPipe,
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CookieModule.withOptions(),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: ENVIRONMENT, useValue: environment},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
