import {Component, Input} from '@angular/core';

@Component({
  selector: 'tasklion-rating-detail',
  templateUrl: './rating-detail.component.html',
  styleUrls: ['./rating-detail.component.scss']
})
export class RatingDetailComponent {

  @Input()
  mainRating?: boolean = false;

  @Input()
  overallRating?: number = 0;

  @Input()
  totalReviews?: number = 0;

}
