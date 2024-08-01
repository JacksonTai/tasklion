import {Component} from '@angular/core';
import {RouteConstant} from 'src/app/shared/constants/route.constant';

@Component({
  selector: 'tasklion-landing-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

    protected readonly RouteConstant = RouteConstant;
}
