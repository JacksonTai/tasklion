import {ServiceReviewModel} from "../service-review/models/service-review.model";
import {ServiceCategoryModel} from "./service-category.model";
import {RatingDetailModel} from "src/app/shared/models/rating-detail.model";

export interface TaskerServiceModel {

  id: number;
  description: string;
  reviews: ServiceReviewModel[];
  category: ServiceCategoryModel;
  ratingDetail: RatingDetailModel;

}
