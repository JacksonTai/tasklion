export const RegexConstant = {

  // General
  ALPHABETIC: /^[a-zA-Z]+$/,
  ALPHANUMERIC_AND_UNDERSCORE: /^[a-zA-Z0-9_]+$/,
  LOWER_CASE: /[a-z]/,
  UPPER_CASE: /[A-Z]/,
  NUMBER: /[0-9]/,

  // Date
  DATE_DD_MM_YYYY: /^\d{1,2}-\d{1,2}-\d{4}$/,
  DATE_YYYY_MM_DD: /^\d{4}-\d{1,2}-\d{1,2}$/,

  // Phone number
  MY_PHONE_NUMBER: /^\+60(1[0-46-9]\d{7,8}|[2-9]\d{7})$/,
  MY_PHONE_NUMBER_NO_PREFIX: /^(1[1-9]\d{7,8}|[2-9]\d{7})$/,

  ADDRESS_LINE: /^[a-zA-Z0-9\s\-.,#]+$/,
  POSTCODE: /^\d{5}$/,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PASSWORD_SPECIAL_CHAR: /[.!@#$%^&*]/,

}
