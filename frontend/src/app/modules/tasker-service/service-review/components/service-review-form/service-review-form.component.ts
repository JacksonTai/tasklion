import {Component, OnInit} from '@angular/core';
import {RouteConstant} from "../../../../../shared/constants/route.constant";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../shared/services/auth/auth.service";
import {JwtPayloadModel} from "../../../../../shared/models/auth/jwt-payload.model";
import {finalize} from "rxjs";
import {ServiceReviewService} from "../../services/service-review.service";
import {AddServiceReviewRequestModel} from "../../models/add-service-review-request.model";
import {ServiceReviewFormConstant} from "../../constants/service-review-form.constant";
import {ValidationMessagesModel} from "../../../../../shared/models/validation-messages.model";

@Component({
  selector: 'tasklion-service-review-form',
  templateUrl: './service-review-form.component.html',
  styleUrls: ['./service-review-form.component.scss']
})
export class ServiceReviewFormComponent implements OnInit {

  protected readonly RouteConstant = RouteConstant;
  protected readonly validationMessages: ValidationMessagesModel = ServiceReviewFormConstant.VALIDATION_MESSAGE;

  protected reviewerUsername!: string;
  protected taskId!: string | null;
  protected serviceReviewForm!: FormGroup;

  protected ratingOptions: number[] = [1, 2, 3, 4, 5];

  protected isAdding: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private serviceReviewService: ServiceReviewService,
  ) {
  }

  ngOnInit(): void {
    const jwtPayload: JwtPayloadModel | null = this.authService.getJwtPayload();
    if (jwtPayload && jwtPayload.username) {
      this.reviewerUsername = jwtPayload.username;
    }
    this.taskId = this.activatedRoute.snapshot.paramMap.get('taskId');
    this.initServiceReviewForm();
  }

  initServiceReviewForm(): void {
    this.serviceReviewForm = new FormBuilder().group({
      rating: [null, Validators.required],
      comment: [null, Validators.max(250)],
    });
  }

  onSubmit(): void {
    if (this.serviceReviewForm.valid && this.taskId && this.reviewerUsername) {
      this.isAdding = true;
      const addServiceReviewRequestModel: AddServiceReviewRequestModel = {
        rating: this.serviceReviewForm.get('rating')?.value,
        comment: this.serviceReviewForm.get('comment')?.value,
        reviewerUsername: this.reviewerUsername,
        taskId: this.taskId,
        taskerServiceId: "",
      }
      this.serviceReviewService.addServiceReview(addServiceReviewRequestModel)
        .pipe(finalize((): boolean => this.isAdding = false))
        .subscribe({
          next: (): void => {
            this.router.navigate([RouteConstant.TASK, this.taskId]);
          }
        });
    }
  }

}
