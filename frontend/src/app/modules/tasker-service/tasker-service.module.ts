import {NgModule} from '@angular/core';

import {TaskerServiceRoutingModule} from './tasker-service-routing.module';
import {TaskerServiceDetailComponent} from './components/tasker-service-detail/tasker-service-detail.component';
import {TaskerServiceListComponent} from './components/tasker-service-list/tasker-service-list.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {SharedContentModule} from 'src/app/shared/components/content/shared-content.module';
import {TaskerServicesFormComponent} from "./components/tasker-services-form/tasker-services-form.component";
import {SharedFormModule} from "../../shared/components/form/shared-form.module";
import {SharedButtonsModule} from "../../shared/components/buttons/shared-buttons.module";
import {TaskerServicePageComponent} from "./components/tasker-service-page/tasker-service-page.component";
import {TaskerAddServicePageComponent} from './components/tasker-add-service-page/tasker-add-service-page.component';
import {TaskerServiceFormComponent} from './components/tasker-service-form/tasker-service-form.component';
import {TaskerEditServicePageComponent} from './components/tasker-edit-service-page/tasker-edit-service-page.component';
import {ModalModule} from "../../shared/components/modal/modal.module";
import {ServiceAreaFormComponent} from './service-area/components/service-area-form/service-area-form.component';
import {
  ServiceReviewListComponent
} from "./service-review/components/service-review-list/service-review-list.component";
import {
  AddServiceAreaPageComponent
} from './service-area/components/add-service-area-page/add-service-area-page.component';
import {
  EditServiceAreaPageComponent
} from './service-area/components/edit-service-area-page/edit-service-area-page.component';
import {ServiceAreaPageComponent} from './service-area/components/service-area-page/service-area-page.component';
import {ServiceAreaListComponent} from './service-area/components/service-area-list/service-area-list.component';
import {
  ServiceReviewFormComponent
} from './service-review/components/service-review-form/service-review-form.component';


@NgModule({
  declarations: [
    TaskerServiceListComponent,
    TaskerServiceDetailComponent,
    ServiceReviewListComponent,
    TaskerServiceFormComponent,
    TaskerServicesFormComponent,
    TaskerServicePageComponent,
    TaskerAddServicePageComponent,
    ServiceAreaFormComponent,
    TaskerEditServicePageComponent,
    AddServiceAreaPageComponent,
    EditServiceAreaPageComponent,
    ServiceAreaPageComponent,
    ServiceAreaListComponent,
    ServiceReviewFormComponent,
  ],
    imports: [
        TaskerServiceRoutingModule,
        SharedModule,
        SharedContentModule,
        SharedFormModule,
        SharedButtonsModule,
        ModalModule,
    ],
  exports: [
    TaskerServiceListComponent,
    ServiceAreaFormComponent,
    TaskerServicesFormComponent,
  ]
})
export class TaskerServiceModule {
}
