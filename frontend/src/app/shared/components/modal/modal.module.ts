import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationModalComponent} from './confirmation-modal/confirmation-modal.component';
import {InformationModalComponent} from './information-modal/information-modal.component';
import {SharedContentModule} from "../content/shared-content.module";

const modalComponents = [
  ConfirmationModalComponent,
  InformationModalComponent,
];

@NgModule({
  declarations: modalComponents,
  exports: modalComponents,
    imports: [
        CommonModule,
        SharedContentModule
    ]
})
export class ModalModule { }
