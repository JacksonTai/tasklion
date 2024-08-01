import {ServiceCategoryModel} from "../../tasker-service/models/service-category.model";

export interface SearchTaskerRequestModel {
  serviceCategory: ServiceCategoryModel;
  state: string;
  city: string;
  postcode: string;
  duration: number;
  startDate?: string;
  endDate?: string;
  timeOfDay?: string[];
  time?: string;
  page: number;
  size: number;
}
