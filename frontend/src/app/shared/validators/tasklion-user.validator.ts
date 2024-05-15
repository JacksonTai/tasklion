import {AsyncValidatorFn} from "@angular/forms";
import {TasklionUserService} from "../../services/tasklion-user/tasklion-user.service";
import {CommonValidator} from "./common.validator";

export namespace TasklionUserValidator {

  import existsValidator = CommonValidator.existsValidator;

  export const usernameExistsValidator = (tasklionUserService: TasklionUserService): AsyncValidatorFn =>
    existsValidator(tasklionUserService, 'username', 'usernameExists');

  export const emailExistsValidator = (tasklionUserService: TasklionUserService): AsyncValidatorFn =>
    existsValidator(tasklionUserService, 'email', 'emailExists');

}
