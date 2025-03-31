import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  token: string;
  photo: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface TokenCheckResponse {
  message: string;
}

export interface ErrorResponse {
  errorCode: number;
  errorType: string;
  errorMessage: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  photo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://www.api.4gul.kanemia.com';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.user && response.user.token) {
            this.handleAuthentication(response);
          }
        })
      );
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/users`, userData)
      .pipe(
        tap(response => {
          if (response.user && response.user.token) {
            this.handleAuthentication(response);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  checkTokenValidity(): Observable<TokenCheckResponse> {
    const token = this.getToken();
    return this.http.post<TokenCheckResponse>(
      `${this.API_URL}/auth/check-token`, 
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  private handleAuthentication(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.user.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    this.isAuthenticatedSubject.next(true);
  }
}