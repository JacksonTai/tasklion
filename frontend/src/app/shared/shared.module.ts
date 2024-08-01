import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashIfEmptyPipe} from "./pipes/dash-if-empty/dash-if-empty.pipe";
import {ValidationPipe} from "./pipes/validation/validation.pipe";
import {Paginator} from "./components/paginator/paginator";
import {StepperComponent} from "./components/stepper/stepper.component";

import {CdkStepperModule} from "@angular/cdk/stepper";
import {NgxGpAutocompleteModule} from "@angular-magic/ngx-gp-autocomplete";
import {HttpClientModule} from "@angular/common/http";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {TimeFormatPipe} from "./pipes/time-format/time-format.pipe";
import {DateTimeFormatPipe} from "./pipes/date-time-format/date-time-format.pipe";

const sharedModules = [
  CommonModule,
  HttpClientModule,
  RouterModule,
  NgSelectModule,
  FormsModule,
  ReactiveFormsModule,
  CdkStepperModule,
  NgxMaterialTimepickerModule,
  NgxGpAutocompleteModule,
];

const sharedComponents = [
  DashIfEmptyPipe,
  ValidationPipe,
  TimeFormatPipe,
  DateTimeFormatPipe,
  Paginator,
  StepperComponent,
]

@NgModule({
  declarations: sharedComponents,
  imports: sharedModules,
  exports: [
    sharedModules,
    sharedComponents,
  ]
})
export class SharedModule {
}
