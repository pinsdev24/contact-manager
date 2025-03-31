import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      photo: [''] // Optional field
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const { first_name, last_name, email, password, photo } = this.registerForm.value;

    this.authService.register({ first_name, last_name, email, password, photo }).subscribe({
      next: () => {
        this.router.navigate(['/contacts']);
      },
      error: (error) => {
        this.isSubmitting = false;
        // Display specific error message from the server
        if (error.error) {
          if (error.error.errorMessage) {
            this.errorMessage = error.error.errorMessage;
          } else if (error.error.message) {
            this.errorMessage = error.error.message;
          } else if (typeof error.error === 'string') {
            this.errorMessage = error.error;
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }
    });
  }
}