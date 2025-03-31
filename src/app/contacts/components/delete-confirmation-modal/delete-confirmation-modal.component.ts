import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DeleteConfirmationModalComponent {
  @Input() isOpen = false;
  @Input() contact: Contact | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  
  constructor() {}
  
  closeModal(): void {
    this.close.emit();
  }
  
  confirmDelete(): void {
    this.confirm.emit();
    this.closeModal();
  }
}