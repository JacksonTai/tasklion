export class PaginationRequestModel {
  page: number = 0;
  size: number = 10;

  constructor(data: any = {}) {
    this.page = data.page || 0;
    this.size = data.size || 10;
  }
}
