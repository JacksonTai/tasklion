import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {TaskComponent} from './components/task/task.component';
import {AppRoutesModule} from "./app.routes.module";
import {HomeHeaderComponent} from './shared/components/home/home-header/home-header.component';
import {HomeNavbarComponent} from './shared/components/home/home-navbar/home-navbar.component';
import {HomeFooterComponent} from './shared/components/home/home-footer/home-footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {DevTemplateComponent} from './shared/components/dev-template/dev-template.component';
import { LoginComponent } from './components/login/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TaskComponent,
    HomeHeaderComponent,
    HomeNavbarComponent,
    HomeFooterComponent,
    LandingPageComponent,
    DevTemplateComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
