import {TaskerServiceModel} from "../../tasker-service/models/tasker-service.model";
import {ServiceAreaModel} from "../../tasker-service/service-area/models/service-area.model";

export interface TaskerSetupModel {

  aboutMe: string;
  serviceAreas: ServiceAreaModel[];
  services: TaskerServiceModel[];

}
