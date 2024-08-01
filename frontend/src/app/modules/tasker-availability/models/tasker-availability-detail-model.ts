export interface TaskerAvailabilityDetailModel {
  id: number;
  date?: string | null;
  startTime: string;
  endTime: string;
  repeat: boolean;
}
