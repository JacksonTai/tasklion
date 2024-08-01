import {TaskerServiceModel} from "../../tasker-service/models/tasker-service.model";
import {RatingDetailModel} from "src/app/shared/models/rating-detail.model";
import {TasklionAccountModel} from "../../tasklion-account/models/tasklion-account.model";
import {PersonalDetailModel} from "../../tasklion-account/models/personal-detail.model";
import {ServiceAreaModel} from "../../tasker-service/service-area/models/service-area.model";

export interface TaskerModel {

  tasklionAccount: TasklionAccountModel;
  personalDetail: PersonalDetailModel;
  aboutMe?: string;
  serviceAreas?: ServiceAreaModel[];
  services: TaskerServiceModel[];
  ratingDetail?: RatingDetailModel;

}
