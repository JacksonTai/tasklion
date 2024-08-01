import {Component, Input} from '@angular/core';

@Component({
  selector: 'tasklion-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent {

  @Input()
  public label: string = 'Submit';

  @Input()
  public isLoading: boolean = false;

}
