import {Component} from '@angular/core';
import {RouteConstant} from "../../constants/route.constant";

@Component({
  selector: 'tasklion-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  protected readonly RouteConstant = RouteConstant;
}
