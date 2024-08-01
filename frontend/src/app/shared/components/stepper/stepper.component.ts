import {Component, Input} from '@angular/core';
import {CdkStepper} from "@angular/cdk/stepper";

@Component({
  selector: 'tasklion-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]

})
export class StepperComponent extends CdkStepper {

  @Input()
  linearModeSelected: boolean = true;

  onClick(index: number): void {
    this.selectedIndex = index;
  }

}
