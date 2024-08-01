import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationRequestModel} from "../../models/pagination/pagination-request.model";
import {PaginationModel} from '../../models/pagination/pagination.model';

@Component({
  selector: 'tasklion-paginator',
  templateUrl: './paginator.html',
  styleUrls: ['./paginator.scss']
})
export class Paginator implements OnInit {

  @Output()
  public pageChange: EventEmitter<PaginationRequestModel> = new EventEmitter<PaginationRequestModel>();

  @Input()
  public paginationModel: PaginationModel<any> = new PaginationModel();

  private readonly visiblePageButtons: number = 3;
  protected readonly Math: Math = Math;
  protected activePage: number = 0;

  public onPageChange(page: number): void {
    this.activePage = page;
    const paginationRequestModel: PaginationRequestModel = {
      page: page + 1,
      size: this.paginationModel.pageSize
    }
    this.pageChange.emit(paginationRequestModel);
  }

  ngOnInit(): void {
    this.activePage = this.paginationModel.currentPage;
  }

  getDisplayedPages(): number[] {
    const totalPages: number = this.paginationModel.totalPages;
    const currentPage: number = this.activePage;
    const half: number = Math.floor(this.visiblePageButtons / 2);
    let start: number = Math.max(currentPage - half, 0);
    let end: number = Math.min(start + this.visiblePageButtons, totalPages);

    if (end - start < this.visiblePageButtons) {
      start = Math.max(end - this.visiblePageButtons, 0);
    }

    return Array.from({ length: end - start }, (_, i) => start + i);
  }

  shouldShowEllipsisBefore(): boolean {
    if (this.paginationModel.totalPages <= this.visiblePageButtons) {
      return false;
    }
    return this.activePage > Math.floor(this.visiblePageButtons / 2);
  }

  shouldShowEllipsisAfter(): boolean {
    if (this.paginationModel.totalPages <= this.visiblePageButtons) {
      return false;
    }
    return this.activePage < this.paginationModel.totalPages - Math.ceil(this.visiblePageButtons / 2);
  }
}
