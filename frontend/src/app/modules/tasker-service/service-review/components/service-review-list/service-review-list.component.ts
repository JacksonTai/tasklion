import {Component, Input} from '@angular/core';
import {ServiceReviewModel} from '../../models/service-review.model';

@Component({
  selector: 'tasklion-service-review-list',
  templateUrl: './service-review-list.component.html',
  styleUrls: ['./service-review-list.component.scss']
})
export class ServiceReviewListComponent {

  @Input()
  public serviceReviews?: ServiceReviewModel[] = [];

}
