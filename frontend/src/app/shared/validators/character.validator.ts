import {AbstractControl, ValidatorFn} from "@angular/forms";

export namespace CharacterValidator {

  export function consecutiveUnderscoreValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      if (value && value.includes("__")) {
        return { consecutiveUnderscore: true};
      }
      return null;
    };
  }

  export function startEndUnderscoreValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      if (value && (value.startsWith("_") || value.endsWith("_"))) {
        return { startEndUnderscore: true };
      }
      return null;
    };
  }

}
