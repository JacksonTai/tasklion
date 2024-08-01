export class ApiEndpointConstant {

  // Shared paths
  static readonly AUTH: string = "/auth";
  static readonly REGISTER: string = "/register";
  static readonly USER: string = "/user";
  static readonly CITY: string = "/city";
  static readonly TASKER: string = "/tasker";
  static readonly CUSTOMER: string = "/customer";
  static readonly TASKLION_ACCOUNT: string = `/tasklion-account`;
  static readonly RATING: string = "/rating";
  static readonly SERVICES: string = "/services";
  static readonly AVAILABILITY: string = "/availability";
  static readonly SEARCH: string= "/search";
  static readonly COUNT: string = "/count";
  static readonly STATUS: string = "/status";
  static readonly OPTIONS: string = "/options";
  static readonly ACCEPT: string = "/accept";
  static readonly REJECT: string = "/reject";
  static readonly CANCEL: string = "/cancel";

  static readonly LOGIN: string = `${ApiEndpointConstant.AUTH}/login`;
  static readonly LOGOUT: string = `${ApiEndpointConstant.AUTH}/logout`;
  static readonly AUTH_REFRESH_TOKEN: string = `${ApiEndpointConstant.AUTH}/refresh-token`;
  static readonly AUTH_SWITCH_ROLE: string = `${ApiEndpointConstant.AUTH}/switch-role`;
  static readonly VERIFY_TOKEN: string = `${ApiEndpointConstant.AUTH}/verify-token`;

  static readonly TASKER_SETUP: string = `${ApiEndpointConstant.TASKER}/setup`;
  static readonly TASKER_REGISTER: string = `${ApiEndpointConstant.TASKER}${ApiEndpointConstant.REGISTER}`;
  static readonly CUSTOMER_REGISTER: string = `${ApiEndpointConstant.CUSTOMER}${ApiEndpointConstant.REGISTER}`;

  static readonly CHANGE_PASSWORD: string = `${ApiEndpointConstant.TASKLION_ACCOUNT}/change-password`;
  static readonly IS_TASKLION_ACCOUNT_EXISTS: string = `${ApiEndpointConstant.TASKLION_ACCOUNT}/is-exists`;
  static readonly CITY_BY_STATE: string = `${ApiEndpointConstant.CITY}/by-state`;
  static readonly COUNT_BY_STATUS: string = `${ApiEndpointConstant.COUNT}/by-status`;
  static readonly AVAILABILITY_BY_DAY: string = `${ApiEndpointConstant.AVAILABILITY}/by-day`;

  static readonly TASKS: string = "/tasks";
  static readonly SERVICE_AREA: string = "/service-area";
  static readonly SERVICE_REVIEW: string = "/service-review";
  static readonly SERVICE_CATEGORIES: string = "/service-categories";
  static readonly MOST_OFFERED_SERVICES: string = `${ApiEndpointConstant.SERVICES}/most-offered`;

  static readonly PUBLIC_API: string[] = [
    ApiEndpointConstant.LOGIN,
    ApiEndpointConstant.TASKER_REGISTER,
    ApiEndpointConstant.CUSTOMER_REGISTER,
    ApiEndpointConstant.IS_TASKLION_ACCOUNT_EXISTS,
  ];


}
