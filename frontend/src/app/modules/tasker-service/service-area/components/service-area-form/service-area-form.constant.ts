import {ValidationMessagesModel} from "src/app/shared/models/validation-messages.model";

export class ServiceAreaFormConstant {

  public static readonly FORM_ID: string = 'serviceAreaForm';
  public static readonly VALIDATION_MESSAGE: ValidationMessagesModel = {
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
