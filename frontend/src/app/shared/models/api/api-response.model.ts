export interface ApiResponseModel<T> {
  status: string;
  httpStatus: number;
  message: string;
  internalCode: string;
  data: T | null;
}
