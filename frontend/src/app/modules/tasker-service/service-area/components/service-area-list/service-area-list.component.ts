import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PaginationModel} from "../../../../../shared/models/pagination/pagination.model";
import {filter, finalize, map, Observable, startWith, Subject} from "rxjs";
import {TaskerServiceService} from "../../../services/tasker-service.service";
import {AuthService} from "../../../../../shared/services/auth/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {ServiceAreaModel} from '../../models/service-area.model';
import {ServiceAreaService} from '../../services/service-area.service';
import {PaginationRequestModel} from "../../../../../shared/models/pagination/pagination-request.model";
import {ApiResponseModel} from "../../../../../shared/models/api/api-response.model";
import PaginatorUtil from "../../../../../shared/utils/paginator.util";
import {
  ConfirmationModalComponent
} from "../../../../../shared/components/modal/confirmation-modal/confirmation-modal.component";
import {
  InformationModalComponent
} from "../../../../../shared/components/modal/information-modal/information-modal.component";

@Component({
  selector: 'tasklion-service-area-list',
  templateUrl: './service-area-list.component.html',
  styleUrls: ['./service-area-list.component.scss']
})
export class ServiceAreaListComponent  implements OnInit, OnDestroy {

  @ViewChild('deleteModal') deleteModal!: ConfirmationModalComponent;
  @ViewChild('infoModal') infoModal!: InformationModalComponent;

  protected readonly RouteConstant = RouteConstant;
  protected taskerServicesPagination: PaginationModel<ServiceAreaModel> = new PaginationModel();
  protected taskerServiceAreas: ServiceAreaModel[] = [];
  protected username!: string;

  protected isFetchingData: boolean = true;
  protected isDeleting: boolean = false;
  protected isServiceAreaRoute$: Observable<boolean> | undefined;
  protected deleteCancel$: Subject<void> = new Subject<void>();

  constructor(
    private taskerServiceService: TaskerServiceService,
    private serviceAreaService: ServiceAreaService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initIsServiceAreaRoute$();
    this.initUsername();
    this.fetchServiceaAreaData();
  }

  ngOnDestroy(): void {
    this.deleteCancel$.next();
    this.deleteCancel$.complete();
  }

  initIsServiceAreaRoute$(): void {
    this.isServiceAreaRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.isServiceAreaRoute()),
      startWith(this.isServiceAreaRoute())
    );
  }

  isServiceAreaRoute(): boolean {
    return this.router.url === `/${RouteConstant.SERVICE_AREA}`;
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

  fetchServiceaAreaData(pagination?: PaginationRequestModel): void {
    this.taskerServiceService.getTaskerServiceAreas(this.username, pagination)
      .pipe(finalize((): boolean => this.isFetchingData = false))
      .subscribe({
        next: (response: ApiResponseModel<any>): void => {
          this.taskerServiceAreas = response.data.content;
          PaginatorUtil.mapDataToPagination(this.taskerServicesPagination, response.data);
        },
      });
  }

  onPageChange(pagination: PaginationRequestModel): void {
    this.fetchServiceaAreaData(pagination);
  }

  deleteServiceArea(serviceAreaId: string): void {
    this.deleteModal.itemId = serviceAreaId;
    this.deleteModal.message = 'Are you sure you want to delete this service area?';
    this.deleteModal.open();
  }

  cancelDelete(): void {
    this.deleteCancel$.next();
    this.isDeleting = false;
  }

  onDeleteConfirmed(serviceAreaId: string): void {
    this.isDeleting = true;
    this.serviceAreaService.deleteServiceArea(serviceAreaId, this.deleteCancel$)
      .pipe(finalize((): void => {
        this.isDeleting = false;
        this.deleteModal.close();
      }))
      .subscribe({
        next: (): void => {
          this.fetchServiceaAreaData();
        },
        error: (response): void => {
          this.infoModal.title = 'Error';
          this.infoModal.message = response.error.message;
          this.infoModal.open();
        }
      });
  }

}
