import {FormControl, FormGroup} from "@angular/forms";

export default class FormUtil {

  static markAllFieldsAsDirty(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({onlySelf: true});
      }
    });
  }

}
