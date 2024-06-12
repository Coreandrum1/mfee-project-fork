import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="email">Email:</label>
        <input id="email" formControlName="email" type="email" />
        <div
          *ngIf="
            loginForm.get('email')?.invalid && loginForm.get('email')?.touched
          "
        >
          <small *ngIf="loginForm.get('email')?.errors?.['required']"
            >Email is required.</small
          >
          <small *ngIf="loginForm.get('email')?.errors?.['email']"
            >Invalid email address.</small
          >
        </div>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" formControlName="password" type="password" />
        <div
          *ngIf="
            loginForm.get('password')?.invalid &&
            loginForm.get('password')?.touched
          "
        >
          <small *ngIf="loginForm.get('password')?.errors?.['required']"
            >Password is required.</small
          >
          <small *ngIf="loginForm.get('password')?.errors?.['minlength']">
            Password must be at least 6 characters long.
          </small>
        </div>
      </div>
      <button type="submit" [disabled]="loginForm.invalid">Login</button>
      <p>Don't have an account? <a [routerLink]="'/register'">Sign up</a></p>
    </form>
  `,
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const response = await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      if (response) {
        this.router.navigate(['/home']);
      }
    }
  }
}
