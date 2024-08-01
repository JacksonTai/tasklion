import {Component, ViewChild} from '@angular/core';
import {RouteConstant} from "../../../../shared/constants/route.constant";
import {
  InformationModalComponent
} from "../../../../shared/components/modal/information-modal/information-modal.component";
import {Router} from '@angular/router';

@Component({
  selector: 'tasklion-admin-add-user-page',
  templateUrl: './admin-add-user-page.component.html',
  styleUrls: ['./admin-add-user-page.component.scss']
})
export class AdminAddUserPageComponent {

  @ViewChild('infoModal') infoModal!: InformationModalComponent;

  protected readonly RouteConstant = RouteConstant;

  constructor(
    private router: Router,
  ) {
  }

  onSuccessfulRegistration(): void {
    this.infoModal.message = 'User added successfully';
    this.infoModal.open();
  }

  onInfoModalClose(): void {
    this.router.navigate([RouteConstant.USER]);
  }

}
