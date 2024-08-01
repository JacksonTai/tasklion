import {PaginationModel} from "../models/pagination/pagination.model";
import {PaginationResponseModel} from "../models/pagination/pagination-response.model";

export default class PaginatorUtil {

  static mapDataToPagination<T>(pagination: PaginationModel<T>, data: PaginationResponseModel<T>): void {
    pagination.content = data.content;
    pagination.currentPage = data.number;
    pagination.totalPages = data.totalPages;
    pagination.totalResults = data.totalElements;
    pagination.pageSize = data.size;
  }

}
