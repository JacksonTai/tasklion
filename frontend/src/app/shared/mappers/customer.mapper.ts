import {Mapper} from "./mapper";
import {CustomerModel} from "../models/customer.model";
import {UserRoleConstant} from "../constants/user-role.constant";

export class CustomerMapper implements Mapper<any, CustomerModel> {

  mapFrom(formValues: any): CustomerModel {
    return {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      role: UserRoleConstant.CUSTOMER,
      personalDetail: {
        fullName: formValues.fullName,
        phoneNumber: formValues.phoneNumber,
        dateOfBirth: formValues.dateOfBirth,
        address: {
          googleMapPlaceId: formValues.googleMapPlaceId,
        },
      },
    };
  }

}
