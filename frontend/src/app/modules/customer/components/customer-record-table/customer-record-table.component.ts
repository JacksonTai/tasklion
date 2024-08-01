import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  ConfirmationModalComponent
} from "../../../../shared/components/modal/confirmation-modal/confirmation-modal.component";
import {
  InformationModalComponent
} from "../../../../shared/components/modal/information-modal/information-modal.component";
import {finalize, Subject} from "rxjs";
import {PaginationRequestModel} from "../../../../shared/models/pagination/pagination-request.model";
import {PaginationModel} from "../../../../shared/models/pagination/pagination.model";
import {CustomerModel} from "../../models/customer.model";
import {CustomerService} from "../../services/customer.service";
import {TasklionAccountService} from "../../../tasklion-account/services/tasklion-account.service";
import {ApiResponseModel} from "../../../../shared/models/api/api-response.model";
import PaginatorUtil from "../../../../shared/utils/paginator.util";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {TasklionAccountStatusConstant} from "../../../tasklion-account/constants/tasklion-account-status.constant";

@Component({
  selector: 'tasklion-customer-record-table',
  templateUrl: './customer-record-table.component.html',
  styleUrls: ['./customer-record-table.component.scss']
})
export class CustomerRecordTableComponent implements OnInit, OnDestroy {

  @ViewChild('banConfirmationModal') banConfirmationModal!: ConfirmationModalComponent;
  @ViewChild('unbanConfirmationModal') unbanConfirmationModal!: ConfirmationModalComponent;
  @ViewChild('infoModal') infoModal!: InformationModalComponent;

  protected readonly RouteConstant = RouteConstant;
  protected readonly TasklionAccountStatusConstant = TasklionAccountStatusConstant;

  protected actionCancel$: Subject<void> = new Subject<void>();
  protected isActionLoading: boolean = false;

  protected pagination: PaginationRequestModel = new PaginationRequestModel();
  protected customers: CustomerModel[] = [];
  protected customersPagination: PaginationModel<CustomerModel> = new PaginationModel();

  protected isLoading: boolean = false;
  protected isFetchingData: boolean = false;

  constructor(
    private customerService: CustomerService,
    private tasklionAccountService: TasklionAccountService,
  ) {
  }

  ngOnInit(): void {
    this.fetchCustomers();
  }

  ngOnDestroy(): void {
    this.actionCancel$.next();
    this.actionCancel$.complete();
  }

  fetchCustomers(): void {
    this.isLoading = true;
    this.customerService.getCustomers(this.pagination)
      .pipe(finalize((): boolean => this.isLoading = false))
      .subscribe({
        next: (response: ApiResponseModel<any>): void => {
          this.customers = response.data.content;
          PaginatorUtil.mapDataToPagination(this.customersPagination, response.data);
        }
      });
  }

  cancelAction(): void {
    this.actionCancel$.next();
    this.isActionLoading = false;
  }

  banUser(username: string): void {
    this.banConfirmationModal.message = 'Are you sure you want to ban this customer?';
    this.banConfirmationModal.itemId = username;
    this.banConfirmationModal.open();
  }

  unbanUser(username: string): void {
    this.unbanConfirmationModal.message = 'Are you sure you want to unban this customer?';
    this.unbanConfirmationModal.itemId = username;
    this.unbanConfirmationModal.open();
  }

  protected onPageChange(pagination: PaginationRequestModel): void {
    this.pagination = pagination;
    this.fetchCustomers();
  }

  onBanActionConfirmed(username: string): void {
    this.isActionLoading = true;
    this.tasklionAccountService.updateTasklionAccountStatus(username, TasklionAccountStatusConstant.BANNED)
      .pipe(finalize((): boolean => this.isActionLoading = false))
      .subscribe({
        next: (): void => {
          this.banConfirmationModal.close();
          this.infoModal.message = `Customer ${username} has been banned.`;
          this.infoModal.open();
          this.fetchCustomers();
        }
      });
  }

  onUnbanActionConfirmed(username: string): void {
    this.isActionLoading = true;
    this.tasklionAccountService.updateTasklionAccountStatus(username, TasklionAccountStatusConstant.ACTIVE)
      .pipe(finalize((): boolean => this.isActionLoading = false))
      .subscribe({
        next: (): void => {
          this.unbanConfirmationModal.close();
          this.infoModal.message = `Customer ${username} has been unbanned.`;
          this.infoModal.open();
          this.fetchCustomers();
        }
      });
  }

}
