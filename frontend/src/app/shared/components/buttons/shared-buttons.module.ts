import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubmitButtonComponent} from "./submit-button/submit-button.component";
import {DeleteButtonComponent} from "./delete-button/delete-button.component";


const sharedButtonsComponents = [
  SubmitButtonComponent,
  DeleteButtonComponent,
];

@NgModule({
  declarations: sharedButtonsComponents,
  imports: [
    CommonModule
  ],
  exports: sharedButtonsComponents
})
export class SharedButtonsModule { }
