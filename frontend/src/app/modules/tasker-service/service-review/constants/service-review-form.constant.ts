import {ValidationMessagesModel} from "src/app/shared/models/validation-messages.model";

export class ServiceReviewFormConstant {

  public static readonly FORM_ID: string = 'serviceReviewForm';
  public static readonly VALIDATION_MESSAGE: ValidationMessagesModel = {
    rating: {
      required: 'Rating is required',
    },
    comment: {
      max: 'Comment should not exceed 250 characters',
    }
  }

}
