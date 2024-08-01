import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'tasklion-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {

  @Input()
  public label: string = '';

  @Output()
  public clicked: EventEmitter<void> = new EventEmitter<void>();

  public onClick(): void {
    this.clicked.emit();
  }

}
