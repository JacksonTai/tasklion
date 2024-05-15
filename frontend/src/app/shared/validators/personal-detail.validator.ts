import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from "@angular/forms";
import {TasklionUserService} from "../../services/tasklion-user/tasklion-user.service";
import {CommonValidator} from "./common.validator";

export namespace PersonalDetailValidator {

  import existsValidator = CommonValidator.existsValidator;

  export const fullNameExistsValidator = (tasklionUserService: TasklionUserService): AsyncValidatorFn =>
    existsValidator(tasklionUserService, 'fullName', 'fullNameExists');

  export const phoneNumberExistsValidator = (tasklionUserService: TasklionUserService): AsyncValidatorFn =>
    existsValidator(tasklionUserService, 'phoneNumber', 'phoneNumberExists');

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

}
