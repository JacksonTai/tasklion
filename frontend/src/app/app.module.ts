import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TaskPageComponent} from './components/task/task-page.component';
import {AppRoutesModule} from "./app.routes.module";
import {HomeHeaderComponent} from './shared/components/home/home-header/home-header.component';
import {HomeNavbarComponent} from './shared/components/home/home-navbar/home-navbar.component';
import {HomeFooterComponent} from './shared/components/home/home-footer/home-footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {LoginFormComponent} from './components/auth/login/login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ENVIRONMENT} from "./shared/services/environment/environment";
import {ValidationPipe} from './shared/pipes/validation/validation.pipe';
import {AuthInterceptor} from "./interceptors/auth-interceptor/auth.interceptor";
import {CookieModule} from "ngx-cookie";
import {AboutPageComponent} from './components/about/about-page.component';
import {ContactPageComponent} from './components/contact/contact-page.component';
import {ServicePageComponent} from './components/service/service-page.component';
import {LegalPageComponent} from './components/legal/legal-page.component';
import {PrivacyPolicyPageComponent} from './components/privacy-policy/privacy-policy-page.component';
import {FaqPageComponent} from './components/faq/faq-page.component';
import {UserPageComponent} from './components/user/user-page.component';
import {StatisticPageComponent} from './components/statistic/statistic-page.component';
import {ProfilePageComponent} from './components/profile/profile-page.component';
import {DashIfEmptyPipe} from './shared/pipes/dash-if-empty/dash-if-empty.pipe';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageNotFoundComponent} from './shared/components/page/page-not-found/page-not-found.component';
import {RegistrationFormComponent} from './components/auth/registration/registration-form/registration-form.component';
import {CustomerFormComponent} from './shared/components/form/customer-form/customer-form.component';
import {
  InternalServerErrorPageComponent
} from './shared/components/page/internal-server-error-page/internal-server-error-page.component';
import {
  UnderMaintenancePageComponent
} from './shared/components/page/under-maintenance-page/under-maintenance-page.component';
import {ErrorFieldComponent} from './shared/components/error-field/error-field.component';
import {LogoComponent} from './shared/components/logo/logo.component';
import {NgxGpAutocompleteModule} from "@angular-magic/ngx-gp-autocomplete";
import {Loader} from "@googlemaps/js-api-loader";
import {
  PersonalDetailFormComponent
} from './shared/components/form/personal-detail-form/personal-detail-form.component';
import {AccountDetailFormComponent} from './shared/components/form/account-detail-form/account-detail-form.component';
import {AddressDetailFormComponent} from './shared/components/form/address-detail-form/address-detail-form.component';
import {TaskerFormComponent} from './shared/components/form/tasker-form/tasker-form.component';
import {ServiceDetailFormComponent} from './shared/components/form/service-detail-form/service-detail-form.component';
import {SearchTaskerFormComponent} from './shared/components/form/search-tasker-form/search-tasker-form.component';
import {TaskerDetailFormComponent} from './shared/components/form/tasker-detail-form/tasker-detail-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskPageComponent,
    HomeHeaderComponent,
    HomeNavbarComponent,
    HomeFooterComponent,
    LandingPageComponent,
    LoginFormComponent,
    ErrorFieldComponent,
    ValidationPipe,
    AboutPageComponent,
    ContactPageComponent,
    ServicePageComponent,
    LegalPageComponent,
    PrivacyPolicyPageComponent,
    FaqPageComponent,
    UserPageComponent,
    StatisticPageComponent,
    ProfilePageComponent,
    DashIfEmptyPipe,
    DashboardComponent,
    PageNotFoundComponent,
    RegistrationFormComponent,
    CustomerFormComponent,
    InternalServerErrorPageComponent,
    UnderMaintenancePageComponent,
    ErrorFieldComponent,
    LogoComponent,
    PersonalDetailFormComponent,
    PersonalDetailFormComponent,
    AccountDetailFormComponent,
    AddressDetailFormComponent,
    TaskerFormComponent,
    ServiceDetailFormComponent,
    SearchTaskerFormComponent,
    TaskerDetailFormComponent,
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
    NgxGpAutocompleteModule,
  ],
  providers: [
    {provide: ENVIRONMENT, useValue: environment},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {
      provide: Loader,
      useValue: new Loader(
        {
          apiKey: environment.googleMapApiKey,
          libraries: ['places'],
        }
      )
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
