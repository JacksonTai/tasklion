import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export namespace FormValidator {

  export function minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const dob: Date = new Date(control.value);
        const today: Date = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const isMonthBirthday: boolean = (today.getMonth() === dob.getMonth()) && (today.getDate() >= dob.getDate());
        const ageDiffInMonths: number = (today.getMonth() - dob.getMonth()) + (12 * age);
        if (!isMonthBirthday) {
          age--;
        }
        if (ageDiffInMonths < 0 || (ageDiffInMonths === 0 && !isMonthBirthday)) {
          age--;
        }
        return age < minAge ? {minAge: {requiredAge: minAge}} : null;
      }
      return null;
    };
  }

  export function matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl):
      ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent && !!control.parent.value &&
      control.value === (control.parent?.controls as any)[matchTo].value ? null : {match: true};
    };
  }

}
