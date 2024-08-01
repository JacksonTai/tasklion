import {TaskerModel} from "src/app/modules/tasker/models/tasker.model";

export class TaskerMapper {

  static toModel(formValues: any): TaskerModel {
    const {accountDetail: tasklionAccount = {}, personalDetail = {}, taskerDetail = {}} = formValues;
    const {aboutMe = null, serviceAreas = [], services = []} = taskerDetail;
    return {
      tasklionAccount,
      serviceAreas,
      aboutMe,
      services,
      personalDetail
    };
  }

}
