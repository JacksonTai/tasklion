import {ValidationMessagesModel} from "../../models/validation-messages.model";

export const LOGIN_FORM_VALIDATION_MESSAGE: ValidationMessagesModel = {
  email: {
    required: 'Email is required',
    invalid: 'Please provide a valid email',
  },
  password: {
    required: 'Password is required',
  }
};
