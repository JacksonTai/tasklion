import {ValidationMessagesModel} from "../../models/validation-messages.model";

export class PersonalDetailFormConstant {

  public static readonly FORM_ID: string = 'personalDetailForm';
  public static readonly VALIDATION_MESSAGE: ValidationMessagesModel = {
    fullName: {
      required: 'Full name is required',
      minlength: 'Full name must be at least 3 characters long',
      maxlength: 'Full name cannot be more than 50 characters',
      pattern: 'Full name can only contain alphabetic characters',
      fullNameExists: 'Full name is already registered. Please use another full name.'
    },
    phoneNumber: {
      required: 'Phone number is required',
      pattern: 'Invalid phone number. Please enter a valid Malaysian phone number (excluding +60).',
      phoneNumberExists: 'Phone number is already registered. Please use another phone number.'
    },
    dateOfBirth: {
      required: 'Date of birth is required',
      pattern: 'Invalid date of birth. Please enter a valid date in the format DD/MM/YYYY.',
      minAge: 'You must be at least 18 years old to register.',
    },
  }

}
