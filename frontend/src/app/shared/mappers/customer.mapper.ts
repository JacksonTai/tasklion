import {CustomerModel} from "../models/customer.model";
import {UserRoleConstant} from "../constants/user-role.constant";

export class CustomerMapper {

  static mapFrom(formValues: any): CustomerModel {
    const {username, email, password} = formValues.accountDetail;
    return {
      username,
      email,
      password,
      role: UserRoleConstant.CUSTOMER,
      personalDetail: formValues.personalDetail
    };
  }

}
