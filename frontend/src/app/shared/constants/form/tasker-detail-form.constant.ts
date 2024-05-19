import {ValidationMessagesModel} from "../../models/validation-messages.model";

export class TaskerDetailFormConstant {

  public static readonly FORM_ID: string = 'taskerDetailForm';
  public static readonly VALIDATION_MESSAGE: ValidationMessagesModel = {
    aboutMe: {
      required: 'About me is required',
      minlength: 'Username must be at least 6 characters long.',
      maxlength: 'Username cannot exceed 30 characters.',
    },
    state: {
      required: 'State is required',
    },
    city: {
      required: 'City is required',
    },
    postcode: {
      required: 'Postcode is required',
      pattern: 'Invalid postcode',
    },
  }

}
