import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'tasklion-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.scss']
})
export class InformationModalComponent {

  @Output() closed: EventEmitter<void> = new EventEmitter<void>();

  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() buttonText: string = 'Ok';

  isVisible: boolean = false;

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
    this.closed.emit();
  }

  getModalClasses(): string {
    return this.isVisible
      ? 'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center ' +
      'items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex'
      : 'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center ' +
      'items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full hidden';
  }

  getOverlayClasses(): string {
    return this.isVisible
      ? 'fixed inset-0 bg-black bg-opacity-50 z-40'
      : 'hidden';
  }
}
