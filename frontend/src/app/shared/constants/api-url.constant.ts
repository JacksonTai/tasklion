export class ApiUrlConstant {

  // Base/Sub paths
  static readonly AUTH: string = "/auth";
  static readonly REGISTER: string = "/register";
  static readonly USER: string = "/user";
  static readonly CITY: string = "/city";

  // Auth paths
  static readonly LOGIN: string = `${ApiUrlConstant.AUTH}/login`;
  static readonly AUTH_REFRESH_TOKEN: string = `${ApiUrlConstant.AUTH}/refresh-token`;
  static readonly TASKER_REGISTER: string = `${ApiUrlConstant.AUTH}${ApiUrlConstant.REGISTER}/tasker`;
  static readonly CUSTOMER_REGISTER: string = `${ApiUrlConstant.AUTH}${ApiUrlConstant.REGISTER}/customer`;

  static readonly IS_USER_EXISTS: string = `${ApiUrlConstant.USER}/is-exists`;
  static readonly CITY_BY_STATE: string = `${ApiUrlConstant.CITY}/by-state`;
  static readonly TASKS: string = "/tasks";

  static readonly PUBLIC_API: string[] = [
    ApiUrlConstant.LOGIN,
    ApiUrlConstant.TASKER_REGISTER,
    ApiUrlConstant.CUSTOMER_REGISTER,
    ApiUrlConstant.IS_USER_EXISTS,
  ];

}
