import {ValidationMessagesModel} from "../../../../shared/models/validation-messages.model";

export class TaskerAvailabilityFormConstant {

  public static readonly FORM_ID: string = 'taskerAvailabilityForm';
  public static readonly VALIDATION_MESSAGE: ValidationMessagesModel = {
    date: {
      required: 'Date is required.'
    },
    days: {
      required: 'Please select at least one day.'
    },
    startTime: {
      required: 'Start time is required.',
    },
    endTime: {
      required: 'End time is required.',
    },
  }

}
