import {UserRoleConstant} from "../constants/user-role.constant";
import {TaskerModel} from "../models/tasker.model";

export class TaskerMapper {

  static mapFrom(formValues: any): TaskerModel {
    const {accountDetail, personalDetail, addressDetail: address = {}, taskerDetail = {}} = formValues;
    const {username, email, password} = accountDetail;
    const {aboutMe = '', services = []} = taskerDetail;
    return {
      username,
      email,
      password,
      role: UserRoleConstant.CUSTOMER,
      aboutMe,
      services,
      address,
      personalDetail
    };
  }

}
