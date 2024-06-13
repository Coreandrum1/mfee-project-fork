import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
      <div class="form-input-container">
        <label for="firstName">First Name:</label>
        <input
          id="firstName"
          formControlName="firstName"
          type="text"
          placeholder="e.g. Jane"
        />
        @if (registrationForm.get('firstName')?.invalid &&
        registrationForm.get('firstName')?.touched) {
        <div>
          @if (registrationForm.get('firstName')?.errors?.['required']) {
          <small>First Name is required.</small>
          }
        </div>
        }
        <br />
        <label for="lastName">Last Name:</label>
        <input
          id="lastName"
          formControlName="lastName"
          type="text"
          placeholder="e.g. Doe"
        />
        @if ( registrationForm.get('lastName')?.invalid &&
        registrationForm.get('lastName')?.touched) {
        <div>
          @if (registrationForm.get('lastName')?.errors?.['required']) {
          <small>Last Name is required.</small>
          }
        </div>
        }
      </div>
      <div class="form-input-container">
        <label for="email">Email:</label>
        <input
          id="email"
          formControlName="email"
          type="email"
          placeholder="email@example.com"
        />
        @if ( registrationForm.get('email')?.invalid &&
        registrationForm.get('email')?.touched ) {

        <div>
          @if (registrationForm.get('email')?.errors?.['required']) {
          <small>Email is required.</small>
          } @if (registrationForm.get('email')?.errors?.['email']) {
          <small>Invalid email address.</small>
          }
        </div>
        }
      </div>
      <div class="form-input-container">
        <label for="password">Password:</label>
        <input
          id="password"
          formControlName="password"
          placeholder="*****"
          type="password"
        />
        @if (registrationForm.get('password')?.invalid &&
        registrationForm.get('password')?.touched) {
        <div>
          @if (registrationForm.get('password')?.errors?.['required']) {
          <small>Password is required.</small>
          } @if (registrationForm.get('password')?.errors?.['minlength']) {
          <small>Password must be at least 6 characters long.</small>
          }
        </div>
        }
      </div>
      <div class="form-input-container">
        <label for="confirmPassword">Confirm Password:</label>
        <input
          placeholder="*****"
          id="confirmPassword"
          formControlName="confirmPassword"
          type="password"
        />
        @if (registrationForm.get('confirmPassword')?.invalid &&
        registrationForm.get('confirmPassword')?.touched) {
        <div>
          @if (registrationForm.get('confirmPassword')?.errors?.['required']) {
          <small>Confirmation is required.</small>
          } @if (registrationForm.get('confirmPassword')?.errors?.['mismatch'])
          {
          <small>Passwords must match.</small>
          }
        </div>
        }
      </div>
      <button type="submit" [disabled]="registrationForm.invalid">
        Register
      </button>
    </form>
  `,
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  registrationForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      const response = await this.authService.register({
        id: crypto.randomUUID(),
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
      });

      if (response) {
        this.router.navigate(['/home']);
      } else {
        console.log(response);
        alert('user already exists');
      }
    }
  }
}
