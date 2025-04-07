import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import {
  Contact,
  ContactsResponse,
  ContactResponse,
  ContactCreateResponse,
  ContactUpdateResponse,
  ContactDeleteResponse,
  ContactError
} from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private readonly API_URL = 'https://www.api.4gul.kanemia.com';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getContacts(page: number = 0, search: string = ''): Observable<ContactsResponse> {
    let params = new HttpParams();

    if (page) {
      params = params.set('page', page.toString());
    }
    
    if (search) {
      params = params.append('search', search);
    }

    return this.http.get<ContactsResponse>(`${this.API_URL}/contacts`, { params })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  getContactById(id: number): Observable<ContactResponse> {
    return this.http.get<ContactResponse>(`${this.API_URL}/contacts/${id}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  createContact(contact: Contact): Observable<ContactCreateResponse> {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      contact = { ...contact, user_id: currentUser.id };
    }
    
    return this.http.post<ContactCreateResponse>(`${this.API_URL}/contacts`, contact)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  updateContact(id: number, contact: Contact): Observable<ContactUpdateResponse> {
    return this.http.put<ContactUpdateResponse>(`${this.API_URL}/contacts/${id}`, contact)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  deleteContact(id: number): Observable<ContactDeleteResponse> {
    return this.http.delete<ContactDeleteResponse>(`${this.API_URL}/contacts/${id}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error) {
      // Server-side error with structured response
      const serverError: ContactError = error.error;
      errorMessage = serverError.errorMessage || 'Server error';
    }
    
    console.error('Contact service error:', error);
    return throwError(() => new Error(errorMessage));
  }
}