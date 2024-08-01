import {FormGroup} from "@angular/forms";

export default class FormUtil {

  static markAllFieldsAsDirty(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field: string): void => {
      formGroup.get(field)?.markAsDirty({onlySelf: true});
    });
  }

}
