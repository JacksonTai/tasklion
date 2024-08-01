import {Component} from '@angular/core';
import {RouteConstant} from "../../../constants/route.constant";
import {AuthService} from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'tasklion-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  protected readonly RouteConstant = RouteConstant;
  protected isAuthenticated: boolean = this.authService.isAuthenticated();

  constructor(
    private authService: AuthService,
  ) {
  }


}
