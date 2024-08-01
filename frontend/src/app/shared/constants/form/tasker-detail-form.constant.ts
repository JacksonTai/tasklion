import {ValidationMessagesModel} from "../../models/validation-messages.model";

export class TaskerDetailFormConstant {

  public static readonly FORM_ID: string = 'taskerDetailForm';
  public static readonly VALIDATION_MESSAGE: ValidationMessagesModel = {
    aboutMe: {
      required: 'About me is required.',
      maxlength: 'About me cannot exceed 250 characters.'
    },
  }

}
