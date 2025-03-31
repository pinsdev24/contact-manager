import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  standalone: true,
  imports: [CommonModule, ContactsListComponent]
})
export class ContactsComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}