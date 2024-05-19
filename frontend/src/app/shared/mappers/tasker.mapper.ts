import {UserRoleConstant} from "../constants/user-role.constant";
import {TaskerModel} from "../models/tasker.model";

export class TaskerMapper {

  static mapFrom(formValues: any): TaskerModel {
    const {username, email, password} = formValues.accountDetail;
    const {aboutMe, addressLine, state, city, postcode, services} = formValues.taskerDetail;
    return {
      username,
      email,
      password,
      role: UserRoleConstant.CUSTOMER,
      aboutMe,
      address: {
        addressLine,
        state,
        city,
        postcode
      },
      services,
      personalDetail: formValues.personalDetail
    };
  }

}
