import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app.routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CookieModule} from "ngx-cookie";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {SharedLayoutModule} from "./shared/components/layout/shared-layout.module";
import {TaskerModule} from "./modules/tasker/tasker.module";
import {TaskerServiceModule} from './modules/tasker-service/tasker-service.module';
import {CustomerModule} from './modules/customer/customer.module';
import {InfoModule} from './modules/info/info.module';
import {HomeModule} from './modules/home/home.module';
import {TaskModule} from "./modules/task/task.module";
import {TasklionAccountModule} from "./modules/tasklion-account/tasklion-account.module";
import {TaskerAvailabilityModule} from "./modules/tasker-availability/tasker-availability.module";
import {BookingModule} from "./modules/booking/booking.module";
import {AdminModule} from './modules/admin/admin.module';


const featureModules = [
  HomeModule,
  InfoModule,
  TaskModule,
  TaskerServiceModule,
  TaskerAvailabilityModule,
  CustomerModule,
  TaskerModule,
  AdminModule,
  BookingModule,
  TasklionAccountModule
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CookieModule.withOptions(),
    CoreModule,
    SharedModule,
    SharedLayoutModule,
    ...featureModules,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
