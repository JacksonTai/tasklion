import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {LogoComponent} from "./logo/logo.component";
import {RatingDetailComponent} from "./rating-detail/rating-detail.component";
import {AgreementComponent} from "./agreement/agreement.component";
import {EmptyStateComponent} from "./placeholders/empty-state/empty-state.component";
import {LoadingSpinnerComponent} from "./placeholders/spinner-loading/loading-spinner.component";
import {AlertComponent} from "./alert/alert.component";

const sharedContentComponents = [
  RatingDetailComponent,
  AgreementComponent,
  LogoComponent,
  EmptyStateComponent,
  LoadingSpinnerComponent,
  AlertComponent
]

@NgModule({
  declarations: sharedContentComponents,
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  exports: sharedContentComponents,
})
export class SharedContentModule {
}
