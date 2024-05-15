import {ValidationMessagesModel} from "../../models/validation-messages.model";

export const CUSTOMER_FORM_VALIDATION_MESSAGE: ValidationMessagesModel = {
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
  address: {
    required: 'Address is required',
  },
  googleMapPlaceId: {
    required: 'Please select a location from the dropdown',
  },
  username: {
    required: 'Username is required.',
    minlength: 'Username must be at least 6 characters long.',
    maxlength: 'Username cannot exceed 30 characters.',
    pattern: 'Username can only contain letters, numbers, and underscores (_).',
    consecutiveUnderscore: 'Username cannot contain consecutive underscores (_).',
    startEndUnderscore: 'Username cannot start or end with a underscore (_).',
    usernameExists: 'Username is already taken. Please choose another username.',
  },
  email: {
    required: 'Email is required',
    pattern: 'Invalid email. Please enter a valid email address.',
    emailExists: 'Email is already registered. Please use another email address.'
  },
  password: {
    required: 'Password is required',
    minlength: 'Password must be at least 8 characters long',
    pattern: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special ' +
      'character.'
  },
  confirmPassword: {
    required: 'Please confirm your password',
    match: 'Passwords do not match',
  },
}
