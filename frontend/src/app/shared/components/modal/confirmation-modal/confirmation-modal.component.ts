import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'tasklion-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  @Input() message: string = "Are you sure you want to proceed?";
  @Input() confirmButtonText: string = "Yes, I'm sure";
  @Input() cancelButtonText: string = "No, cancel";
  @Input() itemId: any;
  @Input() isLoading: boolean = false;

  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  isVisible: boolean = false;

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }

  onConfirm(): void {
    this.confirm.emit(this.itemId);
  }

  onCancel(): void {
    this.cancel.emit();
    this.close();
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
