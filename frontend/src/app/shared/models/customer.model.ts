import {TasklionUserModel} from "./tasklion-user.model";
import {PersonalDetailModel} from "./personal-detail.model";

export interface CustomerModel extends TasklionUserModel {
  personalDetail: PersonalDetailModel;
}
