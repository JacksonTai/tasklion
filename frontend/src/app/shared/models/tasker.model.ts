import {TasklionUserModel} from "./tasklion-user.model";
import {PersonalDetailModel} from "./personal-detail.model";
import {ServiceModel} from "./service.model";
import {AddressModel} from "./address.model";

export interface TaskerModel extends TasklionUserModel {

  personalDetail: PersonalDetailModel;
  aboutMe: string;
  address: AddressModel,
  services: ServiceModel[];

}
