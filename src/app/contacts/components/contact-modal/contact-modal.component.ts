import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ContactModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() contact: Contact | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<Contact>();

  contactForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  modalTitle = 'Add Contact';

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    if (this.contact) {
      this.modalTitle = 'Edit Contact';
      this.contactForm.patchValue(this.contact);
    }
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      photo: ['']
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const contactData: Contact = this.contactForm.value;

    if (this.contact?.id) {
      // Update existing contact
      this.contactsService.updateContact(this.contact.id, contactData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.saved.emit({ ...contactData, id: this.contact?.id });
          this.closeModal();
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to update contact';
          this.isSubmitting = false;
        }
      });
    } else {
      // Create new contact
      this.contactsService.createContact(contactData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.saved.emit(contactData);
          this.closeModal();
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to create contact';
          this.isSubmitting = false;
        }
      });
    }
  }

  closeModal(): void {
    this.contactForm.reset();
    this.close.emit();
  }

  // Helper method to check if a field is invalid and touched
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}