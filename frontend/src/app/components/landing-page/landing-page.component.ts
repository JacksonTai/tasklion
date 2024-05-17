import {Component} from '@angular/core';
import {RouteConstant} from "../../shared/constants/route.constant";

@Component({
  selector: 'tasklion-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

    protected readonly RouteConstant = RouteConstant;
}
