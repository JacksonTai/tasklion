import {ValidationMessagesModel} from "../../models/validation-messages.model";

export class LoginFormConstant {

  public static readonly VALIDATION_MESSAGE: ValidationMessagesModel = {
    email: {
      required: 'Email is required',
      invalid: 'Please provide a valid email',
    },
    password: {
      required: 'Password is required',
    }
  };

}
