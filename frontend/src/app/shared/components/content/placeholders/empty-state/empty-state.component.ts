import {Component, Input} from '@angular/core';

@Component({
  selector: 'tasklion-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent {

  @Input()
  public message: string = 'No records found';

}
