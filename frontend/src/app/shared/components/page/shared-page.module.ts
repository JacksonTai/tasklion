import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingOverlayPageComponent} from './loading-overlay-page/loading-overlay-page.component';
import {InternalServerErrorPageComponent} from "./internal-server-error-page/internal-server-error-page.component";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UnderMaintenancePageComponent} from "./under-maintenance-page/under-maintenance-page.component";
import {SharedContentModule} from "../content/shared-content.module";
import {SharedModule} from "../../shared.module";

const sharedPageComponents = [
  LoadingOverlayPageComponent,
  InternalServerErrorPageComponent,
  PageNotFoundComponent,
  UnderMaintenancePageComponent,
];

@NgModule({
  declarations: sharedPageComponents,
  imports: [
    CommonModule,
    SharedContentModule,
    SharedModule,
  ],
  exports: sharedPageComponents
})
export class SharedPageModule { }
