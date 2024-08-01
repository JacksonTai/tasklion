import {NgModule} from '@angular/core';

import {CustomerRoutingModule} from './customer-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {SharedFormModule} from "../../shared/components/form/shared-form.module";
import {SharedButtonsModule} from "../../shared/components/buttons/shared-buttons.module";
import {SharedContentModule} from "../../shared/components/content/shared-content.module";
import {TaskerServiceModule} from "../tasker-service/tasker-service.module";
import {CustomerDashboardPageComponent} from './components/customer-dashboard-page/customer-dashboard-page.component';
import {BecomeTaskerPageComponent} from './components/become-tasker-page/become-tasker-page.component';
import {CustomerDetailPageComponent} from './components/customer-detail-page/customer-detail-page.component';
import {CustomerLoginPageComponent} from './components/customer-login-page/customer-login-page.component';
import {
  CustomerRegistrationFormComponent
} from './components/customer-registration-form/customer-registration-form.component';
import {
  CustomerRegistrationPageComponent
} from './components/customer-registration-page/customer-registration-page.component';
import {TaskerModule} from "../tasker/tasker.module";
import {TasklionAccountModule} from "../tasklion-account/tasklion-account.module";
import {
  CustomerSearchTaskerFormComponent
} from './components/customer-search-tasker-form/customer-search-tasker-form.component';
import {CalendarModule} from "primeng/calendar";
import {CustomerRecordTableComponent} from './components/customer-record-table/customer-record-table.component';
import {ModalModule} from "../../shared/components/modal/modal.module";

@NgModule({
    declarations: [
        BecomeTaskerPageComponent,
        CustomerDashboardPageComponent,
        CustomerDetailPageComponent,
        CustomerLoginPageComponent,
        CustomerRegistrationFormComponent,
        CustomerRegistrationPageComponent,
        CustomerSearchTaskerFormComponent,
        CustomerRecordTableComponent,
    ],
    exports: [
        CustomerRegistrationFormComponent
    ],
  imports: [
    CustomerRoutingModule,
    SharedModule,
    SharedFormModule,
    SharedButtonsModule,
    SharedContentModule,
    TaskerServiceModule,
    TaskerModule,
    TasklionAccountModule,
    CalendarModule,
    ModalModule,
  ]
})
export class CustomerModule {
}
