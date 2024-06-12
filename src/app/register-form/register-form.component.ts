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
      <div>
        <label for="firstName">First Name:</label>
        <input id="firstName" formControlName="firstName" type="text" />
        <div
          *ngIf="
            registrationForm.get('firstName')?.invalid &&
            registrationForm.get('firstName')?.touched
          "
        >
          <small *ngIf="registrationForm.get('firstName')?.errors?.['required']"
            >First Name is required.</small
          >
        </div>
        <label for="lastName">Last Name:</label>
        <input id="lastName" formControlName="lastName" type="text" />
        <div
          *ngIf="
            registrationForm.get('lastName')?.invalid &&
            registrationForm.get('lastName')?.touched
          "
        >
          <small *ngIf="registrationForm.get('lastName')?.errors?.['required']"
            >Last Name is required.</small
          >
        </div>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" formControlName="email" type="email" />
        <div
          *ngIf="
            registrationForm.get('email')?.invalid &&
            registrationForm.get('email')?.touched
          "
        >
          <small *ngIf="registrationForm.get('email')?.errors?.['required']"
            >Email is required.</small
          >
          <small *ngIf="registrationForm.get('email')?.errors?.['email']"
            >Invalid email address.</small
          >
        </div>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" formControlName="password" type="password" />
        <div
          *ngIf="
            registrationForm.get('password')?.invalid &&
            registrationForm.get('password')?.touched
          "
        >
          <small *ngIf="registrationForm.get('password')?.errors?.['required']"
            >Password is required.</small
          >
          <small
            *ngIf="registrationForm.get('password')?.errors?.['minlength']"
          >
            Password must be at least 6 characters long.
          </small>
        </div>
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          formControlName="confirmPassword"
          type="password"
        />
        <div
          *ngIf="
            registrationForm.get('confirmPassword')?.invalid &&
            registrationForm.get('confirmPassword')?.touched
          "
        >
          <small
            *ngIf="registrationForm.get('confirmPassword')?.errors?.['required']"
            >Confirmation is required.</small
          >
          <small
            *ngIf="registrationForm.get('confirmPassword')?.errors?.['mismatch']"
            >Passwords must match.</small
          >
        </div>
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
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { mismatch: true };
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
      }
    }
  }
}
