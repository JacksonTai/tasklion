import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {map, Observable, of} from "rxjs";
import {TasklionUserService} from "../../services/user/tasklion-user.service";

export namespace TasklionUserValidator {

  export function usernameExistsValidator(tasklionUserService: TasklionUserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = control.value;
      if (!username) {
        return of(null);
      }
      return tasklionUserService.isExists({field: 'username', value: username})
        .pipe(
          map(response => {
            return response.data == true ? {usernameExists: true} : null;
          })
        );
    };
  }

  export function emailExistsValidator(tasklionUserService: TasklionUserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      if (!email) {
        return of(null);
      }
      return tasklionUserService.isExists({field: 'email', value: email})
        .pipe(
          map(response => {
            return response.data == true ? {emailExists: true} : null;
          })
        );
    };
  }


}
