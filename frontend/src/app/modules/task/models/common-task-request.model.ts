import {ServiceCategoryModel} from "../../tasker-service/models/service-category.model";
import {ServiceAreaModel} from "../../tasker-service/service-area/models/service-area.model";

export interface CommonTaskRequestModel {
  serviceCategory: ServiceCategoryModel;
  date: string;
  startTime: string;
  endTime: string;
  serviceArea: ServiceAreaModel
  remarks?: string;
}
