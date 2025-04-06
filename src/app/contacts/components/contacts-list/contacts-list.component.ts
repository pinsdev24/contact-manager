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
  allContacts: Contact[] = []; // Store all fetched contacts
  filteredContacts: Contact[] = []; // Contacts after filtering
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
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.filterContacts();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadContacts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contactsService.getContacts(this.currentPage, '').subscribe({
      next: (response) => {
        this.allContacts = response.data;
        this.filterContacts(); // Apply any existing filter
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load contacts';
        this.isLoading = false;
      }
    });
  }

  filterContacts(): void {
    if (!this.searchTerm.trim()) {
      // If no search term, show all contacts
      this.filteredContacts = [...this.allContacts];
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      
      // Filter contacts based on search term
      this.filteredContacts = this.allContacts.filter(contact => 
        contact.first_name?.toLowerCase().includes(searchLower) ||
        contact.last_name?.toLowerCase().includes(searchLower) ||
        contact.email?.toLowerCase().includes(searchLower) ||
        contact.phone?.toLowerCase().includes(searchLower)
      );
    }
    
    // Update pagination values
    this.totalContacts = this.filteredContacts.length;
    
    // Reset to first page when filter changes
    this.currentPage = 0;
    
    // Get the current page of contacts to display
    this.updateDisplayedContacts();
  }

  updateDisplayedContacts(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    
    // Set contacts to the current page of filtered contacts
    this.contacts = this.filteredContacts.slice(start, end);
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onPageChange(page: number): void {
    // Convert from 1-indexed UI page to 0-indexed API page
    this.currentPage = page - 1;
    this.updateDisplayedContacts();
  }

  // Getter for the paginated contacts
  get contacts(): Contact[] {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredContacts.slice(start, end);
  }

  // Setter for the contacts (needed for compatibility with existing code)
  set contacts(value: Contact[]) {
    // This setter is intentionally minimal as we're using a getter
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
    const displayPage = this.getDisplayPage();
    
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
        // Update local lists after deletion
        this.allContacts = this.allContacts.filter(c => c.id !== id);
        this.filterContacts(); // Re-apply filters and update the view
        this.closeDeleteModal();
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
    this.loadContacts(); // Reload all contacts after a contact is saved
  }

  viewContactDetails(id?: number): void {
    if (id) {
      this.router.navigate(['/contacts', id]);
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterContacts(); // Reset filter with empty search term
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