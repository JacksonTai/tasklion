import {PersonalDetailModel} from "./personal-detail.model";
import {TasklionAccountModel} from "./tasklion-account.model";

export interface TasklionAccountDetailModel {
  tasklionAccount: TasklionAccountModel;
  personalDetail: PersonalDetailModel;
}
