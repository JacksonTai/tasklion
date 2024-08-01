import {CustomerModel} from "src/app/modules/customer/models/customer.model";

export class CustomerMapper {

  static toModel(formValues: any): CustomerModel {
    const {accountDetail: tasklionAccount = {}, personalDetail = {}} = formValues;
    return {tasklionAccount, personalDetail};
  }

}
