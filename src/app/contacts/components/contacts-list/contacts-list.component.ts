import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contact.model';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ContactModalComponent, DeleteConfirmationModalComponent]
})
export class ContactsListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  currentPage = 0;
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

  // Make Math available in the template
  Math = Math;

  // Debouncing search
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContacts();
    
    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after the last input event
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.onSearch();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadContacts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contactsService.getContacts(this.currentPage, this.searchTerm).subscribe({
      next: (response) => {
        this.contacts = response.data;
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

  onSearchInput(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onSearch(): void {
    this.currentPage = 0; // Reset to first page (zero-indexed) when searching
    this.loadContacts();
  }

  onPageChange(page: number): void {
    // Convert from 1-indexed UI page to 0-indexed API page
    this.currentPage = page - 1;
    this.loadContacts();
  }

  // Display page for UI (1-indexed)
  getDisplayPage(): number {
    return this.currentPage + 1;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalContacts / this.pageSize);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const displayPage = this.getDisplayPage(); // Use 1-indexed page for UI
    
    // If we have 7 or fewer pages, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Otherwise, show a limited number of pages with ellipsis
    let pages: number[] = [];
    
    // Always include first and last page
    pages.push(1);
    
    // Current page is close to the beginning
    if (displayPage <= 3) {
      pages.push(2, 3, 4, -1, totalPages);
    } 
    // Current page is close to the end
    else if (displayPage >= totalPages - 2) {
      pages.push(-1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } 
    // Current page is in the middle
    else {
      pages.push(-1, displayPage - 1, displayPage, displayPage + 1, -1, totalPages);
    }
    
    return pages;
  }

  isEllipsis(value: number): boolean {
    return value === -1;
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