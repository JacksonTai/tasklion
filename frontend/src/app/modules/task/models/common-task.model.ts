import {KeyValueModel} from "../../../shared/models/key-value.model";

export interface CommonTaskModel {

  id: number;
  taskerServiceId: number;
  date: Date;
  startTime: string;
  endTime: string;
  status: string;
  remarks: string;
  serviceCategory: string;
  isCancellable: boolean;
  isUpdatable: boolean;
  isPendingDecision: boolean;
  isMaker: boolean,
  makerCheckerId: number;
  valueChanges: Map<string, KeyValueModel>;
  creationDateTime: string;

}
