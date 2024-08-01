import {TaskerServiceModel} from "../../tasker-service/models/tasker-service.model";

export interface SearchTaskerResponseModel {
  username: string;
  fullName: string;
  aboutMe: string;
  taskerService: TaskerServiceModel;
}
