import {CommonTaskModel} from "./common-task.model";

export interface CustomerTaskModel extends CommonTaskModel {

  taskerUsername: string;
  isReviewable: boolean;

}
