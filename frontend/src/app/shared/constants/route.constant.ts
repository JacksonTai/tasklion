export class RouteConstant {

  static readonly ROOT: string = '';
  static readonly LOGIN: string = 'login';
  static readonly REGISTER: string = 'register';
  static readonly CUSTOMER: string = 'customer';
  static readonly TASKER: string = 'tasker';
  static readonly ADMIN: string = 'admin';
  static readonly SETUP: string = `setup`;

  static readonly DASHBOARD: string = 'dashboard';
  static readonly ABOUT: string = 'about';
  static readonly CONTACT: string = 'contact';
  static readonly SERVICE: string = 'service';
  static readonly SERVICE_AREA: string = 'service-area';
  static readonly LEGAL: string = 'legal';
  static readonly PRIVACY_POLICY: string = 'privacy-policy';
  static readonly FAQ: string = 'faq';
  static readonly PROFILE: string = 'profile';
  static readonly AVAILABILITY: string = 'availability';
  static readonly BOOKING: string = 'booking';
  static readonly REVIEW: string = 'review';

  static readonly TASKLION_ACCOUNT: string = 'tasklion-account';
  static readonly USERNAME: string = 'username';
  static readonly TASK: string = 'task';
  static readonly USER: string = 'user';
  static readonly STATISTIC: string = 'statistic';
  static readonly ADD: string = 'add';
  static readonly EDIT: string = 'edit';
  static readonly CONFIRM: string = 'confirm';

  static readonly BECOME_A_TASKER: string = 'become-a-tasker';
  static readonly CHANGE_PASSWORD: string = 'change-password';
  static readonly CREATE_TASKLION_ACCOUNT: string = `create-tasklion-account`;
  static readonly CONTINUE_WITH_TASKLION_ACCOUNT: string = `continue-with-tasklion-account`;

  static readonly CUSTOMER_REGISTER: string = `${RouteConstant.CUSTOMER}/${RouteConstant.REGISTER}`;
  static readonly CUSTOMER_LOGIN: string = `${RouteConstant.CUSTOMER}/${RouteConstant.LOGIN}`;
  static readonly CUSTOMER_BECOME_A_TASKER: string = `${RouteConstant.CUSTOMER}/${RouteConstant.BECOME_A_TASKER}`;
  static readonly CUSTOMER_DASHBOARD: string = `${RouteConstant.CUSTOMER}/${RouteConstant.DASHBOARD}`;

  static readonly TASKER_REGISTER: string = `${RouteConstant.TASKER}/${RouteConstant.REGISTER}`;
  static readonly TASKER_LOGIN: string = `${RouteConstant.TASKER}/${RouteConstant.LOGIN}`;
  static readonly TASKER_SETUP: string = `${RouteConstant.TASKER}/${RouteConstant.SETUP}`;
  static readonly TASKER_DASHBOARD: string = `${RouteConstant.TASKER}/${RouteConstant.DASHBOARD}`;

  static readonly ADMIN_LOGIN: string = `${RouteConstant.ADMIN}/${RouteConstant.LOGIN}`;

  static readonly headerFooterExcludedRoutes: string[] = [
    RouteConstant.LOGIN,
    RouteConstant.CUSTOMER_REGISTER,
    RouteConstant.TASKER_REGISTER,
    RouteConstant.CUSTOMER_LOGIN,
    RouteConstant.TASKER_LOGIN,
    RouteConstant.ADMIN_LOGIN
  ];

  static readonly NOT_FOUND: string = 'not-found';
  static readonly INTERNAL_SERVER_ERROR: string = 'internal-server-error';
  static readonly SUCCESS: string = 'success';

}
