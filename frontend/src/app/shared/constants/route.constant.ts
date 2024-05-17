export class RouteConstant {

    static readonly ROOT: string = "";
    static readonly LOGIN: string = "login";

    static readonly REGISTER: string = "register";
    static readonly CUSTOMER: string = "customer";
    static readonly TASKER: string = "tasker";
    static readonly REGISTER_CUSTOMER: string = `${RouteConstant.REGISTER}/${RouteConstant.CUSTOMER}`;
    static readonly REGISTER_TASKER: string = `${RouteConstant.REGISTER}/${RouteConstant.TASKER}`;

    static readonly DASHBOARD: string = "dashboard";
    static readonly ABOUT: string = "about";
    static readonly CONTACT: string = "contact";
    static readonly SERVICE: string = "service";
    static readonly LEGAL: string = "legal";
    static readonly PRIVACY_POLICY: string = "privacy-policy";
    static readonly FAQ: string = "faq";
    static readonly PROFILE: string = "profile";
    static readonly TASK: string = "task";
    static readonly USER: string = "user";
    static readonly STATISTIC: string = "statistic";
}
