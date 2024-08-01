export interface PaginationResponseModel<T> {
  content: T[];
  number: number;
  totalPages: number;
  totalElements: number;
  size: number;
}
