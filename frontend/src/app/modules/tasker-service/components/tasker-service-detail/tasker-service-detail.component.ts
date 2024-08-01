import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, finalize, map, Observable, startWith} from "rxjs";
import {HttpStatusCode} from "@angular/common/http";
import {TaskerServiceModel} from '../../models/tasker-service.model';
import {ApiResponseModel} from 'src/app/shared/models/api/api-response.model';
import {RouteConstant} from 'src/app/shared/constants/route.constant';
import {PaginationModel} from 'src/app/shared/models/pagination/pagination.model';
import {PaginationRequestModel} from "src/app/shared/models/pagination/pagination-request.model";
import PaginatorUtil from "../../../../shared/utils/paginator.util";
import {ServiceReviewModel} from '../../service-review/models/service-review.model';
import {TaskerServiceService} from "../../services/tasker-service.service";
import {ServiceReviewService} from '../../service-review/services/service-review.service';

@Component({
  selector: 'tasklion-tasker-service-detail',
  templateUrl: './tasker-service-detail.component.html',
  styleUrls: ['./tasker-service-detail.component.scss']
})
export class TaskerServiceDetailComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;

  protected username!: string;
  protected taskerServiceId!: string;
  protected taskerService?: TaskerServiceModel;
  protected serviceReviews: PaginationModel<ServiceReviewModel> = new PaginationModel();

  protected isTaskerServiceRoute$: Observable<boolean> | undefined;
  protected isTaskerServiceLoading: boolean = true;
  protected isServiceReviewLoading: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskerServiceService: TaskerServiceService,
    private serviceReviewService: ServiceReviewService,
  ) {
  }

  ngOnInit(): void {
    this.initIsTaskerServiceRoute$();
    const taskerServiceId: string | null = this.activatedRoute.snapshot.paramMap.get('serviceId')
    this.activatedRoute.parent?.paramMap.subscribe(params => {
      this.username = params.get('username') || '';
    });
    if (taskerServiceId) {
      this.taskerServiceId = taskerServiceId;
      this.fetchTaskerServiceData(taskerServiceId);
      this.fetchServiceReviews(taskerServiceId);
    }
  }

  initIsTaskerServiceRoute$(): void {
    this.isTaskerServiceRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.isTaskerServiceRoute()),
      startWith(this.isTaskerServiceRoute())
    );
  }

  fetchTaskerServiceData(taskerServiceId: string): void {
    this.isTaskerServiceLoading = true;
    this.taskerServiceService.getTaskerServiceById(taskerServiceId)
      .pipe(finalize((): boolean => this.isTaskerServiceLoading = false))
      .subscribe({
        next: (response: ApiResponseModel<any>): void => this.taskerService = response.data,
        error: (error) => this.handleError(error)
      });
  }

  fetchServiceReviews(taskerServiceId: string, pagination?: PaginationRequestModel): void {
    this.isServiceReviewLoading = true;
    pagination = pagination || new PaginationRequestModel({size: 5});
    this.serviceReviewService.getServiceReview(Number(taskerServiceId), pagination)
      .pipe(finalize((): boolean => this.isServiceReviewLoading = false))
      .subscribe({
        next: (response: ApiResponseModel<any>): void => {
          PaginatorUtil.mapDataToPagination(this.serviceReviews, response.data);
        },
        error: error => this.handleError(error)
      });
  }

  onPageChange(pagination: PaginationRequestModel): void {
    this.fetchServiceReviews(this.taskerServiceId, pagination);
  }

  getServicesLink(): string[] {
    return this.isTaskerServiceRoute() ?
      ['/', RouteConstant.TASKER, RouteConstant.SERVICE] :
      ['/', RouteConstant.TASKER, this.username];
  }

  isTaskerServiceRoute(): boolean {
    return this.router.url.startsWith(`/${RouteConstant.TASKER}/${RouteConstant.SERVICE}`);
  }

  handleError(error: any): void {
    if (error.status === HttpStatusCode.NotFound) {
      this.router.navigate([RouteConstant.NOT_FOUND], {skipLocationChange: true});
    } else {
      this.router.navigate([RouteConstant.INTERNAL_SERVER_ERROR], {skipLocationChange: true});
    }
  }

}
