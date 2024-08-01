import {TaskerServiceModel} from "./tasker-service.model";

export interface AddTaskerServiceRequestModel {

  username: string;
  taskerServiceModels: TaskerServiceModel[];

}
