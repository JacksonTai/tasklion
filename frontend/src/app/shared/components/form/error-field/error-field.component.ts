import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'tasklion-error-field-test',
  templateUrl: './error-field.component.html',
  styleUrls: ['./error-field.component.scss']
})
export class ErrorFieldComponent {
  @Input() control!: FormControl | AbstractControl;
  @Input() errorMessages!: { [key: string]: string };

  constructor(public formDirective: FormGroupDirective) {
  }

  isInvalidField(): boolean {
    return this.control.invalid && (this.control.dirty || this.formDirective.submitted);
  }

  getErrorMessage(): string {
    return this.control && this.control.errors ? this.errorMessages[Object.keys(this.control.errors)[0]] : '';
  }
}
