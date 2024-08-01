import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookingRoutingModule} from './booking-routing.module';
import {BookingTaskerPageComponent} from './components/booking-tasker-page/booking-tasker-page.component';
import {
  BookingConfirmationPageComponent
} from './components/booking-confirmation-page/booking-confirmation-page.component';
import {SharedContentModule} from "../../shared/components/content/shared-content.module";
import {SharedModule} from "../../shared/shared.module";
import {CalendarModule} from "primeng/calendar";
import {SharedButtonsModule} from "../../shared/components/buttons/shared-buttons.module";
import {SharedFormModule} from "../../shared/components/form/shared-form.module";
import {ModalModule} from "../../shared/components/modal/modal.module";


@NgModule({
  declarations: [
    BookingTaskerPageComponent,
    BookingConfirmationPageComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedContentModule,
    SharedModule,
    CalendarModule,
    SharedButtonsModule,
    SharedFormModule,
    ModalModule
  ]
})
export class BookingModule { }
