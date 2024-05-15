import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from "@angular/forms";
import {debounceTime, map, Observable, of} from "rxjs";

export namespace CommonValidator {

  export function consecutiveUnderscoreValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      if (value && value.includes("__")) {
        return {consecutiveUnderscore: true};
      }
      return null;
    };
  }

  export function startEndUnderscoreValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      if (value && (value.startsWith("_") || value.endsWith("_"))) {
        return {startEndUnderscore: true};
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

  export function existsValidator(service: any, fieldName: string, errorName: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
      if (!value) {
        return of(null);
      }
      return service.isExists({field: fieldName, value: value})
        .pipe(
          debounceTime(300),
          map((response: { data: boolean }) => response.data ? {[errorName]: true} : null)
        );
    };
  }

}
