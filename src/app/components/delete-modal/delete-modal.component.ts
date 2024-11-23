import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() instructorToDelete: any;  // Instructor that is to be deleted
  @Output() deleteConfirmed: EventEmitter<any> = new EventEmitter();  // Event emitter for delete confirmation
  @Output() closeModal: EventEmitter<void> = new EventEmitter();  // Event emitter for closing the modal

  constructor() { }

  onDelete() {
    this.deleteConfirmed.emit(this.instructorToDelete);
  }

  // Method to close the modal
  onClose() {
    this.closeModal.emit();
  }
}
