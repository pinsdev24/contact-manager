import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ContactEditComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  contactId!: number;

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadContact();
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

  loadContact(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/contacts']);
      return;
    }

    this.contactId = +id;
    this.contactsService.getContactById(this.contactId).subscribe({
      next: (contact) => {
        this.contactForm.patchValue(contact);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load contact';
      }
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

    this.contactsService.updateContact(this.contactId, contactData).subscribe({
      next: () => {
        this.router.navigate(['/contacts']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to update contact';
        this.isSubmitting = false;
      }
    });
  }

  // Helper method to check if a field is invalid and touched
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
}