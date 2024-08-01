import {TasklionAccountModel} from "../../tasklion-account/models/tasklion-account.model";
import {PersonalDetailModel} from "../../tasklion-account/models/personal-detail.model";

export interface CustomerModel {

  tasklionAccount: TasklionAccountModel;
  personalDetail: PersonalDetailModel;
}
