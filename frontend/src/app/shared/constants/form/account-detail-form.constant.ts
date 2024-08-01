import {ValidationMessagesModel} from "../../models/validation-messages.model";

export class AccountDetailFormConstant {

  public static readonly FORM_ID: string = 'accountDetailForm';
  public static readonly VALIDATION_MESSAGE: ValidationMessagesModel = {
    email: {
      required: 'Email is required',
      pattern: 'Invalid email. Please enter a valid email address.',
      emailExists: 'Email is already registered. Please use another email address.'
    },
    username: {
      required: 'Username is required.',
      minlength: 'Username must be at least 6 characters long.',
      maxlength: 'Username cannot exceed 30 characters.',
      pattern: 'Username can only contain letters, numbers, and underscores (_).',
      consecutiveCharacter: 'Username cannot contain consecutive underscores (_).',
      startEndUnderscore: 'Username cannot start or end with a underscore (_).',
      usernameExists: 'Username is already taken. Please choose another username.',
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 8 characters long',
      pattern: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special ' +
        'character.'
    },
    newPassword: {
      required: 'New Password is required',
      minlength: 'Password must be at least 8 characters long',
      pattern: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special ' +
        'character.',
      match: 'New password cannot be the same as the old password',
    },
    confirmPassword: {
      required: 'Please confirm your password',
      notMatch: 'Passwords do not match',
    },
  }

}
