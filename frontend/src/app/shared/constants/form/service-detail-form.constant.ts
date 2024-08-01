import {ValidationMessagesModel} from "../../models/validation-messages.model";

export class ServiceDetailFormConstant {

  public static readonly FORM_ID: string = 'serviceDetailForm';
  public static readonly VALIDATION_MESSAGE: ValidationMessagesModel = {
    category: {
      required: 'Category is required',
      maxlength: 'Category cannot be more than 50 characters',
    },
    description: {
      required: 'Description is required',
    },
  }

}
