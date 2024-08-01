import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TaskRoutingModule} from './task-routing.module';
import {TaskListComponent} from './components/task-list/task-list.component';
import {TaskerServiceModule} from "../tasker-service/tasker-service.module";
import {SharedModule} from "../../shared/shared.module";
import {SharedContentModule} from "../../shared/components/content/shared-content.module";
import {TaskPageComponent} from './components/task-page/task-page.component';
import {TaskDetailPageComponent} from './components/task-detail-page/task-detail-page.component';
import {UpdateTaskPageComponent} from './components/update-task-page/update-task-page.component';
import {ModalModule} from "../../shared/components/modal/modal.module";
import {CalendarModule} from "primeng/calendar";
import {SharedFormModule} from "../../shared/components/form/shared-form.module";
import {SharedButtonsModule} from "../../shared/components/buttons/shared-buttons.module";


@NgModule({
  declarations: [
    TaskPageComponent,
    TaskListComponent,
    TaskDetailPageComponent,
    UpdateTaskPageComponent
  ],
  exports: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    TaskerServiceModule,
    SharedModule,
    SharedContentModule,
    ModalModule,
    CalendarModule,
    SharedFormModule,
    SharedButtonsModule
  ]
})
export class TaskModule {
}
