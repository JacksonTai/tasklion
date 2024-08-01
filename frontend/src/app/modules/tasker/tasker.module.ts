import {NgModule} from '@angular/core';

import {TaskerRoutingModule} from './tasker-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {SharedFormModule} from "../../shared/components/form/shared-form.module";
import {SharedButtonsModule} from "../../shared/components/buttons/shared-buttons.module";
import {SharedContentModule} from "../../shared/components/content/shared-content.module";
import {
  TaskerContinueTasklionMenuComponent
} from './components/tasker-continue-tasklion-menu/tasker-continue-tasklion-menu.component';
import {
  TaskerCreateTasklionMenuComponent
} from './components/tasker-create-tasklion-menu/tasker-create-tasklion-menu.component';
import {TaskerLoginPageComponent} from './components/tasker-login-page/tasker-login-page.component';
import {
  TaskerRegistrationOptionMenuComponent
} from './components/tasker-registration-option-menu/tasker-registration-option-menu.component';
import {
  TaskerRegistrationPageComponent
} from './components/tasker-registration-page/tasker-registration-page.component';
import {TaskerDashboardPageComponent} from './components/tasker-dashboard-page/tasker-dashboard-page.component';
import {TaskerDetailPageComponent} from './components/tasker-detail-page/tasker-detail-page.component';
import {TaskerServiceModule} from "../tasker-service/tasker-service.module";
import {TaskModule} from "../task/task.module";
import {TaskerProfilePageComponent} from './components/tasker-profile-page/tasker-profile-page.component';
import {TaskerDetailFormComponent} from './components/tasker-detail-form/tasker-detail-form.component';
import {TasklionAccountModule} from "../tasklion-account/tasklion-account.module";
import {TaskerRecordTableComponent} from './components/tasker-record-table/tasker-record-table.component';
import {ModalModule} from "../../shared/components/modal/modal.module";


@NgModule({
  declarations: [
    TaskerContinueTasklionMenuComponent,
    TaskerCreateTasklionMenuComponent,
    TaskerLoginPageComponent,
    TaskerRegistrationOptionMenuComponent,
    TaskerRegistrationPageComponent,
    TaskerDashboardPageComponent,
    TaskerDetailPageComponent,
    TaskerDetailFormComponent,
    TaskerProfilePageComponent,
    TaskerRecordTableComponent,
  ],
    exports: [
        TaskerDetailFormComponent,
    ],
  imports: [
    TaskerRoutingModule,
    SharedModule,
    SharedFormModule,
    SharedButtonsModule,
    SharedContentModule,
    TaskerServiceModule,
    TaskModule,
    TasklionAccountModule,
    ModalModule,
  ]
})
export class TaskerModule { }
