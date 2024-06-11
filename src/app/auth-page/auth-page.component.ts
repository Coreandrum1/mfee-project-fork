import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginFormComponent],
  template: ` <app-login-form></app-login-form> `,
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {}
