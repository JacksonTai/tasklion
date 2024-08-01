import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {TasklionAccountRoutingModule} from './tasklion-account-routing.module';
import {TasklionAccountDetailComponent} from './components/tasklion-account-detail/tasklion-account-detail.component';
import {SharedContentModule} from "../../shared/components/content/shared-content.module";
import {SharedFormModule} from "../../shared/components/form/shared-form.module";
import {SharedButtonsModule} from "../../shared/components/buttons/shared-buttons.module";
import {SharedModule} from "../../shared/shared.module";
import {
  TasklionAccountChangePasswordComponent
} from './components/tasklion-account-change-password/tasklion-account-change-password.component';
import {TasklionAccountFormComponent} from './components/tasklion-account-form/tasklion-account-form.component';
import {AccountDetailFormComponent} from "./components/account-detail-form/account-detail-form.component";
import {PersonalDetailFormComponent} from "./components/personal-detail-form/personal-detail-form.component";


@NgModule({
    declarations: [
        TasklionAccountDetailComponent,
        TasklionAccountChangePasswordComponent,
        TasklionAccountFormComponent,
        AccountDetailFormComponent,
        PersonalDetailFormComponent,
    ],
  exports: [
    PersonalDetailFormComponent,
    AccountDetailFormComponent
  ],
    imports: [
        CommonModule,
        TasklionAccountRoutingModule,
        SharedContentModule,
        NgOptimizedImage,
        SharedFormModule,
        SharedButtonsModule,
        SharedModule
    ]
})
export class TasklionAccountModule { }
