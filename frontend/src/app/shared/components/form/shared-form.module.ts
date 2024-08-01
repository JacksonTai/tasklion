import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from "./login-form/login-form.component";
import {ErrorFieldComponent} from "./error-field/error-field.component";
import {SharedModule} from "../../shared.module";
import {SharedButtonsModule} from "../buttons/shared-buttons.module";

const sharedFormComponents = [
  LoginFormComponent,
  ErrorFieldComponent,
];

@NgModule({
  declarations: sharedFormComponents,
    imports: [
        CommonModule,
        SharedModule,
        SharedButtonsModule,
    ],
  exports: sharedFormComponents
})
export class SharedFormModule { }
