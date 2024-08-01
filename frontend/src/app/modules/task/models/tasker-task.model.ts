import {CommonTaskModel} from "./common-task.model";

export interface TaskerTaskModel extends CommonTaskModel {

   taskerUsername: string;
   customerUsername: string;
   isAcceptable: boolean;
   isCompletable: boolean;

}
