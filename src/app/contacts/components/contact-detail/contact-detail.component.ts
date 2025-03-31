import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contact.model';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, DeleteConfirmationModalComponent]
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | null = null;
  isLoading = false;
  errorMessage = '';
  
  // Delete confirmation modal properties
  isDeleteModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Contact ID is missing';
      this.isLoading = false;
      return;
    }

    this.contactsService.getContactById(+id).subscribe({
      next: (contact) => {
        this.contact = contact;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load contact details';
        this.isLoading = false;
      }
    });
  }

  openDeleteModal(): void {
    this.isDeleteModalOpen = true;
  }
  
  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }
  
  confirmDeleteContact(): void {
    if (!this.contact?.id) return;
    
    this.contactsService.deleteContact(this.contact.id).subscribe({
      next: () => {
        this.router.navigate(['/contacts']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to delete contact';
      }
    });
  }
}