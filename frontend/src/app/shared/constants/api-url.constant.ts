export class ApiUrlConstant {

  // Base/Sub paths
  static readonly AUTH: string = "/auth";
  static readonly REGISTER: string = "/register";
  static readonly TASKLION_USER: string = "/tasklion-user";
  static readonly CITY: string = "/city";

  // Auth paths
  static readonly LOGIN: string = `${ApiUrlConstant.AUTH}/login`;
  static readonly GET_REFRESH_TOKEN: string = `${ApiUrlConstant.AUTH}/refresh-token`;
  static readonly TASKER_REGISTER: string = `${ApiUrlConstant.AUTH}${ApiUrlConstant.REGISTER}/tasker`;
  static readonly CUSTOMER_REGISTER: string = `${ApiUrlConstant.AUTH}${ApiUrlConstant.REGISTER}/customer`;

  static readonly IS_TASKLION_USER_EXISTS: string = `${ApiUrlConstant.TASKLION_USER}/is-exists`;
  static readonly GET_CITY_BY_STATE: string = `${ApiUrlConstant.CITY}/by-state`;
  static readonly GET_TASKS: string = "/tasks";

  static readonly PUBLIC_API: string[] = [
    ApiUrlConstant.LOGIN,
    ApiUrlConstant.TASKER_REGISTER,
    ApiUrlConstant.CUSTOMER_REGISTER,
    ApiUrlConstant.IS_TASKLION_USER_EXISTS,
    ApiUrlConstant.GET_CITY_BY_STATE,
  ];

}
