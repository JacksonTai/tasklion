import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TaskerAvailabilityRoutingModule} from './tasker-availability-routing.module';
import {SharedButtonsModule} from "../../shared/components/buttons/shared-buttons.module";
import {TaskerModule} from "../tasker/tasker.module";
import {TaskerServiceModule} from "../tasker-service/tasker-service.module";
import {SharedContentModule} from "../../shared/components/content/shared-content.module";
import {
  TaskerAvailabilityPageComponent
} from './components/tasker-availability-page/tasker-availability-page.component';
import {
  TaskerAvailabilityFormComponent
} from './components/tasker-availability-form/tasker-availability-form.component';
import {
  TaskerManageAvailabilityListComponent
} from './components/tasker-manage-availability-list/tasker-manage-availability-list.component';
import {
  TaskerAddAvailabilityPageComponent
} from './components/tasker-add-availability-page/tasker-add-availability-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedFormModule} from "../../shared/components/form/shared-form.module";
import {SharedModule} from "../../shared/shared.module";
import {CalendarModule} from "primeng/calendar";
import {ModalModule} from "../../shared/components/modal/modal.module";
import {
  TaskerUpdateAvailabilityPageComponent
} from './components/tasker-update-availability-page/tasker-update-availability-page.component';
import {
  TaskerAvailabilityUpdateFormComponent
} from './components/tasker-availability-update-form/tasker-availability-update-form.component';


@NgModule({
  declarations: [
    TaskerAvailabilityPageComponent,
    TaskerAvailabilityFormComponent,
    TaskerManageAvailabilityListComponent,
    TaskerAddAvailabilityPageComponent,
    TaskerUpdateAvailabilityPageComponent,
    TaskerAvailabilityUpdateFormComponent
  ],
    imports: [
        CommonModule,
        TaskerAvailabilityRoutingModule,
        SharedButtonsModule,
        TaskerModule,
        TaskerServiceModule,
        SharedContentModule,
        ReactiveFormsModule,
        SharedFormModule,
        SharedModule,
        CalendarModule,
        ModalModule
    ]
})
export class TaskerAvailabilityModule { }
