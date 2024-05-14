import {AddressModel} from "./address.model";

export interface PersonalDetailModel {
  fullName: string;
  phoneNumber: string,
  dateOfBirth: string,
  address: AddressModel,
}
