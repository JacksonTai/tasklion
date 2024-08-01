import {AsyncValidatorFn} from "@angular/forms";
import {CommonValidator} from "./common.validator";
import {TasklionAccountService} from "src/app/modules/tasklion-account/services/tasklion-account.service";

export namespace TasklionUserValidator {

  import existsValidator = CommonValidator.existsValidator;

  export const usernameExistsValidator = (tasklionUserService: TasklionAccountService, currentUsername?: string): AsyncValidatorFn =>
    existsValidator(tasklionUserService, 'username', 'usernameExists', currentUsername);

  export const emailExistsValidator = (tasklionUserService: TasklionAccountService, currentEmail?: string): AsyncValidatorFn =>
    existsValidator(tasklionUserService, 'email', 'emailExists', currentEmail);

}
