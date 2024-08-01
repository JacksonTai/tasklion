export class PaginationModel<T> {
  content: T[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  totalResults: number = 0;
  pageSize: number = 10;

}
