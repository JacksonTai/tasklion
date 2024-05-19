import {ValidationMessagesModel} from "../../models/validation-messages.model";

export class AddressDetailFormConstant {

  public static readonly FORM_ID: string = 'addressDetailForm';
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
