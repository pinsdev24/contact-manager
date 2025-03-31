import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contact.model';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ContactModalComponent, DeleteConfirmationModalComponent]
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];
  currentPage = 1;
  pageSize = 10;
  totalContacts = 0;
  searchTerm = '';
  isLoading = false;
  errorMessage = '';
  
  // Modal properties
  isModalOpen = false;
  selectedContact: Contact | null = null;
  
  // Delete confirmation modal properties
  isDeleteModalOpen = false;
  contactToDelete: Contact | null = null;
  
  // Dropdown menu properties
  activeDropdown: number | null = null;

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contactsService.getContacts(this.currentPage, this.searchTerm).subscribe({
      next: (response) => {
        this.contacts = response.data;
        console.log('Contacts:', this.contacts);
        this.totalContacts = response.pagination.total;
        this.pageSize = response.pagination.pageSize;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load contacts';
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1; // Reset to first page when searching
    this.loadContacts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadContacts();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalContacts / this.pageSize);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  openDeleteModal(contact: Contact, event: Event): void {
    event.stopPropagation(); // Prevent navigation to detail page
    this.contactToDelete = contact;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.contactToDelete = null;
  }

  confirmDeleteContact(): void {
    if (!this.contactToDelete?.id) return;
    
    const id = this.contactToDelete.id;
    this.contactsService.deleteContact(id).subscribe({
      next: () => {
        this.loadContacts(); // Reload the list after deletion
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to delete contact';
      }
    });
  }

  // Modal methods
  openCreateModal(): void {
    this.selectedContact = null;
    this.isModalOpen = true;
  }

  openEditModal(contact: Contact, event: Event): void {
    event.stopPropagation(); // Prevent navigation to detail page
    this.selectedContact = { ...contact };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedContact = null;
  }

  onContactSaved(): void {
    this.loadContacts();
  }

  viewContactDetails(id?: number): void {
    if (id) {
      this.router.navigate(['/contacts', id]);
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadContacts();
  }

  toggleDropdown(contactId: number | undefined, event: Event): void {
    event.stopPropagation();
    if (contactId) {
      this.activeDropdown = this.activeDropdown === contactId ? null : contactId;
    }
  }

  closeAllDropdowns(): void {
    this.activeDropdown = null;
  }
}