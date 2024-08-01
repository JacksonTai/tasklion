import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, finalize, map, Observable, startWith, Subject} from "rxjs";
import {ApiResponseModel} from "src/app/shared/models/api/api-response.model";
import {TaskerServiceModel} from "../../models/tasker-service.model";
import {PaginationModel} from 'src/app/shared/models/pagination/pagination.model';
import {PaginationRequestModel} from "src/app/shared/models/pagination/pagination-request.model";
import PaginatorUtil from "../../../../shared/utils/paginator.util";
import {AuthService} from 'src/app/shared/services/auth/auth.service';
import {
  ConfirmationModalComponent
} from 'src/app/shared/components/modal/confirmation-modal/confirmation-modal.component';
import {
  InformationModalComponent
} from "../../../../shared/components/modal/information-modal/information-modal.component";
import {TaskerServiceService} from '../../services/tasker-service.service';

@Component({
  selector: 'tasklion-tasker-service-list',
  templateUrl: './tasker-service-list.component.html',
  styleUrls: ['./tasker-service-list.component.scss']
})
export class TaskerServiceListComponent implements OnInit, OnDestroy {

  @ViewChild('deleteModal') deleteModal!: ConfirmationModalComponent;
  @ViewChild('infoModal') infoModal!: InformationModalComponent;

  protected readonly RouteConstant = RouteConstant;
  protected taskerServicesPagination: PaginationModel<TaskerServiceModel> = new PaginationModel();
  protected taskerServices: TaskerServiceModel[] = [];
  protected username!: string;

  protected isFetchingData: boolean = true;
  protected isDeleting: boolean = false;
  protected isTaskerServiceRoute$: Observable<boolean> | undefined;
  protected deleteCancel$: Subject<void> = new Subject<void>();

  constructor(
    private taskerServiceService: TaskerServiceService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initIsTaskerServiceRoute$();
    this.initUsername();
    this.fetchTaskerServiceData();
  }

  ngOnDestroy(): void {
    this.deleteCancel$.next();
    this.deleteCancel$.complete();
  }

  initIsTaskerServiceRoute$(): void {
    this.isTaskerServiceRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.isTaskerServiceRoute()),
      startWith(this.isTaskerServiceRoute())
    );
  }

  getServiceDetailLink(serviceId: string): string[] {
    return this.isTaskerServiceRoute() ? [serviceId] : [RouteConstant.SERVICE, serviceId];
  }

  isTaskerServiceRoute(): boolean {
    return this.router.url === `/${RouteConstant.TASKER}/${RouteConstant.SERVICE}`;
  }

  initUsername(): void {
    this.username = this.activatedRoute.snapshot.paramMap.get(RouteConstant.USERNAME) || this.username;
    if (!this.username) {
      const username: string | undefined = this.authService.getJwtPayload()?.username;
      if (username) {
        this.username = username;
      }
    }
  }

  fetchTaskerServiceData(pagination?: PaginationRequestModel): void {
    this.taskerServiceService.getTaskerServicesByUsername(this.username, pagination)
      .pipe(finalize((): boolean => this.isFetchingData = false))
      .subscribe({
        next: (response: ApiResponseModel<any>): void => {
          this.taskerServices = response.data.content;
          PaginatorUtil.mapDataToPagination(this.taskerServicesPagination, response.data);
        },
      });
  }

  onPageChange(pagination: PaginationRequestModel): void {
    this.fetchTaskerServiceData(pagination);
  }

  deleteService(serviceId: string): void {
    this.deleteModal.itemId = serviceId;
    this.deleteModal.message = 'Are you sure you want to delete this service?';
    this.deleteModal.open();
  }

  cancelDelete(): void {
    this.deleteCancel$.next();
    this.isDeleting = false;
  }

  onDeleteConfirmed(serviceId: string): void {
    this.isDeleting = true;
    this.taskerServiceService.deleteTaskerService(serviceId, this.deleteCancel$)
      .pipe(finalize((): void => {
        this.isDeleting = false;
        this.deleteModal.close();
      }))
      .subscribe({
        next: (): void => {
          this.fetchTaskerServiceData();
        },
        error: (response): void => {
          this.infoModal.title = 'Error';
          this.infoModal.message = response.error.message;
          this.infoModal.open();
        }
      });
  }

}
