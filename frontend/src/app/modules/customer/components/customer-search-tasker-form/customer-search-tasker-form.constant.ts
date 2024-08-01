import {ValidationMessagesModel} from "../../../../shared/models/validation-messages.model";

export class CustomerSearchTaskerFormConstant {

  public static readonly VALIDATION_MESSAGE: ValidationMessagesModel  = {
    category: {
      required: 'Category is required'
    },
    state: {
      required: 'State is required'
    },
    city: {
      required: 'City is required'
    },
    postcode: {
      required: 'Postcode is required',
      pattern: 'Invalid postcode',
    },
    duration: {
      required: 'Please select one of the options'
    }
  }

}
