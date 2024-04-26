import { Component } from '@angular/core';
import {RouteConstant} from "../../../constants/route.constant";

@Component({
  selector: 'tasklion-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss']
})
export class HomeFooterComponent {

    protected readonly RouteConstant = RouteConstant;
}
