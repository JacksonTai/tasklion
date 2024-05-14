import {TasklionUserModel} from "./tasklion-user.model";
import {PersonalDetailModel} from "./personal-detail.model";

export interface TaskerModel extends TasklionUserModel {

  personalDetail: PersonalDetailModel;
  aboutMe: string;
  skills: string[];

}
